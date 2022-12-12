import { Field } from "formik";

const Input = ({ type, name, placeholder }) => {
  return (
    <>
      <Field
        type={type}
        className="relative block w-full mt-2 appearance-none rounded-none border border-gray-200 p-3.5 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-xs"
        name={name}
        placeholder={placeholder}
      />
    </>
  );
};
export default Input;
