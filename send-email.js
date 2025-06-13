const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'duyenduyenduyen318@gmail.com', // Thay bằng email gửi của bạn
    pass: 'dncpqitfkgfrwhoc'
  }
});

let mailOptions = {
  from: 'duyenduyenduyen318@gmail.com', // Thay bằng email gửi của bạn
  to: 'duyenduyenduyen318@gmail.com',
  subject: 'Test Email',
  text: 'Hello from Nodemailer!'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
