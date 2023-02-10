const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function main(firstName, lastName, email, telephone, message) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMPT_USER, // generated ethereal user
      pass: process.env.SMPT_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: { email }, // sender address
    to: 'lesamoureuses2023@gmail.com', // list of receivers
    subject: 'Contact from site lesamoureuses.paris', // Subject line
    text: '', // plain text body
    html:
			`	
					<div>
						<h2>Contact from lesamoureuses.paris</h2>
						<h3>From: ${firstName, lastName}</h3>
						// eslint-disable-next-line no-tabs
						<h3>Telephone: ${telephone}</h3>
						<h3>Email: ${email}</h3>
						<div>
						<h3>Message:</h3>
						<p>${message}</p>
						</div>
					</div>	
		`,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

const contact = async (req, res) => {
  const {
    firstName, lastName, email, telephone, message,
  } = req.body;
  try {
    const sendMail = main(firstName, lastName, email, telephone, message);
    if (sendMail) {
      res.send({ status: true });
    } else {
      res.send({ status: false });
    }
  } catch (error) {
    res.send({ status: false });
  }
};

module.exports = { contact };
