import extension from 'extensionizer';

const keys: any = [];

const onKeyDown = (e: any) => {
  extension.storage.local.get('evacuation', (res: any) => {
    if (res.evacuation) {
      if (!keys.includes(e.key)) {
        keys.push(e.key);
      }

      if (
        (res.evacuation.name === 'piano' && keys.length > 4) ||
        res.evacuation.name === 'shortcode'
        // && checkArrays(keys, res)
      ) {
        escapeFromIncognito();
      }
    }
  });
};

const onKeyUp = (e: any) => keys.splice(e.key, 1);

const escapeFromIncognito = () => {
  extension.storage.local.get('action', ({ action }: any) => {
    if (action?.name === 'redirect') {
      extension.storage.local.get('options', (res: any) => {
        if (res.options) {
          if (res.options.hide) document.body.style.display = 'none';

          if (res.options.mute) {
            extension.runtime.sendMessage({
              mute: true,
            });
          }
        }
      });

      window.location.href = action.address;
    } else if (action.name === 'tab') {
      extension.runtime.sendMessage({
        action: 'tab',
      });
    } else if (action.name === 'window') {
      extension.runtime.sendMessage({
        action: 'window',
      });
    }
  });
};

extension.storage.local.get('panicModeEnabled', (res: any) => {
  if (res.panicModeEnabled) {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  }
});
