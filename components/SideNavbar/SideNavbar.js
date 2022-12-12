import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { getCategoryApi } from "../../api/category";
useState;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideNavbar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getCategoryApi();
      setCategories(response.data || []);
    })();
  }, []);
  return (
    <Menu
      as="div"
      className="relative inline-block text-left mt-10 sm:w-60 w-full"
    >
      <div>
        <Menu.Button className="bg-blue-500 inline-flex w-full justify-between border px-4 py-3.5 text-sm font-normal text-white hover:bg-blue-400 ">
          Browse categories
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white">
          <div className="py-1">
            {categories.map((category) => (
              <Menu.Item key={category.id}>
                {({ active }) => (
                  <Link
                    href={`/products/${category.attributes.url}`}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-400",
                      "flex items-center justify-between px-4 py-3 text-sm"
                    )}
                  >
                    {category.attributes.title}
                    <ChevronRightIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
