import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { getAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

const plans = [
  {
    name: "Startup",
    ram: "12GB",
    cpus: "6 CPUs",
    disk: "160 GB SSD disk",
  },
  {
    name: "Business",
    ram: "16GB",
    cpus: "8 CPUs",
    disk: "512 GB SSD disk",
  },
  {
    name: "Enterprise",
    ram: "32GB",
    cpus: "12 CPUs",
    disk: "1024 GB SSD disk",
  },
];

export default function Shipping({ setAddress }) {
  const [selected, setSelected] = useState(plans[0]);
  const [addresses, setAddresses] = useState(null);
  const [addressActive, setAddressActive] = useState(null);

  const { auth, logout } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getAddressApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);

  return (
    <div className="w-full px-4 py-16">
      {addresses ? (
        <div className="sm:grid grid-cols-4 gap-5">
          {addresses.data.map((add) => (
            <Address
              add={add}
              setAddressActive={setAddressActive}
              setAddress={setAddress}
              addressActive={addressActive}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Address({ add, setAddress, setAddressActive, addressActive }) {
  const { name, address, city, state, phone } = add.attributes;

  const changeAddress = () => {
    setAddressActive(add.id);
    setAddress(add);
  };

  return (
    <div
      onClick={changeAddress}
      key={add.id}
      className={`${
        addressActive ? "border-red-500" : "border-black "
      } border flex flex-col space-y-6 p-3 cursor-pointer`}
    >
      <span className="border-b border-black">{name}</span>
      <span>{address}</span>
      <span>{city}</span>
      <span>{state}</span>
      <span>{phone}</span>
    </div>
  );
}
