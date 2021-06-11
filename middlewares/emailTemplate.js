const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const getPasswordResetURL = (user, token) =>
  `http://8.36.216.61:8080/expo?userid=${user._id}&token=${token}`;

const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "Dicomm Store Password Reset";
  const html = ` 
  <p>Dear, ${user.name || user.email},</p>
  <p>Did you forget your password ?</p>
  <p> You can use the following link to reset your password:</p>
  <a href='${url}'>Click to Reset Your Password</a>
  <p>This link will expire in 15 minutes and can be used only once.</p>
  <p>If you don't want to change your password, please ignore and delete this message! </p>
  <p>Thank you,</p>
  <p>Yours Dicomm Team</p>
  <img src="http://192.163.208.182/~maisha/v3/wp-content/uploads/2021/05/5058-logo.jpg" alt="logo" width="500" height="160" > 
  `;

  return { from, to, subject, html };
};

const registerUserTemplate = (user) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "Account Registration Successfully ";
  const html = `
  <p>Dear, ${user.name} </p>
  <p>Thank you for registering for shopping at our store </p>
  <p>Your username is: ${user.email} </p>
  <p>If you have any questions please contact support</p>
  <p>Best regards,</p>
  <p>Yours Dicomm Team</p>
  <img src="http://192.163.208.182/~maisha/v3/wp-content/uploads/2021/05/5058-logo.jpg" alt="logo" width="500" height="60" > 
  `;

  return { from, to, subject, html };
};

const sendUserOrderTemplate = (data, user) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "Order successfully, your order information";
  const html = `
  
  <p>Dear, Customer </p>
  <p>Your order ID is: ${data._id} </p>
  <p>Status: ${data.status} </p>
  <p>Items ordered: ${data.items.length} </p>
  <p>Total: ${data.totalAmount} </p>
  <p>We will check your order and confirm it as soon as possible</p>
  <p>Thanks for choosing our store </p>
  <p>Warm hugs,</p>
  <p>Yours Dicomm Team</p>
  <img src="http://192.163.208.182/~maisha/v3/wp-content/uploads/2021/05/5058-logo.jpg" alt="logo" width="500" height="60" > 
  `;

  return { from, to, subject, html };
};
module.exports = {
  transporter,
  getPasswordResetURL,
  resetPasswordTemplate,
  sendUserOrderTemplate,
  registerUserTemplate,
};
