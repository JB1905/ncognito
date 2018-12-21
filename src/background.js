import extension from 'extensionizer';

let firstWindow = true;
let firstTab = true;

const windowOpened = () => (firstWindow = false);
const windowClosed = () => (firstWindow = true);

function eventListeners() {
  extension.runtime.onMessage.addListener(e => handleMessage(e));
  extension.windows.onCreated.addListener(windowOpened);
  extension.windows.onRemoved.addListener(windowClosed);
}

eventListeners();

function handleMessage(req) {
  const { url, action, mute } = req;

  if (url) {
    if (firstWindow) {
      firstWindow = false;

      extension.windows.create({
        incognito: true,
        url
      });
    } else if (!firstWindow && firstTab) {
      firstTab = false;

      extension.tabs.create({ url });
    }
  }

  if (action === 'tab') {
    extension.tabs.query({ active: true }, tab =>
      extension.tabs.remove(tab[0].id)
    );
  } else if (action === 'window') {
    extension.windows.getCurrent(window => extension.windows.remove(window.id));
  }

  if (mute) {
    extension.tabs.query({ active: true }, tab =>
      extension.tabs.update(tab[0].id, { muted: true })
    );
  }
}
