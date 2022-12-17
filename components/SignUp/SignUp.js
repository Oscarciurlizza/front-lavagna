import Alert from "../Alert";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Link from "next/link";
import { getMeApi, loginApi, registerApi } from "../../api/users";
import { toastError, toastSuccess } from "../../utils/toast";
import useAuth from "../../hooks/useAuth";
import Input from "../Form/Input";
import Label from "../Form/Label";
import AuthButton from "../Buttons/AuthButton/AuthButton";

export default function SignUp({ showLoginForm, title }) {
  const router = useRouter();
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

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
    <div className="sm:max-w-lg mx-auto w-full py-32">
      <div>
        <h2 className="text-left text-gray-900 text-2xl font-semibold tracking-tight mb-5">
          Get started for free 👏
        </h2>
        <p className="text-gray-400 text-sm">
          Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>
      <Formik
        initialValues={initialValues()}
        validationSchema={Yup.object().shape(validationSchema())}
        onSubmit={async (values, { resetForm }) => {
          setLoading(true);
          resetForm();
          const response = await registerApi(values);
          if (response?.jwt) {
            setLoading(false);
            toastSuccess("User created successfull");
            router.push("signin");
          } else {
            toastError("Error en registro de usuario");
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="mt-8 space-y-4">
            <section className="sm:grid grid-cols-2 gap-4">
              <div>
                <Label text={"Name"} />
                <Input type={"text"} name={"name"} placeholder={"Eren"} />
                {errors.name && touched.name ? (
                  <Alert type="error">{errors.name}</Alert>
                ) : null}
              </div>
              <div>
                <Label text={"Lastname"} />
                <Input type={"text"} name={"lastname"} placeholder={"Jobs"} />
                {errors.lastname && touched.lastname ? (
                  <Alert type="error">{errors.lastname}</Alert>
                ) : null}
              </div>
            </section>
            <div>
              <Label text={"Username"} />
              <Input
                type={"text"}
                name={"username"}
                placeholder={"Eren Jobs"}
              />
              {errors.username && touched.username ? (
                <Alert type="error">{errors.username}</Alert>
              ) : null}
            </div>
            <div>
              <Label text={"Email"} />
              <Input
                type={"email"}
                name={"email"}
                placeholder={"Enter your email"}
              />
              {errors.email && touched.email ? (
                <Alert type="error">{errors.email}</Alert>
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
            <section>
              <AuthButton loading={loading} size={"big"}>
                Get started
              </AuthButton>
            </section>
            <section className="text-center">
              <Link
                href="signin"
                className="text-center text-gray-800 text-xs font-semibold underline"
              >
                Do you have an account?
              </Link>
              <p className="block max-w-xs mx-auto text-gray-500 text-xs mt-5">
                Singin up for a Steller account means you agree to the{" "}
                <span className="underline">Privacy Policy</span> and{" "}
                <span className="underline">Terms of Service.</span>
              </p>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required("Tu Nombre es Obligatorio"),
    lastname: Yup.string().required("Tu Apellido es Obligatorio"),
    username: Yup.string().required("Necesitas un Nombre de Usuario"),
    email: Yup.string().email("Tu Email es Obligatorio").required("requerido"),
    password: Yup.string().required(),
  };
}
