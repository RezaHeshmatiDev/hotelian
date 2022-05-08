import Swal from "sweetalert2";

export const errorModal = (title?: string, text?: string) => {
  Swal.fire({
    icon: "error",
    title: title || "Oops...",
    text: text || "Something went wrong!",
  });
};
