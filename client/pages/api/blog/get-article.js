import dbConnect from "../../../utils/mangoDB";
import Article from "../../../models/Article";

async function handler(req, res) {
    try {
        await dbConnect();

        if (req.method === "GET") {
            const { id } = req.query;
            const article = await Article.findById(id);

            if (!article) {
                return res.status(404).json({ message: "Article not found" });
            }

            res.status(200).json({
                _id: article._id,
                blocks: article.blocks,
            });
        } else {
            res.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching article" });
    }
}

export default handler;
