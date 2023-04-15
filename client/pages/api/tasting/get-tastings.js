import dbConnect from "../../../utils/mangoDB";
import Tasting from "../../../models/Tasting";

async function handler(req, res) {
    try {
        const client = await dbConnect();
        if (client) {
            // Get today's date and set the time to 00:00:00
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Find tastings with a date greater than or equal to today
            const tastings = await Tasting.find({}).lean();
            res.status(200).json(tastings);
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching tastings" });
    }
}

export default handler;
