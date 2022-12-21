import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  Bars3CenterLeftIcon,
  BellIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Search from "./Search";
import Profile from "./Profile";
import Logo from "../Logo";
import useAuth from "../../hooks/useAuth";
import { getMeApi } from "../../api/users";
import { getCategoryApi } from "../../api/category";
import Link from "next/link";
import Cart from "./Cart/Cart";
import TopBar from "./TopBar";
import useCart from "../../hooks/useCart";
import { formatMoney } from "../../utils/format";
import Navbar from "../Navbar";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [categories, setCategories] = useState([]);
  console.log(categories)

  const { auth, logout } = useAuth();
  const { carrito } = useCart();

  const [user, setUser] = useState("");
  const [totalCart, setTotalCart] = useState(0);
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    const calcTotal = carrito.reduce(
      (total, producto) => total + producto.quantity * producto.price,
      0
    );
    setTotalCart(calcTotal);
  }, [carrito]);

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]);

  useEffect(() => {
    (async () => {
      const response = await getCategoryApi();
      setCategories(response?.data || []);
    })();
  }, []);
  return (
    <>
      <header className="fixed w-full top-0 left-0 z-20">
        <TopBar />
        <Disclosure as="nav" className="bg-gray-100">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-1">
                <div className="relative flex sm:h-20 h-16 items-center justify-between">
                  <div className="flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3BottomLeftIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="hidden sm:flex flex-1 items-center gap-5 sm:w-52">
                    <button
                      type="button"
                      className="bg-white rounded-xl py-3 px-3.5 p-1 text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <Bars3CenterLeftIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                    <Cart openCart={openCart} setOpenCart={setOpenCart} />
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex justify-center flex-shrink-0 items-center w-full">
                      <Logo />
                    </div>
                  </div>
                  {/*  <div className="w-full hidden sm:block">
                <Search />
              </div> */}
                  <div className="sm:flex flex-1 justify-end inset-y-0 right-0 flex items-center sm:static sm:inset-auto gap-5">
                    {/* Profile dropdown */}
                    {!user ? (
                      <div>
                        <Link
                          href="signin"
                          className="text-xs font-normal text-black py-1 px-3 border-r border-gray-400"
                        >
                          Log in
                        </Link>
                        <Link
                          href="signup"
                          className="text-xs font-normal py-1 px-3 text-black"
                        >
                          Create account
                        </Link>
                      </div>
                    ) : (
                      <Profile user={user} logout={logout} />
                    )}

                    <div className="hidden sm:flex items-center gap-5">
                      <button
                        type="button"
                        className="bg-white rounded-xl py-3 px-3.5 p-1 text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <MagnifyingGlassIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        onClick={() => setOpenCart(true)}
                        type="button"
                        className="flex items-center gap-3 font-bold text-xs bg-white rounded-xl py-3 px-3.5 text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
                        {!auth ? formatMoney(0) : formatMoney(totalCart)}
                      </button>
                      <Cart openCart={openCart} setOpenCart={setOpenCart} />
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                  {
                    {
                      /* <div className="py-2">
                  <Search />
                </div> */
                    }
                  }
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  <div className="flex items-center gap-5 px-3">
                    <button
                      type="button"
                      className="rounded-full p-1 text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="rounded-full p-1 text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </header>
      <Navbar categories={categories} />

    </>

  );
}
