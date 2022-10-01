import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalAction } from '@components/ui/modal/modal.context';
const Payment3Dsecure = ({ url }: any) => {


    return (<Transition.Root show={true}>
        <Dialog open={true} onClose={() => { }} as="div" className="fixed mt-8  z-10 inset-0 overflow-y-auto  h-auto"  >
            <div className="flex justify-center  h-5/6  mt-8">
                <Transition.Child
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className="inline-block w-full max-w-lg  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top  h-full sm:p-6">
                        <iframe className="w-full h-full " src={url}></iframe>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>)
}

export default Payment3Dsecure;