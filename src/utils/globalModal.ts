import Swal from "sweetalert2";

export const errorModal = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  });
};
