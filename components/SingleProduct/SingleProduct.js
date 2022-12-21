import { useState, useEffect } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import {
  MinusSmallIcon,
  PlusSmallIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/solid";
import {
  isFavoriteApi,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../api/favorite";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { toastError, toastSuccess } from "../../utils/toast";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { formatMoney } from "../../utils/format";
import Navbar from "../Navbar";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SingleProduct({ product: singleProduct }) {
  const { title, price, description, discount, gallery, url, poster, category } =
    singleProduct?.attributes;
  const { auth, logout } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [reloadFavorite, setReloadFavorite] = useState(false);
  const { agregarCarrito } = useCart();

  useEffect(() => {
    (async () => {
      if (!auth) {
        return null;
      } else {
        const response = await isFavoriteApi(
          auth.idUser,
          singleProduct.id,
          logout
        );
        console.log(response)
        if (response.data.length > 0) setIsFavorite(true);
        else setIsFavorite(false);
      }
    })();
    setReloadFavorite(false);
  }, [singleProduct, reloadFavorite]);

  const addFavorite = async () => {
    if (auth) {
      const response = await addFavoriteApi(auth.idUser, singleProduct.id, logout);
      console.log(auth.idUser);
      setReloadFavorite(true);
    }
  };

  const removeFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.idUser, singleProduct.id, logout);
      setReloadFavorite(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectProduct = {
      id: singleProduct.id,
      image: poster.data.attributes.url,
      name: title,
      price,
      quantity,
    };



    if (quantity < 1 || !auth) {
      toastError("No puede agregar");
    } else {
      toastSuccess("producto añadido");
      agregarCarrito(selectProduct);
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            <div className="max-w-xl mx-auto w-full">
              {/* Image gallery */}
              <Tab.Group as="div" className="flex flex-col-reverse">
                {/* Image selector */}
                <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                  <Tab.List className="grid grid-cols-4 gap-6">
                    {gallery.data.map((image) => (
                      <Tab
                        key={image.id}
                        className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                      >
                        {({ selected }) => (
                          <>
                            <span className="sr-only">{image.attributes.name}</span>
                            <span className="absolute inset-0 rounded-md overflow-hidden">
                              <img
                                src={image.attributes.url}
                                alt={title}
                                className="w-full h-full object-center object-cover"
                              />
                            </span>
                            <span
                              className={classNames(
                                selected ? "ring-blue-500" : "ring-transparent",
                                "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>

                <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                  {gallery.data.map((image) => (
                    <Tab.Panel key={image.id}>
                      <img
                        src={image.attributes.url}
                        alt={title}
                        className="w-full h-full object-center object-cover sm:rounded-lg"
                      />
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
            {/* Product info */}
            <div className="h-full flex justify-center flex-col bg-gray-100">
              <div className="max-w-2xl py-16 sm:py-32 lg:max-w-xl lg:pl-10">
                <span className="text-sm text-gray-400">{category.data.attributes.title}</span>
                <h1 className="max-w-xs text-2xl font-medium tracking-tight text-gray-900 mt-3">
                  {title}
                </h1>

                <div className="flex justify-between mt-10">
                  <>
                    <select
                      onChange={(e) => setQuantity(+e.target.value)}
                      name="quantity"
                      id="quantity"
                      className="bg-transparent border rounded-3xl px-6 py-1"
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </>
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl font-bold relative z-10 w-min before:content-[''] before:inline-block before:absolute before:w-full before:h-3 before:bg-blue-200 before:-z-10 before:bottom-0">
                    {formatMoney(price)}
                  </p>
                </div>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>

                  <div
                    className="text-sm text-gray-500 space-y-6 max-w-xs mt-10 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>

                <form className="mt-6" onSubmit={handleSubmit}>
                  <div className="mt-10 flex sm:flex-co">

                    <button
                      type="submit"
                      className="flex items-center gap-3 uppercase max-w-xs flex-1 bg-blue-600 border border-transparent rounded-xl py-4 px-8 justify-center text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500 sm:w-full"
                    >
                      <ShoppingCartIcon
                        className="h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                      />
                      Add to bag
                    </button>
                    <button
                      type="button"
                      className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                      <HeartIcon
                        onClick={isFavorite ? removeFavorite : addFavorite}
                        className={`${isFavorite && "text-red-400"
                          } "h-6 w-6 flex-shrink-0"`}
                        aria-hidden="true"
                      />
                      <span className="sr-only">Add to favorites</span>
                    </button>
                  </div>
                </form>
                <section aria-labelledby="details-heading" className="mt-12">
                  <h2 id="details-heading" className="sr-only">
                    Additional details
                  </h2>
                  <div className="border-t divide-y divide-gray-200">
                    {/* product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                              <span
                                className={classNames(
                                  open ? "text-blue-600" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmallIcon
                                    className="block h-6 w-6 text-blue-400 group-hover:text-blue-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmallIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="pb-6 prose prose-sm"
                          >
                            <ul role="list">
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )) */}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
