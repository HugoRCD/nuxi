export function useSuccessToast(title: string) {
  const { $swal } = useNuxtApp();
  const theme = useGlobalStore().getTheme;
  const toastTheme = theme.includes("light") ? "light" : "dark";
  $swal.fire({
    icon: "success",
    title,
    timer: 1500,
    showConfirmButton: false,
    background: toastTheme === "light" ? "#ffffff" : "#232323",
    color: toastTheme === "light" ? "#232323" : "#ffffff",
    toast: true,
    position: "top-end",
  });
}

export function useErrorToast(title: string) {
  const { $swal } = useNuxtApp();
  const theme = useGlobalStore().getTheme;
  const toastTheme = theme.includes("light") ? "light" : "dark";
  $swal.fire({
    icon: "error",
    title,
    timer: 1500,
    showConfirmButton: false,
    background: toastTheme === "light" ? "#ffffff" : "#232323",
    color: toastTheme === "light" ? "#232323" : "#ffffff",
    toast: true,
    position: "top-end",
  });
}
