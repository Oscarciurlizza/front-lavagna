const Alert = ({ type, children }) => {
  return (
    <div
      className={`w-full px-3 py-2 bg-red-100 mt-2 border-l-2 ${
        type === "error" && "border-red-300"
      }`}
    >
      <p
        className={`text-xs font-normal ${type === "error" && "text-red-400"}`}
      >
        {children}
      </p>
    </div>
  );
};

export default Alert;
