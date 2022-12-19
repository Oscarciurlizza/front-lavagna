import toast from "react-hot-toast";

export const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    style: {
      backgroundColor: "#eff6ff",
      fontWeight: "normal",
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
      backgroundColor: "#fef2f2",
      fontWeight: "normal",
      fontSize: ".9rem",
      border: "2px solid #000",
    },
  });
};
