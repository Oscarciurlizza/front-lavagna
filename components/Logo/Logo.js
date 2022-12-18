import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="text-xl flex items-center gap-2 font-bold">
      {/* <Image src="" width={40} height={50} alt="logo-lavagna" /> */}
      Logo
    </Link>
  );
}
