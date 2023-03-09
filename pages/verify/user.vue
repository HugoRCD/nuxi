<script setup lang="ts">
import LanguageSelector from "~/components/settings/LanguageSelector.vue";
const { t } = useI18n();

const userStore = useUserStore();
const user = userStore.getUser;

const token = useRoute().query.token || ref<string>("");

const loading = ref<boolean>(false);

async function sendVerificationEmail() {
  const { data, error } = await useFetch("/api/auth/verify/sendVerification", {
    method: "POST",
    body: {
      email: user?.email,
    },
  });
  if (data.value) {
    useSuccessToast(t("verify.verification_code_sent_again"));
  } else if (error.value?.statusMessage === "user_not_found") {
    useErrorToast(t("error.user_not_found"));
  } else {
    useErrorToast(t("error.unknown_error"));
  }
}

async function verify() {
  loading.value = true;
  const { data, error } = await useFetch("/api/auth/verify/" + user?.email, {
    method: "POST",
    body: {
      token: token.value,
    },
  });
  if (data.value) {
    console.log(data.value);
    useSuccessToast(t("verify.verification_successful"));
    userStore.setVerified();
    useRouter().push("/");
  } else if (error.value?.statusMessage === "invalid_code") {
    useErrorToast(t("error.invalid_code"));
  } else {
    useErrorToast(t("error.unknown_error"));
  }
  loading.value = false;
}
</script>

<template>
  <div class="flex flex-col justify-center py-40 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div>
        <Logo :isText="false" class="flex justify-center" :size="12" />
        <h2 class="text-center mt-6 text-3xl font-bold tracking-tight text-primary">
          {{ $t("verify.verify_your_account") }}
        </h2>
        <p class="my-6 text-center text-sm text-muted">
          {{ $t("verify.verification_code_sent") }}
        </p>
      </div>
      <form @submit.prevent="verify" class="space-y-6">
        <input id="token" name="token" required placeholder="123456" class="input w-full" v-model="token" />
        <ButtonPrimary :full-width="true" :pending="loading" type="submit" :text="$t('verify.verify')" />
      </form>
      <p class="my-6 text-center text-sm text-muted">
        {{ $t("verify.didnt_receive_email") }}
        <span class="text-primary cursor-pointer" @click="sendVerificationEmail">
          {{ $t("verify.resend_email") }}
        </span>
      </p>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col justify-center items-center">
      <LanguageSelector :is-text="true" class="mt-6" />
    </div>
  </div>
</template>
