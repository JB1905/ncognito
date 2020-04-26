<template>
  <div class="container">
    <h2>Panic mode</h2>

    <label>
      <input
        type="checkbox"
        v-model="isPanicModeEnabled"
        @click="togglePanicMode"
      />
      Enable
    </label>

    <div v-if="isPanicModeEnabled">
      <action />
      <evacuation />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import extension from 'extensionizer';

// import Action from './Panic/Action';
// import Evacuation from './Panic/Evacuation';

export default {
  components: {
    // Action,
    // Evacuation,
  },
  setup() {
    const isPanicModeEnabled = ref(false);

    const togglePanicMode = () => {
      extension.storage.local.set({
        panicModeEnabled: !isPanicModeEnabled.value,
      });
    };

    onMounted(() => {
      extension.storage.local.get('panicModeEnabled', (res) => {
        isPanicModeEnabled.value = res.panicModeEnabled;
      });
    });

    return {
      isPanicModeEnabled,
      togglePanicMode,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../reset.scss';
</style>
