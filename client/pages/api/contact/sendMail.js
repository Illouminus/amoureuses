import {main} from '../../../utils/sendMail'

export default async function SendMail (req, res) {
    try {
            const {
                firstName, lastName, email, telephone, message,
            } = req.body;
        console.log(firstName, lastName, email, telephone, message,)
                const sendMail = main(firstName, lastName, email, telephone, message);
                if (sendMail) {
                    res.send({ status: true });
                } else {
                    res.send({ status: false });
                }
        }   catch (e) {
        console.log(e)
    }
}
