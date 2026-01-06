<template>
  <span class="hidden"> {{ progressArray }} </span>
  <div>
    <template v-if="props.type === 'circle'">
      <div
        :class="['inline-flex justify-center items-center', props.customClass]"
      >
        <!-- SVG Circle -->
        <svg viewBox="0 0 36 36" class="w-full h-full">
          <template v-if="Array.isArray(progressArray)">
            <circle
              v-for="(p, i) in progressArray"
              :key="'bg-' + i"
              cx="18"
              cy="18"
              :r="16 - i * 3.8"
              stroke-width="2.8"
              fill="none"
              stroke="#1A1A1AFF"
            />
            <circle
              v-for="(p, i) in progressArray"
              :key="'fg-' + i"
              cx="18"
              cy="18"
              :r="radii[i]"
              stroke-width="2.8"
              fill="none"
              :stroke="color[i % color.length]"
              :stroke-dasharray="circumferences[i]"
              :stroke-dashoffset="circumferences[i] * (1 - p / 100)"
              stroke-linecap="round"
              transform="rotate(-90 18 18)"
              class="transition-all duration-800"
            />
          </template>

          <template v-else>
            <circle
              cx="18"
              cy="18"
              r="16"
              stroke-width="3"
              fill="none"
              class="text-[#1C1C1C]"
              stroke="currentColor"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              stroke-width="3"
              fill="none"
              :stroke="Array.isArray(progressArray) ? color[0] : resolvedColor"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="
                circumference *
                (1 -
                  (Array.isArray(progressArray)
                    ? progressArray[0]
                    : progressArray) /
                    100)
              "
              stroke-linecap="round"
              transform="rotate(-90 18 18)"
              class="transition-all duration-800"
            />
          </template>
        </svg>

        <!-- Div inside circle -->
        <div
          v-if="props.title"
          :class="[
            'absolute text-center text-[12px] font-medium text-white max-w-[80px]',
            props.titleClass,
          ]"
        >
          {{ props.title }}
        </div>

        <div
          v-if="!props.title"
          :class="[
            'absolute text-center text-xl font-semibold text-white max-w-[100px]',
            props.titleClass,
          ]"
          :style="{
            color: Array.isArray(progressArray) ? color[0] : resolvedColor,
          }"
        >
          {{ Number(props.progress) }}%
        </div>
      </div>
    </template>

    <template v-else>
      <div
        v-if="props.orientation === 'vertical'"
        :class="['flex items-end', props.barGap, props.customClass]"
        :style="{ height: props.barHeight }"
      >
        <template v-if="Array.isArray(progressArray)">
          <div
            v-for="(p, index) in progressArray"
            :key="index"
            class="flex flex-col justify-end rounded-t overflow-hidden flex-1"
            :style="{
              backgroundColor: props.bgColor,
              height: '100%',
              width: props.barWidth || '8px',
            }"
          >
            <div
              class="w-full rounded-t transition-all duration-300"
              :style="{
                height: p + '%',
                background: props.gradientColors?.[index]
                  ? `linear-gradient(to top, ${props.gradientColors[index].join(
                      ','
                    )})`
                  : color[index % color.length],
              }"
            ></div>
          </div>
        </template>

        <div
          v-else
          class="flex flex-col justify-end rounded-t overflow-hidden"
          :style="{
            backgroundColor: props.bgColor,
            height: props.barHeight || '200px',
            width: props.barWidth || '8px',
          }"
        >
          <div
            class="w-full rounded-t transition-all duration-300"
            :style="{
              height: progressArray[0] + '%',
              background: props.gradientColors?.[0]
                ? `linear-gradient(to top, ${props.gradientColors[0].join(
                    ','
                  )})`
                : resolvedColor,
            }"
          ></div>
        </div>
      </div>

      <div v-else class="flex flex-col gap-4">
        <template v-if="Array.isArray(progressArray)">
          <div
            v-for="(p, index) in progressArray"
            :key="index"
            class="w-full h-2 rounded-r overflow-hidden"
            :style="{ backgroundColor: props.bgColor }"
          >
            <div
              class="h-full rounded-r transition-all duration-300"
              :style="{
                width: p + '%',
                background: props.gradientColors?.[index]
                  ? `linear-gradient(to right, ${props.gradientColors[
                      index
                    ].join(',')})`
                  : color[index % color.length],
              }"
            ></div>
          </div>
        </template>

        <div
          v-else
          class="w-full h-2 rounded-r overflow-hidden"
          :style="{ backgroundColor: props.bgColor }"
        >
          <div
            class="h-full rounded-r transition-all duration-300"
            :style="{
              width: progressArray + '%',
              background: props.gradientColors?.[0]
                ? `linear-gradient(to right, ${props.gradientColors[0].join(
                    ','
                  )})`
                : resolvedColor,
            }"
          ></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, nextTick, watch } from "vue";

const props = defineProps({
  type: { type: String, default: "" },
  progress: { type: [Number, Array], default: 50 },
  title: { type: String, default: "" },
  color: { type: Array, default: () => ["#00BDA7", "#FFFFFF"] },
  customClass: { type: String, default: "w-24 h-24" },
  titleClass: { type: String, default: "" },
  gradientColors: { type: Array, default: null }, //  [["#00AAFF","#00BDA7"], ["#FFAA00","#FF5500"]]
  bgColor: { type: String, default: "#1C1C1C" },
  orientation: { type: String, default: "horizontal" },
  barHeight: { type: String, default: "200px" },
  barWidth: { type: String, default: "8px" },
  barGap: { type: String, default: "gap-4" },
});

// const progressArray = computed(() => {
//   return Array.isArray(props.progress) ? props.progress : props.progress;
// });

// const progressArray = ref(
//   Array.isArray(props.progress) ? props.progress.map(() => 0) : 0
// );

const progressArray = ref(
  Array.isArray(props.progress) ? props.progress.map(() => 0) : [0]
);

const radii = computed(() => {
  if (!Array.isArray(progressArray.value)) return [];
  return progressArray.value.map((_, i) => 16 - i * 3.8);
});

const circumferences = computed(() => {
  return radii.value.map((r) => 2 * Math.PI * r);
});

const resolvedColor = computed(() => {
  if (props.color && props.color.length > 0) return props.color[0];
  if (progressArray.value >= 100) return "#059669";
  if (progressArray.value >= 80) return "#4F46E5";
  if (progressArray.value >= 60) return "#FACC15";
  if (progressArray.value >= 40) return "#EA580C";
  return "#DC2626";
});

// Circle circumference (used for stroke-dasharray)
const radius = 16;
const circumference = 2 * Math.PI * radius;

// onMounted(() => {
//   nextTick(() => {
//     progressArray.value = Array.isArray(props.progress)
//       ? [...props.progress]
//       : props.progress;
//   });
// });

// watch(
//   () => props.progress,
//   (newVal) => {
//     if (Array.isArray(newVal)) {
//       progressArray.value = [...newVal];
//     } else {
//       progressArray.value = newVal ?? 0;
//     }
//   },
//   { deep: true }
// );

onMounted(() => {
  nextTick(() => {
    progressArray.value = Array.isArray(props.progress)
      ? [...props.progress]
      : [props.progress];
  });
});

watch(
  () => props.progress,
  (newVal) => {
    progressArray.value = Array.isArray(newVal) ? [...newVal] : [newVal ?? 0];
  },
  { deep: true }
);
</script>
