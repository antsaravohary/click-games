import { CloseIcon } from "@components/icons/close-icon";
import { useModalAction, useModalState } from "@components/ui/modal/modal.context";
import { Transition } from "@headlessui/react";
import { Button } from "..";

export default function PayementError() {
  const { data } = useModalState();
  const {closeModal}=useModalAction();
  return (
    <div className="flex items-end justify-center  pt-4 px-4  text-center sm:block sm:p-0">

    <Transition.Child
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enterTo="opacity-100 translate-y-0 sm:scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <CloseIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3  className="text-lg leading-6 font-medium text-red-600">
             Paiement échoué
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
               {data?.message}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => closeModal()}
          >
            OK
          </button>
          
        </div>
      </div>
    </Transition.Child>
  </div>
  );
}
