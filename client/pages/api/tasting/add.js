import dbConnect from "../../../utils/mangoDB";
import Tasting from "../../../models/Tasting";

async function handler(req, res) {
    try {
        const { date, title, description, price, places, photo } = req.body;

        const client = await dbConnect();

        if (client) {
            const tasting = new Tasting({
                date,
                title,
                description,
                price,
                places,
                photo,
            });
            const savedTasting = await tasting.save();
            if (savedTasting) {
                res.status(200).json(tasting);
            } else {
                res.status(500).json({ message: "Server Error" });
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Error processing data" });
    }
}

export default handler;
