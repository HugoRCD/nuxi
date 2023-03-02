import { useUser } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async () => {
  await useUser();
  const user = useUserStore().getUser;
  if (!user) {
    return "/auth/login";
  }
  if (!user.isVerified) {
    return "/verify/user";
  }
});