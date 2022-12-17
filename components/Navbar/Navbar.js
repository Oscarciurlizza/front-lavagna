import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategoryApi } from "../../api/category";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  console.log(categories)

  useEffect(() => {
    (async () => {
      const response = await getCategoryApi();
      setCategories(response.data || []);
    })();
  }, []);
  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 pt-28 pb-6">
      <nav className="sm:flex justify-between items-center">
        {
          categories.map(category => (
            <Link href={`/products/${category.attributes.url}`} className="text-gray-700 text-base font-normal">
              {category.attributes.title}
            </Link>
          ))
        }
      </nav>
    </div>

  );
}
