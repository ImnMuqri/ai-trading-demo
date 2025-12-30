<template>
  <div>
    <VueDatePicker
      ref="dp"
      :model-value="pickerValue"
      @update:model-value="onPickerChange"
      :format="formatLabel"
      :auto-apply="props.autoApply"
      :text-input="props.textInput"
      :enable-time-picker="props.time"
      :range="props.range"
      :ui="uiStyles"
      :teleport="props.teleport"
      class=""
      :flow="props.time ? selectedFlow : undefined"
      :min-date="props.minDate"
      :max-date="props.maxDate"
    >
      <template #dp-input="{ value, updateValue }">
        <div class="flex items-center gap-2">
          <UiInput
            dark
            :label="props.label"
            :model-value="value"
            @update:model-value="updateValue"
            :placeholder="props.placeholder"
            :class="props.inputClass"
          />
        </div>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  modelValue: [Date, String, Number, Array, Object, null],
  label: { type: String, default: "" },
  placeholder: { type: String, default: "Select Date" },
  textInput: { type: Boolean, default: true },
  autoApply: { type: Boolean, default: true },
  time: { type: Boolean, default: false }, // Enable time picker when true
  escClose: { type: Boolean, default: true },
  teleport: { type: Boolean, default: true },
  minDate: { type: [Date, String], default: null },
  maxDate: { type: [Date, String], default: null },
  flow: { type: Array, default: () => [] },
  inputClass: { type: String, default: "" },
  range: { type: Boolean, default: false },
});

const dp = ref();

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
  hours = hours ? hours : 12; // 0 becomes 12
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
              d.getDate()
            )} ${formatAMPM(d)}`
          : `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
        : null
    );
  return props.time
    ? `${val.getFullYear()}-${pad(val.getMonth() + 1)}-${pad(
        val.getDate()
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
                d.getMonth() + 1
              )}/${d.getFullYear()} ${formatAMPM(d)}`
            : `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
          : ""
      )
      .join(" - ");
  return props.time
    ? `${pad(val.getDate())}/${pad(
        val.getMonth() + 1
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
  { immediate: true }
);

const onPickerChange = (val) => {
  pickerValue.value = val;
  emit("update:modelValue", formatData(val));
};
</script>

<style scoped>
/* :deep(.dp__calendar_header_separator) {
  display: none;
}
:deep(.dp__calendar_row) {
  margin-top: 0;
  padding-top: 0;
}
:deep(.dp__cell_inner.dp__active_date) {
  border-radius: 1rem;
  padding: 0;
  background-color: #218863;
  color: white;
}
:deep(.dp__cell_inner.dp__today) {
  border: 1px solid #218863;
  border-radius: 1rem;
}
:deep(.dp__calendar_header_item) {
  padding-bottom: 0;
  color: #218863;
  font-weight: 600;
}

:deep(.dp__theme_light) {
  --dp-background-color: #000;
  --dp-text-color: #fff;
} */
</style>
