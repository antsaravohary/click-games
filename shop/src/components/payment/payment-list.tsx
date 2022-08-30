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

  cards: any;
  card_active:any;
  setCardActive:any;

};
const PaymentList = ({ cards,card_active,setCardActive }: Props) => {
  return (
    <div>
      <div className="flex justify-center my-4">
        <h1 className="text-center">
          Veuillez sélectionner  une carte pour effectuer le paiement
        </h1>
      </div>
      <div className="flex justify-center space-x-4 flex-wrap">
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
      </div>
    </div>
  );
};
export default PaymentList;
