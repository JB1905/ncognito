<template>
  <main>
    <panic-mode />
    <incognito />
  </main>
</template>

<script>
import PanicMode from './PanicMode';
import Incognito from './Incognito';

export default {
  components: {
    PanicMode,
    Incognito
  }
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
