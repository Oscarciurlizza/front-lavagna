import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getMeApi } from "../api/users";
import useAuth from "../hooks/useAuth";

import Account from "../components/Account";
import Layout from "../components/Layout";

export default function Profile() {
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
