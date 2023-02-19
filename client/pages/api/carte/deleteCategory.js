import dbConnect from "../../../utils/mangoDB";
import Category from "../../../models/Category"
export default async function DeleteCategory (req, res) {
    try {
        const response = await dbConnect()
        if (response) {
            console.log('Connection with DB')
            const {
                id
            } = req.body;
            console.log(id)
            try {
                const findItem = await Category.deleteOne({ _id: id });
                res.send({ findItem });
            } catch (error) {
                console.log(error);
            }
        }
    } catch (e) {
        console.log(e)

    }
}
