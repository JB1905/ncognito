<template>
  <div class="container">
    <!-- <h2>Private Favorite</h2> -->

    <label>
      <input type="checkbox" v-model="isPrivateFavoriteEnabled" />
      <!-- Enable -->
    </label>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

import { t } from '../../shared/helpers/translate'

export default {
  setup() {
    const isPrivateFavoriteEnabled = ref(false);

    return { 
      // title: t(""),
      isPrivateFavoriteEnabled,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../shared/reset.scss';
</style>
