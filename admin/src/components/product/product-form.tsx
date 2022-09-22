import Input from "@components/ui/input";
import dayjs from "dayjs";
import TextArea from "@components/ui/text-area";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@components/ui/button";
import Description from "@components/ui/description";
import Card from "@components/common/card";
import Label from "@components/ui/label";
import Radio from "@components/ui/radio/radio";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import FileInput from "@components/ui/file-input";
import { productValidationSchema } from "./product-validation-schema";
import groupBy from "lodash/groupBy";
import ProductVariableForm from "./product-variable-form";
import ProductSimpleForm from "./product-simple-form";
import ProductCategoryInput from "./product-category-input";
import orderBy from "lodash/orderBy";
import sum from "lodash/sum";
import cloneDeep from "lodash/cloneDeep";
import ProductTypeInput from "./product-type-input";
import ProductConditionInput, {
  productConditions,
} from "./product-condition-input";

import {
  Type,
  ProductType,
  Category,
  AttachmentInput,
  ProductStatus,
  Product,
  VariationOption,
  Tag,
} from "@ts-types/generated";
import { useCreateProductMutation } from "@data/product/product-create.mutation";
import { useTranslation } from "next-i18next";
import { useUpdateProductMutation } from "@data/product/product-update.mutation";
import { useShopQuery } from "@data/shop/use-shop.query";
import ProductTagInput from "./product-tag-input";
import Alert from "@components/ui/alert";
import { useEffect, useState } from "react";
import { animateScroll } from "react-scroll";
import Editor from "@components/form/Editor";
import Checkbox from "@components/ui/checkbox/checkbox";
import { useQuery } from "react-query";
import http from "@utils/api/http";
import { useProductSKU } from "@data/product/product-generate-sku.query";

type Variation = {
  formName: number;
};

type FormValues = {
  ref: string;
  pre_order: boolean;
  release_date: Date;
  note_admin:number;
  sku: string;
  name: string;
  type: Type;
  product_type: ProductType;
  description: string;
  unit: string;
  price: number;
  min_price: number;
  max_price: number;
  sale_price: number;
  discount: number;
  is_used: boolean;
  click_collect: boolean;
  quantity: number;
  categories: Category[];
  tags: Tag[];
  in_stock: boolean;
  is_taxable: boolean;
  image: AttachmentInput;
  gallery: AttachmentInput[];
  status: ProductStatus;
  width: string;
  height: string;
  length: string;
  weight: number;
  isVariation: boolean;
  variations: Variation[];
  variation_options: Product["variation_options"];
  [key: string]: any;
};
const defaultValues = {
  ref: "",
  pre_order: false,
  release_date:"",
  note_admin:"",
  sku: "",
  name: "",
  type: "",
  productTypeValue: { name: "Simple Product", value: ProductType.Simple },
  description: "",
  unit: "",
  price: "",
  discount: 0.0,
  min_price: 0.0,
  max_price: 0.0,
  sale_price: "",
  is_used: false,
  click_collect: false,
  quantity: "",
  categories: [],
  tags: [],
  in_stock: true,
  is_taxable: false,
  image: [],
  gallery: [],
  status: ProductStatus.Publish,
  width: "",
  height: "",
  length: "",
  weight: null,
  isVariation: false,
  variations: [],
  variation_options: [],
  count: 0,
};

type IProps = {
  initialValues?: Product | null;
  copy?: boolean;
};

const productType = [
  { name: "Simple Product", value: ProductType.Simple },
  { name: "Variable Product", value: ProductType.Variable },
];
function getFormattedVariations(variations: any) {
  const variationGroup = groupBy(variations, "attribute.slug");
  return Object.values(variationGroup)?.map((vg) => {
    return {
      attribute: vg?.[0]?.attribute,
      value: vg?.map((v) => ({ id: v.id, value: v.value })),
    };
  });
}

function processOptions(options: any) {
  try {
    return JSON.parse(options);
  } catch (error) {
    return options;
  }
}

function calculateMaxMinPrice(variationOptions: any) {
  if (!variationOptions || !variationOptions.length) {
    return {
      min_price: null,
      max_price: null,
    };
  }
  const sortedVariationsByPrice = orderBy(variationOptions, ["price"]);
  const sortedVariationsBySalePrice = orderBy(variationOptions, ["sale_price"]);
  return {
    min_price:
      sortedVariationsBySalePrice?.[0].sale_price <
      sortedVariationsByPrice?.[0]?.price
        ? Number(sortedVariationsBySalePrice?.[0].sale_price)
        : Number(sortedVariationsByPrice?.[0]?.price),
    max_price: Number(
      sortedVariationsByPrice?.[sortedVariationsByPrice?.length - 1]?.price
    ),
  };
}

function calculateQuantity(variationOptions: any) {
  return sum(
    variationOptions?.map(({ quantity }: { quantity: number }) => quantity)
  );
}
export default function CreateOrUpdateProductForm({
  initialValues,
  copy = false,
  sku,
}: IProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [description, setDescription] = useState(initialValues?.description);
  const { t } = useTranslation();
  const { data: shopData } = useShopQuery(router.query.shop as string, {
    enabled: !!router.query.shop,
  });
  const shopId = shopData?.shop?.id!;
  const methods = useForm<FormValues>({
    resolver: yupResolver(productValidationSchema),
    shouldUnregister: true,
    //@ts-ignore
    defaultValues: initialValues
      ? cloneDeep({
          ...initialValues,
          remise: initialValues.sale_price
            ? initialValues.price - initialValues.sale_price
            : null,
          type_id: 1,
          sku:copy?sku:initialValues.sku,
          release_date:dayjs(initialValues.release_date).format("YYYY-MM-DD"),
          isVariation:
            initialValues.variations?.length &&
            initialValues.variation_options?.length
              ? true
              : false,
          product_condition: initialValues.product_condition
            ? productConditions.find(
                (pc) => initialValues.product_condition === pc.value
              )
            : null,
          productTypeValue: initialValues.product_type
            ? productType.find(
                (type) => initialValues.product_type === type.value
              )
            : productType[0],
          variations: getFormattedVariations(initialValues?.variations),
        })
      : {...defaultValues,sku:sku},
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = methods;

  const { mutate: createProduct, isLoading: creating } =
    useCreateProductMutation();
  const { mutate: updateProduct, isLoading: updating } =
    useUpdateProductMutation();
  const onSubmit = async (values: FormValues) => {
    const { type } = values;
    const inputValues: any = {
      description: description,
      height: values.height,
      note_admin:values.note_admin,
      length: values.length,
      mode: "shop-product",
      name: values.name,
      ref: values.ref,
      is_used: values.is_used,
      product_condition: values.is_used
        ? values.product_condition.value
        : "new",
      pre_order: values.pre_order,
      release_date: values.release_date,
      click_collect: values.click_collect,
      sku: values.sku,
      weight: values.weight,
      status: values.status,
      unit: values.unit,
      width: values.width,
      quantity:
        values?.productTypeValue?.value === ProductType.Simple
          ? values?.quantity
          : calculateQuantity(values?.variation_options),
      product_type: values.productTypeValue?.value,
      type_id: 1 /*type?.id*/,
      ...(initialValues
        ? { shop_id: initialValues?.shop_id }
        : { shop_id: Number(shopId) }),
      price: Number(values.price),
      discount: values.discount ? Number(values.discount) : 0,
      categories: values?.categories?.map(({ id }: any) => id),
      tags: values?.tags?.map(({ id }: any) => id),
      image: {
        thumbnail: values?.image?.thumbnail,
        original: values?.image?.original,
        id: values?.image?.id,
      },
      gallery: values.gallery?.map(({ thumbnail, original, id }: any) => ({
        thumbnail,
        original,
        id,
      })),
      ...(productTypeValue?.value === ProductType.Variable && {
        variations: values?.variations?.flatMap(({ value }: any) =>
          value?.map(({ id }: any) => ({ attribute_value_id: id }))
        ),
      }),
      ...(productTypeValue?.value === ProductType.Variable
        ? {
            variation_options: {
              upsert: values?.variation_options?.map(
                ({ options, ...rest }: any) => ({
                  ...rest,
                  options: processOptions(options).map(
                    ({ name, value }: VariationOption) => ({
                      name,
                      value,
                    })
                  ),
                })
              ),
              delete: initialValues?.variation_options
                ?.map((initialVariationOption) => {
                  const find = values?.variation_options?.find(
                    (variationOption) =>
                      variationOption?.id === initialVariationOption?.id
                  );
                  if (!find) {
                    return initialVariationOption?.id;
                  }
                })
                .filter((item) => item !== undefined),
            },
          }
        : {
            variations: [],
            variation_options: {
              upsert: [],
              delete: initialValues?.variation_options?.map(
                (variation) => variation?.id
              ),
            },
          }),
      ...calculateMaxMinPrice(values?.variation_options),
    };

    if (initialValues && !copy) {
      updateProduct(
        {
          variables: {
            id: initialValues.id,
            input: inputValues,
          },
        },
        {
          onError: (error: any) => {
            Object.keys(error?.response?.data).forEach((field: any) => {
              setError(field, {
                type: "manual",
                message: error?.response?.data[field][0],
              });
            });
          },
        }
      );
    } else {
      createProduct(
        {
          ...inputValues,
        },
        {
          onError: (error: any) => {
            if (error?.response?.data?.message) {
              setErrorMessage(error?.response?.data?.message);
              animateScroll.scrollToTop();
            } else {
              Object.keys(error?.response?.data).forEach((field: any) => {
                setError(field, {
                  type: "manual",
                  message: error?.response?.data[field][0],
                });
              });
            }
          },
        }
      );
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const productTypeValue = watch("productTypeValue");
  const preOrderValue = watch("pre_order");
  const is_used = watch("is_used");
/*const image=watch("image");
  const gallery=watch("gallery");*/
  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t("form:featured-image-title")}
              details={t("form:featured-image-help-text")}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <FileInput name="image" control={control} multiple={false} />
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t("form:gallery-title")}
              details={t("form:gallery-help-text")}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <FileInput name="gallery" control={control} />
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t("form:type-and-category")}
              details={t("form:type-and-category-help-text")}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              {/**<ProductGroupInput
                control={control}
                error={t((errors?.type as any)?.message)}
              /> */}
              <ProductCategoryInput control={control} setValue={setValue} />
              <ProductTagInput control={control} setValue={setValue} />
            </Card>
          </div>

          <div className="flex flex-wrap my-5 sm:my-8">
            <Description
              title={t("form:item-description")}
              details={`${
                initialValues
                  ? t("form:item-description-edit")
                  : t("form:item-description-add")
              } ${t("form:product-description-help-text")}`}
              className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t("form:input-label-name")}*`}
                {...register("name")}
                error={t(errors.name?.message!)}
                variant="outline"
                className="mb-5"
              />

              {/** <Input
                label={`${t("form:input-label-unit")}*`}
                {...register("unit")}
                error={t(errors.unit?.message!)}
                variant="outline"
                className="mb-5"
              />*/}
              <Checkbox
                label={`${t("form:input-label-pre_order")}`}
                {...register("pre_order")}
                error={t(errors.pre_order?.message!)}
                className="mb-5"
              />
       
                <Input
                  label={`${t("form:input-label-release_date")}`}
                  {...register("release_date")}
                  error={t(errors.release_date?.message!)}
                  type="date"
                  variant="outline"
                  className="mb-5"
                />
              

              <Checkbox
                label="Produit d'occasion"
                {...register("is_used")}
                error={t(errors.occasion?.message!)}
                className="mb-5"
              />
              {!!is_used && (
                <ProductConditionInput control={control} setValue={setValue} />
              )}
              <Checkbox
                label={`${t("form:input-label-click_collect")}`}
                {...register("click_collect")}
                error={t(errors.click_collect?.message!)}
                className="mb-5"
              />
               <Input
                label={`${t("form:input-label-note-admin")}`}
                {...register("note_admin")}
                error={t(errors.note_admin?.message!)}
                variant="outline"
                className="mb-5"
              />
              <Editor
                name="description"
                value={description}
                onChange={(e: any) => {
                  setDescription(e);
                }}
                editorLoaded={editorLoaded}
              />

              {/**  <TextArea
                label={t("form:input-label-description")}
              
                error={t(errors.description?.message!)}
                variant="outline"
                className="mb-5"
              />*/}
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title={t("form:form-title-product-type")}
              details={t("form:form-description-product-type")}
              className="w-full px-0 sm:pr-4 md:pr-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />

            <ProductTypeInput />
          </div>

          {/* Simple Type */}
          {productTypeValue?.value === ProductType.Simple && (
            <ProductSimpleForm
              setValue={setValue}
              watch={watch}
              initialValues={initialValues}
            />
          )}

          {/* Variation Type */}
          {productTypeValue?.value === ProductType.Variable && (
            <ProductVariableForm
              shopId={shopId}
              initialValues={initialValues}
            />
          )}

          <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
            <Description
              title="Statuts"
              details=""
              className="w-full px-0 sm:pr-4 md:pr-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
            />
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <div>
                <Label>{t("form:input-label-status")}</Label>
                <Radio
                  {...register("status")}
                  label={t("form:input-label-published")}
                  id="published"
                  value="publish"
                  className="mb-2"
                />
                <Radio
                  {...register("status")}
                  id="draft"
                  label={t("form:input-label-draft")}
                  value="draft"
                />
              </div>
            </Card>
          </div>
          <div className="mb-4 text-end">
            {initialValues && (
              <Button
                variant="outline"
                onClick={router.back}
                className="me-4"
                type="button"
              >
                {t("form:button-label-back")}
              </Button>
            )}
            <Button loading={updating || creating}>
              {initialValues && !copy
                ? t("form:button-label-update-product")
                : t("form:button-label-add-product")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
