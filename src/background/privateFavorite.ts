import extension from 'extensionizer';

const createBookmark = () => {
  extension.bookmarks.create({ title: 'nCognito Bookmarks' }, ({ id }: any) => {
    extension.storage.local.set({
      bookmarksFolder: { id },
    });
  });
};

extension.storage.local.get('bookmarksFolder', ({ bookmarksFolder }: any) => {
  if (bookmarksFolder === undefined) {
    return createBookmark();
  }

  extension.bookmarks.get(bookmarksFolder.id, (bookmarks: any) => {
    if (bookmarks) {
      const exists = bookmarks.find(
        (item: any) => item.id === bookmarksFolder.id
      );

      if (exists.length === 0) {
        createBookmark();
      }
    } else {
      createBookmark();
    }
  });
});
