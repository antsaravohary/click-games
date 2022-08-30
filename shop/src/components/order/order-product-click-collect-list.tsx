import { CheckMark } from "@components/icons/checkmark";
import Button from "@components/ui/button";
import Checkbox from "@components/ui/checkbox/checkbox";
import { useCheckout } from "@contexts/checkout.context";
import { useCart } from "@contexts/quick-cart/cart.context";
import { formatAddress } from "@utils/format-address";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";
const OrderProductClickCollectList = ({ count }: any) => {
  const {
    items,
    isEmpty,
    setClickCollect,
    totalClickCollect,
    totalClickCollectActive,
  } = useCart();
  const [show, setShow] = useState(false);
  console.log(items);
  return (
    <>
      <div className="flex items-center justify-between mb-5 md:mb-8">
        <div className="flex items-center space-s-3 md:space-s-4">
          {count && (
            <span className="rounded-full w-8 h-8 bg-accent flex items-center justify-center text-base lg:text-xl text-light">
              {count}
            </span>
          )}
          <p className="text-lg lg:text-xl text-heading">
          Click&Collect 
          </p>
        </div>
      </div>
      <p className="text-small text-center text-gray-600">
        {show
          ? " Veuillez sélectionner les produits à retirer en Click&Collect"
          : "Certains des produits de votre panier peuvent être retirés en Click&Collect"}
      </p>{" "}
      <AnimateSharedLayout>
        {show && (
          <motion.ul
            role="list"
            className="relative z-0 divide-y divide-gray-200 divide-y"
          >
            {items &&
              items.map((item) => {
                if (item.click_collect) {
                  return (
                    <li key={item.id} className="bg-white">
                      <div className="relative px-6 py-5 flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-16 w-16 rounded"
                            src={item.image}
                            alt=""
                          />
                        </div>
                        <div className="flex-1 min-w-0 ">
                          <div>
                            <span className="absolute" aria-hidden="true" />
                            <p className="text-sm font-medium text-gray-900">
                              {item.name} x {item.quantity}
                            </p>
                            <div className="border border-gray-400 p-1 rounded">
                            <p className="text-sm text-gray-500 truncate">
                              Boutique: {item.shop.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              Adresse: {formatAddress(item.shop.address)}
                            </p>
                            {item.shop.telephone&& <p className="text-sm text-gray-500 truncate">
                              Teléphone: {item.shop.telephone}
                            </p>}
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => setClickCollect(item.id)}
                          size="small"
                        >
                          {item.active_click_collect ? (
                            <CheckMark />
                          ) : (
                            <span className="w-5 h-5 border"></span>
                          )}
                        </Button>
                      </div>
                    </li>
                  );
                }
              })}
          </motion.ul>
        )}
      </AnimateSharedLayout>
      <div className="flex justify-center">
        <Button
          className="text-center mt-4"
          onClick={() => setShow(!show)}
          size="small"
        >
          {show ? "Masquer" : "Afficher"}
        </Button>
      </div>
    </>
  );
};

export default OrderProductClickCollectList;
