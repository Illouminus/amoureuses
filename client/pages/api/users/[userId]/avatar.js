import dbConnect from "../../../../utils/mangoDB";
import User from "../../../../models/User"




async function handler(req, res) {
    const userId = req.query.userId;
    console.log('REQ BODY BACK', req.body)
    try {
        const avatarUrl = req.body.url;
        const client = await dbConnect();
        if (client) {
            const update =  await User.updateOne({ _id: userId }, { $set: { avatar: avatarUrl } });
            if (update) {
                res.status(200).json({ message: "Avatar updated", avatarUrl });
            } else {
                res.status(500).json({ message: "Server Error" });
            }
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(501).json({ error: "Error uploading file" });
    }
}



export default handler;
