import { ArrowNext } from "@components/icons"
import { Button } from ".."

type props = {
    setStep: (e) => {};
    setClickGamePlus: (e) => {};
}
const CheckoutStep1 = ({ setStep, setClickGamePlus }: props) => {
    return (
        <div className="mt-8 flex flex-col h-full">
            <img className="mx-auto" style={{ width: "120px" }} src="/click_games+.png" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 mx-auto"> Bénéficier des avantages ClickGamres +</h3>
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