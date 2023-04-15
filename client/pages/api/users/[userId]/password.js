import dbConnect from "../../../../utils/mangoDB";
import User from "../../../../models/User"
import bcrypt from "bcrypt";

async function handler(req, res) {
    if (req.method !== "PUT") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }


    const userId = req.query.userId;
    const { oldPassword, newPassword } = req.body;


    const client = await dbConnect();
    if (client) {
        const user = await User.findOne({ _id: userId });
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        console.log('isPasswordValid', isPasswordValid)
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.updateOne({ _id: userId }, { $set: { password: hashedPassword } });

    res.status(200).json({ message: "Password updated" });
}

export default handler;
