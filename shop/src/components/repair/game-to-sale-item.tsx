import { useGameSale } from "@contexts/game-sale.context";
import usePrice, { formatToPrice } from "@utils/use-price";
const GameToSaleItem = ({ purchase_game, idx }: any) => {
  const { price } = usePrice({
    amount: purchase_game.total_price,
  });
  const {updateQuantity,deleteGame}=useGameSale();
  return (
    <div className=" flex-auto grid grid-cols-4">
      <div className="flex flex-col">
        <div className="text-sm font-medium">{purchase_game?.game?.name}</div>
        <span className="text-xs ">Prix d'achat: {formatToPrice(purchase_game?.game?.buy_price)}</span>
      </div>

      <input value={purchase_game.quantity} name="quantity" className="w-16 h-full rounded-sm border p-2" type="number"
      onChange={(e)=>updateQuantity({quantity:e.currentTarget.value,id:purchase_game.game.id})}
      />
      <div className="text-sm font-medium my-auto">{price}</div>
      <button onClick={()=>deleteGame(purchase_game.game.id)}  className="text-red-500">Supprimer</button>
    </div>
  );
};

export default GameToSaleItem;
