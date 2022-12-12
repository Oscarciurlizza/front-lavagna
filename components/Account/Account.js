import ChangeEmailForm from "./ChangeEmailForm/";
import ChangeNameForm from "./ChangeNameForm/";
import ChangePasswordForm from "./ChangePasswordForm";
import { Tab } from "@headlessui/react";
import { options, tabs } from "../../utils/tabs";
import Addresses from "../Addresses";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}1

const Account = ({ user, logout, setReloadUser }) => {
  return (
    <section className="py-3 mt-10">
      <Tab.Group>
        <Tab.List className="w-full flex items-center gap-12 border-b border-gray-200">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  "w-22 flex gap-2 text-sm text-left outline-none py-2.5",
                  selected
                    ? "text-gray-800 font-semibold border-b border-gray-800 "
                    : "text-gray-500 hover:bg-gray/[0.12] font-normal hover:text-gray-400 "
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-10">
          {options.map((options, index) => (
            <Tab.Panel key={index} className={classNames("w-full")}>
              {index === 0 ? (
                <ChangeNameForm
                  user={user}
                  logout={logout}
                  setReloadUser={setReloadUser}
                />
              ) : index === 1 ? (
                <ChangeEmailForm
                  user={user}
                  logout={logout}
                  setReloadUser={setReloadUser}
                />
              ) : index === 2 ? (
                <ChangePasswordForm user={user} logout={logout} />
              ) : index === 3 ? (
                <Addresses />
              ) : (
                "hola"
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};

export default Account;
