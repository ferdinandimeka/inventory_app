const nodemailer = require('nodemailer');

const sendEmail = async (subject, message, send_to, send_from, reply_to) => {

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    
        // check transporter
        transporter.verify((err, success) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Server is ready to take messages');
            }
        });
    
        const mailOptions = {
            from: send_from,
            to: send_to,
            subject: subject,
            html: message,
            replyTo: reply_to,
        }
    
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error('There was an error from the nodemailer');
    }
};

module.exports = sendEmail;