import * as yup from "yup";

export const shopValidationSchema = yup.object().shape({
  logo:yup.object().typeError("Logo requis!").required("Logo requis!"),
  cover_image:yup.object().typeError("Image de couverture requis!").required("Logo requis!"),
  name: yup.string().required("form:error-name-required"),
  balance: yup.object().shape({
    payment_info: yup.object().shape({
      email: yup
        .string()
        .typeError("form: error-email-string")
        .email("form:error-email-format"),
      bank:yup
      .string().required("Nom de la banque requis!"),
      account:yup 
        .string().required("Iban requis!")
      
    }),
  }),
});
