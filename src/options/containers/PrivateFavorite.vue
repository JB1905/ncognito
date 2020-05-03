<template>
  <div class="container">
    <h2>Private Favorite</h2>

    <label>
      <input
        type="checkbox"
        v-model="isPrivateFavoriteEnabled"
        @click="togglePrivateFavorite"
      />
      Enable
    </label>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const isPrivateFavoriteEnabled = ref(false);

    const togglePrivateFavorite = () => {
      isPrivateFavoriteEnabled.value = !isPrivateFavoriteEnabled.value;
    };

    return {
      isPrivateFavoriteEnabled,
      togglePrivateFavorite,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../shared/reset.scss';
</style>
