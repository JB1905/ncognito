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

