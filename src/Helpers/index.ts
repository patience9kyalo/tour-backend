import Joi from "joi";


export const RegisterSchema = Joi.object({
    Name:Joi.string().required(),
    Email:Joi.string().required().email(),
    Password:Joi.string().required().pattern(
        new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    )
})