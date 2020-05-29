import extension from 'extensionizer';

import { IncognitoPattern } from '../shared/enums/IncognitoPattern';
import { StoreKey } from '../shared/enums/StoreKey';

import { alwaysIncognito } from '../../features.config.json';

if (alwaysIncognito) {
  // const addNew = (newW) => {
  //   extension.storage.local.get('openedWindows', (windows) => {
  //     const x = JSON.parse(windows);

  //     x.push(newW);

  //     extension.storage.local.set('openedWindows', JSON.stringify(x));
  //   });
  // };

  const inIncognito = () => {
    extension.storage.local.get(StoreKey.Addresses, ({ addresses }: any) => {
      alert(addresses);
      JSON.parse(addresses).map(({ type, url }: any) => {
        // alert(inPrivate.find((item) => item.type === type && item.url === url));

        // if (inPrivate.find((item) => item.type === type && item.url === url)) {
        //   return;
        // }

        if (
          (type === IncognitoPattern.Address &&
            window.location.hostname.includes(url)) ||
          (type === IncognitoPattern.Path &&
            window.location.pathname.includes(url)) ||
          (type === IncognitoPattern.Protocol &&
            window.location.protocol === `${url}:`)
        ) {
          extension.runtime.sendMessage(
            {
              url: window.location.href,
            },
            () => {
              // inPrivate.push({ type, url });
            }
          );
        }
      });
    });
  };

  extension.storage.local.get(StoreKey.IncognitoEnabled, (res: any) => {
    if (res.incognitoEnabled) {
      inIncognito();
    }
  });
}
