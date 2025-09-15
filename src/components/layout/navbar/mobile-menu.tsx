"use client";

// import { Menu } from "@/src/lib/shopify/types";
// import {
//   Dialog,
//   DialogPanel,
//   Transition,
//   TransitionChild,
// } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";
// import { Fragment, useState } from "react";
// import { Search } from "./search";

// export const MobileMenu = ({ menu }: { menu: Menu[] }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const openMobileMenu = () => setIsOpen(true);
//   const closeMobileMenu = () => setIsOpen(false);

//   return (
//     <>
//       <button
//         onClick={openMobileMenu}
//         aria-label="Open Mobile Menu"
//         className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white"
//       >
//         <Bars3Icon className="h-4" />
//       </button>

//       <Transition show={isOpen}>
//         <Dialog onClose={closeMobileMenu} className="relative z-50">
//           {/* BackDrop  */}
//           <TransitionChild
//             as={Fragment}
//             enter="transition-all ease-in-out duration-300"
//             enterFrom="opacity-0 backdrop-blur-none"
//             enterTo="opacity-100  backdrop-blur-[.5px]"
//             leave="transition-all ease-in-out duration-200"
//             leaveFrom="opacity-100 backdrop-blur-[.5px]"
//             leaveTo="opacity-0 backdrop-blur-none"
//           >
//             <div className="fixed inset-0 bg-white/30" aria-hidden="true" />
//           </TransitionChild>
//           {/* Inner Panel or Slider */}
//           <TransitionChild
//             as={Fragment}
//             enter="transition-all ease-in-out duration-300"
//             enterFrom="translate-x-[-100%]"
//             enterTo="translate-x-0"
//             leave="transition-all ease-in-out duration-200"
//             leaveFrom="translate-x-0"
//             leaveTo="translaite-x-[-100%]"
//           >
//             <DialogPanel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 ">
//               <div className="p-4">
//                 <button
//                   className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 "
//                   onClick={closeMobileMenu}
//                   aria-label="Close Mobile Menu"
//                 >
//                   <XMarkIcon className="h-6" />
//                 </button>
//                 <div className="mb-4 w-full">
//                   <Search />
//                 </div>
//                  {menu.length > 0 ? (
//                   <ul className="flex w-full flex-col">
//                     {menu.map((item: Menu) => (
//                       <li
//                         className="py-2 text-xl text-black transition-colors hover:text-neutral-500"
//                         key={item.title}
//                       >
//                         <Link
//                           href={item.path}
//                           prefetch={true}
//                           onClick={closeMobileMenu}
//                         >
//                           {item.title}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : null}
//               </div>
//             </DialogPanel>
//           </TransitionChild>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

// custom mobile menu

import { Menu } from "@/src/lib/shopify/types";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { SearchInMobileMenu } from "./search";
import Link from "next/link";

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  // Background scrolling prevention
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="flex h-11 w-12 items-center justify-center rounded-md  transition-colors md:hidden"
        onClick={openMobileMenu}
        aria-label="Open Mobile Menu"
      >
        <Bars3Icon className="h-auto w-6 text-white" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sliding Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs h-screen bg-white transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Close Button */}
          <button
            className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black"
            onClick={closeMobileMenu}
            aria-label="Close Mobile Menu"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {/* Search bar */}
          <div className="mb-4">
            <SearchInMobileMenu />
          </div>

          {/* Menu Links */}
          {menu.length > 0 && (
            <ul className="flex flex-col space-y-2">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    onClick={closeMobileMenu}
                    className="block py-2 text-lg text-black hover:text-neutral-500"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
