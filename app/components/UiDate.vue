<template>
  <div>
    <div
      v-if="icon"
      class="group h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer"
      @click="toggleOpen"
    >
      <UiIcon
        :icon="icon"
        :class="[
          open ? 'text-[#00BDA7]' : 'text-white',
          'group-hover:text-[#00BDA7]',
        ]"
      />
    </div>
    <div v-show="open || !icon">
      <VueDatePicker
        ref="dp"
        :model-value="pickerValue"
        @update:model-value="onPickerChange"
        @closed="handleClosed"
        :format="formatLabel"
        :auto-apply="props.autoApply"
        :text-input="props.textInput"
        :enable-time-picker="props.time"
        :range="props.range"
        :ui="uiStyles"
        :teleport="props.teleport"
        :clearable="!icon"
        class=""
        :flow="props.time ? selectedFlow : undefined"
        :min-date="props.minDate"
        :max-date="props.maxDate"
      >
        <template #dp-input="{ value, updateValue }">
          <div class="flex items-center gap-2">
            <UiInput
              v-if="!icon"
              dark
              :label="props.label"
              :model-value="value"
              @update:model-value="updateValue"
              :placeholder="props.placeholder"
              :class="props.inputClass"
            />

            <div v-else class="w-0 h-0 overflow-hidden" @click.stop></div>
          </div>
        </template>
      </VueDatePicker>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  modelValue: [Date, String, Number, Array, Object, null],
  label: { type: String, default: "" },
  placeholder: { type: String, default: "Select Date" },
  textInput: { type: Boolean, default: true },
  autoApply: { type: Boolean, default: true },
  time: { type: Boolean, default: false },
  escClose: { type: Boolean, default: true },
  teleport: { type: Boolean, default: true },
  minDate: { type: [Date, String], default: null },
  maxDate: { type: [Date, String], default: null },
  flow: { type: Array, default: () => [] },
  inputClass: { type: String, default: "" },
  range: { type: Boolean, default: false },
  icon: { type: String, default: null },
});

const dp = ref();
const open = ref(!props.icon);

const emit = defineEmits(["update:modelValue"]);

const uiStyles = {
  menu: "!border-[#323232] !rounded-[5px] !shadow-lg",
};

const selectedFlow = ref(["calendar", "time"]);

const pad = (n) => String(n).padStart(2, "0");

function formatAMPM(date) {
  let hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${pad(hours)}:${minutes} ${ampm}`;
}

const toDateValue = (val) => {
  if (val == null) return null;
  if (Array.isArray(val)) return val.map((v) => (v ? new Date(v) : null));
  if (val instanceof Date) return val;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
};

const formatData = (val) => {
  if (val == null) return null;
  if (Array.isArray(val))
    return val.map((d) =>
      d
        ? props.time
          ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
              d.getDate(),
            )} ${formatAMPM(d)}`
          : `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
        : null,
    );
  return props.time
    ? `${val.getFullYear()}-${pad(val.getMonth() + 1)}-${pad(
        val.getDate(),
      )} ${formatAMPM(val)}`
    : `${val.getFullYear()}-${pad(val.getMonth() + 1)}-${pad(val.getDate())}`;
};

const formatLabel = (val) => {
  if (!val) return "";
  if (Array.isArray(val))
    return val
      .map((d) =>
        d
          ? props.time
            ? `${pad(d.getDate())}/${pad(
                d.getMonth() + 1,
              )}/${d.getFullYear()} ${formatAMPM(d)}`
            : `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
          : "",
      )
      .join(" - ");
  return props.time
    ? `${pad(val.getDate())}/${pad(
        val.getMonth() + 1,
      )}/${val.getFullYear()} ${formatAMPM(val)}`
    : `${pad(val.getDate())}/${pad(val.getMonth() + 1)}/${val.getFullYear()}`;
};

const equalDates = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (Array.isArray(a) && Array.isArray(b))
    return (
      a.length === b.length &&
      a.every((ad, i) => ad?.getTime() === b[i]?.getTime())
    );
  return a instanceof Date && b instanceof Date && a.getTime() === b.getTime();
};

const pickerValue = ref(toDateValue(props.modelValue));

watch(
  () => props.modelValue,
  (val) => {
    const parsed = toDateValue(val);
    if (!equalDates(parsed, pickerValue.value)) pickerValue.value = parsed;
  },
  { immediate: true },
);

const onPickerChange = (val) => {
  pickerValue.value = val;
  emit("update:modelValue", formatData(val));
  if (props.icon) {
    open.value = false;
  }
};

const handleClosed = () => {
  if (props.icon) {
    open.value = false;
  }
};

const clearDate = () => {
  pickerValue.value = null;
  emit("update:modelValue", null);
  open.value = false;
};

const toggleOpen = async () => {
  open.value = !open.value;
  if (open.value && props.icon) {
    await nextTick();
    dp.value?.openMenu();
  }
};
</script>
