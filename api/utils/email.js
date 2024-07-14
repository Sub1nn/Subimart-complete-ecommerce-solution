import nodemailer from "nodemailer";

const sendEmail = async (option) => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // You might need to set this to true in production
    },
  });

  //define email options
  const emailOptions = {
    from: "subimart001@gmail.com",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export default sendEmail;
