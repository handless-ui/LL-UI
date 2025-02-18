# 轮播 Swiper

## 引入

```js
import Swiper from "ll-ui/src/Swiper";

window.customElements.define("ui-swiper", Swiper);
```

## 语法

在页面中使用即可：

```html
<!-- 可以使用value来控制初始化显示谁，默认0，表示显示第一个 -->
<ui-swiper value="2">
  <ui-swiper-item>1</ui-swiper-item>
  <ui-swiper-item>2</ui-swiper-item>
  <ui-swiper-item>3</ui-swiper-item>
</ui-swiper>
```

此外，还可以通过 change 或 input 事件来监听 value 的改变：

```html
<ui-swiper onChange="doit(event)"> ...... </ui-swiper>
```

完整的例子代码你可以访问： [../test/Swiper](../test/Swiper) 。
