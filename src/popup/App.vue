<template>
  <div class="popup">
    <header class="popup__header">
      <h1>{{ name }}</h1>
      <span>v{{ version }}</span>
    </header>

    <main class="popup__content">
      <button @click="openSettings">{{ settingsTitle }}</button>
      <button
        @click="openInPrivate"
        :disabled="isPrivateWindow || !isSupportedProtocol"
      >
        {{ inPrivateTitle }}
      </button>
    </main>
  </div>
</template>

<script lang="ts">
// TODO any in file
import { ref, onMounted } from 'vue';
import extension from 'extensionizer';

import { t } from '../shared/helpers/translate';

import { supportedProtocols } from '../shared/constants/supportedProtocols';

import { name, version } from '../manifest.json';

export default {
  setup() {
    const isPrivateWindow = ref(false);
    const isSupportedProtocol = ref(false);

    // TODO check if current page is settings
    const openSettings = () => {
      extension.runtime.openOptionsPage();

      window.close();
    };

    const openInPrivate = () => {
      // TODO rename
      const action = (tab) => {
          const [currentTab] = tab;

          extension.windows.create({
            incognito: true,
            url: currentTab.url,
          });
        }

      extension.tabs.query(
        {
          active: true,
          windowId: extension.windows.WINDOW_ID_CURRENT,
        },
        action
      );
    };

    onMounted(() => {
      extension.windows.getCurrent(({ incognito }: any) => {
        isPrivateWindow.value = incognito;
      });

// TODO
      const action = ([tab]: any) => {
        const [currentTabProtocol] = tab.url.split(':')

          isSupportedProtocol.value = (supportedProtocols).includes(
           currentTabProtocol
          );
        }

      extension.tabs.query(
        { active: true, currentWindow: true },
        action,
      );
    });

    return {
      name,
      version,
      settingsTitle: t('settingsTitle'),
      inPrivateTitle: t('inPrivateTitle'),
      isPrivateWindow,
      isSupportedProtocol,
      openSettings,
      openInPrivate,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../shared/reset.scss';

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
