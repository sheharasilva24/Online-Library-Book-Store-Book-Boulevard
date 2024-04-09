const CheckoutDetail = require('../models/CheckoutDetail');
const User = require('../models/User'); // Assuming you have a User model

exports.saveCheckoutDetails = async (req, res) => {
    try {
        const { email, transactionId } = req.body;

        if (!email || !transactionId) {
            return res.status(400).json({ message: 'Missing required fields: email or transactionId.' });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const subscriptionEndDate = new Date();
        subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);

        const newDetail = new CheckoutDetail({
            email,
            transactionId,
            userId: user._id,
            subscriptionEndDate
        });
        await newDetail.save();

        // Update the user's subscription status and end date
        await User.findByIdAndUpdate(user._id, {
            subscriptionStatus: 'inactive',
            subscriptionEndDate: subscriptionEndDate,
        });

        res.status(201).json({ message: 'Checkout detail saved successfully', data: newDetail });
    } catch (error) {
        console.error('Error saving checkout detail:', error);
        res.status(500).json({ message: 'Failed to save checkout detail' });
    }
};

exports.subscriptionStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const subscription = await CheckoutDetail.findOne({ userId: userId });
        if (!subscription) {
            return res.status(404).send({ error: "Subscription not found" });
        }
        // Optionally, check if the subscription is active based on the current date and `subscriptionEndDate`
        const isActive = subscription.subscriptionStatus === 'active' &&
            (!subscription.subscriptionEndDate || new Date(subscription.subscriptionEndDate) > new Date());
        res.send({ status: isActive ? 'active' : 'expired' });
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
};



async function updateUserSubscriptionStatus(userId) {
    try {
        const user = await User.findById(userId);

        if (!user || !user.subscriptionEndDate) {
            console.log('User not found or subscription end date not set:', userId);
            return;
        }

        const isSubscriptionActive = user.subscriptionEndDate > new Date();

        await User.findByIdAndUpdate(userId, {
            subscriptionStatus: isSubscriptionActive ? 'active' : 'expired',
        });

        console.log(`User ${userId} subscription status updated to ${isSubscriptionActive ? 'active' : 'expired'}.`);
    } catch (error) {
        console.error('Error updating user subscription status:', error);
    }
}

