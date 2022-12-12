const AuthButton = ({ loading, children }) => {
  return (
    <button
      type="submit"
      className="w-full bg-blue-700 text-sm text-gray-200 font-normal hover:bg-gray-700 py-4 px-3"
    >
      {loading ? <span className="loader"></span> : children}
    </button>
  );
};

export default AuthButton;
