import { User } from "~/types/user";

export async function useUser(): Promise<User | null> {
  const authCookie = useCookie("authToken").value;
  const user = useUserStore().getUser;
  console.log("useUser", authCookie, user);

  if (authCookie && !user) {
    const cookieHeaders = useRequestHeaders(["cookie"]);
    const { data } = await useFetch<User>("/api/auth/user", {
      method: "GET",
      headers: cookieHeaders as HeadersInit,
    });
    if (!data.value) {
      return null;
    }
    useUserStore().setUser(data.value);
  }
  return user;
}