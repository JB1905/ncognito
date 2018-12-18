import extension from 'extensionizer';

function inIncognito() {
  extension.storage.local.get('addresses', res => {
    if (res.addresses) {
      res.addresses.map(address => {
        if (
          (address.type === 'address' &&
            window.location.hostname.includes(address.url)) ||
          (address.type === 'path' &&
            window.location.pathname.includes(address.url)) ||
          (address.type === 'protocol' &&
            window.location.protocol === `${address.url}:`)
        ) {
          extension.runtime.sendMessage({
            url: window.location.href
          });
        }
      });
    }
  });
}

extension.storage.local.get('incognitoEnabled', res => {
  if (res.incognitoEnabled) inIncognito();
});

const keys = [];

const onKeyDown = e => {
  extension.storage.local.get('evacuation', res => {
    if (res.evacuation) {
      if (res.evacuation.name === 'piano') {
        if (!keys.includes(e.key)) keys.push(e.key);

        if (keys.length > 4) {
          extension.storage.local.get('action', res => {
            if (res.action) {
              if (res.action.name === 'redirect') {
                document.body.style.display = 'none';

                window.location.href = res.action.address;
              } else if (res.action.name === 'tab') {
                extension.runtime.sendMessage({
                  action: 'tab'
                });
              } else if (res.action.name === 'window') {
                extension.runtime.sendMessage({
                  action: 'window'
                });
              }
            }
          });
        }
      }
    }
  });
};

const onKeyUp = e => keys.splice(e.key, 1);

extension.storage.local.get('panicModeEnabled', res => {
  if (res.panicModeEnabled) {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  }
});
