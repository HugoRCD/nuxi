<script setup lang="ts">
import { MenuButton, Menu, MenuItems } from "@headlessui/vue";
const { t } = useI18n();

const navigation = getNavigation("profile");
const userStore = useUserStore();

const user = userStore.getUser;

async function logout() {
  const { data } = await useFetch("/api/auth/logout", {
    method: "POST",
  });
  if (data.value) {
    console.log(data.value);
  }
  useSuccessToast(t("profile.logout"));
  userStore.logout();
  useRouter().push("/auth/login");
}
</script>

<template>
  <Menu as="div" class="relative ml-3">
    <div>
      <MenuButton
        class="flex rounded-full bg-gray-800 text-sm focus:outline-none"
      >
        <span class="sr-only">Open user menu</span>
        <nuxt-img
          preload
          class="h-10 w-10 rounded-full object-cover"
          :src="user.avatar"
          sizes="sm:100vw md:50vw lg:400px"
          :alt="user.username"
        />
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-secondary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          :id="item.name.toLowerCase()"
          class="block px-4 py-2 text-sm text-primary hover:bg-accent-faded hover:text-accent"
        >{{ $t("navigation." + item.name.toLowerCase()) }}
        </NuxtLink>
        <hr class="my-1 border-primary" />
        <div
          class="block px-4 py-2 text-sm text-gray-400 hover:bg-red-700 hover:text-white cursor-pointer"
          @click="logout"
        >
          {{ $t("navigation.logout") }}
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>