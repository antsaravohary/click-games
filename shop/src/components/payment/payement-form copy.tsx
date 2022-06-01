import "react-credit-cards/es/styles-compiled.css";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Card from "react-credit-cards";
import { loadStripe } from "@stripe/stripe-js";
import http from "@utils/api/http";
import { useState } from "react";
import Input from "@components/ui/input";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import Button from "@components/ui/button";
import { Lock } from "@components/icons/lock";
import Checkbox from "@components/ui/checkbox/checkbox";
import usePrice from "@utils/use-price";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLIC as string
);
type Iprops = {
  amount: number;
  data: any;
  onPaySuccess?: any;
};
const StripeForm = ({ amount, data, onPaySuccess }: Iprops) => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [preview, setpreview] = useState(false);
  const [issuer, setissuer] = useState("");
  const [expire, setexpire] = useState("");
  const [name, setname] = useState("");
  const [focused, setfocused] = useState("number");
  const [futureUse, setfutureUse] = useState(false);
  const { closeModal } = useModalAction();
  8; // const {data:{refetch}}=useModalState();
  const [error, setError] = useState(null);

  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handlePay = () => {
    if (stripe) {
      setProcessing(true);
      http.post("/stripe/create/payment", { ...data }).then((response) => {
        const intent = response.data.paymentIntent;
        if (intent.last_payment_error) {
          stripe
            .confirmCardPayment(intent.client_secret, {
              payment_method: intent.last_payment_error.payment_method.id,
            })
            .then(function (result) {
              if (result.error) {
                // Show error to your customer

                setProcessing(false);
              } else {
                if (result.paymentIntent.status === "succeeded") {
                  // The payment is complete!
                  setProcessing(false);
                  onPaySuccess(response.data.stripe_session.data);
                }
              }
            });
        } else {
          setProcessing(false);
          onPaySuccess(response.data.stripe_session.data);
        }
      });
    }
  };
  const handleSubmit = async () => {
    setProcessing(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.CardNumberElement
      return;
    }

    // Pass the Element directly to other Stripe.js methods:
    // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
    const { token } = await stripe.createToken(
      elements.getElement(CardNumberElement),
      { name: name }
    );
    await http
      .post("/stripe/card/save/" + token?.id, { name: name })
      .then((response) => {
        setProcessing(false);
        //refetch();
        closeModal();
      });
  };
  const handleChange = async (event: any) => {
    // Listen for changes in the CardElement

    // and display any errors as the customer types their card details

    setDisabled(event.empty);
    if (event.brand) {
      setissuer(event.brand);
      setpreview(true);
      if (event.brand === "unknown") {
        setpreview(false);
      }
    }

    setError(event.error ? event.error.message : "");
  };
  const { price } = usePrice({
    amount: amount,
  });
  return (
    <div className="pt-8">
      <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
        <div className="w-full pt-1 pb-5">
          <div className="bg-accent text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
            <Lock width="48" heigth="48" />
          </div>
        </div>
        <div className="mb-2">
          <h1 className="text-center font-bold text-xl uppercase">
            Informations de paiement sécurisées
          </h1>
        </div>

        <div className="mb-3 text-center flex -mx-2 justify-center">
          <div className="px-2 ">
            <label
              htmlFor="type1"
              className="flex items-center text-center  cursor-pointer"
            >
              <img
                src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                className="h-8 ml-3"
              />
            </label>
          </div>
        </div>
        <Card
          name={name}
          placeholders={{ name: "NOM Prénom" }}
          number="*** **** **** ***"
          expiry="MM/AA"
          cvc="***"
          preview={preview}
          issuer={issuer}
          focused={focused}
        />
        <div className="mb-3">
          <Input
            name="name"
            label="Titulaire de la carte"
            value={name}
            variant="outline"
            onChange={(e) => setname(e.currentTarget.value)}
            onFocus={() => setfocused("name")}
            placeholder="Nom"
            className="my-2 flex-1"
          />

          <label className="font-bold text-gray-500 text-sm mb-2 ml-1">
            Information de la carte
          </label>
          <div>
            <CardNumberElement
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              onFocus={() => setfocused("number")}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 -mx-2 flex items-end">
          <div className="px-2 w-1/2">
            <CardExpiryElement
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors  flex-1"
              onChange={handleChange}
              onFocus={() => setfocused("expiry")}
            />
          </div>
          <div className="px-2 w-1/2">
            <CardCvcElement
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors  flex-1"
              onChange={handleChange}
              onFocus={() => setfocused("cvc")}
            />
          </div>
        </div>
        <Checkbox
          name="future"
          label="Enregistrer ma carte pour mes future achats"
          className="flex-1 my-4"
        />
        <div>
          <Button
            onClick={handleSubmit}
            loading={processing}
            disabled={processing}
            name="btn_save"
          >
            Payer {price}
          </Button>
        </div>
      </div>
    </div>
  );
};

const PaymentForm = (props: Iprops) => (
  <Elements stripe={stripePromise}>
    <StripeForm {...props} />
  </Elements>
);

export default PaymentForm;
