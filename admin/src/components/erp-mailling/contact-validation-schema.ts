import * as yup from "yup";
export const ContactValidationSchema = yup.object().shape({
  name: yup.string(),
  email: yup
    .string()
    .email("form:error-email-format")
    .required("form:error-email-required"),
});
