<template>
  <div class="container">
    <h2>Panic mode</h2>

    <label>
      <input type="checkbox" v-model="enabled" @click="toggle()" /> Enable
    </label>

    <div v-if="this.enabled">
      <Action />
      <Evacuation />
    </div>
  </div>
</template>

<script>
import extension from 'extensionizer';

import Action from './Panic/Action';
import Evacuation from './Panic/Evacuation';

export default {
  data() {
    return {
      enabled: ''
    };
  },
  components: {
    Action,
    Evacuation
  },
  created() {
    extension.storage.local.get(
      'panicModeEnabled',
      res => (this.enabled = res.panicModeEnabled)
    );
  },
  methods: {
    toggle() {
      this.enabled = !this.enabled;

      extension.storage.local.set({
        panicModeEnabled: this.enabled
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../reset.scss';
</style>
