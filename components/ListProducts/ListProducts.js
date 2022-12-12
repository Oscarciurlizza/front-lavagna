import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Router } from "next/router";

export default function ListProducts({ products }) {
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <h2 className="flex justify-between items-center sm:text-2xl text-lg font-medium tracking-tight text-gray-900">
          Customers also purchased{" "}
          <Link
            href="/"
            className="sm:text-sm text-xs text-gray-400 font-medium hover:text-black"
          >
            <span className="flex font-normal items-center gap-5">
              View all
              <ArrowLongRightIcon width={20} />
            </span>
          </Link>
        </h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10 mt-10">
          {products.map((product) => (
            <div key={product?.id} className="group relative">
              <>
                <img
                  src={product?.attributes.poster.data.attributes.url}
                  alt={product?.attributes.title}
                  className="w-full object-cover mx-auto"
                />
              </>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product?.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product?.attributes.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product?.attributes.description}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  S/.{product?.attributes.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
