import dbConnect from "../../../utils/mangoDB";
import Carte from "../../../models/Carte"
export default async function Delete (req, res) {
    try {
        const response = await dbConnect()
        if (response) {
            console.log('Connection with DB')
            const {
                id
            } = req.body;
            console.log(id)
            try {
                const findItem = await Carte.deleteOne({ _id: id });
                res.send({ findItem });
            } catch (error) {
                console.log(error);
            }
        }
    } catch (e) {
        console.log(e)

    }
}
