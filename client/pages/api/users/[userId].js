import dbConnect from "../../../utils/mangoDB";
import User from "../../../models/User"

async function handler(req, res) {
    if (req.method !== "PUT") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }

    if (!req.query.userId) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }

    const { firstName, lastName } = req.body;
    try {
        const connectDB = await dbConnect();

        const changeUser = await User.findOneAndUpdate(
            { _id: req.query.userId },
            { $set: { firstName, lastName } },
            {new: true}
        );

        res.status(200).json(changeUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export default handler;
