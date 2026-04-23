import yup, { Schema } from "yup";

export const userSchema = yup.object({
    name: yup
    .string()
    .trim()
    .min(3, "username must be atlidt of 3 charactors")
    .required(),
    email:yup
    .string()
    .email("The email is not valid one")
    .required(),
    password: yup
    .string()
    .min(4, "Password must be atlidt of 4 charactors")
    .required(),
})

export const validateUser = (schema) => async(req, res, next)=>{
    try {
        await schema.validate(req.body)
        next()
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
}