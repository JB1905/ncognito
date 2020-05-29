import extension from 'extensionizer';

import { ActionType } from '../shared/enums/ActionType';

let privateWindow: any = null;
// let newTab: any = true;
let privateTabs: any = [];

extension.windows.onCreated.addListener((e: any) => {
  if (e.incognito) {
    privateWindow = e.id;
  }
});

extension.windows.onRemoved.addListener((e: any) => {
  if (e === privateWindow) {
    privateWindow = null;
  }
});

const runAction = (action: ActionType) => {
  if (action === ActionType.CloseTab) {
    extension.tabs.query({ active: true }, (tab: any) =>
      extension.tabs.remove(tab[0].id)
    );
  } else if (action === ActionType.CloseWindow) {
    extension.windows.getCurrent((window: any) =>
      extension.windows.remove(window.id)
    );
  }
};

const runMuteActiveTab = () => {
  extension.tabs.query({ active: true }, (tab: any) =>
    extension.tabs.update(tab[0].id, { muted: true })
  );
};

const handleMessage = (req: any, _: any, sendResponse: any) => {
  const { url, action, mute } = req;

  if (url) {
    if (!privateWindow) {
      return extension.windows.create({ incognito: true, url }, (res: any) => {
        privateWindow = res.id;
      });
    } else {
      return extension.tabs.create(
        { windowId: privateWindow, url },
        (res: any) => privateTabs.push(res.id)
      );
    }

    // sendResponse();
  }

  runAction(action);

  if (mute) {
    runMuteActiveTab();
  }
};

extension.runtime.onMessage.addListener(handleMessage);
