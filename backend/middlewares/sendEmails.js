const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = (req, res, next) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res
      .status(400)
      .json({ error: "Missing email, subject, or html in request body." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return next(error);
    }
    next();
  });
};

module.exports = sendEmail;
