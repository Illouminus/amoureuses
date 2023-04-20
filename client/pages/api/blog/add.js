import dbConnect from "../../../utils/mangoDB";
import Article from "../../../models/Article";

async function handler(req, res) {
    try {
        const {  blocks } = req.body;
        const client = await dbConnect();

        if (client) {
            const article = new Article({
                blocks,
            });
            const savedArticle = await article.save();
            if (savedArticle) {
                res.status(200).json(article);
            } else {
                res.status(500).json({ message: "Server Error" });
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Error processing data" });
    }
}

export default handler;
