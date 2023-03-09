<script setup lang="ts">
import ButtonPrimary from "~/components/ButtonPrimary.vue";
import LanguageSelector from "~/components/settings/LanguageSelector.vue";
const { t } = useI18n();

definePageMeta({
  name: "reset-password",
  title: "Reset Password",
  description: "Reset Password",
});

const password = ref("");
const passwordConfirmation = ref("");

const token = useRoute().params.token;

const loading = ref<boolean>(false);

const disabled = computed(() => {
  return password.value.length < 8 || password.value !== passwordConfirmation.value;
});

async function resetPassword() {
  loading.value = true;
  const { data, error } = await useFetch("/api/auth/password/reset", {
    method: "POST",
    body: {
      token,
      password: password.value,
    },
  });
  if (data.value) {
    useSuccessToast(t("password.password_reset_success"));
    useRouter().push("/login");
  } else if (error.value?.statusMessage === "user_not_found") {
    useErrorToast(t("error.user_not_found"));
  } else {
    useErrorToast(t("error.unknown_error"));
  }
  loading.value = false;
}
</script>

<template>
  <div class="flex flex-col justify-center py-40 px-6 lg:px-8">
    <div>
      <Logo :isText="false" class="flex justify-center" :size="12" />
      <h2 class="text-center mt-6 text-3xl font-bold tracking-tight text-primary">
        {{ $t("password.reset_password") }}
      </h2>
      <p class="my-6 text-center text-sm text-muted">
        {{ $t("password.enter_new_password") }}
      </p>
    </div>
    <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
      <form class="space-y-4" @submit.prevent="resetPassword">
        <input
          id="password"
          name="password"
          required
          :placeholder="$t('password.password')"
          type="password"
          class="input w-full"
          v-model="password"
        />
        <input
          id="password_confirmation"
          name="password_confirmation"
          required
          :placeholder="$t('password.confirm_password')"
          type="password"
          class="input w-full"
          v-model="passwordConfirmation"
        />
        <span class="text-sm text-muted text-red-600" v-if="disabled">
          {{ $t("password.password_required") }}
        </span>
        <ButtonPrimary
          :full-width="true"
          :pending="loading"
          :disabled="disabled"
          :class="disabled ? 'opacity-50 cursor-not-allowed' : ''"
          type="submit"
          :text="$t('password.send')"
        />
      </form>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col justify-center items-center">
      <LanguageSelector :is-text="true" class="mt-6" />
    </div>
  </div>
</template>
