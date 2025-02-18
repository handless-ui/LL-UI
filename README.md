# [LL-UI](https://github.com/handless-ui/LL-UI)

一个跨端的 WebComponents 组件库

<p>
    <a href="https://zxl20070701.github.io/toolbox/#/npm-download?packages=ll-ui&interval=7">
        <img src="https://img.shields.io/npm/dm/ll-ui.svg" alt="downloads">
    </a>
    <a href="https://www.npmjs.com/package/ll-ui">
        <img src="https://img.shields.io/npm/v/ll-ui.svg" alt="Version">
    </a>
    <a href="https://github.com/handless-ui/LL-UI" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/handless-ui/LL-UI?style=social">
    </a>
</p>

<img src="https://nodei.co/npm/ll-ui.png?downloads=true&amp;downloadRank=true&amp;stars=true" alt="NPM">

## 如何使用？

```
npm install --save ll-ui
```

### 全局引入

```js
import LLUI from "ll-ui";
```

### 单独引入

```js
import Switch from "ll-ui/src/Switch";

window.customElements.define("ui-switch", Switch);
```

下面是具体的组件清单：

- [开关 Switch](./docs/Switch.md)
- [弹出层 Popup](./docs/Popup.md)
- [轮播 Swiper](./docs/Swiper.md)

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步
