import { CoreApi } from "@utils/api/core.api";
import http from "@utils/api/http";
import Script from "next/script";
import Card from "react-credit-cards";
import Input from "@components/ui/input";
import Loader from "@components/ui/loaders/spinner/spinner";
import Button from "@components/ui/button";
import { Lock } from "@components/icons/lock";
import Checkbox from "@components/ui/checkbox/checkbox";
import usePrice from "@utils/use-price";
import { useEffect, useState } from "react";
import "react-credit-cards/es/styles-compiled.css";
import { useModalAction } from "@components/ui/modal/modal.context";
const SecurionPayForm = ({
  data,
  onPaySuccess,
  click_game_plus,
  amount,
}: any) => {
  const Securionpay: any = window ? window?.Securionpay : undefined;

  const [future_use, setFutureUse] = useState(false);
  const [preview, setpreview] = useState(false);
  const [issuer, setissuer] = useState("");
  const [cardInput, setCardInput] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const [name, setname] = useState("");
  const [focused, setfocused] = useState("number");
  const [error, setError] = useState<string | null>(null);
  const [errorCard, setErrorCard] = useState<string | null>(null);
  const [newCard, setNewCard] = useState<boolean>(true);
  const [card_active, setCardActive] = useState<string | undefined>();
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handleChange = async (e) => {
    const { name, value } = e.currentTarget;
    console.log(e.currentTarget);
    setCardInput({ ...cardInput, [name]: value });
    console.log(cardInput);
  };

  const { openModal } = useModalAction();
  useEffect(() => {
    if (error) {
      openModal("PAYMENT_ERROR", { message: error });
    }
  }, [error]);
  useEffect(() => {
    if (Securionpay) {
      Securionpay.setPublicKey("pk_test_IDcYRASpgOC8I98AZTzsUJ95");
    }
  });
  const showButtonPay = () => {
    if (false) {
      if (!newCard) {
        return card_active ? true : false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const { price } = usePrice({
    amount: amount,
  });
  const pay = () => {
    // e.preventDefault();
    setProcessing(true);
    setDisabled(true);
    var form = window.document.getElementById("payment-form");
    Securionpay.createCardToken(form, (t: any) => {
      if (t.error) {
        setError(t.error.message);
        setProcessing(false);
        setDisabled(false);
      } else {
        Securionpay?.verifyThreeDSecure(
          {
            amount: data?.data?.orderInput?.total * 100,
            currency: "EUR",
            card: t.id,
          },
          (token: any) => {
            if (token.error) {
              setError(token.error.message);
              setProcessing(false);
              setDisabled(false);
            } else {
              http
                .post("/securion-pay/payment/" + token.id, {
                  ...data,
                })
                .then((response) => {
                  console.log(response);
                  setProcessing(false);
                  setDisabled(false);
                });
            }
          }
        );
      }
    });
  };
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
            {newCard && "Informations de paiement sécurisées"}
          </h1>
        </div>
        <>
          {" "}
          <form onSubmit={pay} method="post" id="payment-form">
            <div className="mb-3 text-center flex -mx-2 justify-center">
              <div className="px-2 ">
                <label
                  htmlFor="type1"
                  className="flex items-center text-center  cursor-pointer"
                >
                  <img src="/card.png" className="h-8 ml-3" />
                </label>
              </div>
            </div>
            <Card
              name={name}
              placeholders={{ name: "NOM Prénom" }}
              number={cardInput.number}
              expiry={cardInput.expiry}
              cvc={cardInput.cvc}
              preview={preview}
              focused={focused}
            />
            <div className="mb-3">
              <Input
                name="name"
                label="Titulaire de la carte"
                value={name}
                variant="outline"
                onChange={handleChange}
                onFocus={() => setfocused("name")}
                placeholder="Nom"
                className="my-2 flex-1"
              />

              <label className="font-bold text-gray-500 text-sm mb-2 ml-1">
                Informations de la carte
              </label>
              <div>
                <input
                  type="text"
                  size={20}
                  data-securionpay="number"
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  onFocus={() => setfocused("number")}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 -mx-2 flex items-end">
              <div className="px-2 w-1/2">
                <input
                  type="text"
                  size={2}
                  data-securionpay="expMonth"
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors  flex-1"
                  onChange={handleChange}
                  onFocus={() => setfocused("expiry")}
                />
                <input
                  type="text"
                  size={4}
                  data-securionpay="expYear"
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors  flex-1"
                  onChange={handleChange}
                  onFocus={() => setfocused("expiry")}
                />
              </div>
              <div className="px-2 w-1/2">
                <input
                  type="text"
                  size={4}
                  data-securionpay="cvc"
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
          </form>
        </>

        {showButtonPay() && (
          <div>
            <Button
              className="w-full flex-1 mt-4"
              onClick={pay}
              /*  loading={processing}*/
              //  disabled={processing}
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

export default SecurionPayForm;
