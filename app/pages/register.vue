<template>
  <div
    class="min-h-screen flex items-center justify-center overflow-hidden bg-[#0C0E12]"
  >
    <div
      class="register-bg flex flex-col w-full min-h-[657px] max-w-[410px] p-6 lg:px-10 rounded-md"
    >
      <div class="flex flex-col justify-center my-4 gap-2">
        <h1 class="text-4xl font-semibold text-center text-white">Sign Up</h1>
        <p class="text-[#838383] text-center">Please fill in your details</p>
      </div>

      <form @submit.prevent="handleRegister" class="text-gray-700">
        <div :class="['mb-6', hasErrors ? 'space-y-3' : 'space-y-6']">
          <div>
            <UiInput
              dark
              v-model="name"
              placeholder="Name"
              :isDisabled="isLoading"
              type="text"
            >
              <template #icon-left>
                <UiIcon icon="hugeicons:user-03" custom-class="text-gray-300" />
              </template>
            </UiInput>
            <p
              class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]"
              :class="{
                hidden: !hasErrors && !errors.name,
                invisible: hasErrors && !errors.name,
              }"
            >
              {{ errors.name }}
            </p>
          </div>
          <div>
            <UiInput
              dark
              v-model="email"
              placeholder="Email"
              :isDisabled="isLoading"
              type="email"
            >
              <template #icon-left>
                <UiIcon
                  icon="hugeicons:mail-01"
                  custom-class="text-gray-300"
                /> </template
            ></UiInput>
            <p
              class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]"
              :class="{
                hidden: !hasErrors && !errors.email,
                invisible: hasErrors && !errors.email,
              }"
            >
              {{ errors.email }}
            </p>
          </div>
          <div>
            <UiInput
              dark
              v-model="password"
              placeholder="Password"
              :isDisabled="isLoading"
              type="password"
            >
              <template #icon-left>
                <UiIcon
                  icon="heroicons:lock-closed"
                  custom-class="text-gray-300"
                /> </template
            ></UiInput>
            <p
              class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]"
              :class="{
                hidden: !hasErrors && !errors.password,
                invisible: hasErrors && !errors.password,
              }"
            >
              {{ errors.password }}
            </p>
          </div>
          <div>
            <UiInput
              dark
              v-model="country"
              placeholder="Malaysia"
              :isDisabled="isLoading"
              type="text"
            >
              <template #icon-left>
                <UiIcon
                  icon="hugeicons:globe-02"
                  custom-class="text-gray-300"
                /> </template
            ></UiInput>
            <p
              class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]"
              :class="{
                hidden: !hasErrors && !errors.country,
                invisible: hasErrors && !errors.country,
              }"
            >
              {{ errors.country }}
            </p>
          </div>
          <div :class="isPhone ? 'hidden' : 'opacity-100'">
            <UiInput
              dark
              v-model="phone"
              placeholder="Phone Number"
              :isDisabled="isLoading"
              type="tel"
            >
              <template #icon-left>
                <UiIcon
                  icon="heroicons:phone"
                  custom-class="text-gray-300"
                /> </template
            ></UiInput>
            <p
              class="text-red-500 text-[10px] pt-1 pl-2 min-h-[16px]"
              :class="{
                hidden: !hasErrors && !errors.phone,
                invisible: hasErrors && !errors.phone,
              }"
            >
              {{ errors.phone }}
            </p>
          </div>
          <div :class="isPhone ? 'opacity-100' : 'hidden'">
            <UiInput
              dark
              v-model="phone"
              placeholder="Phone Number"
              :isDisabled="isLoading"
              type="tel"
            >
              <template #icon-left>
                <UiIcon
                  icon="heroicons:phone"
                  custom-class="text-gray-300"
                /> </template
            ></UiInput>
          </div>
          <div>
            <UiInput
              dark
              v-model="referredBy"
              placeholder="Referral code (optional)"
              :isDisabled="isLoading"
              type="text"
            >
              <template #icon-left>
                <UiIcon
                  icon="codex:brackets"
                  custom-class="text-gray-300 text-[20px]"
                /> </template
            ></UiInput>
          </div>
        </div>
        <UiButton
          :isLoading="isLoading"
          type="submit"
          class="w-full bg-[#9747FF] hover:bg-[#9747FF] border border-[#E4CFFF] text-white py-4 !rounded-[41px]"
        >
          Register
        </UiButton>
      </form>
      <NuxtLink
        to="/login"
        class="flex gap-1 text-[12px] items-center justify-center mt-4 text-white cursor-pointer"
      >
        <UiIcon icon="weui:back-outlined" customClass="w-2 h-2"></UiIcon>
        <p class="font-medium">Back to login</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { showToast } from "~/composables/useToastMessage";

definePageMeta({
  layout: "default",
});

const auth = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");
const country = ref("");
const phone = ref("");
const referredBy = ref(null);
const isLoading = ref(false);
const isPhone = ref(false);

const errors = ref({
  name: "",
  email: "",
  password: "",
  country: "",
  phone: "",
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const toNull = (value) => {
  return value === "" ? null : value;
};

const hasErrors = computed(() => Object.values(errors.value).some(Boolean));

const validateForm = () => {
  // reset errors
  errors.value = {
    name: "",
    email: "",
    password: "",
    country: "",
    phone: "",
  };

  let isValid = true;

  if (!name.value) {
    errors.value.name = "Name is required";
    isValid = false;
  }
  if (!country.value) {
    errors.value.country = "Country is required";
    isValid = false;
  }
  if (!phone.value) {
    errors.value.phone = "Phone is required";
    isValid = false;
  }

  if (!email.value) {
    errors.value.email = "Email is required";
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    errors.value.email = "Invalid email format";
    isValid = false;
  }

  if (!password.value) {
    errors.value.password = "Password is required";
    isValid = false;
  } else if (password.value.length < 7) {
    errors.value.password = "Password must be at least 8 characters";
    isValid = false;
  }

  return isValid;
};

const handleRegister = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  try {
    await auth.register({
      name: toNull(name.value),
      email: toNull(email.value),
      password: toNull(password.value),
      country: toNull(country.value),
      phone: toNull(phone.value),
      referredBy: toNull(referredBy.value),
    });

    showToast("Account created, please login", "success");
    navigateTo("/login");
  } catch (error) {
    showToast(error.message || "Registration failed", "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.register-bg {
  background-image: url("~/assets/bg/registerOverlay.svg"),
    url("~/assets/bg/registerBg.svg");
  background-repeat: no-repeat, no-repeat;
  background-size: cover, cover;
  background-position: center, center;
}
</style>
