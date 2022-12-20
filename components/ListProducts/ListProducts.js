import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function ListProducts({ title, subtitle, products }) {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-32">
        <h2 className="flex flex-col">
          <p className="sm:text-4xl text-lg font-extrabold tracking-whide text-black">
            {title}
          </p>
          <p className="letter text-4xl mt-3">{subtitle}</p>
        </h2>

        <>
          <div className="grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-10 mt-10">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </>
      </div>
    </div>
  );
}

function Product({ product }) {
  const { url, poster, title, price } = product?.attributes;
  return (
    <Link href={`/${url}`}>
      <div className="flex justify-between flex-col">
        <section className="h-80 w-full bg-white flex items-center justify-center rounded-3xl relative">
          <Image
            width={330}
            height={300}
            src={poster.data.attributes.url}
            alt={title}
            className="h-52 object-contain w-full"
          />
          <button
            type="button"
            className="absolute top-5 right-5 rounded-xl bg-white text-black hover:text-gray-600 border border-gray-300 p-2"
          >
            <PlusIcon className="h-3 w-3" aria-hidden="true" />
          </button>
        </section>
        <section className="h-20 flex flex-col justify-end mt-4">
          <Link href={url} className="text-base text-gray-600">
            {title}
          </Link>
          <h5 className="text-lg font-bold text-gray-900 mt-2">S/.{price}</h5>
        </section>
      </div>
    </Link>
  );
}
