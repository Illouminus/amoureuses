import dbConnect from "../../../utils/mangoDB";
import Category from "../../../models/Category";
import Carte from "../../../models/Carte"

export default async function addOrEditValues (req, res) {
    try {
        const response = await dbConnect()
        if (response) {
            console.log('Connection with DB')
            const {
                category, name, description, price, origin
            } = req.body;
            console.log(category, name, description, price, origin)
            const uperName = name.charAt(0).toUpperCase() + name.slice(1);
            const uperCategory = category.charAt(0).toUpperCase() + category.slice(1);
            let categoryDoc = await Category.findOne({ name: uperCategory });
            if (!categoryDoc) {
                categoryDoc = new Category({ name: uperCategory });
                await categoryDoc.save();
            }
            let carteDoc;
            if (req.body.id) {
                carteDoc = await Carte.findById(req.body.id);
                if (!carteDoc) {
                    carteDoc = new Carte();
                }
            } else {
                carteDoc = new Carte();
            }
            carteDoc.name = uperName;
            carteDoc.description = description;
            carteDoc.price = price;
            carteDoc.origin = origin;
            carteDoc.category = categoryDoc._id;
            await carteDoc.save();
            console.log({ menu: carteDoc, category: categoryDoc });
            res.send({ menu: carteDoc, category: categoryDoc });
        } else {
            res.sendStatus(400)
        }

    } catch (e) {
        console.log(e)
        res.json({e})
    }
}
