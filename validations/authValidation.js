import yup from "yup";

export const register = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(3).max(12).required()
});

export const login = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(3).max(12).required()
});