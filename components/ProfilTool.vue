<script setup lang="ts">
import { MenuButton, Menu, MenuItems } from "@headlessui/vue";

const navigation = getNavigation("profile");

const user = useSupabaseUser();
const supabase = useSupabaseAuthClient();

const profile = computed(() => user.value?.user_metadata.avatar_url);

const default_avatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

async function Logout() {
  await supabase.auth.signOut();
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
        <img
          class="h-8 w-8 rounded-full"
          :src="profile || default_avatar"
          alt=""
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
          @click="Logout"
        >
          {{ $t("navigation.logout") }}
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>