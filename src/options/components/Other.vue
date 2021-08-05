<template>
  <div class="container">
    <!-- <h2>Other</h2> -->

    <label>
      <input type="checkbox" v-model="isOpenInNonPrivateEnabled" />
      <!-- Open in non-private window -->
    </label>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import extension from 'extensionizer';
import { StoreKey } from '../../shared/constants/StoreKey';

export default {
  setup() {
    const isOpenInNonPrivateEnabled = ref(false);

    onMounted(() => {
      extension.storage.local.get(StoreKey.OpenInNonPrivateEnabled, (res) => {
        isOpenInNonPrivateEnabled.value = res.openInNonPrivateEnabled;
      });
    });

    watch(isOpenInNonPrivateEnabled, () => {
      extension.storage.local.set({
        openInNonPrivateEnabled: isOpenInNonPrivateEnabled.value,
      });
    });

    return { isOpenInNonPrivateEnabled };
  },
};
</script>

<style lang="scss" scoped>
@import '../../shared/reset.scss';
</style>
