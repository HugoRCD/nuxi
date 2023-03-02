import { createUserInput, User } from "~/types/user";

export async function useUser() {
  const { data, error } = await useFetch<User>("/api/auth/user");
  if (data.value) {
    console.log(data.value);
  }
}