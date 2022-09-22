import { ProductType } from "@ts-types/generated";
import * as yup from "yup";

export const productValidationSchema = yup.object().shape({
  name: yup.string().required("form:error-name-required"),
  productTypeValue: yup.object().required("form:error-product-type-required"),
  product_condition:yup.mixed().when('is_used',{
    is:true,
    then: yup.object().required("Condition du produit requis!"),
    otherwise: yup.object().nullable(true)
  }),
  sku: yup.mixed().when("productTypeValue", {
    is: (productType: {
      name: string;
      value: string;
      [key: string]: unknown;
    }) => productType?.value === ProductType.Simple,
    then: yup.string().nullable().required("form:error-sku-required"),
  }),
  categories: yup.array().min(1, "Catégories requis!"),
  tags: yup.array().min(1, "Mots clés requis!"),
  price: yup.mixed().when("productTypeValue", {
    is: (productType: {
      name: string;
      value: string;
      [key: string]: unknown;
    }) => productType?.value === ProductType.Simple,
    then: yup
      .number()
      .typeError("form:error-price-must-number")
      .positive("form:error-price-must-positive")
      .required("form:error-price-required"),
  }),
  discount: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value)),
  /*sale_price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .moreThan(yup.ref("price"), "La remise doit être inferieur à ${more}")
    .positive("form:error-sale-price-must-positive"),*/
  quantity: yup.mixed().when("productTypeValue", {
    is: (productType: {
      name: string;
      value: string;
      [key: string]: unknown;
    }) => productType?.value === ProductType.Simple,
    then: yup
      .number()
      .typeError("form:error-quantity-must-number")
      .positive("form:error-quantity-must-positive")
      .integer("form:error-quantity-must-integer")
      .required("form:error-quantity-required"),
  }),
  /*type: yup.object().nullable().required("form:error-type-required"),*/
  status: yup.string().required("form:error-status-required"),
  variation_options: yup.array().of(
    yup.object().shape({
      price: yup
        .number()
        .typeError("form:error-price-must-number")
        .positive("form:error-price-must-positive")
        .required("form:error-price-required"),
      discount: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value)),
      /* sale_price: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .lessThan(yup.ref("price"), "Sale Price should be less than ${less}")
        .positive("form:error-sale-price-must-positive"),*/
      quantity: yup
        .number()
        .typeError("form:error-quantity-must-number")
        .positive("form:error-quantity-must-positive")
        .integer("form:error-quantity-must-integer")
        .required("form:error-quantity-required"),
      sku: yup.string().required("form:error-sku-required"),
    })
  ),
});
