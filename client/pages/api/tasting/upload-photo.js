import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/img/tasting",
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
        multer({ storage: upload.storage, fileFilter: upload.fileFilter }).single("photo")(req, res, (err) => {
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
    try {
        await uploadMiddleware(req, res);
        const photoUrl = `/img/tasting/${req.file.filename}`;
        res.status(200).json({ photoUrl });
    } catch (error) {
        res.status(501).json({ error: "Error uploading file" });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
