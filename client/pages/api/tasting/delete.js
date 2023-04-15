// pages/api/tasting/delete.js
import dbConnect from "../../../utils/mangoDB";
import Tasting from "../../../models/Tasting";

async function handler(req, res) {
    const { method, body } = req;

    await dbConnect();

    switch (method) {
        case "DELETE":
            try {
                const deletedTasting = await Tasting.findByIdAndDelete(body.id);

                if (!deletedTasting) {
                    return res.status(400).json({ message: "Tasting not found" });
                }

                res.status(200).json(deletedTasting);
            } catch (error) {
                res.status(500).json({ message: "Error deleting tasting" });
            }
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
}

export default handler;
