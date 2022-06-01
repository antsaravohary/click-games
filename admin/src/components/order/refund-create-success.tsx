import Button from "@components/ui/button";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";


const RefundCreateSuccess = () => {
  const router = useRouter();
  const {
    query: { shop },
  } = useRouter();
  console.log("shop",shop);
  return (
    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
      <div>
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"></div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
          Annulation de la commande avec succès
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
            Un processus de remboursement est en cours. Vous-pouvez consulter celle-ci depuis l'onglet "Remboursements"
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <Button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          onClick={() =>router.push('/'+shop+ROUTES.REFUND)}
        >
         OK
        </Button>
      </div>
    </div>
  );
}

export default RefundCreateSuccess;
