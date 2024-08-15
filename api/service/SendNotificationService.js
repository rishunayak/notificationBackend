import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import Notification from '../../model/notification.model.js';
import logger from '../../helper/logger.js';
dotenv.config()

const maxRetries = 3;
const retryIntervals = [1 * 60 * 1000, 5 * 60 * 1000, 15 * 60 * 1000];

const transporter = nodemailer.createTransport({
    service: 'gmail', // SMTP server address
    host: 'smtp.gmail.com',
    port: 587, // SMTP port for TLS
    secure: false, // Use TLS (true for secure, false for insecure)
    auth: {
        user: process.env.EMAIL_USER, // SMTP username
        pass: process.env.EMAIL_PASS, // SMTP password
    },
});


const sendMailService = async (body, id, retries = 0) => {
    try {

        const { to, from, subject, text, html } = body

        await Notification.findByIdAndUpdate(
            id,
            { status: "Pending" },
        );
        try {
            const info = await transporter.sendMail({ to, from, subject, text, html });
            await Notification.findByIdAndUpdate(
                id,
                { status: "Sent" },
            );
        } catch (error) {
            logger.error({method:'sendMailService',error:error.message}) 
            await Notification.findByIdAndUpdate(
                id,
                { status: "Failed" },
            );
            if (retries < maxRetries) {
                await Notification.findByIdAndUpdate(
                    id,
                    { status: "Retrying" },
                );
                await new Promise(resolve => setTimeout(resolve, retryIntervals[retries])); // Wait for the retry interval
                
                return sendMailService({ to, from, subject, text, html },id, retries + 1); // Retry sending email
            } else {
                await Notification.findByIdAndUpdate(
                    id,
                    { status: "Dead", notificationLog: "Fail sending mail please connect to admin" },
                );
                logger.error({method:'sendMailService',error:error.message}) 
            }
        }

    } catch (error) {
        logger.error({method:'getNotificationService',error:error.message}) 
        return {
            status: 500,
            error: 'Internal Server Error'
        }
    }
}

const getNotificationService = async (notificationId) => {
    try {
        const response = await Notification.findById(notificationId); // user validation required which will comne from middleware 

        if (!response) {
            return {
                status: 404,
                error: 'No Data found'
            }
        }
        return { status: 200, data: response }
    } catch (error) {
        logger.error({method:'sendMailService',error:error.message}) 
        return {
            status: 500,
            error: 'Internal Server Error'
        }
    }
}


export { sendMailService, getNotificationService }