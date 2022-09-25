import CartItem from "@components/cart/cart-item";
import { ArrowNext } from "@components/icons"
import { useCart } from "@contexts/quick-cart/cart.context";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { motion, AnimateSharedLayout } from "framer-motion";
import { useTranslation } from "next-i18next";
import { Button } from ".."
import ClickGamePlus from "./click-game-plus.";

type props = {
    setStep: (e) => {};
    setClickGamePlus: (e) => {};
}
const CheckoutCart = ({ setStep, setClickGamePlus }: props) => {
    const { items, totalUniqueItems, total } = useCart();
    const { t } = useTranslation("common");
    return (
        <div className="mt-8 flex flex-col h-full">
            <AnimateSharedLayout>
                <motion.div layout className="flex-grow pt-16">
                    {items.length > 0 ? (
                        items?.map((item) => <CartItem item={item} key={item.id} />)
                    ) : (
                        <motion.div
                            layout
                            initial="from"
                            animate="to"
                            exit="from"
                            variants={fadeInOut(0.25)}
                            className=" flex flex-col items-center justify-center"
                        >
                            <img src="/empty-cart.png" />
                            {/** *<EmptyCartIcon width={140} height={176} />*/}
                            <h4 className="mt-6 text-base font-semibold">
                                {t("text-no-cart")}
                            </h4>
                        </motion.div>
                    )}
                </motion.div>
            </AnimateSharedLayout>
            <div className="mt-auto mb-8 flex justify-end">
                <Button
                    onClick={() => {
                        setStep(1);
                    }}
                >Suivant</Button>
            </div>

        </div>

    )
}
export default CheckoutCart;