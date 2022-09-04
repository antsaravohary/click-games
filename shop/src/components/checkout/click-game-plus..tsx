import { CheckMark } from "@components/icons/checkmark";
import ChevronDown from "@components/icons/chevron-down";
import { ChevronUp } from "@components/icons/chevron-up";
import Checkbox from "@components/ui/checkbox/checkbox";
import { useCart } from "@contexts/quick-cart/cart.context";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
const solutions = [
  {
    name: "Jusqu’à -50% sur les prix produits en devenant membre du ClickGames+.",
    description: '',

    href: "#",
    icon: CheckMark,
  },
  {
    name: "Prioritaire sur les nouvelles sorties et exclusivité.",
    description:
      "",
    href: "#",
    icon: CheckMark,
  },
  {
    name: "Aucune obligation d’achat. C’est toujours vous qui décidez.",
    description:
      "",
    href: "#",
    icon: CheckMark,
  },
  {
    name: "Jeu livré le jour de la sortie.",
    description:
      "",
    href: "#",
    icon: CheckMark,
  },
  {
    name: "Prioritaire du les files d’attente.",
    description:
      "",
    href: "#",
    icon: CheckMark,
  },
];

const ClickGamePlus = ({ value, setValue,disabled }: any) => {
  const [showDetail, setShowDetail] = useState(false);
  const { setClickGamePlus } = useCart();
  useEffect(() => {
    setClickGamePlus(value);
  }, [value]);

  return (
    <div className="mt-5 bg-white rounded-sm p-8">
      <div className="flex flex-col md:flex-row justify-center md:justify-start ">
        <Checkbox
          className="text-dark"
          checked={value}
          disabled={disabled}
          onChange={() => setValue(disabled?value:!value)}
          labelClassName="text-xs sm:text-sm  md:text-md font-semibold"
          name={"click_game_plus"}
          label="Bénéficier du ClickGames+"
        />
        {!showDetail && (
          <button
            onClick={() => setShowDetail(true)}
            className="md:ml-2 md:border-0 mt-1  flex justify-center ronded-sm"
          >
            <ChevronDown width={16} height={16} />
          </button>
        )}
      </div>
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "26rem" }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, height: 0 }}
            className=" h-[24rem]  mt-2 w-full overflow-hidden"
          >
            <h3 className="mt-2 text-xl font-semibold flex items-center justify-center">
              ClickGames+
            </h3>

            <div className="relative grid gap-6 bg-white px-5 py-5 sm:gap-8 sm:p-8 lg:grid-cols-1">
              {solutions.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                >
                  <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-md bg-accent text-white sm:h-6 sm:w-6">
                    <item.icon className="h-4 w-4 text-light" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <span className="flex flex-col text-center">
              <span className="text-[9px] text-gray-400 font-bold mt-1">
                Adhésion au ClickGames+
              </span>
            </span>
            <span className="flex flex-col text-center">
              <span className="text-[9px] text-gray-400 font-bold mt-1">
               14 jours d’essai 
              </span>
            </span>
            <span className="flex flex-col text-center">
              <span className="text-[9px] text-gray-400 font-bold mt-1">
                Sans engagement, 59,99€ par mois
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      {showDetail && (
        <button
          onClick={() => setShowDetail(false)}
          className=" w-full mt-1  flex justify-center ronded-sm"
        >
          <ChevronUp width={"16"} height={"16"} />
        </button>
      )}
    </div>
  );
};

export default ClickGamePlus;
