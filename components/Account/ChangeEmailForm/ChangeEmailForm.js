import { Formik, Form, Field } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { updateEmailApi } from "../../../api/users";
import Alert from "../../Alert";
import Label from "../../Form/Label/Label";
import Input from "../../Form/Input/Input";
import Submit from "../../Form/Submit/Submit";
import { toastError, toastSuccess } from "../../../utils/toast";

export default function ChangeEmailForm({ user, logout, setReloadUser }) {
  const [loading, setLoading] = useState(false);
  const { email, id } = user;

  return (
    <Formik
      initialValues={initialValues()}
      validationSchema={Yup.object().shape(validationSchema())}
      onSubmit={async (values) => {
        setLoading(true);
        const response = await updateEmailApi(id, values.email, logout);
        if (
          !response ||
          response?.error?.status === 403 ||
          response?.error?.status === 400
        ) {
          toastError("Error papi");
        } else {
          setReloadUser(true);
          toastSuccess("bien papi");
        }
        setLoading(false);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="sm:grid grid-cols-2">
            <section>
              <h2 className="flex gap-2 text-gray-900 font-medium">
                Account Details
                <span className="bg-gray-900 text-gray-200 text-xs py-1 px-2">
                  {email}
                </span>
              </h2>
              <p className="sm:max-w-sm text-sm text-gray-500 mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                dolore a dolores ipsa incidunt possimus eligendi cum eveniet
                magni sunt.
              </p>
            </section>
            <section>
              <div className="sm:grid grid-cols-2 gap-6 mt-5">
                <div>
                  <Label type={"email"} text={"Email"} />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && touched.email ? (
                    <Alert type="error">{errors.email}</Alert>
                  ) : null}
                </div>
                <div>
                  <Label type="email" text="Confirm E-mail" />
                  <Input
                    type="email"
                    name="repeatEmail"
                    placeholder="Repeat your email"
                  />
                  {errors.repeatEmail && errors.repeatEmail ? (
                    <Alert type="error">{errors.repeatEmail}</Alert>
                  ) : null}
                </div>
              </div>
              <div className="text-right mt-10">
                <Submit loading={loading}>Update</Submit>
              </div>
            </section>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function initialValues(email, repeatEmail) {
  return {
    email: email || "",
    repeatEmail: repeatEmail || "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email()
      .required("required")
      .oneOf([Yup.ref("repeatEmail")], "The email is different"),
    repeatEmail: Yup.string()
      .email()
      .required("required")
      .oneOf([Yup.ref("email")], "The email is different"),
  };
}
