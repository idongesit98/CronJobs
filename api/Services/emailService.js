const nodeMailer = require('nodemailer')
require('dotenv').config()

const transporter = nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user:"robsonidongesitsamuel@gmail.com",
        pass: process.env.password
    },
});

const sendBirthdayEmail = async (email,firstName) => {
    try {
        await transporter.sendMail({
            from:'"CronJobs" < robsonidongesitsamuel@gmail.com>',
            to: email,
            subject: 'Happpy Birthday!!!!!!!',
            text: `Happy Birthday, ${firstName}! 🎉🎂 Hope you have a fantastic day!`,
        });

        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = {sendBirthdayEmail};