import nodemailer from "nodemailer";

const createTransporter = async () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

export const sendEmail = async (req, res) => {
  const { to, subject, text, html, from, replyTo } = req.body;
  
  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide recipient, subject, and message content' 
    });
  }
  
  try {
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: from || `"Your App Name" <${process.env.EMAIL_USER}>`, 
      to: Array.isArray(to) ? to.join(',') : to, 
      subject,
      text, 
      html: html || text, 
      replyTo: replyTo || from || process.env.EMAIL_USER
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent: %s', info.messageId);
    
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    let errorMessage = 'Failed to send email';
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Please check your email credentials.';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Network error. Please check your internet connection.';
    }
    
    res.status(500).json({ 
      success: false, 
      message: errorMessage,
      error: error.message 
    });
  }
};