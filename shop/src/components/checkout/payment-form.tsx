import Button from "@components/ui/button";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import { useCheckout } from "@contexts/checkout.context";
import { formatOrderedProduct } from "@utils/format-ordered-product";
import { maskPhoneNumber } from "@utils/mask-phone-number";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ValidationError from "@components/ui/validation-error";
import { ROUTES } from "@utils/routes";
import { useOrderStatusesQuery } from "@data/order/use-order-statuses.query";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useCart } from "@contexts/quick-cart/cart.context";
import {
  calculatePaidTotal,
  calculateTotal,
} from "@contexts/quick-cart/cart.utils";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useCreateStripe } from "@data/stripe/use-stripe-mutation";
import { useCustomerQuery } from "@data/customer/use-customer.query";
interface FormValues {
  email: string;
  contact: string;
}

const paymentSchema = Yup.object().shape({
  contact: Yup.string()
    .min(8, "error-min-contact")
    .required("error-contact-required"),
  email: Yup.string().email().required("error-email-required"),
});

const PaymentForm = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { mutate: createOrder, isLoading: loading } = useCreateStripe();

  const { data: userData, refetch } = useCustomerQuery();
  const { data: orderStatusData } = useOrderStatusesQuery();

  const [clientSecret, setClientSecret] = useState<string>("");
  const [error, setError] = useState<null | string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [ref, setRef] = useState<string>("");
  const stripe: any = useStripe();

  const elements: any = useElements();

  const { items } = useCart();
  const {
    billing_address,
    shipping_address,
    shipping_class,
    delivery_time,
    checkoutData,
    coupon,
    discount,
  } = useCheckout();
  const available_items = items?.filter(
    (item: any) => !checkoutData?.unavailable_products?.includes(item.id)
  );

  const subtotal = calculateTotal(available_items);
  const total = calculatePaidTotal(
    {
      totalAmount: subtotal,
      tax: checkoutData?.total_tax!,
      shipping_charge: checkoutData?.shipping_charge!,
    },
    discount
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(paymentSchema),
  });
  
  useEffect(()=>{
  setValue("contact",userData?.me?.profile?.contact);
  setValue("email",userData?.me?.email);
  },[userData]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createOrder(
      {
        products: available_items?.map((item) => formatOrderedProduct(item)),
        status: orderStatusData?.order_statuses?.data[0]?.id ?? 1,
        amount: subtotal,
        coupon_id: coupon?.id,
        discount: discount ?? 0,
        paid_total: total,
        total,
        sales_tax: checkoutData?.total_tax,
        delivery_fee: checkoutData?.shipping_charge,
        delivery_time: delivery_time?.description,
        shipping_class_id: shipping_class,
        billing_address: {
          ...(billing_address?.address && billing_address.address),
        },
        shipping_address: {
          ...(shipping_address?.address && shipping_address.address),
        },
      },
      {
        onSuccess: (data: any) => {
          setClientSecret(data.clientSecret);
          setRef(data.stripeSession.data.orderInput.ref);
        },
        onError: (error: any) => {
          console.log(error?.response?.data?.message);
        },
      }
    );
  }, []);
  async function onSubmit(values: FormValues) {
    setProcessing(true);
    let payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          address: {
            city: billing_address.address.city,
            country: "FR",
            line1: billing_address.address.street_address,
            postal_code: billing_address.address.zip,
            state: billing_address.address.state,
          },
          email: values.email,
          name: billing_address.title,
          phone: values.contact,
        },
      },
      receipt_email: values.email,
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);

      setProcessing(false);
    } else {
      setError(null);

      setProcessing(false);

      setSuccess(true);
      router.push(`${ROUTES.ORDERS}/${ref}`);
    }
  }
  if (loading) {
    return <div>Chargement ....</div>;
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col"
    >
      <Input
        {...register("contact", { required: "error-contact-required" })}
        label={t("text-enter-contact-number")}
        variant="outline"
        className="flex-1"
        onChange={(e) => setValue("contact", maskPhoneNumber(e.target.value))}
        error={t(errors?.contact?.message!)}
      />
      <div className="mt-4">
        <Label>{t("text-card-info")}</Label>

        <Input
          {...register("email")}
          className=""
          variant="outline"
          placeholder={t("text-email")}
          error={t(errors.email?.message!)}
        />
        <div className="bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent my-2">
          <CardNumberElement id="card-element" />
        </div>

        <div className="flex space-s-4 w-full">
          <CardExpiryElement id="card-element" />
          <CardCvcElement id="card-element" />
        </div>
      </div>
      {!subtotal && <ValidationError message={t("error-order-unavailable")} />}
      {total < 0 && (
        <div className="mt-3">
          <ValidationError message={t("error-cant-process-order")} />
        </div>
      )}
      <Button
        loading={processing}
        disabled={!subtotal || total < 0 || processing}
        className="w-full lg:w-auto lg:ms-auto mt-5"
      >
        {t("text-place-order")}
      </Button>
    </form>
  );
};

export default PaymentForm;
