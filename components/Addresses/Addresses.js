import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import BasicModal from "../Modals/BasicModal";
import AddressForm from "./AddressForm";
import ListAddress from "./ListAddress";

const Addresses = () => {
  const [open, setOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [reloadAddresses, setreloadAddresses] = useState(false);

  const handleOpenModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setreloadAddresses={setreloadAddresses}
        setOpen={setOpen}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setOpen(!open);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="flex gap-2 text-gray-900 font-medium">Directions</h2>
        <button onClick={() => handleOpenModal("Nueva Direccion")}>
          <PlusIcon width={20} />
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        Lorem ipsum dolor sit amet consectetur adipisicing.
      </p>
      <BasicModal
        open={open}
        setOpen={setOpen}
        titleModal={titleModal}
        type="address"
      >
        {formModal}
      </BasicModal>
      <ListAddress
        handleOpenModal={handleOpenModal}
        reloadAddresses={reloadAddresses}
        setreloadAddresses={setreloadAddresses}
      />
    </div>
  );
};

export default Addresses;
