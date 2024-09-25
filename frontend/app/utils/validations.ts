import { mixed, object, string } from "yup";

export const LoginSchema = object({
  email: string().email().required().label("Email"),
  password: string().required().label("Password").min(8),
});

export const RegisterSchema = LoginSchema.shape({
  username: string().required().label("Username").min(3),
});

export const ContactSchema = object({
  firstName: string().required().label("First Name"),
  lastName: string().required().label("Last Name"),
  email: string()
    .email()
    .required()
    .label("Email")
    .transform((value) => value.toLowerCase()),
  phone: string().required().label("Phone"),
  image: mixed<File>().required().label("Image"),
});
export const UpdateContactSchema = ContactSchema.shape({
  image: mixed<File>().label("Image").nullable(),
});
