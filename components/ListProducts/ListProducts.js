import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function ListProducts({ products }) {
  return (
    <>
      <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 mt-8">
        <h2 className="flex flex-col sm:text-2xl text-lg font-medium tracking-tight text-gray-900">
          <p>Shop</p>
          <p>your favorite</p>

        </h2>

        <>
          <div className="grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-10 mt-10">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </>
      </div>
    </>
  );
}

function Product({ product }) {
  return (
    <Link href={`/${product.attributes.url}`}>
      <>
        <div className="bg-white h-80 flex justify-center items-center hover:border-2 border-black rounded-3xl relative">
          <Image
            width={330}
            height={300}
            src={product?.attributes.poster.data.attributes.url}
            alt={product?.attributes.title}
            className="h-52 object-contain w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={product?.href}>
                {product?.attributes.title}
              </a>
            </h3>
          </div>
        </div>
        <p className="text-lg font-bold text-gray-900 mt-2">
          S/.{product?.attributes.price}
        </p>
      </>
    </Link>
  );
}
