import * as yup from "yup";

export const validateCreateTodoListSchema = yup.object().shape({
  name: yup.string().required("name is required")
});
