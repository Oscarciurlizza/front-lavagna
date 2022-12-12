import Link from "next/link";

const PrimaryButton = ({ children }) => {
  return (
    <Link href="signup">
      <a className="bg-gray-900 text-gray-200 text-xs font-semibold px-6 py-3 rounded-lg">
        {children}
      </a>
    </Link>
  );
};

export default PrimaryButton;
