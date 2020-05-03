import extension from 'extensionizer';

const checkAlwaysIncognitoUrl = (e: any) => {
  if (e.target.href) {
    e.preventDefault();

    extension.storage.local.get('addresses', ({ addresses }: any) => {
      addresses?.map(({ url }: any) => {
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
