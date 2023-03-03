<script setup lang="ts">
import AvatarUpload from "~/components/upload/AvatarUpload.vue";

definePageMeta({
  name: "Edit Profile",
  title: "Edit Profile",
  middleware: ["auth"],
});

const userStore = useUserStore();

const user = userStore.getUser;

const updateProfile = async () => {
  await userStore.updateUser();
};

const deleteAccount = async () => {
  await userStore.deleteUser();
};
</script>

<template>
  <form class="space-y-5" @submit.prevent="updateProfile">
    <div class="bg-secondary px-4 py-5 shadow sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-primary">{{ $t("profile.title") }}</h3>
          <p class="mt-1 text-sm text-muted">
            {{ $t("profile.description") }}
          </p>
        </div>
        <div class="mt-5 space-y-6 md:col-span-2 md:mt-0">
          <div id="username" class="flex items-center space-x-2">
            <label for="username" class="block text-sm font-medium text-muted">{{ $t("profile.username") }}</label>
            <input class="input" v-model="user.username" />
          </div>
          <div>
            <label for="about" class="block text-sm font-medium text-muted">{{ $t("profile.bio") }}</label>
            <div class="mt-1">
              <textarea
                id="about"
                name="about"
                rows="3"
                class="bg-primary p-3 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:outline-none focus:ring-accent focus:border-accent"
                placeholder="Hi there! I'm new here."
                v-model="user.bio"
              ></textarea>
            </div>
          </div>
          <AvatarUpload />
          <div>
            <button type="submit" class="bg-accent text-inverted px-4 py-2 rounded-md sm:text-sm">
              {{ $t("profile.update_profile") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-secondary shadow">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-primary">{{ $t("profile.delete_my_account") }}</h3>
        <div class="mt-2 max-w-xl text-sm text-muted">
          <p>{{ $t("profile.delete_my_account_description") }}</p>
        </div>
        <div class="mt-5">
          <button type="button" class="bg-red-600 text-inverted px-4 py-2 rounded-md sm:text-sm" @click="deleteAccount">
            {{ $t("profile.delete_my_account") }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
