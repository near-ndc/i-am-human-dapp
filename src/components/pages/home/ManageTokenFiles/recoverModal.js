import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";

export const RecoverModal = ({ input, isButtonEnabled, buttonClass }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        disabled={true}
        className={`${buttonClass.replace('bg-blue-700  hover:bg-blue-800','bg-gray-500')} opacity-40`}
      >
        Recover SBT
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <button onClick={closeModal} className="top-5 right-5 absolute">
            <AiOutlineClose />
          </button>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Recover to Address : {input}
                  </Dialog.Title>
                  <div className="mt-2">
                    <div>
                      <label
                        for="first_name"
                        class="block mb-2 text-md font-medium text-gray-900"
                      >
                        Recover From
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Recover From"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Recover
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
