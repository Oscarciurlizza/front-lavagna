import { Form, Formik } from "formik";
import * as Yup from "yup";
import Alert from "../../Alert";
import { updateNameApi } from "../../../api/users";
import { useState } from "react";
import Label from "../../Form/Label";
import Input from "../../Form/Input";
import Submit from "../../Form/Submit";
import { toastError, toastSuccess } from "../../../utils/toast";

export default function ChangeNameForm({ user, logout, setReloadUser }) {
  const [loading, setLoading] = useState(false);
  const { username, name, lastname, id } = user;

  return (
    <Formik
      initialValues={initialValues(username, name, lastname)}
      validationSchema={Yup.object().shape(validationSchema())}
      onSubmit={async (values) => {
        console.log(values);
        setLoading(true);
        const response = await updateNameApi(id, values, logout);
        if (!response) {
          toastError("mal papi");
        } else {
          setReloadUser(true);
          toastSuccess("Bien papis");
        }
        setLoading(false);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="sm:grid grid-cols-2">
            <section>
              <h2 className="text-gray-800 font-medium">Profile Details</h2>
              <p className="text-sm text-gray-600 mt-3 max-w-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                placeat illo molestiae voluptatum saepe nisi odio asperiores
                doloribus nam quo.
              </p>
            </section>
            <section>
              <div className="sm:grid grid-cols-2 gap-6 mt-5">
                <div>
                  <Label type="name" text="Username" />
                  <Input
                    type="text"
                    name="username"
                    placeholder="Enter your new username"
                  />
                  {errors.username && touched.username ? (
                    <Alert type="error">{errors.username}</Alert>
                  ) : null}
                </div>
                <div>
                  <Label type="name" text="Name" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                  />
                  {errors.name && touched.name ? (
                    <Alert type="error">{errors.name}</Alert>
                  ) : null}
                </div>
              </div>
              <div className="mt-3">
                <Label type="lastname" text="Lastname" />
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Enter your lastname"
                />
                {errors.lastname && touched.lastname ? (
                  <Alert type="error">{errors.lastname}</Alert>
                ) : null}
              </div>
              <div className="mt-3">
                <Label type="photo" text="Cover photo" />
                <div className="mt-3 flex justify-center border border-dashed border-gray-800 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <Path />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white font-medium text-gray-900"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="photo"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right mt-10">
                <Submit loading={loading}>Change my name</Submit>
              </div>
            </section>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function initialValues(username, name, lastname) {
  return {
    username: username || "",
    name: name || "",
    lastname: lastname || "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required("required"),
    name: Yup.string().required("required"),
    lastname: Yup.string().required("required"),
  };
}

function Path() {
  return (
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
