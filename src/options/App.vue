<template>
  <div class="option-view">
    <PanicMode />
    <Incognito />
  </div>
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
.option-view {
  min-width: 440px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
