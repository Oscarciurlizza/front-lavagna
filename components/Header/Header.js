import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  HeartIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Search from "./Search";
import Profile from "./Profile";
import Logo from "../Logo";
import useAuth from "../../hooks/useAuth";
import { getMeApi } from "../../api/users";
import { getCategoryApi } from "../../api/category";
import Link from "next/link";
import Cart from "./Cart/Cart";

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

  const { auth, logout } = useAuth();

  const [user, setUser] = useState("");
  const [openCart, setOpenCart] = useState(false);

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
    <Disclosure as="nav" className="sm:bg-white">
      {({ open }) => (
        <>
          <div className="w-full sm:px-0">
            <div className="relative flex sm:h-24 h-16 items-center justify-between gap-10">
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
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center sm:w-60">
                  <Logo />
                </div>
              </div>
              <div className="w-full hidden sm:block">
                <Search />
              </div>
              <div className="inset-y-0 right-0 flex items-center sm:static sm:inset-auto gap-5">
                {/* Profile dropdown */}
                {!user ? (
                  <Link
                    href="signin"
                    className="text-sm font-medium text-black"
                  >
                    SignIn
                  </Link>
                ) : (
                  <Profile user={user} logout={logout} />
                )}

                <div className="hidden sm:ml-6 sm:flex items-center gap-5">
                  {/*    <button
                    type="button"
                    className="rounded-full p-1 text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <HeartIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}
                  <button
                    onClick={() => setOpenCart(true)}
                    type="button"
                    className="rounded-full p-1 text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <Cart openCart={openCart} setOpenCart={setOpenCart} />
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <div className="py-2">
                <Search />
              </div>
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
  );
}
