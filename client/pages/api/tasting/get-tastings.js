import dbConnect from "../../../utils/mangoDB";
import Tasting from "../../../models/Tasting";

async function handler(req, res) {
    try {
        const client = await dbConnect();
        if (client) {
            const tastings = await Tasting.find({}).lean();
            res.status(200).json(tastings);
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching tastings" });
    }
}

export default handler
