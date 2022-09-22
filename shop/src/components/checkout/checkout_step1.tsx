import { ArrowNext } from "@components/icons"
import { AnimatePresence } from "framer-motion";
import { Button } from ".."
import ClickGamePlus from "./click-game-plus.";

type props = {
    setStep: (e) => {};
    setClickGamePlus: (e) => {};
}
const CheckoutStep1 = ({ setStep, setClickGamePlus }: props) => {
    return (
        <div className="mt-8 flex flex-col h-full">
            <img className="mx-auto" style={{ width: "120px" }} src="/click_games+.png" />
            <div className=" text-lg font-medium text-gray-900 mx-auto">  <AnimatePresence>
              <ClickGamePlus
                disabled={false}
                value={true}
                setValue={setClickGamePlus}
              />
            </AnimatePresence></div>
           
            <div className="mt-6 mx-auto">
                <Button onClick={() => {
                    setClickGamePlus(true);
                    setStep(1);
                }}>
                    <span className="mb-1">Suivant</span> <ArrowNext /></Button>
            </div>
            <div className="mt-auto ml-auto mb-8">
                <button onClick={() => {
                    setClickGamePlus(false);
                    setStep(1);
                }} className="border-0 text-gray-500">Continuer sans le ClickGames+</button>
            </div>
        </div>

    )
}
export default CheckoutStep1;