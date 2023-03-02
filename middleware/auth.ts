export default defineNuxtRouteMiddleware(async () => {
  const user = useUserStore().getUser;
  if (!user) {
    return "/auth/login";
  }
  if (!user.isVerified) {
    return "/verify/user";
  }
});