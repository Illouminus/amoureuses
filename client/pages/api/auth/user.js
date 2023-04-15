import { getSession } from "next-auth/react";

async function handler(req, res) {
    const session = await getSession({ req });
    console.log('SESSION ON THE BACKEND', session)
    if (session) {
        res.status(200).json(session);
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
}

export default handler;
