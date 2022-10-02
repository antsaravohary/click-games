import Image from "next/image";
import { motion } from "framer-motion";
import { siteSettings } from "@settings/site.settings";
import Counter from "@components/ui/counter";
import { CloseIcon } from "@components/icons/close-icon";
import { fadeInOut } from "@utils/motion/fade-in-out";
import usePrice from "@utils/use-price";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/quick-cart/cart.context";
import TrashIcon from "@components/icons/icons/trash-icon";

interface CartItemProps {
  item: any;
}

const CartItem2 = ({ item }: CartItemProps) => {
  const { t } = useTranslation("common");
  const { isInStock, clearItemFromCart, addItemToCart, removeItemFromCart } =
    useCart();

  const { price } = usePrice({
    amount: item.price,
  });
  const { price: itemPrice } = usePrice({
    amount: item.itemTotal,
  });
  function handleIncrement(e: any) {
    e.stopPropagation();
    addItemToCart(item, 1);
  }
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item.id);
  };
  const outOfStock = !isInStock(item.id);
  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      variants={fadeInOut(0.25)}
      className="flex items-center py-4 px-4 sm:px-6 text-sm border-b border-solid border-border-200 border-opacity-75"
    >
      
      <div className="w-10 sm:w-16 h-10 sm:h-16 flex items-center justify-center overflow-hidden bg-gray-100 mx-4 flex-shrink-0 relative">
        <Image
          src={item?.image ?? siteSettings?.product?.placeholderImage}
          alt={item.name}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div>
        <h3 className="font-bold text-heading">{item.name}</h3>
        <div style={{backgroundColor:item?.categories[0]?.color,borderColor:item?.categories[0]?.color}} className="inline-flex shrink-0 mt-2 items-center rounded border px-2 py-1 text-xs text-light">{item?.categories[0]?.name}</div>

      </div>
      <div className="mx-auto">
        <h3 className="font-bold text-heading">Prix</h3>
        <p className="my-2.5 font-semibold text-accent">{price}</p>
      </div>
      <div className="mx-auto">
        <h3 className="font-bold text-heading">Qauntité</h3>
        <Counter
        className="my-2.5"
          value={item.quantity}
          onDecrement={handleRemoveClick}
          onIncrement={handleIncrement}
          variant="helium"
          disabled={outOfStock}
        />
      </div>
      <div className="mx-auto">
        <h3 className="font-bold text-heading">Total</h3>
        <p className=" my-2.5 font-bold text-heading">{itemPrice}</p>
      </div>

    
      <button
        className="w-7 h-7 ms-3 -me-2 flex items-center text-red-500 justify-center rounded-full text-muted transition-all duration-200 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 hover:text-red-600 focus:text-red-600"
        onClick={() => clearItemFromCart(item?.id)}
      >
        <span className="sr-only">{t("text-close")}</span>
        <TrashIcon   height="32" width="32"/>
      </button>
    </motion.div>
  );
};

export default CartItem2;
