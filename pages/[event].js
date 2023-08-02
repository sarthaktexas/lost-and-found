import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function Event() {
  const router = useRouter();
  const event = router.query.event;
  const items = useSWR(`/api/getlistofitems?event=${event}`, fetcher).data;
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="m-10">
      <h1 className="font-handjet text-6xl mb-4">
        Lost and Found: <span className="text-gray-500">{event}</span>
      </h1>
      <div className="flex flex-wrap gap-4">
        {items?.map((item) => (
          <div
            key={item.id}
            className={`border-2 border-gray-300 rounded-xl w-1/6 p-5 flex flex-col gap-4 ${item.claimed ? "bg-gray-300" : "bg-white"}`}
          >
            <img className="" src={item.picture} />
            <h2 className="text-xl">{item.item}</h2>
            {item.claimed ? <button
              className="rounded-lg bg-green-500 text-white text-center py-2 px-4 w-fit font-sans"
            >
              Claimed!
            </button> : <button
              className="rounded-lg bg-blue-500 text-white text-center py-2 px-4 w-fit hover:bg-blue-600 font-sans"
              onClick={openModal}
            >
              Claim
            </button>}
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
                      <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="mt-2">
                          <iframe
                            className="airtable-embed"
                            src="https://airtable.com/embed/appWNlWHbrcv7v6w7/shr4FWNXMIeSQTFTE?backgroundColor=redDusty"
                            onmousewheel=""
                            width="100%"
                            height={700}
                            style={{ background: "transparent", border: "1px solid #ccc" }}
                          />
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                          >
                            Got it, thanks!
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        ))}
      </div>
    </div>
  );
}