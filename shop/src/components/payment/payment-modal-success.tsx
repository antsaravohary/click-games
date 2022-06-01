import { CheckMark } from "@components/icons/checkmark";
import Loader from "@components/ui/loader/loader";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useQueryClient } from "react-query";
const PaymentModalSuccess = ({ checking, message, closeModal, data }: any) => {
  const [pending, setPeding] = useState(true);
  const [test, setTest] = useState<number>(0);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (pending) {
      setTimeout(function () {
        checking().then((e: boolean) => {
          if (test === 5) {
            setPeding(false);
            closeModal();
            return;
          }
          if (e) {
            setPeding(false);
          } else {
            setTest(test + 1);
          }
        });
        console.log("checked", test);
      }, 3000);
    }
  }, [test]);
  if (pending) {
    return (
      <div className="overflow-y-auto overflow-x-hidden fixed right-0 left-10 bg-gray-500 opacity-90   top-0 z-50 justify-center items-center h-modal md:h-full md:inset-0 flex">
        <div className="bg-white flex justify-center items-center p-8 h-32 w-96 rounded-md opacity-100">
          <Loader
            className="h-16 w-full"
            showText={true}
            text="Veuillez patientez"
          />
        </div>
      </div>
    );
  }
  return (
    <div
      className="overflow-y-auto overflow-x-hidden fixed right-0 left-10   top-0 z-50 justify-center items-center h-modal md:h-full md:inset-0 flex"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white flex justify-center items-center p-8 h-32 w-96 rounded-md opacity-100 w">
        <div className="flex items-end justify-center  pt-4 px-4  text-center sm:block sm:p-0">
          <div>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <CheckMark
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-green-600">
                    Paiement succès
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    queryClient.invalidateQueries(data.query).finally(() => {
                      closeModal();
                    });
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModalSuccess;
