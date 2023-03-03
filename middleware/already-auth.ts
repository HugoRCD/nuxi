export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useUserStore().getUser;
  if (user) {
    return "/";
  }
})