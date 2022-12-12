import { Formik, Form, Field } from "formik";
import useAuth from "../../../hooks/useAuth";
import * as Yup from "yup";
import Alert from "../../Alert";
import { useState } from "react";
import toast from "react-hot-toast";

import { updatePasswordApi } from "../../../api/users";
import Label from "../../Form/Label";
import Input from "../../Form/Input";
import Submit from "../../Form/Submit";
import { toastError, toastSuccess } from "../../../utils/toast";

export default function ChangePasswordForm({ user, logout }) {
  const [loading, setLoading] = useState(false);
  const { id } = user;
  return (
    <Formik
      initialValues={initialValues()}
      validationSchema={Yup.object().shape(validationSchema())}
      onSubmit={async (values) => {
        setLoading(true);
        const response = await updatePasswordApi(id, values.password, logout);
        if (
          !response ||
          response?.error?.status === 403 ||
          response?.error?.status === 400
        ) {
          toastError("Mal paps con la pass");
        } else {
          toastSuccess("bien paps con las pass");
        }
        setLoading(false);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="sm:grid grid-cols-2">
            <section>
              <h2 className="text-gray-800 font-medium">
                Change your password
              </h2>
              <p className="text-sm text-gray-600 mt-3 max-w-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                dolore a dolores ipsa incidunt possimus eligendi cum eveniet
                magni sunt.
              </p>
            </section>
            <section>
              <div className="sm:grid grid-cols-2 gap-6 mt-5">
                <div>
                  <Label type="password" text="Password" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your new password"
                  />
                  {errors.password && touched.password ? (
                    <Alert type="error">{errors.password}</Alert>
                  ) : null}
                </div>
                <div>
                  <Label type="repeatPassword" text="Repeat password" />
                  <Input
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat your password"
                  />
                  {errors.repeatPassword && errors.repeatPassword ? (
                    <Alert type="error">{errors.repeatPassword}</Alert>
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

function initialValues(password, repeatPassword) {
  return {
    password: password || "",
    repeatPassword: repeatPassword || "",
  };
}

function validationSchema() {
  return {
    password: Yup.string()
      .required("required")
      .oneOf([Yup.ref("repeatPassword")], "The password different"),
    repeatPassword: Yup.string()
      .required("required")
      .oneOf([Yup.ref("password")], "The password different"),
  };
}
