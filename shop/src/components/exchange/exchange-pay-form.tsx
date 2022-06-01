import PaymentForm from "@components/payment/payement-form";
import { useModalAction } from "@components/ui/modal/modal.context";
import { Exchange } from "@ts-types/exchanges-type";
import PaymentModalSuccess from "@components/payment/payment-modal-success";
import { useState } from "react";

const ExchangePayForm = ({ exchange }: { exchange: Exchange|undefined}) => {

  const [show, setShow] = useState(false);
  const checking = async () =>
    fetchRepair(`${exchange.ref}`)
      .then((e) => {
        if (e.exchange.status === "paid") {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => false);
  return (
    <div>
      {show && (
        <PaymentModalSuccess
          checking={checking}
          data={{ query: "exchange" }}
          message="Merci d'avoir paié la reparation de console, maintenant nous procédons au reparation"
          closeModal={() => setShow(false)}
        />
      )}
      {!show && (
        <PaymentForm
          onPaySuccess={() => {
            setShow(true);
          }}
          data={{
            action: "create_exchange_payment",
            data: { exchange_id: exchange?.id },
          }}
          amount={exchange?.amount}
        />
      )}
    </div>
  );
};

export default ExchangePayForm;
