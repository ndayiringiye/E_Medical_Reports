import Joi from "joi";
export const signupSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().min(6).max(60).required(),
    password: Joi.string()
        .pattern(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$`))
        .required()
        .messages({
            "string.pattern.base": "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character (!@#$%^&*)."
        }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Confirm password must match password"
    })
});

export const signinSchema = Joi.object({
    email: Joi.string().email().min(6).max(60).required(),
    password: Joi.string()
        .pattern(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$`))
        .required()
        .messages({
            "string.pattern.base": "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character (!@#$%^&*)."
        }),
   
});