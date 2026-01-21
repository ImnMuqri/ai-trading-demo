<template>
  <div class="px-2">
    <UiCard class="w-full p-4 text-white bg-[#0F0F0F]">
      <div class="flex items-center justify-between" @click="toggle">
        <span
          class="flex w-[90%] justify-start items-center font-semibold text-lg text_tpt_green place-self-start gap-4"
        >
          <p
            class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#00BDA7] to-[#A3D0E6] text-[12px] leading-none text_tpt_green !shadow-xl"
          >
            <span>
              {{ index + 1 }}
            </span>
          </p>

          <p class="text-sm">
            {{ isDate(title) ? $formatDate(title, { withTime: true }) : title }}
          </p>
          <div><slot name="appendTitle"></slot></div>
        </span>
        <UiIcon
          :icon="isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'"
          class="text-lg"
        />
      </div>
      <transition name="fade">
        <ul v-if="isOpen" class="py-2">
          <hr class="py-2 border-[#1C1C1C]" />
          <li
            v-for="(field, idx) in displayFields"
            :key="idx"
            class="flex justify-between gap-2 text-[13px]"
          >
            <span class="font-medium">{{ field.label }}:</span>
            <span class="font-light">
              <template v-if="isDate(items[field.key])">
                {{ $formatDate(items[field.key], { withTime: true }) }}
              </template>
              <template v-else>
                <slot name="format" :field="field" :value="items[field.key]">
                  {{ items[field.key] ?? "No Data" }}
                </slot>
              </template>
            </span>
          </li>
        </ul>
      </transition>
      <span class="text-white">
        {{ items.length }}
      </span>
      <transition name="fade">
        <div v-if="$slots.actions && isOpen" class="pt-2">
          <hr class="pb-4 border-[#1C1C1C]" />
          <div class="flex justify-end">
            <slot name="actions" />
          </div>
        </div>
      </transition>
    </UiCard>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  title: [String, Number],
  items: {
    type: Object,
    default: () => ({}),
  },
  map: {
    type: Array,
    default: () => [],
  },
  index: {
    type: Number,
    default: null,
  },
});

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const displayFields = computed(() =>
  props.map.filter((f) => f.key !== "actions"),
);

const isDate = (value) => {
  if (!value || typeof value !== "string") return false;

  // ISO 8601 (backend format)
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(value);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
