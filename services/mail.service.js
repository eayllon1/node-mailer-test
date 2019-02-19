const nodemailer = require("nodemailer");
const config = require('../config')

const mailClient = 'zoho'

switch (mailClient) {
  case 'zoho':
    var transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: config.MAIL_USER,
          pass: config.MAIL_PASS
      }
    });
    break
  case 'gmail':
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: config.MAIL_USER,
          pass: config.MAIL_PASS
      }
    });
  case 'outlook':
    var transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
         ciphers:'SSLv3'
      },
      auth: {
          user: config.MAIL_USER,
          pass: config.MAIL_PASS
      }
    });
  default:
    console.log("Select a mailing client, and enter credentials in variables.env/config.js")
}


module.exports.sendMail =  (recipients) => {
  var mailOptions = {
      from: `${config.COMPANY_NAME} <${config.MAIL_USER}>`, // sender address (who sends)
      to: recipients, // list of receivers (who receives)
      subject: 'Hello ', // Subject line
      text: 'Hello world ', // plaintext body
      html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }

      console.log('Message sent: ' + info.response);
  });
};
