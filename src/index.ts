import extension from 'extensionizer';

// import { checkArrays } from "./helpers/checkArrays";

// document.addEventListener("click", (e) => {
//   if (e.target.href) {
//     e.preventDefault();

//     extension.storage.local.get("addresses", (res) => {
//       if (res.addresses) {
//         res.addresses.map((address) => {
//           if (e.target.href.includes(address.url)) {
//             extension.runtime.sendMessage({
//               url: e.target.href,
//             });
//           } else {
//             window.location = e.target.href;
//           }
//         });
//       } else {
//         window.location = e.target.href;
//       }
//     });
//   }
// });

// function inIncognito() {
//   // console.log(true);

//   extension.storage.local.get("addresses", (res) => {
//     if (res.addresses) {
//       res.addresses.map((address) => {
//         if (
//           (address.type === "address" &&
//             window.location.hostname.includes(address.url)) ||
//           (address.type === "path" &&
//             window.location.pathname.includes(address.url)) ||
//           (address.type === "protocol" &&
//             window.location.protocol === `${address.url}:`)
//         ) {
//           extension.runtime.sendMessage({
//             url: window.location.href,
//           });
//         }
//       });
//     }
//   });
// }

// extension.storage.local.get("incognitoEnabled", (res) => {
//   // console.log(res);

//   if (res.incognitoEnabled) inIncognito();
// });

// const keys = [];

// const onKeyDown = (e) => {
//   extension.storage.local.get("evacuation", (res) => {
//     if (res.evacuation) {
//       if (!keys.includes(e.key)) keys.push(e.key);

//       if (
//         (res.evacuation.name === "piano" && keys.length > 4) ||
//         (res.evacuation.name === "shortcode" && checkArrays(keys, res))
//       )
//         runEscape();
//     }
//   });
// };

// const onKeyUp = (e) => keys.splice(e.key, 1);

// function runEscape() {
//   extension.storage.local.get("action", (res) => {
//     if (res.action) {
//       if (res.action.name === "redirect") {
//         extension.storage.local.get("options", (res) => {
//           if (res.options) {
//             if (res.options.hide) document.body.style.display = "none";

//             if (res.options.mute) {
//               extension.runtime.sendMessage({
//                 mute: true,
//               });
//             }
//           }
//         });

//         window.location.href = res.action.address;
//       } else if (res.action.name === "tab") {
//         extension.runtime.sendMessage({
//           action: "tab",
//         });
//       } else if (res.action.name === "window") {
//         extension.runtime.sendMessage({
//           action: "window",
//         });
//       }
//     }
//   });
// }

// extension.storage.local.get("panicModeEnabled", (res) => {
//   if (res.panicModeEnabled) {
//     window.addEventListener("keydown", onKeyDown);
//     window.addEventListener("keyup", onKeyUp);
//   }
// });
