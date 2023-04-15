import multer from "multer";


const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/carte",
        filename: (_req, _file, cb) => {
            cb(null, "Carte.pdf");
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes("application/pdf") || file.mimetype.includes("application/x-pdf")) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"), false);
        }
    },
});

const uploadMiddleware = (req, res) => {
    return new Promise((resolve, reject) => {
        multer({ storage: upload.storage, fileFilter: upload.fileFilter }).single("file")(req, res, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            console.log(req)
            await uploadMiddleware(req, res);
            res.status(200).json({ message: "File uploaded successfully" });
        } catch (error) {
            console.error("Error uploading file:", error);
            res.status(501).json({ error: "Error uploading file" });
        }
    } else {
        res.status(400).json({ error: "Invalid request" });
    }
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
