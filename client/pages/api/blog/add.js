import dbConnect from "../../../utils/mangoDB";
import Article from "../../../models/Article";


const extractSubTitles = (blocks) => {
    const subTitles = blocks
        .filter((block) => block.type === "subTitle")
        .map((block) => block.content);

    return subTitles.join(" | ");
};

const extractTitle = (blocks) => {
    const titleBlock = blocks.find((block) => block.type === "title");
    return titleBlock ? titleBlock.content : "";
};

async function handler(req, res) {
    try {
        const {  blocks } = req.body;
        const client = await dbConnect();
        if (client) {
            const title = extractTitle(blocks);
            const description = extractSubTitles(blocks);
            const keywords = "Bar à vin, achat vin, Les Amoureuses,  bar à vin les amoureuses, passer une soirée, degustation de vin, bar à vin Paris, bar Paris, belle soirée, evénement sur paris, bar à vin, meilleurs bars à vin Paris, bar à vin Paris 8ème, bar à vin Paris 9ème, cave à vin Paris, soirée vin Paris, bar à vin près de moi, bar à vin à proximité";

            const article = new Article({
                blocks,
                title,
                description,
                keywords,
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
