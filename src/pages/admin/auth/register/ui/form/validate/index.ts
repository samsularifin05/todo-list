import * as yup from "yup";

export const validateRegisterScema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().required("email is required"),
  password: yup.string().required("Password is required")
});
