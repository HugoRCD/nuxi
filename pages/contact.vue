<script setup lang="ts">
import Footer from "@/components/layout/Footer.vue";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/vue/24/outline";
const { t } = useI18n();

definePageMeta({
  name: "Contact",
  title: "Contact",
  description: "Contact us",
});

const ticketValues = [
  { name: t("contact.ticket_type_question"), value: "0c61f7c3-4951-4b99-8091-c9e7ac8974c3" },
  { name: t("contact.ticket_type_bug"), value: "d8f17993-72f0-4326-b269-b2c011ce9301" },
  { name: t("contact.ticket_type_suggestion"), value: "811dc093-8908-4c20-8ae9-258a4f3b2f53" },
  { name: t("contact.ticket_type_feature"), value: "33ec183f-643b-409e-9cd9-be3193d8b3c1" },
];

const email = ref("");
const message = ref("");
const ticket_type = ref("");
const phone = ref("");
const fullname = ref("");

const loading = ref(false);

async function submitForm() {
  loading.value = true;
  const { data } = await useFetch("/api/support", {
    method: "POST",
    body: {
      email: email.value,
      message: message.value,
      ticket_type: ticket_type.value,
      phone: phone.value,
      fullname: fullname.value,
    },
  });
  if (data) {
    email.value = "";
    message.value = "";
    ticket_type.value = "";
    phone.value = "";
    fullname.value = "";
    useSuccessToast(t("contact.success"));
  } else {
    useErrorToast(t("contact.error"));
  }
  loading.value = false;
}
</script>

<template>
  <div class="relative bg-primary">
    <div class="absolute inset-0">
      <div class="absolute inset-y-0 left-0 w-1/2" />
    </div>
    <div class="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
      <div class="py-16 px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
        <div class="mx-auto max-w-lg">
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl text-gradient">
            {{ t("contact.title") }}<span class="text-primary ml-2">.</span>
          </h2>
          <p class="mt-3 text-lg leading-6 text-muted">
            {{ t("contact.description") }}
          </p>
          <dl class="mt-8 text-base text-muted">
            <dd>
              <p>113 Boulevard René Cassin</p>
              <p>06200 Nice, France</p>
            </dd>
            <div class="mt-6">
              <dd class="flex">
                <PhoneIcon class="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <span class="ml-3">(+33) 6 21 56 22 18</span>
              </dd>
            </div>
            <div class="mt-3">
              <dt class="sr-only">Email</dt>
              <dd class="flex">
                <EnvelopeIcon class="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <span class="ml-3">contact@nuxi.fr</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="py-16 px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
        <div class="mx-auto max-w-lg lg:max-w-none">
          <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-y-6">
            <div>
              <label for="fullname" class="sr-only">
                {{ t("contact.fullname") }}
              </label>
              <input
                v-model="fullname"
                type="text"
                required
                name="fullname"
                id="full-name"
                autocomplete="name"
                class="input w-full"
                :placeholder="t('contact.fullname')"
              />
            </div>
            <div>
              <label for="email" class="sr-only">
                {{ t("contact.email") }}
              </label>
              <input
                required
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="input w-full"
                :placeholder="t('contact.email')"
              />
            </div>
            <div>
              <label for="phone" class="sr-only">
                {{ t("contact.phone") }}
              </label>
              <input
                v-model="phone"
                type="text"
                name="phone"
                id="phone"
                autocomplete="tel"
                class="input w-full"
                :placeholder="t('contact.phone')"
              />
            </div>
            <div>
              <label for="text" class="sr-only">
                {{ t("contact.ticket_type") }}
              </label>
              <select required v-model="ticket_type" id="ticket_type" name="ticket_type" class="input w-full">
                <option value="" disabled selected>
                  {{ t("contact.ticket_type") }}
                </option>
                <option v-for="ticket in ticketValues" :value="ticket.value" :key="ticket.value">
                  {{ ticket.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="message" class="sr-only">
                {{ t("contact.message") }}
              </label>
              <textarea
                required
                v-model="message"
                id="message"
                name="message"
                rows="4"
                class="input w-full"
                :placeholder="t('contact.message')"
              />
            </div>
            <ButtonPrimary type="submit" :pending="loading">
              {{ t("contact.submit") }}
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
