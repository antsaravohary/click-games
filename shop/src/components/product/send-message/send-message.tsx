import { useTranslation } from "next-i18next";
import cn from "classnames";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import Link from "@components/ui/link";
import dayjs from "dayjs";

require('dayjs/locale/fr');
dayjs.locale('fr')
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

export const SendMessage = ({
  data,
  variant = "helium",
  counterVariant,
  counterClass,
  variation,
  disabled,
  isCard = false,
}: Props) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const {user}=data;
  console.log(user);
  return (
    <div className="bg-white rounded-lg shadow divide-y divide-gray-200 w-full max-w-xl">
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-900 text-sm font-medium truncate">
            {user.name}
            </h3>
            <span className="hidden flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
         
            </span>
          </div>
          <p className="mt-1 text-gray-500 text-sm truncate">   Membre depuis {dayjs(user.created_at).format("MMMM YYYY")}</p>
        </div>
        <img
          className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
          src={user?.profile?.avatar?.thumbnail}
          alt=""
        />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="w-0 flex-1 flex">
            <a
              href={""}
              className="relative bg-yellow-500 text-white font-semibold -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-md text-gray-700 border border-transparent rounded-bl-lg hover:bg-yellow-600"
            >
              <span className="ml-3">Acheter</span>
            </a>
          </div>
          <div className="-ml-px w-0 flex-1 flex">
            <Link
             href={`${ROUTES.PRODUCT}/message/${data?.slug}`}
              className="relative bg-accent w-0 flex-1 font-semibold inline-flex items-center justify-center py-4 text-md text-white  border border-transparent rounded-br-lg hover:bg-accent-hover"
            >
              <span className="ml-3">Message</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <button
      onClick={() => router.push(`${ROUTES.PRODUCT}/message/${data?.slug}`)}
      disabled={disabled}
      className={cn(
        "py-4 px-5 w-full break-all flex items-center justify-center text-sm lg:text-base font-light rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover",
        {
          "border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed":
            disabled,
        }
      )}
    >
      <span>{t("text-send-message")}</span>
    </button>
  );
};
