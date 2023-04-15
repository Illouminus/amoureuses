import dbConnect from "../../../../utils/mangoDB";
import User from "../../../../models/User"
import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/icons",
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
        }
    },
});

const uploadMiddleware = (req, res, next) => {
    return new Promise((resolve, reject) => {
        multer({ storage: upload.storage, fileFilter: upload.fileFilter }).single("avatar")(req, res, (err) => {
            if (err) {
                reject(err);
                res.status(501).json({ error: "Error uploading file" });
            } else {
                resolve();

            }
        });
    });
};



async function handler(req, res) {

    const userId = req.query.userId;

    try {
        await uploadMiddleware(req, res);
        const avatarUrl = `/icons/${req.file.filename}`;
        const client = await dbConnect();

        if (client) {
            const update =  await User.updateOne({ _id: userId }, { $set: { avatar: avatarUrl } });
            if (update) {
                res.status(200).json({ message: "Avatar updated", avatarUrl });
            } else {
                res.status(500).json({ message: "Server Error" });
            }
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(501).json({ error: "Error uploading file" });
    }
}


export const config = {
    api: {
        bodyParser: false,
    },
};
export default handler;
