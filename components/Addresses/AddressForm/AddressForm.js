import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { createAddressApi, updateAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";
import { toastError, toastSuccess } from "../../../utils/toast";
import Alert from "../../Alert";
import Input from "../../Form/Input";

import Label from "../../Form/Label";
import Submit from "../../Form/Submit";

export default function AddressForm({
  setOpen,
  setreloadAddresses,
  newAddress,
  address,
}) {
  const [loading, setLoading] = useState(false);

  const { auth, logout } = useAuth();

  const createAddress = async (values) => {
    setLoading(true);
    const valuesTemp = {
      ...values,
      user: auth.idUser,
    };
    const response = await createAddressApi(valuesTemp, logout);
    if (!response) {
      toastError("error en crear direccion");
      setLoading(false);
    } else {
      toastSuccess("direccion creada");
      setreloadAddresses(true);
      setLoading(true);
      setOpen(false);
    }
  };

  const updateAddress = async (values) => {
    setLoading(true);
    const valueTemp = {
      ...values,
      user: auth.idUser,
    };
    const response = updateAddressApi(address.id, valueTemp, logout);
    if (!response) {
      toastError("error paps");
      setLoading(false);
    } else {
      toastSuccess("direccion creada");
      setreloadAddresses(true);
      setLoading(true);
      setOpen(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues(address)}
      validationSchema={Yup.object().shape(validationSchema())}
      onSubmit={async (values, { resetForm }) => {
        newAddress ? createAddress(values) : updateAddress(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <section className="w-full">
            <div className="sm:grid grid-cols-2 gap-6 mt-5">
              <div>
                <Label type={"name"} text={"Name"} />
                <Input type={"text"} name={"name"} placeholder={"Name"} />
                {errors.name && touched.name ? (
                  <Alert type="error">{errors.name}</Alert>
                ) : null}
              </div>
              <div>
                <Label type="title" text="Title" />
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter your title address"
                />
                {errors.title && touched.title ? (
                  <Alert type="error">{errors.title}</Alert>
                ) : null}
              </div>
            </div>
            <div className="mt-3">
              <Label type="address" text="Address" />
              <Input
                type="text"
                name="address"
                placeholder="Enter your address"
              />
              {errors.address && touched.address ? (
                <Alert type="error">{errors.address}</Alert>
              ) : null}
            </div>
            <div className="mt-3">
              <Label type="phone" text="Phone" />
              <Input type="tel" name="phone" placeholder="Enter your phone" />
              {errors.phone && touched.phone ? (
                <Alert type="error">{errors.phone}</Alert>
              ) : null}
            </div>
            <div className="sm:grid grid-cols-3 gap-6 mt-5">
              <div>
                <Label type="city" text="City" />
                <Input type="text" name="city" placeholder="Enter your city" />
                {errors.city && touched.city ? (
                  <Alert type="error">{errors.city}</Alert>
                ) : null}
              </div>
              <div>
                <Label type="state" text="State" />
                <Input
                  type="text"
                  name="state"
                  placeholder="Enter your state"
                />
                {errors.state && touched.state ? (
                  <Alert type="error">{errors.state}</Alert>
                ) : null}
              </div>
              <div>
                <Label type="postalCode" text="Postal code" />
                <Input
                  type="text"
                  name="postalCode"
                  placeholder="Enter your postal code"
                />
                {errors.postalCode && touched.postalCode ? (
                  <Alert type="error">{errors.postalCode}</Alert>
                ) : null}
              </div>
            </div>
            <div className="text-right mt-10">
              <Submit loading={loading}>
                {newAddress ? "Create Direccion" : "Update Direction"}
              </Submit>
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
}

function initialValues(address) {
  return {
    title: address?.attributes?.title || "",
    name: address?.attributes?.name || "",
    address: address?.attributes?.address || "",
    city: address?.attributes?.city || "",
    state: address?.attributes?.state || "",
    postalCode: address?.attributes?.state || "",
    phone: address?.attributes?.phone || "",
  };
}
function validationSchema() {
  return {
    title: Yup.string().required("required"),
    name: Yup.string().required("required"),
    address: Yup.string().required("required"),
    city: Yup.string().required("required"),
    state: Yup.string().required("required"),
    postalCode: Yup.string().required("required"),
    phone: Yup.string().required("required"),
  };
}
