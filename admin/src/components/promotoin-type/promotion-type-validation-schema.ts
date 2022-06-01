import * as yup from "yup";
export const PromotionTypeValidationSchema = yup.object().shape({
  title: yup.string().required("form:error-name-required"),
  description: yup.string().required("form:error-name-required"),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive("form:error-sale-price-must-positive"),
  maxProduct:yup
  .number()
  .transform((value) => (isNaN(value) ? undefined : value))
  .positive("form:error-sale-price-must-positive"),
  /*type: yup.object().required("form:error-type-required"),*/
});
