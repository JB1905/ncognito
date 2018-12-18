import extension from 'extensionizer';

function eventListeners() {
  extension.runtime.onMessage.addListener(e => handleMessage(e));
}

eventListeners();

function handleMessage(req) {
  const { url, action } = req;

  if (action === 'tab') {
    extension.tabs.query({ active: true }, tab =>
      extension.tabs.remove(tab[0].id)
    );
  } else if (action === 'window') {
    extension.windows.query({ active: true }, window =>
      extension.windows.remove(window[0].id)
    );
  }
}
