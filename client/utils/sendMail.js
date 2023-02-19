import nodemailer, {createTransport} from "nodemailer";

export async function main(firstName, lastName, email, telephone, message) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMPT_USER, // generated ethereal user
            pass: process.env.SMPT_PASSWORD, // generated ethereal password
        },
    });

    const info = await transporter.sendMail({
        from: { email }, // sender address
        to: 'lesamoureuses2023@gmail.com', // list of receivers
        subject: 'Contact from site lesamoureuses.paris', // Subject line
        text: '', // plain text body
        html: `
               <div>
                    <h2>Contact from lesamoureuses.paris</h2>
                    <h3>From: ${firstName, lastName}</h3>
                    <h3>Telephone: ${telephone}</h3>
                    <h3>Email: ${email}</h3>
                <div>
                    <h3>Message:</h3>
                    <p>${message}</p>
                </div>
              </div>\t
        
        `
    })
}
