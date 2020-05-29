import extension from 'extensionizer';

import { StoreKey } from '../shared/enums/StoreKey';

import { privateFavorite } from '../../features.config.json';

if (privateFavorite) {
  const createBookmark = () => {
    extension.bookmarks.create(
      { title: 'nCognito Bookmarks' },
      ({ id }: any) => {
        extension.storage.local.set({
          bookmarksFolder: { id },
        });
      }
    );
  };

  extension.storage.local.get(
    StoreKey.BookmarkFolder,
    ({ bookmarksFolder }: any) => {
      if (bookmarksFolder === undefined) {
        return createBookmark();
      }

      extension.bookmarks.get(bookmarksFolder.id, (bookmarks: any) => {
        if (bookmarks) {
          const exists = bookmarks.find(
            (item: any) => item.id === bookmarksFolder.id
          );

          if (exists) {
            createBookmark();
          }
        } else {
          createBookmark();
        }
      });
    }
  );
}
