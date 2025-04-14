import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { signupSchema } from "../middleware/validator.js"; 

export const signupService = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        const { error } = signupSchema.validate({ username, email, password, confirmPassword });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ username, email, password: hashedPassword, comfirmPassword:hashedPassword });
        const result = await newUser.save();

        const userWithoutPassword = result.toObject();
        delete userWithoutPassword.password;

        return res.status(201).json({
            success: true,
            message: "User account created successfully",
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: error.message });
    }
};
