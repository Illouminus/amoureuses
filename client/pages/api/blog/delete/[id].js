// pages/api/blog/delete/[id].js
import dbConnect from "../../../../utils/mangoDB";
import Article from "../../../../models/Article";

async function handler(req, res) {
    if (req.method !== "DELETE") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }

    try {
        const client = await dbConnect();
        if (client) {
            const { id } = req.query;
            await Article.findByIdAndRemove(id);
            res.status(200).json({ message: "Article deleted successfully" });
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting article" });
    }
}

export default handler;
