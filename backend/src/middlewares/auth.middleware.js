import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
    try {

        const token = req.cookies.jwt; 
        // i have store my authentication token with jwt name  

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }
        // our playload was userID 
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user;

        next();

    } catch (error) {

        console.log("Error in protectRoute middleware", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
};