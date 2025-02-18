import { setStyle } from "oipage/browserjs/setStyle/index.js";

export default class Popup extends HTMLElement {

    #value = "off"; // 表示弹框显示还是隐藏
    #updateView;

    constructor() {
        super()

        var _this = this;

        setStyle(_this, {
            position: "fixed",
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            zIndex: "9999999",
            transitionDuration: "300ms",
            transitionTimingFunction: "ease-out",
            transitionProperty: "opacity"
        });

        _this.#updateView = function () {
            if (_this.#value == "on") {
                setStyle(_this, {
                    display: "block"
                });
                setTimeout(() => {
                    setStyle(_this, {
                        opacity: 1
                    });
                }, 50);
            } else {
                setStyle(_this, {
                    opacity: 0
                });
                setTimeout(() => {
                    setStyle(_this, {
                        display: "none"
                    });
                }, 50);
            }
        };

        _this.#value = _this.getAttribute("value");
        _this.#updateView();
    }

    static get observedAttributes() {
        return ["value"];
    }

    attributeChangedCallback() {
        if (this.getAttribute("value") != this.#value) {
            this.#value = this.getAttribute("value");
            this.#updateView();
        }
    }
};