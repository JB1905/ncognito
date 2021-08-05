<template>
  <div class="container">
    <!-- <h2>Pasnic mode</h2> -->

    <label>
      <input type="checkbox" v-model="isPanicModeEnabled" />
      <!-- Enable -->
    </label>

    <div v-if="isPanicModeEnabled">
      <action />
      <evacuation />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import extension from 'extensionizer';

import Action from './Action';
import Evacuation from './Evacuation';

import { StoreKey } from '../../../shared/constants/StoreKey';

export default {
  components: {
    Action,
    Evacuation,
  },
  setup() {
    const isPanicModeEnabled = ref(false);

    onMounted(() => {
      extension.storage.local.get(StoreKey.PanicModeEnabled, (res) => {
        isPanicModeEnabled.value = res.panicModeEnabled;
      });
    });

    watch(isPanicModeEnabled, () => {
      extension.storage.local.set({
        panicModeEnabled: isPanicModeEnabled.value,
      });
    });

    return { isPanicModeEnabled };
  },
};
</script>

<style lang="scss" scoped>
@import '../../../shared/reset.scss';

// label {

//   display: flex;
//   align-items: center;
//   // background:red;
// }
</style>
