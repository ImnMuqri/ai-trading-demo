<template>
  <div class="grid grid-cols-1 gap-4 text-white">
    <h1>Current Subscription</h1>
    <div class="flex justify-around p-4 border border-[#00BDA7] rounded-md">
      <div class="text-lg">
        Basic Plan
        <p class="text-[12px] text-gray-400">Current plan</p>
      </div>
      <div class="text-lg">
        192
        <p class="text-[12px] text-gray-400">Storage Used</p>
      </div>
      <div class="text-lg">
        32
        <p class="text-[12px] text-gray-400">Request Remaining</p>
      </div>
      <div class="text-lg">
        Sept 24, 2025
        <p class="text-[12px] text-gray-400">Next Billing Date</p>
      </div>
    </div>
    <div class="flex justify-around gap-4">
      <div
        class="flex flex-col items-center gap-4 w-full h-[400px] p-6 border border-[#2D2D2D] rounded-md">
        <div class="flex flex-col gap-1 items-center">
          <UiIcon icon="lucide:coffee" custom-class="w-8 h-8"></UiIcon>
          <p class="text-lg">Free</p>
          <p class="text-[12px] text-gray-400">Limited Features</p>
        </div>
        <div class="h-full w-full flex flex-col justify-between">
          <div class="grid grid-cols-1 gap-4 text-left text-sm text-gray-400">
            <p>10 Analyses per month</p>
            <p>5 reports generation</p>
            <p>100MB Storage</p>
            <p>Basic Analytics</p>
            <p>Email Support</p>
          </div>
          <UiButton class="w-full">Get Started</UiButton>
        </div>
      </div>
      <div
        class="flex flex-col items-center gap-4 w-full h-full p-6 border border-[#2D2D2D] rounded-md">
        <div class="flex flex-col gap-1 items-center">
          <UiIcon icon="lucide:coffee" custom-class="w-8 h-8"></UiIcon>
          <p class="text-lg">Free</p>
          <p class="text-[12px] text-gray-400">Limited Features</p>
        </div>
        <div class="h-full w-full flex flex-col justify-between">
          <div class="grid grid-cols-1 gap-4 text-left text-sm text-gray-400">
            <p>10 Analyses per month</p>
            <p>5 reports generation</p>
            <p>100MB Storage</p>
            <p>Basic Analytics</p>
            <p>Email Support</p>
          </div>
          <UiButton class="w-full">Get Started</UiButton>
        </div>
      </div>
      <div
        class="flex flex-col items-center gap-4 w-full h-full p-6 border border-[#2D2D2D] rounded-md">
        <div class="flex flex-col gap-1 items-center">
          <UiIcon icon="lucide:coffee" custom-class="w-8 h-8"></UiIcon>
          <p class="text-lg">Free</p>
          <p class="text-[12px] text-gray-400">Limited Features</p>
        </div>
        <div class="h-full w-full flex flex-col justify-between">
          <div class="grid grid-cols-1 gap-4 text-left text-sm text-gray-400">
            <p>10 Analyses per month</p>
            <p>5 reports generation</p>
            <p>100MB Storage</p>
            <p>Basic Analytics</p>
            <p>Email Support</p>
          </div>
          <UiButton class="w-full">Get Started</UiButton>
        </div>
      </div>
      <div
        class="flex flex-col items-center gap-4 w-full h-full p-6 border border-[#2D2D2D] rounded-md">
        <div class="flex flex-col gap-1 items-center">
          <UiIcon icon="lucide:coffee" custom-class="w-8 h-8"></UiIcon>
          <p class="text-lg">Free</p>
          <p class="text-[12px] text-gray-400">Limited Features</p>
        </div>
        <div class="h-full w-full flex flex-col justify-between">
          <div class="grid grid-cols-1 gap-4 text-left text-sm text-gray-400">
            <p>10 Analyses per month</p>
            <p>5 reports generation</p>
            <p>100MB Storage</p>
            <p>Basic Analytics</p>
            <p>Email Support</p>
          </div>
          <UiButton class="w-full">Get Started</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Subscriptions",
  layout: "layout",
  middleware: "auth",
});
</script>

<style lang="scss" scoped></style>
