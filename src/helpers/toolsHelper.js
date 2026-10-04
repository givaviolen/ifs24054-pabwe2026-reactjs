import Swal from "sweetalert2";

export const showSuccessDialog = (title, text) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
  });
};

export const showErrorDialog = (title, text) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
  });
};

export const showConfirmDialog = (title, text) => {
  return Swal.fire({
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya",
    cancelButtonText: "Batal",
  });
};

export const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};
