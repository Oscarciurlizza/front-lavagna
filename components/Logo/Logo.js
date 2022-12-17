import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/logo.svg" width={130} height={150} alt="logo-lavagna" className="w-auto h-auto" />
    </Link>
  );
}
