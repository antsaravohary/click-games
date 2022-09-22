import * as yup from "yup";
export const FaqValidationSchema = yup.object().shape({
  subject: yup.string().required("form:error-name-required"),
  content: yup.string().required("form:error-name-required"),
 /* items:yup.array().of(
    yup.object().shape({
     title: yup.string().required("form:error-name-required"),
     content: yup.string().required("form:error-name-required"),

    })
  )*/
  /*type: yup.object().nullable().required("form:error-type-required"),*/
});
