import extension from 'extensionizer';

// let privateWindow = null;
// // let newTab = true;
// let privateTabs = [];

// extension.pageAction.onClicked.addListener(() => console.log("hello"));

// function createBookmark() {
//   extension.bookmarks.create(
//     { title: "nCognito Bookmarks" },
//     (bookmarkItem) => {
//       extension.storage.local.set({
//         bookmarksFolder: {
//           id: bookmarkItem.id,
//         },
//       });
//     }
//   );
// }

// extension.storage.local.get("bookmarksFolder", (res) => {
//   if (res.bookmarksFolder === undefined) {
//     createBookmark();
//   } else {
//     extension.bookmarks.get(res.bookmarksFolder.id, (bookmarks) => {
//       if (bookmarks) {
//         const exists = bookmarks.filter(
//           (item) => item.id === res.bookmarksFolder.id
//         );

//         if (exists.length === 0) {
//           createBookmark();
//         }
//       } else {
//         createBookmark();
//       }
//     });
//   }
// });

// extension.windows.onCreated.addListener((e) => {
//   if (e.incognito) {
//     alert(e.id);

//     privateWindow = e.id;
//   }
// });

// extension.windows.onRemoved.addListener((e) => {
//   alert(e);
//   if (e === privateWindow) {
//     privateWindow = null;
//   }
// });

// extension.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   alert(JSON.stringify(message));
//   handleMessage(message, sendResponse);
// });

// function handleMessage(req, sendResponse) {
//   const { url, action, mute } = req;

//   console.log(url);

//   if (url) {
//     if (!privateWindow) {
//       extension.windows.create(
//         {
//           incognito: true,
//           url,
//         },
//         (res) => {
//           privateWindow = res.id;

//           // sendResponse({a:res.id})
//         }
//       );
//     } else {
//       extension.tabs.create(
//         {
//           windowId: privateWindow,
//           url,
//         },
//         (res) => {
//           privateTabs.push(res.id);

//           // sendResponse({a:res.id})
//         }
//       );
//     }

//     return;
//   }

//   if (action === "tab") {
//     extension.tabs.query({ active: true }, (tab) =>
//       extension.tabs.remove(tab[0].id)
//     );
//   } else if (action === "window") {
//     extension.windows.getCurrent((window) =>
//       extension.windows.remove(window.id)
//     );
//   }

//   if (mute) {
//     extension.tabs.query({ active: true }, (tab) =>
//       extension.tabs.update(tab[0].id, { muted: true })
//     );
//   }
// }
