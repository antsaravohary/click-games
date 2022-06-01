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
  data: any;
  onPaySuccess?: any;
};
const PaymentGroup = ({ amount, data, onPaySuccess }: Props) => {
  const {
    data: cards,
    isLoading: fetchingCard,
    isFetching,
    refetch,
  } = useStripeCardsQuery();
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
      http
        .post("/stripe/create/payment", { ...data, payment_id: card_active })
        .then((response) => {
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
  return (
    <div>
      <div className="flex justify-center my-4">
        <h1 className="text-center">
          Veuillez selectioner une carte pour effectuer le paiement
        </h1>
      </div>
      {fetchingCard || isFetching ? (
        <div className="justify-center">Chargement ...</div>
      ) : (
        <div className="flex justify-center flex-wrap">
          {!fetchingCard &&
            cards &&
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
                openModal("STRIPE_PAYMENT_FORM", { refetch });
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
