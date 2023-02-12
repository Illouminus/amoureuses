import connectDB from "../../../utils/connectDB";
import Category from "../../../models/Category";
import Carte from "../../../models/Carte"

export default async function getInitialValues (req, res) {
    try {
        const response = await connectDB()
        if (response) {
            console.log('Connection with DB')
            const findResulutCategory = await Category.find({});
            const findResultCarte = await Carte.find({});
            console.log(findResulutCategory, findResultCarte)
            res.send([findResulutCategory, findResultCarte]);
        } else {
            res.sendStatus(400)
        }

    } catch (e) {
        console.log(e)
        res.json({e})
    }
}