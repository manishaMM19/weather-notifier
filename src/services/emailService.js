import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'moments.1.memoirs@gmail.com',  
    pass: 'gsgm kzew ceyv ycvk'    
  }
});

export const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: 'moments.1.memoirs@gmail.com',  
      to: to,                        
      subject: subject,              
      text: text                     
    });

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
