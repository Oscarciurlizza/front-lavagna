/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function BasicModal({
  open,
  setOpen,
  children,
  type,
  titleModal,
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed inset-0 ${
              type === "search" ? "bg-white" : "bg-gray-500  bg-opacity-75"
            } transition-opacity`}
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full ${
                  type === "address" ? "sm:max-w-xl" : "sm:max-w-md"
                }`}
              >
                <div className="bg-white px-10 py-12">
                  <div className="sm:flex sm:items-center sm:justify-center flex-col">
                    <div className="w-full space-y-8">
                      <h2 className="text-gray-800 text-xl font-semibold">
                        {titleModal}
                      </h2>
                      <div>
                        <XMarkIcon
                          className="absolute top-5 right-5 h-5 w-5 cursor-pointer"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        />
                      </div>
                      {children}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
