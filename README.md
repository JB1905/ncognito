# nCognito

## About

nCognito is a cross browsers (Chrome, Firefox, Edge, Opera) incognito mode plugin.

## Main Features

### Panic mode

Quick escape window, tab or website by pressing at least 4 keys at the same time or using set shortcut.

Hide content and mute tab before new page full load when evacuation method is set to `redirect`.

### Always in incognito

Set addresses, protocols and paths which should always be opened in private window.

After detecting the address containing the set values, the page will be opened in the private window.

### Open in incognito

After click on the button in popup window, current address will be opened in private window.

## Setup

##### 1. Clone repo

```sh
git clone https://github.com/JB1905/ncognito.git
```

##### 2. Go to directory

```sh
cd ncognito
```

##### 3. Install dependencies

```sh
yarn

# Or, use npm
npm i
```

##### 4. Run

```sh
yarn watch

# Or, use npm
npm run watch
```

### Chrome

- open the Extension Management page by navigating to `chrome://extensions`
- enable Developer Mode by clicking the toggle switch next to Developer mode
- click the `LOAD UNPACKED` button and select the **dist** in the extension directory

### Firefox

- enter `about:debugging` in the URL bar
- click `This Firefox`
- click `Load Temporary Add-on`
- open the **dist** in the extension’s directory and select any file inside

## Build with

- [Vue](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)

## License

This project is licensed under the MIT License © 2018-present Jakub Biesiada
