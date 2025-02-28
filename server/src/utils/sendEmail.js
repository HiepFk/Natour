const nodemailer = require('nodemailer');

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

const configEmail = async (to, url, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  });

  const options = {
    from: adminEmail,
    to: to,
    subject: 'Natour FK',
    html: `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the HiepFK.</h2>
    
    <p> Natour Website❤️</p>
    
    <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${text}</a>
    </div>
`,
  };

  await transporter.sendMail(options);
};

const sendMail = async (res, to, url, text) => {
  try {
    await configEmail(to, url, text);
    res.status(201).json({
      status: 'success',
      message: 'Please check your email!',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Register Failed! Please try again!',
    });
  }
};

module.exports = sendMail;
