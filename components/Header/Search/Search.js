import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Router, { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Search() {
  return (
    <div className="flex justify-end border">
      <section className="w-full flex sm:py-3 py-1">
        <InputSearch />
        <Menu as="div" className="w-56 relative text-left sm:block hidden">
          <div>
            <Menu.Button className="inline-flex text-left w-full justify-center px-3 bg-gray-100 rounded-md sm:text-sm text-xs font-normal text-gray-400 shadow-sm hover:bg-gray-50 ">
              All categories
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Account settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Support
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      License
                    </a>
                  )}
                </Menu.Item>
                <form method="POST" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="submit"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm"
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </section>

      <span className="flex items-center bg-white-500 sm:px-4 px-2.5 sm:py-3">
        <span>
          <MagnifyingGlassIcon
            width={20}
            className="sm:w-5 w-4 text-gray-400"
          />
        </span>
      </span>
    </div>
  );
}

function InputSearch() {
  const router = useRouter();
  const [searchStr, setSearchStr] = useState(router?.query.query || "");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (load) {
      router.push(`/search?query=${searchStr}`);
    }
    setLoad(true);
  }, [searchStr]);

  return (
    <input
      id="search-product"
      type="text"
      value={searchStr}
      onChange={(e) => setSearchStr(e.target.value)}
      placeholder="Search for product..."
      className="w-full sm:text-sm text-xs px-4 outline-none"
    />
  );
}
