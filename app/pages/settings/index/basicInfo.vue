<template>
  <div class="grid grid-cols-1 gap-6 text-white">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-6">
        <div class="p-8 rounded-full bg-white"></div>
        <div>
          <div class="flex items-center gap-3">
            <p class="text-xl font-semibold">TrueProTech</p>
            <UiIcon
              icon="cuida:edit-outline"
              custom-class="w-4 h-4 text-[#00BDA7]"
              class="block lg:hidden" />
          </div>
          <p class="text-[12px] text-gray-400">trueprotech@gmail.com</p>
        </div>
      </div>
      <div>
        <UiButton class="hidden lg:block" variant="outline">Edit</UiButton>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 w-full lg:w-[500px]">
      <UiInput label="Name" placeholder="Enter here.." dark></UiInput>
      <UiInput label="Email" placeholder="Enter here.." dark></UiInput>
      <UiInput label="Password" placeholder="Enter here.." dark></UiInput>
      <UiInput
        label="Confirm Password"
        placeholder="Enter here.."
        dark></UiInput>
      <UiInput label="Phone Number" placeholder="Enter here.." dark></UiInput>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Basic Information",
  layout: "layout",
  middleware: "auth",
});
</script>

<style lang="scss" scoped></style>
