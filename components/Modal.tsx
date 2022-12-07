import { FormEventHandler, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import toast from "react-hot-toast";

interface ModalProps {
  count: number;
}

export default function Modal({ count }: ModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (count !== 1 && (count === 2 || count % 5 === 1)) {
      setOpen(true);
    }
  }, [count]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await toast.promise(
        fetch("/api/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }).then((res) => res.json()),
        {
          loading: `Sending you the mail...`,
          success: `Email sent successfully! Please check your inbox.`,
          error: `Oops... something went wrong! Please try again.`,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsCompleted(true);
    }
  };

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
                      {!isCompleted ? (
                        "Get 100 pickup lines for free!"
                      ) : (
                        <>
                          Level up your skills: <br />
                          Get the comprehensive guide!
                        </>
                      )}
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-8">
                  {!isCompleted ? (
                    <form className="space-y-2" onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="name" className="sr-only">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full rounded-2xl border-2 border-black/5 bg-black/5 p-4 focus:border-brand focus:ring-brand"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="sr-only">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="block w-full rounded-2xl border-2 border-black/5 bg-black/5 p-4 focus:border-brand focus:ring-brand"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={isLoading}
                      >
                        Send me!
                      </button>
                    </form>
                  ) : (
                    <a
                      className="btn btn-primary w-full"
                      href="https://wahabshaikh.gumroad.com/l/aipickuplines"
                      target="_blank"
                    >
                      Checkout on Gumroad
                    </a>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
