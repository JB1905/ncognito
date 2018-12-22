<template>
  <main>
    <PanicMode />
    <Incognito />
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
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
