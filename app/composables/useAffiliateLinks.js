import { ref, computed } from "vue";

export function useAffiliateLinks({ list = [], baseUrl }) {
  const items = ref(list);

  const openForm = ref(false);
  const editingIndex = ref(null);

  const form = ref({
    name: "",
    url: "",
    description: "",
  });

  const isEditMode = computed(() => editingIndex.value !== null);

  const resetForm = () => {
    form.value = {
      name: "",
      url: "",
      description: "",
    };
  };

  const openCreate = () => {
    editingIndex.value = null;
    resetForm();
    openForm.value = true;
  };

  const openEdit = (idx) => {
    const item = items.value[idx];
    if (!item) return;

    editingIndex.value = idx;
    form.value = {
      name: item.name,
      url: item.url,
      description: item.description,
    };
    openForm.value = true;
  };

  const submit = async ($api) => {
    if (isEditMode.value) {
      const item = items.value[editingIndex.value];

      await $api.put(`${baseUrl}/${item.id}`, form.value);

      items.value[editingIndex.value] = {
        ...item,
        ...form.value,
      };
    } else {
      const res = await $api.post(baseUrl, form.value);
      items.value.push(res.data.data);
    }

    openForm.value = false;
    editingIndex.value = null;
    resetForm();
  };

  const remove = async ($api) => {
    const item = items.value[editingIndex.value];
    if (!item) return;

    await $api.delete(`${baseUrl}/${item.id}`);
    items.value.splice(editingIndex.value, 1);

    openForm.value = false;
    editingIndex.value = null;
    resetForm();
  };

  return {
    items,
    form,
    openForm,
    isEditMode,
    openCreate,
    openEdit,
    submit,
    remove,
  };
}
