import Head from "next/head";
import Footer from "../Footer";
import Header from "../Header";
import Topbar from "../Header/Topbar";

export default function Layout({ title, children }) {
  return (
    <>
      <Topbar />
      <div className="sm:max-w-screen-2xl w-full mx-auto sm:px0 px-6">
        <Head>
          <title>{title}</title>
          <meta name="description" content="Ecommerce-Lavagna" />
        </Head>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
