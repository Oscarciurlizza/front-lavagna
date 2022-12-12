import {
  TruckIcon,
  WalletIcon,
  PhoneIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export default function Services() {
  return (
    <div className="py-3 mt-10">
      <div className="sm:flex justify-between gap-10 sm:space-y-0 space-y-7">
        <section className="sm:flex items-center gap-5">
          <span className="text-blue-500 sm:p-3.5 bg-gray-100 rounded-full">
            <TruckIcon width={20} />
          </span>
          <h2 className="text-base text-black font-medium">
            Free delivery
            <p className="text-xs font-normal text-gray-400">
              Free shipping on all orders
            </p>
          </h2>
        </section>
        <section className="sm:flex items-center gap-5">
          <span className="text-blue-500 sm:p-3.5 bg-gray-100 rounded-full">
            <PhoneIcon width={20} />
          </span>
          <h2 className="text-base text-black font-medium">
            Online support 24/7
            <p className="text-xs font-normal text-gray-400">
              Support online 24 hours a day
            </p>
          </h2>
        </section>
        <section className="sm:flex items-center gap-5">
          <span className="text-blue-500 sm:p-3.5 bg-gray-100 rounded-full">
            <WalletIcon width={20} />
          </span>
          <h2 className="text-base text-black font-medium">
            Money return
            <p className="text-xs font-normal text-gray-400">
              Back guarantee under 7 days
            </p>
          </h2>
        </section>
        <section className="sm:flex items-center gap-5">
          <span className="text-blue-500 sm:p-3.5 bg-gray-100 rounded-full">
            <TagIcon width={20} />
          </span>
          <h2 className="text-base text-black font-medium">
            Member discount
            <p className="text-xs font-normal text-gray-400">
              On every order over S/.100.00
            </p>
          </h2>
        </section>
      </div>
    </div>
  );
}
