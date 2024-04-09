const Testimonial = require('../models/Testimonial');
const User = require('../models/User');


exports.createTestimonial = async (req, res) => {
    try {
        const { text, rating, profile } = req.body;

        const userId = req.user.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Assuming your Testimonial model accepts a userId or similar field for the author
        const testimonial = new Testimonial({
            author: user.firstname,
            profile: user.profileImageUrl,
            text,
            rating
        });

        await testimonial.save();
        res.status(201).send(testimonial);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


exports.getTestimonials = async (req, res) => {
    try {
        // Add a query parameter for sorting, if desired
        const sortBy = req.query.sortBy || 'createdAt';
        const order = req.query.order === 'asc' ? 'asc' : 'desc'; // Defaults to descending

        const testimonials = await Testimonial.find({}).sort({ [sortBy]: order });
        res.status(200).send(testimonials);
    } catch (error) {
        res.status(500).send(error.message);
    }
};