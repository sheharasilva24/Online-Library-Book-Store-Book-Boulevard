const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../emailService');
const cloudinary = require('../cloudinaryConfig');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Upload files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage }).single('profileImage');

exports.register = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error uploading file' });
            }

            const { firstname, lastname, email, password } = req.body;
            const userExists = await User.findOne({ email });

            if (userExists) return res.status(400).json({ message: 'User already exists' });

            let profileImageUrl = null;

            if (req.file) {
                // Upload profile image to Cloudinary
                const result = await cloudinary.uploader.upload(req.file.path);
                profileImageUrl = result.secure_url;
            }

            const user = new User({ firstname, lastname, email, password, profileImageUrl });
            await user.save();

            res.status(201).json({ message: 'User created successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};





exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }

        // Generate a temporary 2FA code
        const twoFactorCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code
        const twoFactorCodeExpires = new Date(new Date().getTime() + 10 * 60000); // Code expires in 10 minutes

        // Update user with 2FA code and expiry
        await User.updateOne({ _id: user._id }, { twoFactorCode, twoFactorCodeExpires });

        // Send 2FA code via email
        await sendEmail(
            user.email,
            'Your 2FA Code',
            `Your two-factor authentication code is: ${twoFactorCode}. It expires in 10 minutes.`
        );

        // Respond to request indicating 2FA code was sent
        res.status(200).json({ message: '2FA code sent to your email. Please verify to complete login.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.verify2FA = async (req, res) => {
    try {
        const { email, twoFactorCode } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.twoFactorCode !== twoFactorCode || new Date() > user.twoFactorCodeExpires) {
            return res.status(401).json({ message: 'Invalid or expired 2FA code' });
        }

        // Generate JWT token as the 2FA code is verified
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Optionally, clear the 2FA code fields after successful verification
        await User.updateOne({ _id: user._id }, { twoFactorCode: null, twoFactorCodeExpires: null });

        res.status(200).json({ message: '2FA verification successful', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        // Include only _id, firstname, lastname, and email fields in the result
        const user = await User.findById(userId).select('_id firstname lastname email');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid book ID format' });
        }
        res.status(500).json({ message: 'Failed to get book', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        // No need for an ID to get all users, so we remove the parameter extraction

        // Retrieve all users but only include specific fields
        const users = await User.find({}).select('_id firstname lastname email');

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get users', error: error.message });
    }
};



exports.updateUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;

        // Check if the updateData contains a password that needs to be hashed
        if (updateData.password) {
            const saltRounds = 12; // You can adjust saltRounds as needed
            const hashedPassword = await bcrypt.hash(updateData.password, saltRounds);
            updateData.password = hashedPassword;
        }

        // Update the user and return the updated document
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Consider filtering out sensitive fields from the response, if necessary
        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser // Consider renaming "book" to "user" to better reflect the entity being updated
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};


exports.forgotPasswordRequest = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const twoFactorCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code
        const twoFactorCodeExpires = new Date(Date.now() + 10 * 60000); // Code expires in 10 minutes

        user.twoFactorCode = twoFactorCode;
        user.twoFactorCodeExpires = twoFactorCodeExpires;
        await user.save();

        // Send 2FA code via email (set up your email transporter configuration)
        await sendEmail(user.email, 'Your Password Reset Code', `Your code is ${twoFactorCode}. It expires in 10 minutes.`);

        res.json({ message: 'Password reset code sent to your email. Please check your inbox.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to process password reset request', error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, twoFactorCode, newPassword } = req.body;
        const user = await User.findOne({ email, twoFactorCode, twoFactorCodeExpires: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired password reset code.' });
        }
        console.log(newPassword)

        user.password = newPassword;
        // Invalidate the 2FA code after use
        user.twoFactorCode = undefined;
        user.twoFactorCodeExpires = undefined;
        await user.save();

        res.json({ message: 'Password has been reset successfully. Please log in with your new password.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to reset password', error: error.message });
    }
};


exports.profile = async (req, res) => {
    try {
        // req.user is set by the authenticateToken middleware
        const userId = req.user.userId;

        const user = await User.findById(userId).select('-password -twoFactorCode -twoFactorCodeExpires'); // Exclude sensitive information
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get profile', error: error.message });
    }
};



