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
import axios from "axios";
import Payment3Dsecure from "./payment-3dsecure";
import { apiBaseUrl } from "next-auth/client/_utils";
import { Dialog, Transition } from "@headlessui/react";
import ModalP from "./paymentModal";

type Iprops = {
  amount: number;
  data: any;
  onPaySuccess?: any;
  click_game_plus?: boolean;
};
const StripeForm = ({ amount, data, onPaySuccess, click_game_plus }: Iprops) => {
  const [future_use, setFutureUse] = useState(false);

  const [preview, setpreview] = useState(false);
  const [issuer, setissuer] = useState("");
  const [name, setname] = useState("SOANY");
  const [focused, setfocused] = useState("number");
  const [error, setError] = useState<string | null>(null);
  const [errorCard, setErrorCard] = useState<string | null>(null);
  const [newCard, setNewCard] = useState<boolean>(true);
  const [card_active, setCardActive] = useState<string | undefined>();
  const [cardInput, setCardInput] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    focus: "",
  });
  const [response, setResponse] = useState({});
  const {
    data: cards,
    isLoading: fetchingCard,
    isFetching,
    refetch,
  } = useStripeCardsQuery();
  const [processing, setProcessing] = useState(false);
  const [auth, setAuth] = useState(false);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (cards) {
      setNewCard(!cards.length);
    }
  }, [cards]);
  const { openModal } = useModalAction();
  const handleInputFocus = (e) => {

    setCardInput({ ...cardInput, focus: e.target.name });
  }
  const handleInputChange = (e) => {
    switch (e.name) {
      case "cardNumber":

        break;

      default:
        break;
    }
  }
  const handlePay = () => {
    setProcessing(true);
    http.post("/sherlocks/payment-product", { ...cardInput, data: { ...data, clickGamePlus: true } }).then((response) => {
      setResponse(response.data);
      switch (response.data["status"]) {
        case "failed":
          console.log("failed", response.data["msg"]);
        case "redirect_3dsecure":
          setAuth(true);
          break;

        default:
        
          break;
      }
      /* setAuth(true);
       */
    }
    ).catch((err) => console.error(err))
    console.log("test", { ...cardInput, ...data });
  }
  const { price } = usePrice({
    amount: amount,
  });
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
              number={cardInput.cardNumber}
              expiry={cardInput.cardExpiry}
              cvc={cardInput.cardCvc}
              preview={false}
              issuer={issuer}
              focused={focused}
            />
            <div className="mb-3">
              <Input
                disabled={processing}
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
                <Input
                  disabled={processing}
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  onFocus={() => setfocused("number")}
                  placeholder="Numéro de carte"
                  name="cardNumber"
                  value={cardInput.cardNumber}
                  onChange={(e) => setCardInput({ ...cardInput, cardNumber: e.target.value })}
                />
              </div>
            </div>
            <div className="mb-3 -mx-2 flex items-end">
              <div className="px-2 w-1/2">
                <Input
                  disabled={processing}
                  value={cardInput.cardExpiry}
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors  flex-1"
                  name="CardExpiry"
                  placeholder="Date d’éxpiration"
                  onChange={(e) => setCardInput({ ...cardInput, cardExpiry: e.target.value })}
                  onFocus={() => setfocused("expiry")}
                />
              </div>
              <div className="px-2 w-1/2">
                <Input
                  disabled={processing}
                  name="cardCvc"
                  placeholder="code cvc"
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors  flex-1"
                  onChange={(e) => setCardInput({ ...cardInput, cardCvc: e.target.value })}
                  value={cardInput.cardCvc}
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
      {auth && <Payment3Dsecure url={response.url}/>}
    </div >
  );
};

const PaymentForm = (props: Iprops) => (
  <StripeForm {...props} />
);

export default PaymentForm;
