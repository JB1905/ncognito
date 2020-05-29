import extension from 'extensionizer';

import { ActionType } from '../shared/enums/ActionType';
import { EvacuationWay } from '../shared/enums/EvacuationWay';
import { StoreKey } from '../shared/enums/StoreKey';

import { panicMode } from '../../features.config.json';

if (panicMode) {
  const keys: any = [];

  const onKeyDown = (e: any) => {
    extension.storage.local.get(StoreKey.Evacuation, (res: any) => {
      if (res.evacuation) {
        if (!keys.includes(e.key)) {
          keys.push(e.key);
        }

        if (
          res.evacuation.name === EvacuationWay.Pianist &&
          keys.length > 4
          // ||
          // res.evacuation.name === EvacuationWay.Shortcode
          // && checkArrays(keys, res)
        ) {
          escapeFromIncognito();
        }
      }
    });
  };

  const onKeyUp = (e: any) => keys.splice(e.key, 1);

  const escapeFromIncognito = () => {
    extension.storage.local.get(StoreKey.Action, ({ action }: any) => {
      if (action?.name === ActionType.Redirect) {
        extension.storage.local.get(StoreKey.Options, (res: any) => {
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
      } else if (action.name === ActionType.CloseTab) {
        extension.runtime.sendMessage({
          action: ActionType.CloseTab,
        });
      } else if (action.name === ActionType.CloseWindow) {
        extension.runtime.sendMessage({
          action: ActionType.CloseWindow,
        });
      }
    });
  };

  extension.storage.local.get(StoreKey.PanicModeEnabled, (res: any) => {
    if (res.panicModeEnabled) {
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);
    }
  });
}
