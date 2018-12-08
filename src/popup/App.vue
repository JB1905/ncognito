<template>
  <div class="popup">
    <header class="popup__header">
      <h2>{{ name }}</h2>
      <span>v{{ version }}</span>
    </header>

    <main class="popup__content">
      <button @click="settings()">{{ settingsTitle }}</button>
      
      <button @click="inPrivate()">{{ inPrivateTitle }}</button>
    </main>
  </div>
</template>

<script>
  import { name, version } from '../../package.json';

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
        global.browser.runtime.openOptionsPage();
      },
      inPrivate() {
        global.browser.tabs.query(
          {
            active: true,
            windowId: global.browser.windows.WINDOW_ID_CURRENT
          },
          tab => {
            global.browser.windows.create({
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

      h2 {
        margin: 0;
        font-weight: 700;
      }

      span {
        padding: 0 6px;
      }
    }

    &__content {
      display: flex;
    }
  }
</style>
