import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiCheck } from "react-icons/hi2";
import Image from "next/image";

interface ModalProps {
  count: number;
}

export default function Modal({ count }: ModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (count !== 0 && (count === 1 || count % 5 === 0)) {
      setOpen(true);
    }
  }, [count]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-[20px] bg-white px-8 pt-6 pb-8 shadow-xl transition-all sm:w-full sm:max-w-sm">
                <div>
                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full">
                    <Image src="/images/logo.png" alt="" fill />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-2xl font-bold">
                      Lifetime access to 1000s of AI-generated pickup lines!
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://wahabshaikh.gumroad.com/l/aipickuplines"
                    className="btn btn-primary w-full"
                    onClick={() => setOpen(false)}
                  >
                    Get it now!
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
