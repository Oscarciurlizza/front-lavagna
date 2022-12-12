import toast from "react-hot-toast";

export const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    style: {
      backgroundColor: "#e0f2fe",
      fontWeight: "bold",
      fontSize: ".9rem",
      border: "2px solid #000",
    },
  });
};

export const toastError = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    style: {
      backgroundColor: "#fecaca",
      fontWeight: "bold",
      fontSize: ".9rem",
      border: "2px solid #000",
    },
  });
};
