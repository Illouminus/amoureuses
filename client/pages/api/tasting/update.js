import dbConnect from "../../../utils/mangoDB";
import Tasting from "../../../models/Tasting";

async function handler(req, res) {
    if (req.method === "PUT") {
        try {
            const { _id, date, title, description, price, places } = req.body;
            const client = await dbConnect();
            console.log('BODY', req.body)
            if (client) {
                const updatedTasting = await Tasting.findByIdAndUpdate(
                    _id,
                    { date, title, description, price, places },
                    { new: true }
                ).lean();

                if (updatedTasting) {
                    res.status(200).json(updatedTasting);
                } else {
                    res.status(404).json({ message: "Tasting not found" });
                }
            } else {
                res.status(500).json({ message: "Server Error" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error updating tasting" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}

export default handler;
