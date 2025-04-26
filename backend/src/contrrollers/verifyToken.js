import jwt from "jsonwebtoken";
import { secretKey } from "../Config/jwt.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if(!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing Token" });
  }

  const [bearer, token] = authHeader.split(" ");
  if(bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Unauthorized: Invalid Token Format" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if(err) {
      return res.status(403).json({ message: "Forbidden: Invalid Token" });
    }
    req.user = user;
    next();
  })
}


export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

