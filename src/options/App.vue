<template>
  <main>
    <panic-mode v-if="panicMode" />
    <always-incognito v-if="alwaysIncognito" />
    <private-favorite v-if="privateFavorite" />
    <other v-if="openInNonPrivate" />
  </main>
</template>

<script lang="ts">
import PanicMode from './containers/PanicMode';
import AlwaysIncognito from './containers/AlwaysIncognito';
import PrivateFavorite from './containers/PrivateFavorite';
import Other from './containers/Other';

import {
  panicMode,
  alwaysIncognito,
  privateFavorite,
  openInNonPrivate,
} from '../../features.config.json';

export default {
  components: {
    PanicMode,
    AlwaysIncognito,
    PrivateFavorite,
    Other,
  },
  setup() {
    return {
      panicMode,
      alwaysIncognito,
      privateFavorite,
      openInNonPrivate,
    };
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
