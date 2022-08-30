import { CheckMarkCircle } from "@components/icons/checkmark-circle";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";

export default function GameSaleSucucess({refPurchase}:any) {
  const router=useRouter();
  return (
    <div className="mx-auto w-full inline-block align-bottom bg-whit px-4 pt-5 overflow-hidden ">
      <div>
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <CheckMarkCircle
            className="h-6 w-6 text-green-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-lg leading-6 font-medium text-green-500">
            Vente enregistrer avec succès
          </h3>
          <div>sous reference N°{refPurchase}</div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Votre compte sera debiter une fois que nous receptionne le colis
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6"> 
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-accent text-base font-medium text-white hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          onClick={() => {
            router.push(ROUTES.SALE);
          }}
        >
            Acceder au liste de vente
        </button>
      </div>
    </div>
  );
}
