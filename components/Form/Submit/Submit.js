const Submit = ({ loading, children }) => {
  return (
    <button
      type="submit"
      className="bg-gray-900 text-gray-200 text-xs font-semibold px-6 py-3 rounded-lg"
    >
      {loading ? <span className="loader"></span> : children}
    </button>
  );
};

export default Submit;
