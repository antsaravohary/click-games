import PaymentForm from "@components/payment/payement-form";
import { useModalAction } from "@components/ui/modal/modal.context";
import { repair } from "@ts-types/repairs-type";
import { fetchRepair } from "@data/repair/use-repair.query";
import PaymentModalSuccess from "@components/payment/payment-modal-success";
import { useState } from "react";

const RepairPayForm = ({ repair }: { repair: repair }) => {

  const [show, setShow] = useState(false);
  const checking = async () =>
    fetchRepair(`${repair.ref}`)
      .then((e) => {
        if (e.repair.status === "paid") {
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
          data={{ query: "repair" }}
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
            action: "create_repair_payment",
            data: { repair_id: repair.id },
          }}
          amount={repair.total_amount}
        />
      )}
    </div>
  );
};

export default RepairPayForm;
