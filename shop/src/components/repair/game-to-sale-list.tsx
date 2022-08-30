import { useModalAction } from "@components/ui/modal/modal.context";
import { useGameSale } from "@contexts/game-sale.context";
import { formatToPrice } from "@utils/use-price";
import { Key } from "react";
import { Button, Input } from "..";
import GameToSaleItem from "./game-to-sale-item";

const GameToSaleList = () => {
  const { openModal } = useModalAction();
  const { purchase_games, amount, total_amount,setStep } = useGameSale();
  return (
    <>
      <Button size="small" onClick={() => openModal("GAME_SALE_ADD_FORM")}>
        <span className="text-lg mr-2">+</span> Ajouter un jeux
      </Button>
      <section aria-labelledby="cart-heading mt-5">
        <h2 id="cart-heading" className="mt-5">
          Vos jeux à vendre
        </h2>

        <ul
          role="list"
          className="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8"
        >
          {purchase_games.map((purchase_game: any, idx: any) => (
            <li
              key={purchase_game.game.id}
              className="py-8 flex text-sm sm:items-center"
            >
              <GameToSaleItem purchase_game={purchase_game} idx={idx} />
            </li>
          ))}
        </ul>
        <div className="mt-10 ">
            <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="sr-only">Gain à gander</h2>

              <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200">
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">TOTAL</dt>
                    <dd className="text-base font-medium text-gray-900">{formatToPrice(total_amount)}</dd>
                  </div>
                </dl>
              </div>
            </div>
           
            {purchase_games.length ? (
          <div className="flex justify-center">
            <Button onClick={()=>setStep(2)} className="mt-5 w-full">Suivant</Button>
          </div>
        ):null}
          </div>

      </section>
    </>
  );
};
export default GameToSaleList;
