import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getMeApi } from "../api/users";
import useAuth from "../hooks/useAuth";

import Account from "../components/Account";
import Layout from "../components/Layout";
import { BASE_PATH } from "../utils/constants";

export default function Profile({ userData }) {
  console.log(userData)
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <Layout title="Lavagna - profile">
      <Account user={user} logout={logout} setReloadUser={setReloadUser} />
    </Layout>
  );
}

export async function getServerSideProps() {
  const resUser = await fetch(`${BASE_PATH}/api/users/me`);
  const dataUser = await resUser.json();

  return {
    props: {
      userData: dataUser,
    },
  };
}
