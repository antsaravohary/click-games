import Counter from "@components/ui/counter";
import AddToCartBtn from "@components/product/add-to-cart/add-to-cart-btn";
import { cartAnimation } from "@utils/cart-animation";
import { useCart } from "@contexts/quick-cart/cart.context";
import { generateCartItem } from "@contexts/quick-cart/generate-cart-item";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useCustomerQuery } from "@data/customer/use-customer.query";

interface Props {
  data: any;
  variant?: "helium" | "neon" | "argon" | "oganesson" | "single" | "big";
  counterVariant?:
  | "helium"
  | "neon"
  | "argon"
  | "oganesson"
  | "single"
  | "details";
  counterClass?: string;
  variation?: any;
  disabled?: boolean;
  isCard: boolean;
}

export const AddToCart = ({
  data,
  variant = "helium",
  counterVariant,
  counterClass,
  variation,
  disabled,
  isCard = false,
}: Props) => {
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart,
  } = useCart();
  const { openModal } = useModalAction();
  const { data: dataMe } = useCustomerQuery();
  const item = generateCartItem(
    data,
    variation,
    true
  );
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {

    e.stopPropagation();
    if (isCard && data.product_type !== "simple") {
      openModal("PRODUCT_DETAILS", data.slug);
    } else {
      const ReactPixel = require("react-facebook-pixel").default;
      ReactPixel.trackSingle(
        `${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL}`,
        "AddToCart",
        { content_name: item.name, currency: "EUR", value: item.price }
      );
      addItemToCart(item, 1);

      if (!isInCart(item.id)) {
        cartAnimation(e);
      }
    }
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item.id);
  };
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);
  return !isInCart(item?.id) ? (
    <AddToCartBtn
      disabled={disabled || outOfStock}
      variant={variant}
      pre_order={item?.pre_order}
      onClick={handleAddClick}
    />
  ) : (
    <>
      <Counter
        value={getItemFromCart(item.id).quantity}
        onDecrement={handleRemoveClick}
        onIncrement={handleAddClick}
        variant={counterVariant ? counterVariant : variant}
        className={counterClass}
        disabled={outOfStock}
      />
    </>
  );
};
