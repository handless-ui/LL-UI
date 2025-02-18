import { setStyle } from "oipage/browserjs/setStyle/index.js";

export default class Switch extends HTMLElement {

    #value = "off"; // 表示开关打开还是关闭
    #updateView;

    constructor() {
        super();

        var _this = this;
        var shadow = _this.attachShadow({ mode: 'open' });

        var rootEl = document.createElement("div");
        shadow.appendChild(rootEl);

        setStyle(rootEl, {
            position: "relative",
            width: "50px",
            height: "30px",
            display: "inline-block",
            borderRadius: "15px",
            border: "1px solid #dfdfdf"
        });

        var bgEl = document.createElement("div");
        rootEl.appendChild(bgEl);

        setStyle(bgEl, {
            backgroundColor: "#007aff",
            height: "32px",
            borderRadius: "15px",
            position: "absolute",
            top: "-1px",
            left: "-1px",
            transitionProperty: "width",
            transitionDuration: "300ms"
        });

        var btnEl = document.createElement("div");
        rootEl.appendChild(btnEl);

        setStyle(btnEl, {
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            boxShadow: "0 1px 3px rgba(0, 0, 0, .4)",
            position: "absolute",
            top: 0,
            transitionProperty: "left",
            transitionDuration: "300ms"
        });

        _this.#updateView = function () {
            if (_this.#value == "on") {

                setStyle(rootEl, {
                    backgroundColor: "transparent"
                });

                setStyle(bgEl, {
                    width: "52px"
                });

                setStyle(btnEl, {
                    left: "20px"
                });
            } else {

                setStyle(rootEl, {
                    backgroundColor: "white"
                });

                setStyle(bgEl, {
                    width: "32px"
                });

                setStyle(btnEl, {
                    left: 0
                });
            }

            var eventOption = {
                detail: {
                    value: _this.#value
                },
                bubbles: false, // 事件是否冒泡
                composed: false // 事件是否可以穿透shadow DOM
            };

            _this.dispatchEvent(new CustomEvent("input", eventOption));
            _this.dispatchEvent(new CustomEvent("change", eventOption));
        };

        if (_this.getAttribute("value") == "on") {
            _this.#value = "on";
            _this.#updateView();
        }

        _this.addEventListener("click", function () {
            if (_this.#value == "off") {
                _this.#value = "on";
            } else {
                _this.#value = "off";
            }

            _this.setAttribute("value", _this.#value);
            _this.#updateView();
        }, false);
    }

    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback() {
        if (this.getAttribute("value") != this.#value) {
            this.#value = this.getAttribute("value");
            this.#updateView();
        }
    }
};