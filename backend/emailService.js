const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASS
    }
});


const sendEmail = async (email, subject, text) => {
    const mailOptions = {
        from: 'greensupermarket.store@gmail.com',
        to: email,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error; // Rethrow or handle as needed
    }
};

module.exports = sendEmail;
