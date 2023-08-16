import nodemailer from 'nodemailer';
import fs from 'fs';
import * as path from "path";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

export default async function sendMessage(req, res) {

    try {
        const { hash, email, countTokens } = req.body;
        const filePath = path.join(process.cwd(), 'pages/mail/', 'message_buy.html');

        const html = fs.readFileSync(filePath, 'utf8');
        const personalizedHtml = html.replace('{{email}}', email).replace('{{hash}}', hash).replace('{{countTokens}}', countTokens);

        const mailOptions = {
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
            to: email,
            subject: 'BNXT',
            html: personalizedHtml,
        };

        await transporter.sendMail(mailOptions)
        return res.status(200).json({ success: true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}