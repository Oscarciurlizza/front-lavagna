import { useState, useEffect } from "react";
import { deleteAddressApi, getAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function ListAddress({
  reloadAddresses,
  setreloadAddresses,
  handleOpenModal,
}) {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressApi(auth.idUser, logout);
      setAddresses(response.data || []);
      setreloadAddresses(false);
    })();
  }, [reloadAddresses]);

  if (!addresses) return null;

  return (
    <div className="grid grid-cols-3 gap-5 mt-10">
      {addresses.map((address) => (
        <Address
          key={address.id}
          address={address}
          logout={logout}
          setreloadAddresses={setreloadAddresses}
          handleOpenModal={handleOpenModal}
        />
      ))}
    </div>
  );
}

function Address({ address, logout, setreloadAddresses, handleOpenModal }) {
  const deleteAddress = async () => {
    const response = await deleteAddressApi(address.id, logout);
    if (response) {
      setreloadAddresses(true);
    }
  };
  return (
    <div className="border border-gray-800 px-4 py-6">
      <p>{address.attributes.name}</p>
      <p>{address.id}</p>
      <p>{address.attributes.title}</p>
      <p>{address.attributes.city}</p>
      <p>{address.attributes.address}</p>
      <p>{address.attributes.state}</p>
      <div className="flex gap-5 mt-5">
        <button
          onClick={() =>
            handleOpenModal(`Editar: ${address.attributes.title}`, address)
          }
          className="bg-blue-100 px-4 py-2"
        >
          Edit
        </button>
        <button onClick={deleteAddress} className="bg-red-100 px-4 py-2">
          Delete
        </button>
      </div>
    </div>
  );
}
