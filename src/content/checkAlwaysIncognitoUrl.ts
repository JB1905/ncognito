import extension from 'extensionizer';

import { StoreKey } from '../shared/enums/StoreKey';

import { alwaysIncognito } from '../../features.config.json';

if (alwaysIncognito) {
  // const 

  const checkAlwaysIncognitoUrl = (e: any) => {
    if (e.target.href) {
      e.preventDefault();

      // TODO refactor
      extension.storage.local.get(StoreKey.Addresses, ({ addresses }: any) => {
        addresses.map(({ url }: any) => {
          if (e.target.href.includes(url)) {
            extension.runtime.sendMessage({
              url: e.target.href,
            });
          } else {
            window.location = e.target.href;
          }
        });
      });
    } else {
      window.location = e.target.href;
    }
  };

  document.addEventListener('click', checkAlwaysIncognitoUrl);
}
