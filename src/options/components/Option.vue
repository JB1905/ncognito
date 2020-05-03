<template>
  <div class="option">
    <label>
      <input
        type="radio"
        name="action"
        :value="ActionType.Tab"
        @click="setAction(ActionType.Tab)"
        v-model="action"
      />
      <slot />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default {};
</script>

<style lang="scss" scoped>
.option {
  label {
    display: flex;
    align-items: center;
  }
}
</style>
