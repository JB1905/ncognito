<template>
  <main>
    <panic-mode />
    <always-incognito />
  </main>
</template>

<script lang="ts">
import PanicMode from './containers/PanicMode';
import AlwaysIncognito from './containers/AlwaysIncognito';

export default {
  components: {
    PanicMode,
    AlwaysIncognito,
  },
};
</script>

<style lang="scss">
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
