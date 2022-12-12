import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-end gap-10 py-3.5">
      <Link href="/" className="text-sm">
        Home
      </Link>
      <Link href="/" className="text-sm">
        Today's Deals
      </Link>
      <Link href="/" className="text-sm">
        Promotions
      </Link>
      <Link href="/" className="text-sm text-blue-500">
        Trending products
      </Link>
    </nav>
  );
}
