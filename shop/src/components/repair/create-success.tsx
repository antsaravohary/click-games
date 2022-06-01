import { CheckMarkCircle } from "@components/icons/checkmark-circle";
import { useRouter } from "next/router";
import QRCode from "react-qr-code";

export default function CreateSucucess({ repair }: any) {
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
            Reparation de consuel est enregistré avec succès
          </h3>
          <div>sous reference N°{repair.ref}</div>
          <div className="flex my-5 justify-center"> <QRCode value={`${repair.ref}`} /></div>
         
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Merci d'envoyer votre console à l'adresse indiqué
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          onClick={() => {router.push("/repair")}}
        >
          Acceder au liste de reparation
        </button>
      </div>
    </div>
  );
}
