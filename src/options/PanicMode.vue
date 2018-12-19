<template>
  <div class="panic-mode">
    <h1>{{ name }}</h1>

    <label>
      <input type="checkbox" @click="toggle()" :checked="enabled" /> Enable
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
      name: 'Panic mode',
      enabled: ''
    };
  },
  components: {
    Action,
    Evacuation
  },
  created() {
    extension.storage.local.get('panicModeEnabled', res => {
      if (res.panicModeEnabled) this.enabled = true;
      else this.enabled = false;
    });
  },
  methods: {
    toggle() {
      if (this.enabled) this.enabled = false;
      else this.enabled = true;

      extension.storage.local.set({
        panicModeEnabled: this.enabled
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../reset.scss';

.panic-mode {
  flex: 1;
}
</style>
