import { PlusIcon } from "@components/icons/plus-icon";
import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useStripeCardsQuery } from "@data/stripe/use-stripe-cards.query";
import { useStripe } from "@stripe/react-stripe-js";
import http from "@utils/api/http";
import usePrice from "@utils/use-price";
import { useState } from "react";
import PaymentCard from "./payment-card";
type Props = {
  amount: number;
  type: string;
  data: any;
  onPaySuccess?: any;
  onCardAdd?: any;
};
const PaymentGroup = ({
  amount,
  data,
  onPaySuccess,
  type = "simple",
  onCardAdd,
}: Props) => {
  const { data: cards, isLoading: fetchingCard } = useStripeCardsQuery();
  const { openModal } = useModalAction();
  const [card_active, setCardActive] = useState<string | undefined>();
  const [processing, setProcessing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const { price } = usePrice({
    amount: amount,
  });
  const handlePay = () => {
    if (stripe) {
      setProcessing(true);
      if (type === "simple") {
        http
          .post("/stripe/create/payment", { ...data, payment_id: card_active })
          .then((response) => {
            const intent = response.data;
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
                      setTimeout(function () {
                        setProcessing(false);
                        onPaySuccess();
                      }, 5000);
                    }
                  }
                });
            } else {
              setProcessing(false);
              onPaySuccess();
            }
          });
      } else if (type === "subscription") {
        http
          .post("/stripe/subscription/price_1IPSWsEUJvTca8P50CGDcYNO", {
            ...data,
            payment_id: card_active,
          })
          .then((response) => {
            const subscription = response.data;
            stripe
              .confirmCardPayment(
                subscription.latest_invoice.payment_intent.client_secret,
                {
                  payment_method: subscription.default_payment_method,
                }
              )
              .then(function (result) {
                if (result.error) {
                  // Show error to your customer

                  setProcessing(false);
                } else {
                  if (result.paymentIntent.status === "succeeded") {
                    // The payment is complete!
                    setProcessing(false);
                    onPaySuccess();
                  }
                }
              });
          });
      }
    }
  };
  return (
    <div>
      <div className="flex justify-center my-4">
        <h1 className="text-center">
          Veuillez selectioner une carte pour effectuer le paiement
        </h1>
      </div>
      {fetchingCard ? (
        <div className="justify-center">Chargement ...</div>
      ) : (
        <div className="flex justify-center flex-wrap">
          {cards &&
            cards.map((card: any) => (
              <PaymentCard
                active={card_active === card.id}
                color={""}
                key={card.id}
                id={card.id}
                cardType={card.card.brand}
                name={card.billing_details.name}
                lastFourDigit={card.card.last4}
                expire={`${card.card.exp_month}/${card.card.exp_year}`}
                onClick={() => setCardActive(card.id)}
              />
            ))}
          <div className="space-y-16 m-2">
            <Button
              className="w-52 h-32  rounded-xl relative shadow-2xl transition-transform transform  hover:scale-105 cursor-pointer "
              onClick={() => {
                openModal("STRIPE_PAYMENT_FORM", { onCardAdd });
              }}
            >
              <div className="flex-col  align-center flex justify-center items-center content-center">
                <PlusIcon width="64" height="64" />
                <h1>Nouvelle carte</h1>
              </div>
            </Button>
          </div>
        </div>
      )}
      <div className="flex justify-center my-4">
        {card_active && (
          <Button loading={processing} onClick={handlePay}>
            Payer {price}
          </Button>
        )}
      </div>
    </div>
  );
};
export default PaymentGroup;
