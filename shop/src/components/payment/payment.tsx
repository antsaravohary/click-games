import { useStripeCardsQuery } from "@data/stripe/use-stripe-cards.query";
import Loader from "@components/ui/loaders/spinner/spinner";
import PaymentCard from "./payment-card";

const Payment = () => {
  const {
    data: cards,
    isLoading: fetchingCard,
    isFetching,
    isRefetching,
    refetch,
  } = useStripeCardsQuery();
  return (
    <div className="flex flex-col items-center justify-between mb-5 md:mb-8">
      <p className="text-lg lg:text-xl text-heading">Mes cartes</p>
      <div className="flex mt-8 space-x-4">
        {fetchingCard||isRefetching?<Loader simple={true} className="h-8 w-8" text="Chargement ..."/>:<>
        {cards.map(card=>(
            <PaymentCard
            active={false}
            color={""}
            key={card.id}
            id={card.id}
            cardType={card.card.brand}
            name={card.billing_details.name}
            lastFourDigit={card.card.last4}
            expire={`${card.card.exp_month}/${card.card.exp_year}`}
            onClick={() => {}}
          />
        ))}
        </>}
      </div>
    </div>
  );
};

export default Payment;
