function checkSize(file: File, size: number) {
  return file.size < size;
}

export async function useUploadAvatar(file: File) {
  if (!checkSize(file, 5000000)) {
    useErrorToast("File size is too big (max 5MB)");
    return;
  }
  const client = useSupabaseClient();
  const user = useUserStore().getUser;
  if (!user) return;
  const filename = user.username.toLowerCase();
  const { error } = await client.storage.from("avatars").upload(filename, file, {
    cacheControl: "3600",
    upsert: true,
  });
  if (error) {
    console.error(error);
    useErrorToast("Error uploading avatar");
    return;
  }
  useSuccessToast("Avatar uploaded successfully");
  const {
    data: { publicUrl },
  } = client.storage.from("avatars").getPublicUrl(filename);
  return publicUrl;
}

export async function useUploadCover(file: File) {
  if (!checkSize(file, 5000000)) {
    useErrorToast("File size is too big (max 5MB)");
    return;
  }
  const client = useSupabaseClient();
  const user = useUserStore().getUser;
  if (!user) return;
  const filename = user.username.toLowerCase() + "-cover";
  const { error } = await client.storage.from("avatars").upload(filename, file, {
    cacheControl: "3600",
    upsert: true,
  });
  if (error) {
    console.error(error);
    useErrorToast("Error uploading cover");
    return;
  }
  useSuccessToast("Cover uploaded successfully");
  const {
    data: { publicUrl },
  } = client.storage.from("avatars").getPublicUrl(filename);
  return publicUrl;
}
