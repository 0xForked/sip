import * as yup from "yup";

const emailSpec = yup.string()
    .email('Must be a valid email')
    .required("Email address is required");

const passwordSpec = yup.string()
    .required("Password is required");

const loginSchema = yup.object({
    email: emailSpec,
    password: passwordSpec
}).required();

type TLoginSchema = yup.InferType<typeof loginSchema>

export {
    loginSchema,
}

export type {
    TLoginSchema,
}