import extension from 'extensionizer';

extension.storage.local.get('openInNonPrivateEnabled', (res: any) => {
  if (res.openInNonPrivateEnabled) {
    extension.windows.getCurrent(({ incognito }: any) => {
      extension.contextMenus.create({
        title: 'Open in non-private window',
        id: 'open-in-non-private-window',
        visible: incognito,
      });
    });
  }
});

// TODO disable moz-extension url

extension.contextMenus.onClicked.addListener(
  ({ menuItemId, linkUrl, pageUrl }: any) => {
    if (menuItemId === 'open-in-non-private-window') {
      extension.windows.create({
        url: linkUrl ?? pageUrl,
      });
    }
  }
);
