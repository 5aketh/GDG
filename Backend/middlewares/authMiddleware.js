import {auth} from "../config/firebaseConfig.js";

const verifySession = async (req, res, next) => {
    const sessionCookie = req.cookies.session || "";
    
    // if (!sessionCookie) {
    //     return res.status(401).json({ message: "Kindly Login to use the chatbot" });
    // }

    try {
        // decode the session cookie to get user data
        const decodeClaims = await auth.verifySessionCookie(sessionCookie, true);
        req.user = decodeClaims;
        next(); // Continue to the next middleware
    } catch (error) {
        next()
        // res.status(401).json({ message: "Invalid session" });
    }
};

export default verifySession;
