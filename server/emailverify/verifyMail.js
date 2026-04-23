import nodemailer from "nodemailer";
import 'dotenv/config'

export const verifyMail = async (token, email) => { 

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Email Verification",
        // text: `Please click the following link to verify your email: http://localhost:3000/verify-email?token=${token}`
        html: `<p>Please click the following link to verify your email:</p>
               <a href="http://localhost:5173/verify-email?token=${token}">Verify Email</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

// import nodemailer from "nodemailer";
// import 'dotenv/config'
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import handlebars from "handlebars";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const templateSource = fs.readFileSync(
//   path.join(__dirname, "template.hbs"),
//   "utf8"
// );

// const template = handlebars.compile(templateSource);

// export const verifyMail = async (token, email) => {
//     const htmlToSend = template({
//         token: encodeURIComponent(token)
//     });

//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.MAIL_USER,
//             pass: process.env.MAIL_PASSWORD
//         }
//     });

//     const mailOptions = {
//         from: process.env.MAIL_USER,
//         to: email,
//         subject: "Email Verification",
//         html: htmlToSend
//     };

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log("Email sent:", info.response);
//     } catch (error) {
//         console.error("Error sending email:", error);
//     }
// };

// import nodemailer from "nodemailer";

// export const verifyMail = async (otp, email) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//             user: process.env.MAIL_USER,
//             pass: process.env.MAIL_PASSWORD
//     },
//   });

//   await transporter.sendMail({
//     from: `"My App" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Your OTP Code",
//     html: `<h2>Your OTP is: <b>${otp}</b></h2>
//            <p>It expires in 10 minutes.</p>`,
//   });
// };