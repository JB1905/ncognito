<template>
  <div class="popup">
    <header class="popup__header">
      <h1>{{ name }}</h1>
      <span>v{{ version }}</span>
    </header>

    <main class="popup__content">
      <button @click="settings()">{{ settingsTitle }}</button>
      <button @click="inPrivate()">{{ inPrivateTitle }}</button>
    </main>
  </div>
</template>

<script>
import extension from 'extensionizer';

import { name, version } from '../manifest.json';

export default {
  data() {
    return {
      name,
      version,
      settingsTitle: 'Settings',
      inPrivateTitle: 'Open in private window'
    };
  },
  methods: {
    settings() {
      extension.runtime.openOptionsPage();
    },
    inPrivate() {
      extension.tabs.query(
        {
          active: true,
          windowId: extension.windows.WINDOW_ID_CURRENT
        },
        tab => {
          extension.windows.create({
            incognito: true,
            url: tab[0].url
          });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../reset.scss';

.popup {
  padding: 3px;

  &__header {
    margin: 0 2px 8px;
    display: flex;
    align-items: center;

    span {
      padding: 0 6px;
    }
  }

  &__content {
    display: flex;
  }
}
</style>
