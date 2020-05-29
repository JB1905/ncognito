import extension from 'extensionizer';

import { supportedProtocols } from '../shared/constants/supportedProtocols';

import { StoreKey } from '../shared/enums/StoreKey';

import {
  openInNonPrivate,
  alwaysCreateNewNonPrivate,
  openExistingWindowNonPrivate,
} from '../../features.config.json';

if (openInNonPrivate) {
  const CONTEXT_MENU_ID = 'open-in-non-private-window';

  extension.contextMenus.create({
    title: 'Open in non-private window',
    id: CONTEXT_MENU_ID,
    visible: false, // TODO
  });

  extension.windows.onFocusChanged.addListener((activeWindow: any) => {
    extension.tabs.query(
      { active: true, windowId: activeWindow },
      ([currentTab]) => {
        // let supported = false;

        // extension.tabs.onActivated.addListener(() => {
        //   supported = (supportedProtocols as any).includes(
        //     currentTab.url.split(':')[0]
        //   );

        //   console.log({ supported });
        // });

        if (currentTab) {
          extension.storage.local.get(
            StoreKey.OpenInNonPrivateEnabled,
            (res: any) => {
              extension.windows.getCurrent(({ incognito }: any) => {
                extension.contextMenus.update(CONTEXT_MENU_ID, {
                  visible: incognito && res.openInNonPrivateEnabled,
                  // && (supportedProtocols as any).includes(
                  //   currentTab.url.split(':')[0]
                  // ),
                });
              });
            }
          );
        }
      }
    );
  });

  extension.contextMenus.onClicked.addListener(
    ({ menuItemId, linkUrl, pageUrl }: any) => {
      if (menuItemId === CONTEXT_MENU_ID) {
        const url = linkUrl ?? pageUrl;

        const focusWindow = (windowId: any) => {
          extension.windows.update(windowId, { focused: true });
        };

        extension.tabs.query({ currentWindow: false, url }, ([currentTab]) => {
          if (currentTab && !alwaysCreateNewNonPrivate) {
            focusWindow(currentTab.windowId);
          } else {
            if (openExistingWindowNonPrivate) {
              extension.windows.getAll((windows) => {
                const nonPrivateWindow = windows.find(
                  (window: any) => !window.incognito
                );

                if (nonPrivateWindow) {
                  extension.tabs.create({
                    windowId: nonPrivateWindow.id,
                    url,
                  });

                  focusWindow(nonPrivateWindow.id);
                } else {
                  extension.windows.create({ url });
                }
              });
            }
          }
        });
      }
    }
  );
}
