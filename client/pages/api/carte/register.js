import dbConnect from "../../../utils/mangoDB";
import User from "../../../models/User"
const bcrypt = require("bcrypt")
export default async function Register (req, res) {
    try {
        const response = await dbConnect()
        if (response) {
            console.log('Connection with DB')
            const {
                login, password
            } = req.body;
            console.log(login, password)
            try {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const newUser = new User({login, password: hashedPassword});
                await newUser.save();
                res.send(newUser)
            } catch (error) {
                console.log(error);

            }
        }
    } catch (e) {
        console.log(e)

    }
}
