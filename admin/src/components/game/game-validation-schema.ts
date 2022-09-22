import * as yup from "yup";
export const GameValidationSchema = yup.object().shape({
  name: yup.string().required("form:error-name-required"),
  description:yup.string().required("form:error-description-required"),
  year:yup.number().transform((value)=>(isNaN(value)?undefined:value)).required("form:error-year-required"),
  buy_price: yup
  .number()
  .typeError("form:error-price-must-number")
  .positive("form:error-price-must-positive")
  .required("form:error-price-required"),
  sale_price: yup
  .number()
  .typeError("form:error-price-must-number")
  .positive("form:error-price-must-positive")
  .required("form:error-price-required"),
});
