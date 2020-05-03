<template>
  <div class="container">
    <h2>Other</h2>

    <label>
      <input
        type="checkbox"
        v-model="isOpenInNonPrivateEnabled"
        @click="toggleOpenInNonPrivate"
      />
      Open in non-private window
    </label>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import extension from 'extensionizer';

export default {
  setup() {
    const isOpenInNonPrivateEnabled = ref(false);

    const toggleOpenInNonPrivate = () => {
      isOpenInNonPrivateEnabled.value = !isOpenInNonPrivateEnabled.value;
    };

    onMounted(() => {
      extension.storage.local.get('openInNonPrivateEnabled', (res) => {
        isOpenInNonPrivateEnabled.value = res.openInNonPrivateEnabled;
      });
    });

    watch(isOpenInNonPrivateEnabled, () => {
      extension.storage.local.set({
        openInNonPrivateEnabled: isOpenInNonPrivateEnabled.value,
      });
    });

    return {
      isOpenInNonPrivateEnabled,
      toggleOpenInNonPrivate,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../shared/reset.scss';
</style>
