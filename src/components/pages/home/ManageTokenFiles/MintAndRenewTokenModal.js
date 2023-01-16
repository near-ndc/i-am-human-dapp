import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { ButtonLoader } from "../../../common/buttonLoader";

export const MintAndRenewTokenModal = ({
  input,
  isOpen,
  closeModal,
  isLoading,
  mintTokens,
  isMint,
  renewTokens,
}) => {
  const [mintData, setMintData] = useState({
    ttl: "",
    memo: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setMintData({
        ttl: "",
        memo: "",
      });
    }
  }, [isOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className=" z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full relative max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    onClick={closeModal}
                    disabled={isLoading}
                    className="top-5 right-5 absolute"
                  >
                    <AiOutlineClose />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {isMint
                      ? "Mint token to address"
                      : "Renew token to address"}{" "}
                    : {input}
                  </Dialog.Title>
                  <div className="mt-2">
                    <div>
                      <label
                        for="minting"
                        class="block mb-2 text-md font-medium text-gray-900"
                      >
                        Reason For {isMint ? "Minting" : "Renewing"}
                      </label>
                      <input
                        type="text"
                        id="minting"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Reason for minting"
                        value={mintData.memo}
                        onChange={({ target: { value } }) =>
                          setMintData({ ...mintData, memo: value })
                        }
                      />
                    </div>
                  </div>
                  {!isMint && (
                    <div className="mt-2">
                      <div>
                        <label
                          for="ttl"
                          class="block mb-2 text-md font-medium text-gray-900"
                        >
                          Valid For How Many Days ? (Optional override))
                        </label>
                        <input
                          type="number"
                          min={1}
                          id="ttl"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          placeholder="Validity Time (In days)"
                          value={mintData.ttl}
                          onChange={({ target: { value } }) =>
                            setMintData({ ...mintData, ttl: value })
                          }
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        isMint
                          ? mintTokens({
                              memo: mintData.memo,
                              // expires_at: mintData.ttl
                              //   ? Date.now() / 1000 + parseInt(mintData.ttl)
                              //   : undefined,
                            })
                          : renewTokens({
                              memo: mintData.memo,
                              ttl: mintData.ttl * 60 * 60 * 24,
                            });
                      }}
                    >
                      {isLoading ? <ButtonLoader /> : isMint ? "Mint" : "Renew"}
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
