<template>
  <main>
    <panic-mode />
    <always-incognito />
    <!-- <private-favorite /> -->
    <other />
  </main>
</template>

<script lang="ts">
import PanicMode from './containers/PanicMode';
import AlwaysIncognito from './containers/AlwaysIncognito';
// import PrivateFavorite from './containers/PrivateFavorite';
import Other from './containers/Other';

export default {
  components: {
    PanicMode,
    AlwaysIncognito,
    // PrivateFavorite,
    Other,
  },
};
</script>

<style lang="scss">
main {
  min-width: 440px;
  padding: 0 12px 6px;
  display: flex;
  flex-wrap: wrap;

  > div {
    min-width: 440px;
  }
}
</style>
