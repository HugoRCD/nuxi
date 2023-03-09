<script setup lang="ts">
import { Role } from "~/types/Role";
import { User } from "~/types/user";
definePageMeta({
  name: "Dashboard",
  title: "Dashboard",
});

const { data: users, pending, refresh } = await useLazyFetch<User[]>("/api/admin/users");

const editMode = ref(false);

async function updateUser(user: User) {
  if (confirm("Are you sure you want to update this user?")) {
    if (typeof user.role === "string") {
      user.role = parseInt(user.role);
    }
    await useFetch<User>("/api/user/" + user.id, {
      method: "PUT",
      body: user,
    });
    refresh();
    editMode.value = false;
  }
}

async function deleteUser(user: User) {
  if (confirm("Are you sure you want to delete user " + user.email + "?")) {
    const { data } = await useFetch("/api/admin/" + user.id, {
      method: "DELETE",
    });
    if (data.value?.statusCode === "200") {
      useSuccessToast("User deleted successfully");
      refresh();
    }
  }
}
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-primary">Users</h1>
        <p class="mt-2 text-sm text-muted">
          A list of all the users in your account including their name, title, email and role.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="btn-primary">Add user</button>
      </div>
    </div>
    <Loader v-if="pending" />
    <div class="mt-8 flex flex-col" v-else>
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-700">
              <thead class="bg-secondary">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary sm:pl-6">
                    Name
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-primary">Status</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-primary">Role</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-8 bg-secondary">
                <tr v-for="user in users" :key="user.email">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div class="flex items-center">
                      <Avatar :user="user" />
                      <div class="ml-4">
                        <div class="font-medium text-primary">{{ user.username }}</div>
                        <div class="text-muted">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span
                      class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                      >Active</span
                    >
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-primary" v-if="!editMode">
                    {{ user.role === 1 ? "User" : "Admin" }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-primary" v-else>
                    <select v-model="user.role" class="bg-secondary focus:outline-none focus:border-transparent">
                      <option :value="Role.USER">User</option>
                      <option :value="Role.ADMIN">Admin</option>
                    </select>
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      type="button"
                      class="bg-accent text-inverted px-2 py-1 rounded-md"
                      @click="editMode = !editMode"
                      v-if="!editMode"
                    >
                      Edit
                    </button>
                    <div v-else class="flex gap-3">
                      <button
                        type="button"
                        class="bg-accent text-inverted px-2 py-1 rounded-md"
                        @click="updateUser(user)"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        class="bg-secondary text-inverted px-2 py-1 rounded-md"
                        @click="editMode = !editMode"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button class="text-red-600 hover:text-red-900" @click="deleteUser(user)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
