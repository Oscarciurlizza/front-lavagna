import Head from "next/head";
import Footer from "../Footer";
import Header from "../Header";
import TopBar from "../Header/TopBar";

export default function Layout({ title, children }) {
  return (
    <>
      <TopBar />
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content="Ecommerce-Lavagna" />
        </Head>
        <Header />
        <main className="bg-gray-50">
          {children}
        </main>
        <Footer />
      </>
    </>
  );
}
