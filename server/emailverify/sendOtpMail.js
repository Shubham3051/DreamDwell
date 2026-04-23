import nodemailer from "nodemailer";
import 'dotenv/config'

export const sendOtpMail = async (email, otp) => { 

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
        html: `<p>Your OTP for password reset is : <b>${otp}</b>. It is valid for 10 minites. </p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}


// export const sendOtpMail = async(email, otp) =>{
//      try {
//      const transporter = nodemailer.createTransport({
//      host: process.env.HOST,
//      service: process.env.SERVICE,
//     port: 587,
//     secure: true,
//     auth: {
//     user: process.env.USER,
//     pass: process.env.PASS,
//     }, });
    
//     await transporter.sendMail({
//      from: process.env.USER,
//      to: email,
//     subject: subject,
//     text: text });
    
//     console.log("email sent sucessfully");
//     } catch (error) {
//      console.log(error, "email not sent"); } };
    
//      module.exports = sendOtpMail;
// }