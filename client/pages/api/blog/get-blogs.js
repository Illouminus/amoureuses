import dbConnect from "../../../utils/mangoDB";
import Article from "../../../models/Article";

async function handler(req, res) {
    try {
        const client = await dbConnect();
        if (client) {
            const articles = await Article.find({}).lean();
            const articlesWithId = articles.map((article) => {
                return {
                    _id: article._id,
                    blocks: article.blocks,
                };
            });
            res.status(200).json(articlesWithId);
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching tastings" });
    }
}

export default handler;
