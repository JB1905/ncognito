<template>
  <div class="option">
    <label>
      <input
        type="radio"
        name="action"
        :value="ActionType.CloseTab"
        @click="setAction(ActionType.CloseTab)"
        v-model="action"
      />
      <slot />
    </label>
  </div>
</template>

<script lang="ts">
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
