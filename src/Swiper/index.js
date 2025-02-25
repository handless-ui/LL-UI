import { setStyle } from "oipage/web/style/index.js";
import { animation } from "oipage/web/animation/index.js";

export default class Swiper extends HTMLElement {

    #value = -1;
    #itemEls = [];
    #stop = null;
    #timeout = null;
    #lf = -1;
    #updateScroll;
    #count = 0;

    constructor() {
        super();

        var _this = this;

        setStyle(this, {
            position: "relative",
            overflow: "hidden"
        });

        this.updateView();

        // 鼠标移动事件
        this.addEventListener('mousemove', function (event) {
            if (_this.#lf != -1) {
                if (_this.#stop) _this.#stop();
                _this.scrollTo(_this.#value, ((event.clientX - _this.#lf) / _this.clientWidth) * 100);
            }
        });

        // 鼠标松开事件
        this.addEventListener('mouseup', function (event) {
            var deep = ((event.clientX - _this.#lf) / _this.clientWidth) * 100;

            var newValue = _this.#value;
            if (deep < -20) {
                newValue += 1;
                if (newValue >= _this.#count) newValue = 0;
            } else if (deep > 20) {
                newValue -= 1;
                if (newValue == -1) newValue = _this.#count - 1;
            }
            _this.scrollTo(+ newValue, 0);

            _this.#lf = -1;
        });
    }

    updateView() {
        var _this = this;

        this.#itemEls = this.getElementsByTagName("ui-swiper-item");
        this.#count = this.#itemEls.length;

        for (var index = 0; index < this.#itemEls.length; index++) {
            setStyle(this.#itemEls[index], {
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
            });

            if (!this.#itemEls[index].__llui_swiper_event__) {
                this.#itemEls[index].__llui_swiper_event__ = true;
                (function (el) {

                    // 鼠标左键按下事件
                    el.addEventListener("mousedown", function (event) {
                        el.setCapture && el.setCapture();
                        _this.#lf = event.clientX;
                    });

                })(this.#itemEls[index]);
            }
        }
        this.scrollTo(+this.getAttribute("value") || 0, 0);

        if (this.#stop) this.#stop();
        if (this.#timeout) clearTimeout(this.#timeout);

        this.#updateScroll = function () {
            _this.#timeout = setTimeout(function () {
                var newValue = _this.#value + 1;
                if (newValue >= _this.#itemEls.length) { newValue = 0; }

                _this.#stop = animation(function (deep) {
                    if (_this.#lf == -1) {
                        _this.scrollTo(newValue, (1 - deep) * 100);
                    }
                }, 1500, function () {
                    _this.#updateScroll();
                });
            }, 5000);
        };
        this.#updateScroll();
    }

    // deep取值 -100 ~ 100
    scrollTo(value, deep) {

        if (this.#value != value) {
            this.#value = value;
            this.setAttribute("value", this.#value);

            var eventOption = {
                detail: {
                    value: this.#value,
                    count: this.#count
                },
                bubbles: false,
                composed: false
            };

            this.dispatchEvent(new CustomEvent("input", eventOption));
            this.dispatchEvent(new CustomEvent("change", eventOption));
        }

        var preIndex = value - 1;
        if (preIndex == -1) preIndex = this.#itemEls.length - 1;

        var nextIndex = value + 1;
        if (nextIndex >= this.#itemEls.length) nextIndex = 0;

        for (var index = 0; index < this.#itemEls.length; index++) {

            // 前一个
            if (index == preIndex) {
                setStyle(this.#itemEls[index], {
                    transform: "translateX(" + (-100 + deep) + "%)"
                });
            }

            // 当前
            else if (index == value) {
                setStyle(this.#itemEls[index], {
                    transform: "translateX(" + (deep) + "%)"
                });
            }

            // 下一个
            else if (index == nextIndex) {
                setStyle(this.#itemEls[index], {
                    transform: "translateX(" + (100 + deep) + "%)"
                });
            }

            // 其余
            else {
                setStyle(this.#itemEls[index], {
                    transform: "translateX(200%)"
                });
            }
        }
    }

    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback() {
        if (+this.getAttribute("value") != this.#value) {
            this.scrollTo(+this.getAttribute("value"), 0);
        }
    }

}