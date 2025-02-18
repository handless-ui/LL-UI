# 弹出层 Popup

## 引入

```js
import Popup from "ll-ui/src/Popup";

window.customElements.define("ui-popup", Popup);
```

## 语法

在页面中使用即可：

```html
<!-- off 表示关闭，on 表示打开，默认关闭 -->
<ui-popup value="off|on">
    <!-- 在这里自定义弹框内容 -->
</ui-popup>
```

如果初始化刷新页面的时候，发生弹框闪现了一个bug，可以补充下面css代码：

```css
ui-popup:not([value='on'])>* {
    display: none;
}
```

完整的例子代码你可以访问： [../test/Popup](../test/Popup) 。