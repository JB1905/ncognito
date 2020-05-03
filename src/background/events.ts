import extension from 'extensionizer';

let privateWindow: any = null;
let newTab: any = true;
let privateTabs: any = [];

extension.windows.onCreated.addListener((e: any) => {
  // console.log({ onCreate: e });

  if (e.incognito) {
    privateWindow = e.id;
  }
});

extension.windows.onRemoved.addListener((e: any) => {
  // console.log({ onRemove: e });

  if (e === privateWindow) {
    privateWindow = null;
  }
});

extension.runtime.onMessage.addListener(
  (message: any, sender: any, sendResponse: any) => {
    // console.log({ onMessage: JSON.stringify(message) });
    handleMessage(message, sendResponse);
  }
);

const handleMessage = (req: any, sendResponse: any) => {
  console.log({ req, sendResponse });

  //   const { url, action, mute } = req;
  //   // console.log(url);
  //   if (url) {
  //     if (!privateWindow) {
  //       extension.windows.create(
  //         {
  //           incognito: true,
  //           url,
  //         },
  //         (res: any) => {
  //           privateWindow = res.id;
  //           // sendResponse({a:res.id})
  //         }
  //       );
  //     } else {
  //       extension.tabs.create(
  //         {
  //           windowId: privateWindow,
  //           url,
  //         },
  //         (res: any) => {
  //           privateTabs.push(res.id);
  //           // sendResponse({a:res.id})
  //         }
  //       );
  //     }
  //     return;
  //   }
  // if (action === 'tab') {
  //   extension.tabs.query({ active: true }, (tab: any) =>
  //     extension.tabs.remove(tab[0].id)
  //   );
  // } else if (action === 'window') {
  //   extension.windows.getCurrent((window: any) =>
  //     extension.windows.remove(window.id)
  //   );
  // }
  // if (mute) {
  //   extension.tabs.query({ active: true }, (tab: any) =>
  //     extension.tabs.update(tab[0].id, { muted: true })
  //   );
  // }
};
