# 开关 Switch

## 引入

```js
import Switch from "ll-ui/src/Switch";

window.customElements.define("ui-switch", Switch);
```

## 语法

在页面中使用即可：

```html
<!-- off 表示关闭，on 表示打开，默认关闭 -->
<ui-switch value="off|on"></ui-switch>
```

此外，还可以通过 change或input 事件来监听 value 的改变：

```html
<ui-switch onChange="doit(event)"></ui-switch>
```

完整的例子代码你可以访问： [../test/Switch](../test/Switch) 。
