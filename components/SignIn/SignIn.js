import Alert from "../Alert";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Link from "next/link";
import { getMeApi, loginApi } from "../../api/users";
import { toastError, toastSuccess } from "../../utils/toast";
import useAuth from "../../hooks/useAuth";
import Input from "../Form/Input";
import Label from "../Form/Label";
import AuthButton from "../Buttons/AuthButton/AuthButton";

export default function SignIn({ handleCloseModal }) {
  const router = useRouter();
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { login, auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;
  if (auth && user) {
    router.replace("/");
    return null;
  }
  return (
    <div className="sm:max-w-lg mx-auto w-full py-60">
      <div>
        <h2 className="text-2xl text-gray-900 font-medium"> Hey, hello 👋</h2>
      </div>
      <Formik
        initialValues={initialValues()}
        validationSchema={Yup.object().shape(validationSchema())}
        onSubmit={async (values) => {
          setLoading(true);
          const response = await loginApi(values);
          if (response?.jwt) {
            setLoading(false);
            login(response.jwt);
            toastSuccess("bien papi gaaa");
            router.replace("/");
          } else {
            toastError("no papis ahora no");
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="mt-8 space-y-6">
            <section className="sm:grid grid-cols-2 gap-4">
              <div className="mb-4">
                <Label text={"Email"} />
                <Input
                  type={"identifier"}
                  name={"identifier"}
                  placeholder={"erenjobs@email.com"}
                />
                {errors.identifier && touched.identifier ? (
                  <Alert type="error">{errors.identifier}</Alert>
                ) : null}
              </div>
              <div>
                <Label text={"Password"} />
                <Input
                  type={"password"}
                  name={"password"}
                  placeholder={"Enter your password"}
                />
                {errors.password && touched.password ? (
                  <Alert type="error">{errors.password}</Alert>
                ) : null}
              </div>
            </section>
            <section>
              <AuthButton loading={loading}>Sign in</AuthButton>
            </section>
            <section className="flex justify-between items-center">
              <Link
                href="signup"
                className="text-center text-gray-800 text-xs font-semibold underline"
              >
                Don´t have an account?
              </Link>
              <Link
                href="/"
                className="text-center text-gray-800 text-xs font-semibold underline"
              >
                Forgot Password?
              </Link>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string().email().required("El Campo Email es Obligatorio"),
    password: Yup.string().required("El Campo Password es Obligatorio"),
  };
}
