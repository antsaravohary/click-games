import { useTranslation } from "next-i18next";
import cn from "classnames";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import Link from "@components/ui/link";
import dayjs from "dayjs";
import { Lock } from "@components/icons/lock";
import { DeliveryIcon } from "@components/icons/DeliveryIcon";
import { DeliveryTruckIcon } from "@components/icons/DeliveryTruckIcon";
import { Gifts } from "@components/icons/category";
import { BoxIcon } from "@components/icons/box-icon";
import { GuranteeIcon } from "@components/icons/gurantee-icon";

require("dayjs/locale/fr");
dayjs.locale("fr");
interface Props {}

export const ProductUserInfo = ({}: Props) => {
  return (
    <div className="bg-white rounded-lg shadow divide-y divide-gray-200 w-full max-w-xl">
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <ul role="list">
          <li className="bg-white py-2">
            <div className="flex">
              <span className="">
                <BoxIcon color="black" width="16" height="16" />
              </span>
              <span className="text-xs ml-2">
                {" "}
                Faites-vous livrer à partir de 0 € ou choisissez la remise en
                main propre avec paiement sécurisé
              </span>
            </div>
          </li>
          <li className="bg-white py-2">
          <div className="flex">
              <span className="">
                <GuranteeIcon color="black" width="16" height="16" />
              </span>
              <span className="text-xs ml-2">
                {" "}
                Bénéficiez de la protection acheteurs click-univers
              </span>
            </div>
          </li>
          <li className="bg-white py-2">
            <div className="flex">
              <span className="">
                <Lock width={16} height={16} />
              </span>
              <span className="text-xs ml-2"> Paiement sécurisé</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
