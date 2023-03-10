<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
const navigation = getNavigation("home");
const user = computed(() => useUserStore().getUser);
const { t } = useI18n();

const search = ref("");
const router = useRouter();

function searchHandler() {
  if (search.value.length > 0) {
    useRouter().push("/search?q=" + search.value);
  } else {
    if (router.currentRoute.value.path === "/search") {
      useRouter().push("/");
    }
  }
}

watch(search, searchHandler, { immediate: true });
</script>

<template>
  <header class="backdrop-blur-lg bg-primary-opacity/40 sticky top-0 z-50">
    <nav class="mx-auto flex max-w-7xl items-center justify-between py-3 px-4">
      <div class="flex flex-1 items-center">
        <div class="hidden lg:flex lg:gap-x-12">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            :id="item.name.toLowerCase()"
            class="text-sm font-semibold leading-6 text-primary hover:text-accent"
            >{{ $t("navigation." + item.name.toLowerCase()) }}
          </NuxtLink>
        </div>
        <Menu as="div" class="relative inline-block text-left lg:hidden">
          <div>
            <MenuButton
              class="inline-flex w-full justify-center rounded-md font-medium text-primary focus:outline-none"
            >
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="w-6 h-6" />
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
              class="absolute left-0 w-56 origin-top-left bg-secondary rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-600"
            >
              <div class="px-4 py-3" v-if="user">
                <p class="text-sm">Signed in as</p>
                <p class="truncate text-sm font-medium text-accent">{{ user.email }}</p>
              </div>
              <div>
                <MenuItem v-slot="{ active }" v-for="item in navigation" :key="item.name">
                  <NuxtLink
                    :to="item.to"
                    :id="item.name.toLowerCase()"
                    :class="[
                      active || item.name === $route.name ? 'bg-accent-faded text-accent' : 'text-primary',
                      'block w-full px-4 py-2 text-left text-sm',
                    ]"
                  >
                    {{ $t("navigation." + item.name.toLowerCase()) }}
                  </NuxtLink>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <Logo :isText="true" :size="6" />
      <div class="flex flex-1 justify-end items-center gap-x-4">
        <div v-if="!user" class="hidden lg:flex lg:gap-x-4">
          <NuxtLink to="/auth/login" class="btn-primary py-1">{{ $t("navigation.login") }}</NuxtLink>
          <NuxtLink to="/auth/signup" class="btn-secondary py-1">{{ $t("navigation.signup") }}</NuxtLink>
        </div>
        <div v-else class="flex gap-x-4 items-center">
          <div class="relative flex-grow items-stretch focus-within:z-10 hidden md:flex">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon class="w-4 h-4" />
            </div>
            <input
              type="text"
              class="bg-transparent block w-full border-0 py-1.5 pl-10 sm:text-sm focus:outline-none focus:ring-0 focus:border-0"
              :placeholder="t('navigation.search') + '...'"
              v-model="search"
            />
          </div>
          <ProfilTool />
        </div>
      </div>
    </nav>
    <div class="relative flex-grow items-stretch focus-within:z-10 md:hidden px-4 py-2">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon class="w-4 h-4" />
      </div>
      <input
        type="text"
        class="bg-transparent block w-full border-0 py-1.5 pl-10 sm:text-sm focus:outline-none focus:ring-0 focus:border-0"
        :placeholder="t('navigation.search') + '...'"
        v-model="search"
      />
    </div>
  </header>
</template>
