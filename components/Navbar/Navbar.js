import Link from "next/link";

export default function Navbar({ categories }) {
  console.log(categories)
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pt-28 pb-6">
      <nav className="sm:flex justify-between items-center">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products/${category.attributes.url}`}
            className="text-gray-700 text-base font-normal"
          >
            {category.attributes.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
