
import { ShoppingBagIcon } from "@components/icons/shopping-bag-icon";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useUI } from "@contexts/ui.context";
import usePrice from "@utils/use-price";
import Image from "next/image";

const CartCounterTop = () => {
    const { totalUniqueItems, total } = useCart();
    const { openSidebar, setSidebarView } = useUI();
    const { price: totalPrice } = usePrice({
      amount: total,
    });
    return (<>
        <div className="flow-root">
            <a href="#" onClick={()=>openSidebar()} className="group -m-2 p-2 flex items-center">
               <ShoppingBagIcon

                    className="flex-shrink-0 h-6 w-6 text-accent group-hover:text-accent-hover"
                    aria-hidden="true"
                />
              
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{totalUniqueItems}</span>
            </a>
        </div>
    </>)
}

export default CartCounterTop;