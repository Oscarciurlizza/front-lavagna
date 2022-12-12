import React from "react";

const PrimaryButton = ({ loading, size, children }) => {
  return (
    <button
      type="submit"
      className={`${
        size === "small" ? "w-32 p-2" : "w-full py-4 px-3"
      } bg-blue-700 text-sm text-gray-200 font-normal hover:bg-gray-700`}
    >
      {loading ? <span className="loader"></span> : children}
    </button>
  );
};

export default PrimaryButton;
