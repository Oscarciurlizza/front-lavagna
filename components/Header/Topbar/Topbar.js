import {
  BuildingStorefrontIcon,
  CircleStackIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Topbar() {
  return (
    <div className="bg-gray-200">
      <div className="sm:max-w-screen-2xl w-full mx-auto flex justify-between sm:px-6 px-0 py-2">
        <section>
          <Link href="/" className="flex items-center gap-5 text-gray-500">
            <span className="text-gray-400">
              <CircleStackIcon width={20} />
            </span>
            <span className="text-xs font-medium">
              Up 7% in promotions of the entire shop !
            </span>
          </Link>
        </section>
        <section></section>
      </div>
    </div>
  );
}
