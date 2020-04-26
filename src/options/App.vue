<template>
  <main>
    <panic-mode />
    <incognito />
  </main>
</template>

<script lang="ts">
import PanicMode from './containers/PanicMode.vue';
import Incognito from './containers/Incognito.vue';

export default {
  components: {
    PanicMode,
    Incognito,
  },
};
</script>

<style lang="scss" scoped>
main {
  min-width: 440px;
  padding: 6px;
  display: flex;
  flex-wrap: wrap;

  > div {
    min-width: 440px;
  }
}
</style>
