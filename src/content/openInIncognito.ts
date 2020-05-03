import extension from 'extensionizer';

const inIncognito = () => {
  extension.storage.local.get('addresses', ({ addresses }: any) => {
    addresses?.map(({ type, url }: any) => {
      if (
        (type === 'address' && window.location.hostname.includes(url)) ||
        (type === 'path' && window.location.pathname.includes(url)) ||
        (type === 'protocol' && window.location.protocol === `${url}:`)
      ) {
        extension.runtime.sendMessage({
          url: window.location.href,
        });
      }
    });
  });
};

extension.storage.local.get('incognitoEnabled', (res: any) => {
  if (res.incognitoEnabled) {
    inIncognito();
  }
});
