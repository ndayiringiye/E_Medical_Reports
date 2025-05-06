import nodemailer from "nodemailer";
import Email from "../models/messageModel.js"; 

const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

export const sendEmail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({ 
        success: false, 
        message: 'To, subject, and text are required' 
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to, 
      subject,
      html: text
    };

    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);

    const emailRecord = new Email({
      to,
      subject,
      body: text
    });

    await emailRecord.save();

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully', 
      emailId: emailRecord._id,
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Email Send Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email', 
      error: error.message 
    });
  }
};
