import { ArrowNext } from "@components/icons/arrow-next";
import { useModalAction } from "@components/ui/modal/modal.context";

import { Button } from "..";

export default function ClickGamesPlusModal() {
    const {closeModal}=useModalAction();
    return (
        <div className=" flex flex-col h-full bg-white p-4 rounded">
            <img className="mx-auto" src="/click_games_plus_detail.png" />
            {/**<div className=" text-lg font-medium text-gray-900 mx-auto">  <AnimatePresence>
              <ClickGamePlus
                disabled={false}
                value={true}
                setValue={setClickGamePlus}
              /
            </AnimatePresence></div> */}

            <div className="mt-6 mx-auto">
                <Button onClick={() => {
                    //setClickGamePlus(true);
                    closeModal();
                    //setStep(2);
                }}>
                    <span className="mb-1">Béneficier du ClickGames+</span> <ArrowNext /></Button>
            </div>
            <div className="mt-8 ml-auto mb-0">
                <button onClick={() => {
                    //setClickGamePlus(false);
                    closeModal();
                    // setStep(2);
                }} className="border-0 text-gray-500">Ne pas bénéficier du ClickGames+</button>
            </div>
        </div>

    );
}