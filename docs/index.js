(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  class SpinnerElement extends HTMLElement {
    constructor() {
      super();

      this.props = this.constructor.defaults;
      this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.update();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.props[name] = newValue || this.constructor.defaults[name];

      this.update();
    }

    style() {
      throw new Error('style method must be implemented');
    }

    template() {
      throw new Error('template method must be implemented');
    }

    update() {
      const styles = `
      <style>
        * { box-sizing: border-box; }

        :host           { display: block; }
        :host([hidden]) { display: none; }

        ${this.style(this.props)}
      </style>
    `;

      const template = this.template(this.props);

      this.root.innerHTML = `${styles}${template}`;
    }
  }

  class AtomSpinner extends SpinnerElement {
    static get is() { return 'atom-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 1,
        size: 60,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .atom-spinner {
        height: var(--atom-spinner__size, ${size}px);
        overflow: hidden;
        width: var(--atom-spinner__size, ${size}px);
      }

      .atom-spinner .spinner-inner {
        display: block;
        height: 100%;
        position: relative;
        width: 100%;
      }

      .atom-spinner .spinner-circle {
        color: var(--atom-spinner__color, ${color});
        display: block;
        font-size: calc(var(--atom-spinner__size, ${size}px) * 0.24);
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .atom-spinner .spinner-line {
        border-left: calc(var(--atom-spinner__size, ${size}px) / 25) solid var(--atom-spinner__color, ${color});
        border-radius: 50%;
        border-top: calc(var(--atom-spinner__size, ${size}px) / 25) solid transparent;
        height: 100%;
        position: absolute;
        width: 100%;
      }

      .atom-spinner .spinner-line:nth-child(1) {
        animation: atom-spinner-animation-1 var(--atom-spinner__duration, ${duration}s) linear infinite;
        transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
      }

      .atom-spinner .spinner-line:nth-child(2) {
        animation: atom-spinner-animation-2 var(--atom-spinner__duration, ${duration}s) linear infinite;
        transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
      }

      .atom-spinner .spinner-line:nth-child(3) {
        animation: atom-spinner-animation-3 var(--atom-spinner__duration, ${duration}s) linear infinite;
        transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
      }

      @keyframes atom-spinner-animation-1 {
        100% {
          transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
        }
      }

      @keyframes atom-spinner-animation-2 {
        100% {
          transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
        }
      }

      @keyframes atom-spinner-animation-3 {
        100% {
          transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
        }
      }
    `;
    }

    template() {
      return `
      <div class="atom-spinner">
        <div class="spinner-inner">
          <div class="spinner-line"></div>
          <div class="spinner-line"></div>
          <div class="spinner-line"></div>

          <!--Chrome renders little circles malformed :(-->
          <div class="spinner-circle">&#9679;</div>
        </div>
      </div>
    `;
    }
  }

  customElements.define(AtomSpinner.is, AtomSpinner);

  class BreedingRhombusSpinner extends SpinnerElement {
    static get is() { return 'breeding-rhombus-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 2,
        size: 65,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .breeding-rhombus-spinner {
        height: var(--breeding-rhombus-spinner__size, ${size}px);
        width: var(--breeding-rhombus-spinner__size, ${size}px);
        position: relative;
        transform: rotate(45deg);
      }

      .breeding-rhombus-spinner, .breeding-rhombus-spinner * {
        box-sizing: border-box;
      }

      .breeding-rhombus-spinner .rhombus {
        animation-duration: var(--breeding-rhombus-spinner__duration, ${duration}s);
        animation-iteration-count: infinite;
        background-color: var(--breeding-rhombus-spinner__color, ${color});
        height: calc(var(--breeding-rhombus-spinner__size, ${size}px) / 7.5);
        left: calc(var(--breeding-rhombus-spinner__size, ${size}px) / 2.3077);
        position: absolute;
        top: calc(var(--breeding-rhombus-spinner__size, ${size}px) / 2.3077);
        width: calc(var(--breeding-rhombus-spinner__size, ${size}px) / 7.5);
      }

      .breeding-rhombus-spinner .rhombus:nth-child(2n+0) {
        margin-right: 0;
      }

      .breeding-rhombus-spinner .rhombus.child-1 {
        animation-delay: calc(100ms * 1);
        animation-name: breeding-rhombus-spinner-animation-child-1;
      }

      .breeding-rhombus-spinner .rhombus.child-2 {
        animation-delay: calc(100ms * 2);
        animation-name: breeding-rhombus-spinner-animation-child-2;
      }

      .breeding-rhombus-spinner .rhombus.child-3 {
        animation-delay: calc(100ms * 3);
        animation-name: breeding-rhombus-spinner-animation-child-3;
      }

      .breeding-rhombus-spinner .rhombus.child-4 {
        animation-delay: calc(100ms * 4);
        animation-name: breeding-rhombus-spinner-animation-child-4;
      }

      .breeding-rhombus-spinner .rhombus.child-5 {
        animation-delay: calc(100ms * 5);
        animation-name: breeding-rhombus-spinner-animation-child-5;
      }

      .breeding-rhombus-spinner .rhombus.child-6 {
        animation-delay: calc(100ms * 6);
        animation-name: breeding-rhombus-spinner-animation-child-6;
      }

      .breeding-rhombus-spinner .rhombus.child-7 {
        animation-delay: calc(100ms * 7);
        animation-name: breeding-rhombus-spinner-animation-child-7;
      }

      .breeding-rhombus-spinner .rhombus.child-8 {
        animation-delay: calc(100ms * 8);
        animation-name: breeding-rhombus-spinner-animation-child-8;
      }

      .breeding-rhombus-spinner .rhombus.big {
        animation-delay: 0.5s;
        animation: breeding-rhombus-spinner-animation-child-big var(--breeding-rhombus-spinner__duration, ${duration}s) infinite;
        background-color: var(--breeding-rhombus-spinner__color, ${color});
        height: calc(var(--breeding-rhombus-spinner__size, ${size}px) / 3);
        left: calc(var(--breeding-rhombus-spinner__size, ${size}px) / 3);
        top: calc(var(--breeding-rhombus-spinner__size, ${size}px) / 3);
        width: calc(var(--breeding-rhombus-spinner__size, ${size}px) / 3);
      }

      @keyframes breeding-rhombus-spinner-animation-child-1 {
        50% {
          transform: translate(-325%, -325%);
        }
      }

      @keyframes breeding-rhombus-spinner-animation-child-2 {
        50% {
          transform: translate(0, -325%);
        }
      }

      @keyframes breeding-rhombus-spinner-animation-child-3 {
        50% {
          transform: translate(325%, -325%);
        }
      }

      @keyframes breeding-rhombus-spinner-animation-child-4 {
        50% {
          transform: translate(325%, 0);
        }
      }

      @keyframes breeding-rhombus-spinner-animation-child-5 {
        50% {
          transform: translate(325%, 325%);
        }
      }

      @keyframes breeding-rhombus-spinner-animation-child-6 {
        50% {
          transform: translate(0, 325%);
        }
      }

      @keyframes breeding-rhombus-spinner-animation-child-7 {
        50% {
          transform: translate(-325%, 325%);
        }
      }

      @keyframes breeding-rhombus-spinner-animation-child-8 {
        50% {
          transform: translate(-325%, 0);
        }
      }

      @keyframes breeding-rhombus-spinner-animation-child-big {
        50% {
          transform: scale(0.5);
        }
      }
    `;
    }

    template() {
      return `
      <div class="breeding-rhombus-spinner">
        <div class="rhombus child-1"></div>
        <div class="rhombus child-2"></div>
        <div class="rhombus child-3"></div>
        <div class="rhombus child-4"></div>
        <div class="rhombus child-5"></div>
        <div class="rhombus child-6"></div>
        <div class="rhombus child-7"></div>
        <div class="rhombus child-8"></div>
        <div class="rhombus big"></div>
      </div>
    `;
    }
  }

  customElements.define(BreedingRhombusSpinner.is, BreedingRhombusSpinner);

  class CirclesToRhombusesSpinner extends SpinnerElement {
    static get is() { return 'circles-to-rhombuses-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        count: 3,
        duration: 1.2,
        size: 15,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'count',
        'duration',
        'size',
      ];
    }

    style({ color, count, duration, size }) { // eslint-disable-line object-curly-newline
      const circleStyles = [];

      for (let i = 2; i <= count; i++) {
        circleStyles.push(`
        .circles-to-rhombuses-spinner .circle:nth-child(${i}) {
          animation-delay: calc(var(--circles-to-rhombuses-spinner__duration, ${duration}s) / 8 * ${i});
        }
      `);
      }

      return `
      .circles-to-rhombuses-spinner, .circles-to-rhombuses-spinner * {
        box-sizing: border-box;
      }

      .circles-to-rhombuses-spinner {
        align-items: center;
        display: flex;
        height: var(--circles-to-rhombuses-spinner__size, ${size}px);
        justify-content: center
        width: calc((var(--circles-to-rhombuses-spinner__size, ${size}px) + var(--circles-to-rhombuses-spinner__size, ${size}px) * 1.125) * ${count});
      }

      .circles-to-rhombuses-spinner .circle {
        animation: circles-to-rhombuses-animation var(--circles-to-rhombuses-spinner__duration, ${duration}s) linear infinite;
        background: transparent;
        border-radius: 10%;
        border: 3px solid var(--circles-to-rhombuses-spinner__color, ${color});
        height: var(--circles-to-rhombuses-spinner__size, ${size}px);
        margin-left: calc(var(--circles-to-rhombuses-spinner__size, ${size}px) * 1.125);
        overflow: hidden;
        transform: rotate(45deg);
        width: var(--circles-to-rhombuses-spinner__size, ${size}px);
      }

      .circles-to-rhombuses-spinner .circle:nth-child(1) {
        animation-delay: calc(var(--circles-to-rhombuses-spinner__duration, ${duration}s) / 8 * 1);
        margin-left: 0;
      }

      ${circleStyles.join('')}

      @keyframes circles-to-rhombuses-animation {
        0% {
          border-radius: 10%;
        }
        17.5% {
          border-radius: 10%;
        }
        50% {
          border-radius: 100%;
        }
        93.5% {
          border-radius: 10%;
        }
        100% {
          border-radius: 10%;
        }
      }

      @keyframes circles-to-rhombuses-background-animation {
        50% {
          opacity: 0.4;
        }
      }
    `;
    }

    template({ count }) {
      const circles = [];

      for (let i = 2; i <= count; i++) {
        circles.push('<div class="circle"></div>');
      }

      return `
      <div class="circles-to-rhombuses-spinner">
        <div class="circle"></div>
        ${circles.join('')}
      </div>
    `;
    }
  }

  customElements.define(CirclesToRhombusesSpinner.is, CirclesToRhombusesSpinner);

  class FingerprintSpinner extends SpinnerElement {
    static get is() { return 'fingerprint-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 1.5,
        size: 64,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .fingerprint-spinner {
        height: var(--fingerprint-spinner__size, ${size}px);
        overflow: hidden;
        padding: 2px;
        position: relative;
        width: var(--fingerprint-spinner__size, ${size}px);
      }

      .fingerprint-spinner .spinner-ring {
        animation: fingerprint-spinner-animation var(--fingerprint-spinner__duration, ${duration}s) cubic-bezier(0.680, -0.750, 0.265, 1.750) infinite forwards;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-radius: 50%;
        border-right-color: transparent;
        border-style: solid;
        border-top-color: var(--fingerprint-spinner__color, ${color});
        border-width: 2px;
        bottom: 0;
        left: 0;
        margin: auto;
        position: absolute;
        right: 0;
        top: 0;
      }

      .fingerprint-spinner .spinner-ring:nth-child(1) {
        animation-delay: calc(50ms * 1);
        height: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 0 * var(--fingerprint-spinner__size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 0 * var(--fingerprint-spinner__size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(2) {
        animation-delay: calc(50ms * 2);
        height: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 1 * var(--fingerprint-spinner__size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 1 * var(--fingerprint-spinner__size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(3) {
        animation-delay: calc(50ms * 3);
        height: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 2 * var(--fingerprint-spinner__size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 2 * var(--fingerprint-spinner__size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(4) {
        animation-delay: calc(50ms * 4);
        height: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 3 * var(--fingerprint-spinner__size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 3 * var(--fingerprint-spinner__size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(5) {
        animation-delay: calc(50ms * 5);
        height: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 4 * var(--fingerprint-spinner__size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 4 * var(--fingerprint-spinner__size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(6) {
        animation-delay: calc(50ms * 6);
        height: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 5 * var(--fingerprint-spinner__size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 5 * var(--fingerprint-spinner__size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(7) {
        animation-delay: calc(50ms * 7);
        height: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 6 * var(--fingerprint-spinner__size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 6 * var(--fingerprint-spinner__size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(8) {
        animation-delay: calc(50ms * 8);
        height: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 7 * var(--fingerprint-spinner__size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 7 * var(--fingerprint-spinner__size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(9) {
        animation-delay: calc(50ms * 9);
        height: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 8 * var(--fingerprint-spinner__size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner__size, ${size}px) / 9 + 8 * var(--fingerprint-spinner__size, ${size}px) / 9);
      }

      @keyframes fingerprint-spinner-animation {
        100% {
          transform: rotate( 360deg );
        }
      }
    `;
    }

    template() {
      return `
      <div class="fingerprint-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
    `;
    }
  }

  customElements.define(FingerprintSpinner.is, FingerprintSpinner);

  class FlowerSpinner extends SpinnerElement {
    static get is() { return 'flower-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 2.5,
        size: 70,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .flower-spinner {
        align-items: center;
        display: flex;
        flex-direction: row;
        height: var(--flower-spinner__size, ${size}px);
        justify-content: center;
        width: var(--flower-spinner__size, ${size}px);
      }

      .flower-spinner .dots-container {
        height: calc(var(--flower-spinner__size, ${size}px) / 7);
        width: calc(var(--flower-spinner__size, ${size}px) / 7);
      }

      .flower-spinner .smaller-dot {
        animation: flower-spinner-smaller-dot-animation var(--flower-spinner__duration, ${duration}s) 0s infinite both;
        background: var(--fingerprint-spinner__color, ${color});
        border-radius: 50%;
        height: 100%;
        width: 100%;
      }

      .flower-spinner .bigger-dot {
        animation: flower-spinner-bigger-dot-animation var(--flower-spinner__duration, ${duration}s) 0s infinite both;
        background: var(--fingerprint-spinner__color, ${color});
        border-radius: 50%;
        height: 100%;
        padding: 10%;
        width: 100%;
      }

      @keyframes flower-spinner-bigger-dot-animation {
        0%, 100% {
          box-shadow: var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px;
        }
        50% {
          transform: rotate(180deg);
        }
        25%, 75% {
          box-shadow: var(--fingerprint-spinner__color, ${color}) 26px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) -26px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 26px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px -26px 0px,
                      var(--fingerprint-spinner__color, ${color}) 19px -19px 0px,
                      var(--fingerprint-spinner__color, ${color}) 19px 19px 0px,
                      var(--fingerprint-spinner__color, ${color}) -19px -19px 0px,
                      var(--fingerprint-spinner__color, ${color}) -19px 19px 0px;
        }
        100% {
          transform: rotate(360deg);
          box-shadow: var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px;
        }
      }
      @keyframes flower-spinner-smaller-dot-animation {
        0%, 100% {
          box-shadow: var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner__color, ${color}) 0px 0px 0px;
        }
        25%, 75% {
          box-shadow: var(--fingerprint-spinner__color, ${color}) 14px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) -14px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 14px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px -14px 0px,
                      var(--fingerprint-spinner__color, ${color}) 10px -10px 0px,
                      var(--fingerprint-spinner__color, ${color}) 10px 10px 0px,
                      var(--fingerprint-spinner__color, ${color}) -10px -10px 0px,
                      var(--fingerprint-spinner__color, ${color}) -10px 10px 0px;
        }
        100% {
          box-shadow: var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner__color, ${color}) 0px 0px 0px;
        }
      }
    `;
    }

    template() {
      return `
      <div class="flower-spinner">
        <div class="dots-container">
          <div class="bigger-dot">
            <div class="smaller-dot"></div>
          </div>
        </div>
      </div>
    `;
    }
  }

  customElements.define(FlowerSpinner.is, FlowerSpinner);

  class FulfillingBouncingCircleSpinner extends SpinnerElement {
    static get is() { return 'fulfilling-bouncing-circle-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 4,
        size: 50,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .fulfilling-bouncing-circle-spinner {
        animation: fulfilling-bouncing-circle-spinner-animation infinite var(--fulfilling-bouncing-circle-spinner__duration, ${duration}s) ease;
        height: var(--fulfilling-bouncing-circle-spinner__size, ${size}px);
        position: relative;
        width: var(--fulfilling-bouncing-circle-spinner__size, ${size}px);
      }

      .fulfilling-bouncing-circle-spinner .orbit {
        animation: fulfilling-bouncing-circle-spinner-orbit-animation infinite var(--fulfilling-bouncing-circle-spinner__duration, ${duration}s) ease;
        border-radius: 50%;
        border: calc(var(--fulfilling-bouncing-circle-spinner__size, ${size}px) * 0.03) solid var(--fulfilling-bouncing-circle-spinner__color, ${color});
        height: var(--fulfilling-bouncing-circle-spinner__size, ${size}px);
        left: 0;
        position: absolute;
        top: 0;
        width: var(--fulfilling-bouncing-circle-spinner__size, ${size}px);
      }

      .fulfilling-bouncing-circle-spinner .circle {
        animation: fulfilling-bouncing-circle-spinner-circle-animation infinite var(--fulfilling-bouncing-circle-spinner__duration, ${duration}s) ease;
        border-radius: 50%;
        border: calc(var(--fulfilling-bouncing-circle-spinner__size, ${size}px) * 0.1) solid var(--fulfilling-bouncing-circle-spinner__color, ${color});
        color: var(--fulfilling-bouncing-circle-spinner__color, ${color});
        display: block;
        height: var(--fulfilling-bouncing-circle-spinner__size, ${size}px);
        position: relative;
        transform: rotate(0deg) scale(1);
        width: var(--fulfilling-bouncing-circle-spinner__size, ${size}px);
      }

      @keyframes fulfilling-bouncing-circle-spinner-animation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes fulfilling-bouncing-circle-spinner-orbit-animation {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1);
        }
        62.5% {
          transform: scale(0.8);
        }
        75% {
          transform: scale(1);
        }
        87.5% {
          transform: scale(0.8);
        }
        100% {
          transform: scale(1);
        }
      }

      @keyframes fulfilling-bouncing-circle-spinner-circle-animation {
        0% {
          border-bottom-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          border-top-color: inherit;
          transform: scale(1);
        }

        16.7% {
          border-bottom-color: transparent;
          border-left-color: transparent;
          border-right-color: initial;
          border-top-color: initial;
        }

        33.4% {
          border-bottom-color: inherit;
          border-left-color: transparent;
          border-right-color: inherit;
          border-top-color: inherit;
        }

        50% {
          border-color: inherit;
          transform: scale(1);
        }

        62.5% {
          border-color: inherit;
          transform: scale(1.4);
        }

        75% {
          border-color: inherit;
          opacity: 1;
          transform: scale(1);
        }

        87.5% {
          border-color: inherit;
          transform: scale(1.4);
        }

        100% {
          border-color: transparent;
          border-top-color: inherit;
          transform: scale(1);
        }
      }
    `;
    }

    template() {
      return `
      <div class="fulfilling-bouncing-circle-spinner">
        <div class="circle"></div>
        <div class="orbit"></div>
      </div>
    `;
    }
  }

  customElements.define(FulfillingBouncingCircleSpinner.is, FulfillingBouncingCircleSpinner);

  class FulfillingSquareSpinner extends SpinnerElement {
    static get is() { return 'fulfilling-square-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 4,
        size: 50,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .fulfilling-square-spinner {
        height: var(--fulfilling-square-spinner__size, ${size}px);
        width: var(--fulfilling-square-spinner__size, ${size}px);
        position: relative;
        border: 4px solid var(--fulfilling-square-spinner__color, ${color});
        animation: fulfilling-square-spinner-animation var(--fulfilling-square-spinner__duration, ${duration}s) infinite ease;
      }

      .fulfilling-square-spinner .spinner-inner {
        vertical-align: top;
        display: inline-block;
        background-color: var(--fulfilling-square-spinner__color, ${color});
        width: 100%;
        opacity: 1;
        animation: fulfilling-square-spinner-inner-animation var(--fulfilling-square-spinner__duration, ${duration}s) infinite ease-in;
      }

      @keyframes fulfilling-square-spinner-animation {
        0%   { transform: rotate(0deg); }
        25%  { transform: rotate(180deg); }
        50%  { transform: rotate(180deg); }
        75%  { transform: rotate(360deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes fulfilling-square-spinner-inner-animation {
        0%   { height: 0%; }
        25%  { height: 0%; }
        50%  { height: 100%; }
        75%  { height: 100%; }
        100% { height: 0%; }
      }
    `;
    }

    template() {
      return `
      <div class="fulfilling-square-spinner">
        <div class="spinner-inner"></div>
      </div>
    `;
    }
  }

  customElements.define(FulfillingSquareSpinner.is, FulfillingSquareSpinner);

  class HalfCircleSpinner extends SpinnerElement {
    static get is() { return 'half-circle-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 1,
        size: 60,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .half-circle-spinner {
        border-radius: 100%;
        height: var(--half-circle-spinner__size, ${size}px);
        position: relative;
        width: var(--half-circle-spinner__size, ${size}px);
      }

      .half-circle-spinner .circle {
        border-radius: 100%;
        border: calc(var(--half-circle-spinner__size, ${size}px) / 10) solid transparent;
        content: "";
        height: 100%;
        position: absolute;
        width: 100%;
      }

      .half-circle-spinner .circle.circle-1 {
        animation: half-circle-spinner-animation var(--half-circle-spinner__duration, ${duration}s) infinite;
        border-top-color: var(--half-circle-spinner__color, ${color});
      }

      .half-circle-spinner .circle.circle-2 {
        animation: half-circle-spinner-animation var(--half-circle-spinner__duration, ${duration}s) infinite alternate;
        border-bottom-color: var(--half-circle-spinner__color, ${color});
      }

      @keyframes half-circle-spinner-animation {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    }

    template() {
      return `
      <div class="half-circle-spinner">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
      </div>
    `;
    }
  }

  customElements.define(HalfCircleSpinner.is, HalfCircleSpinner);

  class HollowDotsSpinner extends SpinnerElement {
    static get is() { return 'hollow-dots-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        count: 3,
        duration: 1,
        size: 15,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'count',
        'duration',
        'size',
      ];
    }

    style({ color, duration, count, size }) { // eslint-disable-line object-curly-newline
      const dotStyles = [];

      for (let i = 1; i <= count; i++) {
        dotStyles.push(`
        .hollow-dots-spinner .dot:nth-child(${i}) {
          animation-delay: calc(var(--hollow-dots-spinner__duration, ${duration}s) / ${count} * ${i});
        }
      `);
      }

      return `
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
      }

      .hollow-dots-spinner {
        height: var(--hollow-dots-spinner__size, ${size}px);
        width: calc(var(--hollow-dots-spinner__size, ${size}px) * 2 * ${count});
      }

      .hollow-dots-spinner .dot {
        animation: hollow-dots-spinner-animation var(--hollow-dots-spinner__duration, ${duration}s) ease infinite 0ms;
        border-radius: 50%;
        border: calc(var(--hollow-dots-spinner__size, ${size}px) / 5) solid var(--hollow-dots-spinner__color, ${color});
        float: left;
        height: var(--hollow-dots-spinner__size, ${size}px);
        margin: 0 calc(var(--hollow-dots-spinner__size, ${size}px) / 2);
        transform: scale(0);
        width: var(--hollow-dots-spinner__size, ${size}px);
      }

      ${dotStyles.join('')}

      @keyframes hollow-dots-spinner-animation {
        50% {
          transform: scale(1);
          opacity: 1;
        }

        100% {
          opacity: 0;
        }
      }
    `;
    }

    template({ count }) {
      const dots = [];

      for (let i = 1; i <= count; i++) {
        dots.push('<div class="dot"></div>');
      }

      return `
      <div class="hollow-dots-spinner">
        ${dots.join('')}
      </div>
    `;
    }
  }

  customElements.define(HollowDotsSpinner.is, HollowDotsSpinner);

  class IntersectingCirclesSpinner extends SpinnerElement {
    static get is() { return 'intersecting-circles-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 1.2,
        size: 35,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .intersecting-circles-spinner {
        height: calc(var(--intersecting-circles-spinner__size, ${size}px) * 2);
        width: calc(var(--intersecting-circles-spinner__size, ${size}px) * 2);
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

      .intersecting-circles-spinner .spinnerBlock {
        animation: intersecting-circles-spinners-animation var(--intersecting-circles-spinner__duration, ${duration}s) linear infinite;
        transform-origin: center;
        display: block;
        height: var(--intersecting-circles-spinner__size, ${size}px);
        width: var(--intersecting-circles-spinner__size, ${size}px);
      }

      .intersecting-circles-spinner .circle {
        display: block;
        border: 2px solid var(--intersecting-circles-spinner__color, ${color});
        border-radius: 50%;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }

      .intersecting-circles-spinner .circle:nth-child(1) {
        left: 0;
        top: 0;
      }

      .intersecting-circles-spinner .circle:nth-child(2) {
        left: calc(var(--intersecting-circles-spinner__size, ${size}px) * -0.36);
        top: calc(var(--intersecting-circles-spinner__size, ${size}px) * 0.2);
      }

      .intersecting-circles-spinner .circle:nth-child(3) {
        left: calc(var(--intersecting-circles-spinner__size, ${size}px) * -0.36);
        top: calc(var(--intersecting-circles-spinner__size, ${size}px) * -0.2);
      }

      .intersecting-circles-spinner .circle:nth-child(4) {
        left: 0;
        top: calc(var(--intersecting-circles-spinner__size, ${size}px) * -0.36);
      }

      .intersecting-circles-spinner .circle:nth-child(5) {
        left: calc(var(--intersecting-circles-spinner__size, ${size}px) * 0.36);
        top: calc(var(--intersecting-circles-spinner__size, ${size}px) * -0.2);
      }

      .intersecting-circles-spinner .circle:nth-child(6) {
        left: calc(var(--intersecting-circles-spinner__size, ${size}px) * 0.36);
        top: calc(var(--intersecting-circles-spinner__size, ${size}px) * 0.2);
      }

      .intersecting-circles-spinner .circle:nth-child(7) {
        left: 0;
        top: calc(var(--intersecting-circles-spinner__size, ${size}px) * 0.36);
      }

      @keyframes intersecting-circles-spinners-animation {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
    `;
    }

    template() {
      return `
      <div class="intersecting-circles-spinner">
        <div class="spinnerBlock">
          <span class="circle"></span>
          <span class="circle"></span>
          <span class="circle"></span>
          <span class="circle"></span>
          <span class="circle"></span>
          <span class="circle"></span>
          <span class="circle"></span>
        </div>
      </div>
    `;
    }
  }

  customElements.define(IntersectingCirclesSpinner.is, IntersectingCirclesSpinner);

  class LoopingRhombusesSpinner extends SpinnerElement {
    static get is() { return 'looping-rhombuses-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 2.5,
        size: 15,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .looping-rhombuses-spinner {
        height: var(--looping-rhombuses-spinner__size, ${size}px);
        position: relative;
        width: calc(var(--looping-rhombuses-spinner__size, ${size}px) * 4);
      }

      .looping-rhombuses-spinner .rhombus {
        animation: looping-rhombuses-spinner-animation var(--looping-rhombuses-spinner__duration, ${duration}s) linear infinite;
        background-color: var(--looping-rhombuses-spinner__color, ${color});
        border-radius: 2px;
        height: var(--looping-rhombuses-spinner__size, ${size}px);
        left: calc(var(--looping-rhombuses-spinner__size, ${size}px) * 4);
        margin: 0 auto;
        position: absolute;
        transform: translateY(0) rotate(45deg) scale(0);
        width: var(--looping-rhombuses-spinner__size, ${size}px);
      }

      .looping-rhombuses-spinner .rhombus:nth-child(1) {
        animation-delay: calc(var(--looping-rhombuses-spinner__duration, ${duration}s) * 1 / -1.5);
      }

      .looping-rhombuses-spinner .rhombus:nth-child(2) {
        animation-delay: calc(var(--looping-rhombuses-spinner__duration, ${duration}s) * 2 / -1.5);
      }

      .looping-rhombuses-spinner .rhombus:nth-child(3) {
        animation-delay: calc(var(--looping-rhombuses-spinner__duration, ${duration}s) * 3 / -1.5);
      }

      @keyframes looping-rhombuses-spinner-animation {
        0%   { transform: translateX(0)     rotate(45deg) scale(0); }
        50%  { transform: translateX(-233%) rotate(45deg) scale(1); }
        100% { transform: translateX(-466%) rotate(45deg) scale(0); }
      }
    `;
    }

    template() {
      return `
      <div class="looping-rhombuses-spinner">
        <div class="rhombus"></div>
        <div class="rhombus"></div>
        <div class="rhombus"></div>
      </div>
    `;
    }
  }

  customElements.define(LoopingRhombusesSpinner.is, LoopingRhombusesSpinner);

  class OrbitSpinner extends SpinnerElement {
    static get is() { return 'orbit-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 1.2,
        size: 55,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .orbit-spinner {
        border-radius: 50%;
        height: var(--orbit-spinner__size, ${size}px);
        perspective: 800px;
        width: var(--orbit-spinner__size, ${size}px);
      }

      .orbit-spinner .orbit {
        border-radius: 50%;
        box-sizing: border-box;
        height: 100%;
        position: absolute;
        width: 100%;
      }

      .orbit-spinner .orbit:nth-child(1) {
        animation: orbit-spinner-orbit-one-animation var(--orbit-spinner__duration, ${duration}s) linear infinite;
        border-bottom: 3px solid var(--orbit-spinner__color, ${color});
        left: 0%;
        top: 0%;
      }

      .orbit-spinner .orbit:nth-child(2) {
        animation: orbit-spinner-orbit-two-animation var(--orbit-spinner__duration, ${duration}s) linear infinite;
        border-right: 3px solid var(--orbit-spinner__color, ${color});
        right: 0%;
        top: 0%;
      }

      .orbit-spinner .orbit:nth-child(3) {
        animation: orbit-spinner-orbit-three-animation var(--orbit-spinner__duration, ${duration}s) linear infinite;
        border-top: 3px solid var(--orbit-spinner__color, ${color});
        bottom: 0%;
        right: 0%;
      }

      @keyframes orbit-spinner-orbit-one-animation {
        0%   { transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg); }
        100% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg); }
      }

      @keyframes orbit-spinner-orbit-two-animation {
        0%   { transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg); }
        100% { transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg); }
      }

      @keyframes orbit-spinner-orbit-three-animation {
        0%   { transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg); }
        100% { transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
        }
      }
    `;
    }

    template() {
      return `
      <div class="orbit-spinner">
        <div class="orbit"></div>
        <div class="orbit"></div>
        <div class="orbit"></div>
      </div>
    `;
    }
  }

  customElements.define(OrbitSpinner.is, OrbitSpinner);

  class PixelSpinner extends SpinnerElement {
    static get is() { return 'pixel-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 2,
        size: 70,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .pixel-spinner {
        align-items: center;
        display: flex;
        flex-direction: row;
        height: var(--pixel-spinner__size, ${size}px);
        justify-content: center;
        width: var(--pixel-spinner__size, ${size}px);
      }

      .pixel-spinner .pixel-spinner-inner {
        animation: pixel-spinner-animation var(--pixel-spinner__duration, ${duration}s) linear infinite;
        background-color: var(--pixel-spinner__color, ${color});
        box-shadow: 15px 15px  0 0,
                    -15px -15px  0 0,
                    15px -15px  0 0,
                    -15px 15px  0 0,
                    0 15px  0 0,
                    15px 0  0 0,
                    -15px 0  0 0,
                    0 -15px 0 0;
        color: var(--pixel-spinner__color, ${color});
        height: calc(var(--pixel-spinner__size, ${size}px) / 7);
        width: calc(var(--pixel-spinner__size, ${size}px) / 7);
      }

      @keyframes pixel-spinner-animation {
        50% {
          box-shadow: 20px 20px 0px 0px,
                      -20px -20px 0px 0px,
                      20px -20px 0px 0px,
                      -20px 20px 0px 0px,
                      0px 10px 0px 0px,
                      10px 0px 0px 0px,
                      -10px 0px 0px 0px,
                      0px -10px 0px 0px;
        }

        75% {
          box-shadow: 20px 20px 0px 0px,
                      -20px -20px 0px 0px,
                      20px -20px 0px 0px,
                      -20px 20px 0px 0px,
                      0px 10px 0px 0px,
                      10px 0px 0px 0px,
                      -10px 0px 0px 0px,
                      0px -10px 0px 0px;
        }

        100% {
          transform: rotate(360deg);
        }
      }
    `;
    }

    template() {
      return `
      <div class="pixel-spinner">
        <div class="pixel-spinner-inner"></div>
      </div>
    `;
    }
  }

  customElements.define(PixelSpinner.is, PixelSpinner);

  class RadarSpinner extends SpinnerElement {
    static get is() { return 'radar-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 2,
        size: 60,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .radar-spinner {
        height: var(--radar-spinner__size, ${size}px);
        position: relative;
        width: var(--radar-spinner__size, ${size}px);
      }

      .radar-spinner .circle {
        animation: radar-spinner-animation var(--radar-spinner__duration, ${duration}s) infinite;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }

      .radar-spinner .circle:nth-child(1) {
        animation-delay: calc(var(--radar-spinner__duration, ${duration}s) / 6.67);
        padding: calc(var(--radar-spinner__size, ${size}px) * 5 * 2 * 0 / 110);
      }

      .radar-spinner .circle:nth-child(2) {
        animation-delay: calc(var(--radar-spinner__duration, ${duration}s) / 6.67);
        padding: calc(var(--radar-spinner__size, ${size}px) * 5 * 2 * 1 / 110);
      }

      .radar-spinner .circle:nth-child(3) {
        animation-delay: calc(var(--radar-spinner__duration, ${duration}s) / 6.67);
        padding: calc(var(--radar-spinner__size, ${size}px) * 5 * 2 * 2 / 110);
      }

      .radar-spinner .circle:nth-child(4) {
        animation-delay: 0ms;
        padding: calc(var(--radar-spinner__size, ${size}px) * 5 * 2 * 3 / 110);
      }

      .radar-spinner .circle-inner, .radar-spinner .circle-inner-container {
        border-radius: 50%;
        border: calc(var(--radar-spinner__size, ${size}px) * 5 / 110) solid transparent;
        height: 100%;
        width: 100%;
      }

      .radar-spinner .circle-inner {
        border-left-color: var(--radar-spinner__color, ${color});
        border-right-color: var(--radar-spinner__color, ${color});
      }

      @keyframes radar-spinner-animation {
        50%  { transform: rotate(180deg); }
        100% { transform: rotate(0deg); }
      }
    `;
    }

    template() {
      return `
      <div class="radar-spinner">
        <div class="circle">
          <div class="circle-inner-container">
            <div class="circle-inner"></div>
          </div>
        </div>

        <div class="circle">
          <div class="circle-inner-container">
            <div class="circle-inner"></div>
          </div>
        </div>

        <div class="circle">
          <div class="circle-inner-container">
            <div class="circle-inner"></div>
          </div>
        </div>

        <div class="circle">
          <div class="circle-inner-container">
            <div class="circle-inner"></div>
          </div>
        </div>
      </div>
    `;
    }
  }

  customElements.define(RadarSpinner.is, RadarSpinner);

  class ScalingSquaresSpinner extends SpinnerElement {
    static get is() { return 'scaling-squares-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 1.25,
        size: 65,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .scaling-squares-spinner {
        align-items: center;
        animation: scaling-squares-animation var(--scaling-squares-spinner__duration, ${duration}s) infinite;
        display: flex;
        flex-direction: row;
        height: var(--scaling-squares-spinner__size, ${size}px);
        justify-content: center;
        position: relative;
        transform: rotate(0deg);
        width: var(--scaling-squares-spinner__size, ${size}px);
      }

      .scaling-squares-spinner .square {
        animation-duration: var(--scaling-squares-spinner__duration, ${duration}s);
        animation-iteration-count: infinite;
        border: calc(var(--scaling-squares-spinner__size, ${size}px) * 0.04 / 1.3) solid var(--scaling-squares-spinner__color, ${color});
        height: calc(var(--scaling-squares-spinner__size, ${size}px) * 0.25 / 1.3);
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        width: calc(var(--scaling-squares-spinner__size, ${size}px) * 0.25 / 1.3);
      }

      .scaling-squares-spinner .square:nth-child(1) {
        animation-name: scaling-squares-spinner-animation-child-1;
      }

      .scaling-squares-spinner .square:nth-child(2) {
        animation-name: scaling-squares-spinner-animation-child-2;
      }

      .scaling-squares-spinner .square:nth-child(3) {
        animation-name: scaling-squares-spinner-animation-child-3;
      }

      .scaling-squares-spinner .square:nth-child(4) {
        animation-name: scaling-squares-spinner-animation-child-4;
      }

      @keyframes scaling-squares-animation {
        50%  { transform: rotate(90deg); }
        100% { transform: rotate(180deg); }
      }

      @keyframes scaling-squares-spinner-animation-child-1 {
        50% { transform: translate(150%,150%) scale(2,2); }
      }

      @keyframes scaling-squares-spinner-animation-child-2 {
        50% { transform: translate(-150%,150%) scale(2,2); }
      }

      @keyframes scaling-squares-spinner-animation-child-3 {
        50% { transform: translate(-150%,-150%) scale(2,2); }
      }

      @keyframes scaling-squares-spinner-animation-child-4 {
        50% { transform: translate(150%,-150%) scale(2,2); }
      }
    `;
    }

    template() {
      return `
      <div class="scaling-squares-spinner">
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
      </div>
    `;
    }
  }

  customElements.define(ScalingSquaresSpinner.is, ScalingSquaresSpinner);

  class SelfBuildingSquareSpinner extends SpinnerElement {
    static get is() { return 'self-building-square-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 6,
        size: 10,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .self-building-square-spinner {
        height: calc(var(--self-building-square-spinner__size, ${size}px) * 4);
        top: calc(var(--self-building-square-spinner__size, ${size}px) * 2 / 3);
        width: calc(var(--self-building-square-spinner__size, ${size}px) * 4);
      }
      .self-building-square-spinner .square {
        animation: self-building-square-spinner var(--self-building-square-spinner__duration, ${duration}s) infinite;
        background: var(--self-building-square-spinner__color, ${color});
        float: left;
        height: var(--self-building-square-spinner__size, ${size}px);
        margin-right: calc(var(--self-building-square-spinner__size, ${size}px) / 3);
        margin-top: calc(var(--self-building-square-spinner__size, ${size}px) / 3);
        opacity: 0;
        position:relative;
        top: calc(var(--self-building-square-spinner__size, ${size}px) * -2 / 3);
        width: var(--self-building-square-spinner__size, ${size}px);
      }

      .self-building-square-spinner .square:nth-child(1) {
        animation-delay: calc(var(--self-building-square-spinner__duration, ${duration}s) / 20 * 6);
      }

      .self-building-square-spinner .square:nth-child(2) {
        animation-delay: calc(var(--self-building-square-spinner__duration, ${duration}s) / 20 * 7);
      }

      .self-building-square-spinner .square:nth-child(3) {
        animation-delay: calc(var(--self-building-square-spinner__duration, ${duration}s) / 20 * 8);
      }

      .self-building-square-spinner .square:nth-child(4) {
        animation-delay: calc(var(--self-building-square-spinner__duration, ${duration}s) / 20 * 3);
      }

      .self-building-square-spinner .square:nth-child(5) {
        animation-delay: calc(var(--self-building-square-spinner__duration, ${duration}s) / 20 * 4);
      }

      .self-building-square-spinner .square:nth-child(6) {
        animation-delay: calc(var(--self-building-square-spinner__duration, ${duration}s) / 20 * 5);
      }

      .self-building-square-spinner .square:nth-child(7) {
        animation-delay: calc(var(--self-building-square-spinner__duration, ${duration}s) / 20 * 0);
      }

      .self-building-square-spinner .square:nth-child(8) {
        animation-delay: calc(var(--self-building-square-spinner__duration, ${duration}s) / 20 * 1);
      }

      .self-building-square-spinner .square:nth-child(9) {
        animation-delay: calc(var(--self-building-square-spinner__duration, ${duration}s) / 20 * 2);
      }

      .self-building-square-spinner .clear {
        clear: both;
      }

      @keyframes self-building-square-spinner {
        0% {
          opacity: 0;
        }

        5% {
          opacity: 1;
          top: 0;
        }

        50.9% {
          opacity: 1;
          top: 0;
        }

        55.9% {
          opacity: 0;
          top: inherit;
        }
      }
    `;
    }

    template() {
      return `
      <div class="self-building-square-spinner">
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square clear"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square clear"></div>
        <div class="square"></div>
        <div class="square"></div>
      </div>
    `;
    }
  }

  customElements.define(SelfBuildingSquareSpinner.is, SelfBuildingSquareSpinner);

  class SemipolarSpinner extends SpinnerElement {
    static get is() { return 'semipolar-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 2,
        size: 65,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .semipolar-spinner {
        height: var(--semipolar-spinner__size, ${size}px);
        position: relative;
        width: var(--semipolar-spinner__size, ${size}px);
      }

      .semipolar-spinner .ring {
        animation: semipolar-spinner-animation var(--semipolar-spinner__duration, ${duration}s) infinite;
        border-bottom-color: transparent;
        border-left-color: var(--semipolar-spinner__color, ${color});
        border-radius: 50%;
        border-right-color: transparent;
        border-style: solid;
        border-top-color: var(--semipolar-spinner__color, ${color});
        border-width: calc(var(--semipolar-spinner__size, ${size}px) * 0.05);
        position: absolute;
      }

      .semipolar-spinner .ring:nth-child(1) {
        animation-delay: calc(var(--semipolar-spinner__duration, ${duration}s) * 0.1 * 4);
        height: calc(var(--semipolar-spinner__size, ${size}px) - var(--semipolar-spinner__size, ${size}px) * 0.2 * 0);
        left: calc(var(--semipolar-spinner__size, ${size}px) * 0.1 * 0);
        top: calc(var(--semipolar-spinner__size, ${size}px) * 0.1 * 0);
        width: calc(var(--semipolar-spinner__size, ${size}px) - var(--semipolar-spinner__size, ${size}px) * 0.2 * 0);
        z-index: 5;
      }

      .semipolar-spinner .ring:nth-child(2) {
        animation-delay: calc(var(--semipolar-spinner__duration, ${duration}s) * 0.1 * 3);
        height: calc(var(--semipolar-spinner__size, ${size}px) - var(--semipolar-spinner__size, ${size}px) * 0.2 * 1);
        left: calc(var(--semipolar-spinner__size, ${size}px) * 0.1 * 1);
        top: calc(var(--semipolar-spinner__size, ${size}px) * 0.1 * 1);
        width: calc(var(--semipolar-spinner__size, ${size}px) - var(--semipolar-spinner__size, ${size}px) * 0.2 * 1);
        z-index: 4;
      }

      .semipolar-spinner .ring:nth-child(3) {
        animation-delay: calc(var(--semipolar-spinner__duration, ${duration}s) * 0.1 * 2);
        height: calc(var(--semipolar-spinner__size, ${size}px) - var(--semipolar-spinner__size, ${size}px) * 0.2 * 2);
        left: calc(var(--semipolar-spinner__size, ${size}px) * 0.1 * 2);
        top: calc(var(--semipolar-spinner__size, ${size}px) * 0.1 * 2);
        width: calc(var(--semipolar-spinner__size, ${size}px) - var(--semipolar-spinner__size, ${size}px) * 0.2 * 2);
        z-index: 3;
      }

      .semipolar-spinner .ring:nth-child(4) {
        animation-delay: calc(var(--semipolar-spinner__duration, ${duration}s) * 0.1 * 1);
        height: calc(var(--semipolar-spinner__size, ${size}px) - var(--semipolar-spinner__size, ${size}px) * 0.2 * 3);
        left: calc(var(--semipolar-spinner__size, ${size}px) * 0.1 * 3);
        top: calc(var(--semipolar-spinner__size, ${size}px) * 0.1 * 3);
        width: calc(var(--semipolar-spinner__size, ${size}px) - var(--semipolar-spinner__size, ${size}px) * 0.2 * 3);
        z-index: 2;
      }

      .semipolar-spinner .ring:nth-child(5) {
        animation-delay: calc(var(--semipolar-spinner__duration, ${duration}s) * 0.1 * 0);
        height: calc(var(--semipolar-spinner__size, ${size}px) - var(--semipolar-spinner__size, ${size}px) * 0.2 * 4);
        left: calc(var(--semipolar-spinner__size, ${size}px) * 0.1 * 4);
        top: calc(var(--semipolar-spinner__size, ${size}px) * 0.1 * 4);
        width: calc(var(--semipolar-spinner__size, ${size}px) - var(--semipolar-spinner__size, ${size}px) * 0.2 * 4);
        z-index: 1;
      }

      @keyframes semipolar-spinner-animation {
        50% { transform: rotate(360deg) scale(0.7); }
      }
    `;
    }

    template() {
      return `
      <div class="semipolar-spinner">
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
      </div>
    `;
    }
  }

  customElements.define(SemipolarSpinner.is, SemipolarSpinner);

  class SpringSpinner extends SpinnerElement {
    static get is() { return 'spring-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 3,
        size: 60,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .spring-spinner {
        height: var(--spring-spinner__size, ${size}px);
        width: var(--spring-spinner__size, ${size}px);
      }

      .spring-spinner .spring-spinner-part {
        height: calc(var(--spring-spinner__size, ${size}px) / 2);
        overflow: hidden;
        width: var(--spring-spinner__size, ${size}px);
      }

      .spring-spinner  .spring-spinner-part.bottom {
          transform: rotate(180deg) scale(-1, 1);
      }

      .spring-spinner .spring-spinner-rotator {
        animation: spring-spinner-animation var(--spring-spinner__duration, ${duration}s) ease-in-out infinite;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-radius: 50%;
        border-right-color: var(--spring-spinner__color, ${color});
        border-style: solid;
        border-top-color: var(--spring-spinner__color, ${color});
        border-width: calc(var(--spring-spinner__size, ${size}px) / 7);
        height: var(--spring-spinner__size, ${size}px);
        transform: rotate(-200deg);
        width: var(--spring-spinner__size, ${size}px);
      }

      @keyframes spring-spinner-animation {
        0% {
          border-width: calc(var(--spring-spinner__size, ${size}px) / 7);
        }

        25% {
          border-width: calc(var(--spring-spinner__size, ${size}px) / 23.33);
        }

        50% {
          transform: rotate(115deg);
          border-width: calc(var(--spring-spinner__size, ${size}px) / 7);
        }

        75% {
          border-width: calc(var(--spring-spinner__size, ${size}px) / 23.33);
        }

        100% {
          border-width: calc(var(--spring-spinner__size, ${size}px) / 7);
        }
      }
    `;
    }

    template() {
      return `
      <div class="spring-spinner">
        <div class="spring-spinner-part top">
          <div class="spring-spinner-rotator"></div>
        </div>

        <div class="spring-spinner-part bottom">
          <div class="spring-spinner-rotator"></div>
        </div>
      </div>
    `;
    }
  }

  customElements.define(SpringSpinner.is, SpringSpinner);

  class SwappingSquaresSpinner extends SpinnerElement {
    static get is() { return 'swapping-squares-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 1,
        size: 65,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .swapping-squares-spinner {
        align-items: center;
        display: flex;
        flex-direction: row;
        height: var(--swapping-squares-spinner__size, ${size}px);
        justify-content: center;
        position: relative;
        width: var(--swapping-squares-spinner__size, ${size}px);
      }

      .swapping-squares-spinner .square {
        animation-duration: var(--swapping-squares-spinner__duration, ${duration}s);
        animation-iteration-count: infinite;
        border: calc(var(--swapping-squares-spinner__size, ${size}px) * 0.04 / 1.3) solid var(--swapping-squares-spinner__color, ${color});
        height: calc(var(--swapping-squares-spinner__size, ${size}px) * 0.25 / 1.3);
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        width: calc(var(--swapping-squares-spinner__size, ${size}px) * 0.25 / 1.3);
      }

      .swapping-squares-spinner .square:nth-child(1) {
        animation-delay: calc(var(--swapping-squares-spinner__duration, ${duration}s) / 2);
        animation-name: swapping-squares-animation-child-1;
      }

      .swapping-squares-spinner .square:nth-child(2) {
        animation-delay: 0ms;
        animation-name: swapping-squares-animation-child-2;
      }

      .swapping-squares-spinner .square:nth-child(3) {
        animation-delay: calc(var(--swapping-squares-spinner__duration, ${duration}s) / 2);
        animation-name: swapping-squares-animation-child-3;
      }

      .swapping-squares-spinner .square:nth-child(4) {
        animation-delay: 0ms;
        animation-name: swapping-squares-animation-child-4;
      }

      @keyframes swapping-squares-animation-child-1 {
        50% { transform: translate(150%,150%) scale(2,2); }
      }

      @keyframes swapping-squares-animation-child-2 {
        50% { transform: translate(-150%,150%) scale(2,2); }
      }

      @keyframes swapping-squares-animation-child-3 {
        50% { transform: translate(-150%,-150%) scale(2,2); }
      }

      @keyframes swapping-squares-animation-child-4 {
        50% { transform: translate(150%,-150%) scale(2,2); }
      }
    `;
    }

    template() {
      return `
      <div class="swapping-squares-spinner" :style="spinnerStyle">
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
      </div>
    `;
    }
  }

  customElements.define(SwappingSquaresSpinner.is, SwappingSquaresSpinner);

  class TrinityRingsSpinner extends SpinnerElement {
    static get is() { return 'trinity-rings-spinner'; }

    static get defaults() {
      return {
        color: '#ff1d5e',
        duration: 1.5,
        size: 60,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'duration',
        'size',
      ];
    }

    style({ color, duration, size }) {
      return `
      .trinity-rings-spinner {
        align-items: center;
        display: flex;
        flex-direction: row;
        height: calc(var(--trinity-rings-spinner__size, ${size}px) * 2);
        justify-content: center;
        overflow: hidden;
        padding: 3px;
        position: relative;
        width: calc(var(--trinity-rings-spinner__size, ${size}px) * 2);
      }

      .trinity-rings-spinner .circle {
        border-radius: 50%;
        border: 3px solid var(--trinity-rings-spinner__color, ${color});
        display: block;
        opacity: 1;
        position: absolute;
      }

      .trinity-rings-spinner .circle:nth-child(1) {
        animation: trinity-rings-spinner-circle1-animation var(--trinity-rings-spinner__duration, ${duration}s) infinite linear;
        border-width: 3px;
        height: var(--trinity-rings-spinner__size, ${size}px);
        width: var(--trinity-rings-spinner__size, ${size}px);
      }

      .trinity-rings-spinner .circle:nth-child(2) {
        animation: trinity-rings-spinner-circle2-animation var(--trinity-rings-spinner__duration, ${duration}s) infinite linear;
        border-width: 2px;
        height: calc(var(--trinity-rings-spinner__size, ${size}px) * 0.65);
        width: calc(var(--trinity-rings-spinner__size, ${size}px) * 0.65);
      }

      .trinity-rings-spinner .circle:nth-child(3) {
        animation:trinity-rings-spinner-circle3-animation var(--trinity-rings-spinner__duration, ${duration}s) infinite linear;
        border-width: 1px;
        height: calc(var(--trinity-rings-spinner__size, ${size}px) * 0.1);
        width: calc(var(--trinity-rings-spinner__size, ${size}px) * 0.1);
      }

      @keyframes trinity-rings-spinner-circle1-animation{
        0%   { transform: rotateZ(20deg)  rotateY(0deg); }
        100% { transform: rotateZ(100deg) rotateY(360deg); }
      }

      @keyframes trinity-rings-spinner-circle2-animation{
        0%   { transform: rotateZ(100deg) rotateX(0deg); }
        100% { transform: rotateZ(0deg)   rotateX(360deg); }
      }

      @keyframes trinity-rings-spinner-circle3-animation{
        0%   { transform: rotateZ(100deg)  rotateX(-360deg); }
        100% { transform: rotateZ(-360deg) rotateX(360deg); }
      }
    `;
    }

    template() {
      return `
      <div class="trinity-rings-spinner">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    `;
    }
  }

  customElements.define(TrinityRingsSpinner.is, TrinityRingsSpinner);

  class BarSpinner extends SpinnerElement {
    static get is() { return 'bar-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        height: 4,
        width: 100,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'height',
        'width',
      ];
    }

    style() {
      const { color, height, width } = this.props;

      return `
      .bar-spinner {
        height: var(--bar-spinner__height, ${height}px);
        overflow: hidden;
        position: relative;
        width: var(--bar-spinner__width, ${width}px);
      }

      .background {
        background-color: var(--bar-spinner__color, ${color});
        height: var(--bar-spinner__height, ${height}px);
        opacity: 0.2;
        position: absolute;
        width: var(--bar-spinner__width, ${width}px);
      }

      .long {
        animation-fill-mode: forwards;
        animation: long 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
        background-color: var(--bar-spinner__color, ${color});
        border-radius: 2px;
        height: var(--bar-spinner__height, ${height}px);
        position: absolute;
        will-change: left, right;
      }

      .short {
        animation-fill-mode: forwards;
        animation: short 2.1s 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        background-color: var(--bar-spinner__color, ${color});
        border-radius: 2px;
        height: var(--bar-spinner__height, ${height}px);
        position: absolute;
        will-change: left, right;
      }

      @keyframes long {
        0%   { left: -35%; right: 100% }
        60%  { left: 100%; right: -90% }
        100% { left: 100%; right: -90% }
      }

      @keyframes short {
        0%   { left: -200%; right: 100% }
        60%  { left: 107%; right: -8% }
        100% { left: 107%; right: -8% }
      }
    `;
    }

    template() {
      return `
      <div class="bar-spinner">
        <div class="background"></div>
        <div class="long"></div>
        <div class="short"></div>
      </div>
    `;
    }
  }

  customElements.define(BarSpinner.is, BarSpinner);

  class BeatSpinner extends SpinnerElement {
    static get is() { return 'beat-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        margin: 2,
        size: 15,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'margin',
        'size',
      ];
    }

    style({ color, margin, size }) {
      return `
      .beat {
        animation-fill-mode: both;
        animation: beat 0.7s infinite linear;
        background-color: var(--beat-spinner__color, ${color});
        border-radius: 100%;
        display: inline-block;
        height: var(--beat-spinner__size, ${size}px);
        margin: var(--beat-spinner__margin, ${margin}px);
        width: var(--beat-spinner__size, ${size}px);
      }

      .beat:nth-child(odd)  { animation-delay: 0s; }
      .beat:nth-child(even) { animation-delay: 0.35s; }

      @keyframes beat {
        50%  { transform: scale(0.75); opacity: 0.2 }
        100% { transform: scale(1);    opacity: 1 }
      }
    `;
    }

    template() {
      return `
      <div class="beat-spinner">
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
      </div>
    `;
    }
  }

  customElements.define(BeatSpinner.is, BeatSpinner);

  class BounceSpinner extends SpinnerElement {
    static get is() { return 'bounce-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        size: 60,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'size',
      ];
    }

    style({ color, size }) {
      return `
      .bounce-spinner {
        height: var(--bounce-loader__size, ${size}px);
        position: relative;
        width: var(--bounce-loader__size, ${size}px);
      }

      .bounce {
        animation-fill-mode: both;
        animation: bounce 2.1s infinite ease-in-out;
        background-color: var(--bounce-loader__color, ${color});
        border-radius: 100%;
        height: var(--bounce-loader__size, ${size}px);
        left: 0;
        opacity: 0.6;
        position: absolute;
        top: 0;
        width: var(--bounce-loader__size, ${size}px);
      }

      .bounce:nth-child(1) { animation-delay: 1s; }
      .bounce:nth-child(2) { animation-delay: 0s; }

      @keyframes bounce {
        0%   { transform: scale(0); }
        50%  { transform: scale(1.0); }
        100% { transform: scale(0); }
      }
    `;
    }

    template() {
      return `
      <div class="bounce-spinner">
        <div class="bounce"></div>
        <div class="bounce"></div>
      </div>
    `;
    }
  }

  customElements.define(BounceSpinner.is, BounceSpinner);

  class CircleSpinner extends SpinnerElement {
    static get is() { return 'circle-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        size: 60,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'size',
      ];
    }

    calculateCircle(i) {
      const { size } = this.props;

      return `
      animation-delay: ${i * 0.2}s;
      height: calc(var(--circle-loader__size, ${size}px) * ${1 - i / 10});
      left: ${i * 0.7 * 2.5}%;
      top: ${i * 0.35 * 2.5}%;
      width: calc(var(--circle-loader__size, ${size}px) * ${1 - i / 10});
    `;
    }

    style({ color, size }) {
      return `
      .circle-spinner {
        height: var(--circle-loader__size, ${size}px);
        position: relative;
        width: var(--circle-loader__size, ${size}px);
      }

      .circle {
        animation-fill-mode: "";
        animation: circle 1s infinite linear;
        border-top-color: var(--circle-spinner__color, ${color});
        border-left-color: var(--circle-spinner__color, ${color});
        border-radius: 100%;
        border-style: solid none none solid;
        border-width: 1px 1px;
        position: absolute;
        transition: all 2s ease 0s;
      }

      .circle:nth-child(1) { ${this.calculateCircle(0)} }
      .circle:nth-child(2) { ${this.calculateCircle(1)} }
      .circle:nth-child(3) { ${this.calculateCircle(2)} }
      .circle:nth-child(4) { ${this.calculateCircle(3)} }
      .circle:nth-child(5) { ${this.calculateCircle(4)} }

      @keyframes circle {
        0%   { transform: rotate(0deg); }
        50%  { transform: rotate(180deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    }

    template() {
      return `
      <div class="circle-spinner">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    `;
    }
  }

  customElements.define(CircleSpinner.is, CircleSpinner);

  // TODO: Improve styling
  class ClimbingBoxSpinner extends SpinnerElement {
    static get is() { return 'climbing-box-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        size: 15,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'size',
      ];
    }

    style() {
      const { color, size } = this.props;

      return `
      .climbing-box-spinner {
        height: 7.1em;
        position: relative;
        width: 7.1em;
      }

      .box {
        animation-fill-mode: both;
        animation: climbingBox 2.5s infinite cubic-bezier(0.79, 0, 0.47, 0.97);
        background-color: transparent;
        border-radius: 15%;
        border: 0.25em solid var(--climbing-box-spinner__color, ${color});
        bottom: -0.1em;
        height: 1em;
        left: 0;
        position: absolute;
        transform: translate(0, -1em) rotate(-45deg);
        width: 1em;
      }

      .hill {
        border-left: 0.25em solid var(--climbing-box-spinner__color, ${color});
        height: 7.1em;
        left: 1.7em;
        position: absolute;
        top: 1.7em;
        transform: rotate(45deg);
        width: 7.1em;
      }

      .wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -2.7em;
        margin-left: -2.7em;
        width: 5.4em;
        height: 5.4em;
        font-size: var(--climbing-box-spinner__size, ${size}px);
      }

      @keyframes climbingBox {
        0%   { transform: translate(0, -1em)   rotate(-45deg) }
        5%   { transform: translate(0, -1em)   rotate(-50deg) }
        20%  { transform: translate(1em, -2em) rotate(47deg) }
        25%  { transform: translate(1em, -2em) rotate(45deg) }
        30%  { transform: translate(1em, -2em) rotate(40deg) }
        45%  { transform: translate(2em, -3em) rotate(137deg) }
        50%  { transform: translate(2em, -3em) rotate(135deg) }
        55%  { transform: translate(2em, -3em) rotate(130deg) }
        70%  { transform: translate(3em, -4em) rotate(217deg) }
        75%  { transform: translate(3em, -4em) rotate(220deg) }
        100% { transform: translate(0, -1em)   rotate(-225deg) }
      }
    `;
    }

    template() {
      return `
      <div class="climbing-box-spinner">
        <div class="wrapper">
          <div class="box"></div>
          <div class="hill"></div>
        </div>
      </div>
    `;
    }
  }

  customElements.define(ClimbingBoxSpinner.is, ClimbingBoxSpinner);

  class ClipSpinner extends SpinnerElement {
    static get is() { return 'clip-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        size: 35,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'size',
      ];
    }

    style() {
      const { color, size } = this.props;

      return `
      .clip-spinner {
        animation-fill-mode: both;
        animation: clip 0.75s 0s infinite linear;
        background: transparent !important;
        border-bottom-color: transparent;
        border-left-color: var(--clip-spinner__color, ${color});
        border-radius: 100%;
        border-right-color: var(--clip-spinner__color, ${color});
        border-style: solid;
        border-top-color: var(--clip-spinner__color, ${color});
        border-width: 2px;
        height: var(--clip-spinner__size, ${size}px);
        width: var(--clip-spinner__size, ${size}px);
      }

      @keyframes clip {
        0%   { transform: rotate(0deg)   scale(1); }
        50%  { transform: rotate(180deg) scale(0.8); }
        100% { transform: rotate(360deg) scale(1); }
      }
    `;
    }

    template() {
      return `
      <div class="clip-spinner"></div>
    `;
    }
  }

  customElements.define(ClipSpinner.is, ClipSpinner);

  class DotSpinner extends SpinnerElement {
    static get is() { return 'dot-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        size: 60,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'size',
      ];
    }

    style() {
      const { color, size } = this.props;

      return `
      .dot-spinner {
        animation-fill-mode: forwards;
        animation: rotate 2s 0s infinite linear;
        height: var(--dot-spinner__size, ${size}px);
        position: relative;
        width: var(--dot-spinner__size, ${size}px);
      }

      .dot {
        animation-fill-mode: forwards;
        animation: bounce 2s infinite linear;
        background-color: var(--dot-spinner__color, ${color});
        border-radius: 100%;
        height: calc(var(--dot-spinner__size, ${size}px) / 2);
        position: absolute;
        width: calc(var(--dot-spinner__size, ${size}px) / 2);
      }

      .dot:nth-child(1) {
        animation-delay: 0s;
        bottom: auto;
        top: 0;
      }

      .dot:nth-child(2) {
        animation-delay: -1s;
        bottom: 0;
        top: auto;
      }

      @keyframes bounce {
        0%   { transform: scale(0); }
        50%  { transform: scale(1.0); }
        100% { transform: scale(0); }
      }

      @keyframes rotate {
        100% { transform: rotate(360deg); }
      }
    `;
    }

    template() {
      return `
      <div class="dot-spinner">
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    `;
    }
  }

  customElements.define(DotSpinner.is, DotSpinner);

  // TODO: Fix positioning (not centered)
  class FadeSpinner extends SpinnerElement {
    static get is() { return 'fade-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        height: 15,
        margin: 2,
        radius: 20,
        width: 5,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'height',
        'margin',
        'radius',
        'width',
      ];
    }

    style() {
      const { color, height, margin, radius, width } = this.props; // eslint-disable-line object-curly-newline

      const _radius = `var(--fade-spinner__radius, ${radius}px)`;
      const quarter = `calc(${_radius} / 2 + ${_radius} / 5.5)`;

      return `
      .fade-spinner {
        font-size: 0;
        height: calc(${_radius} * 3);
        left: ${_radius};
        position: relative;
        top: ${_radius};
        width: calc(${_radius} * 3);
      }

      .line {
        animation-fill-mode: both;
        animation: fade 1.2s infinite ease-in-out;
        background-color: var(--fade-spinner__color, ${color});
        border-radius: ${_radius};
        height: var(--fade-spinner__height, ${height}px);
        margin: var(--fade-spinner__margin, ${margin}px);
        position: absolute;
        transition: 2s;
        width: var(--fade-spinner__width, ${width}px);
      }

      .line:nth-child(1) {
        animation-delay: 0s;
        left: 0;
        top: ${_radius};
      }

      .line:nth-child(2) {
        animation-delay: calc(.12s * 1);
        left: ${quarter};
        top: ${quarter};
        transform: rotate(-45deg);
      }

      .line:nth-child(3) {
        animation-delay: calc(.12s * 2);
        left: ${_radius};
        top: 0;
        transform: rotate(90deg);
      }

      .line:nth-child(4) {
        animation-delay: calc(.12s * 3);
        left: ${quarter};
        top: calc(${quarter} * -1);
        transform: rotate(45deg);
      }

      .line:nth-child(5) {
        animation-delay: calc(.12s * 4);
        left: 0;
        top: calc(${_radius} * -1);
      }

      .line:nth-child(6) {
        animation-delay: calc(.12s * 5);
        left: calc(${quarter} * -1);
        top: calc(${quarter} * -1);
        transform: rotate(-45deg);
      }

      .line:nth-child(7) {
        animation-delay: calc(.12s * 6);
        left: calc(${_radius} * -1);
        top: 0;
        transform: rotate(90deg);
      }

      .line:nth-child(8) {
        animation-delay: calc(.12s * 7);
        left: calc(${quarter} * -1);
        top: ${quarter};
        transform: rotate(45deg);
      }

      @keyframes fade {
        50%  { opacity: 0.3; }
        100% { opacity: 1; }
      }
    `;
    }

    template() {
      return `
      <div class="fade-spinner">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    `;
    }
  }

  customElements.define(FadeSpinner.is, FadeSpinner);

  class GridSpinner extends SpinnerElement {
    static get is() { return 'grid-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        margin: 2,
        size: 15,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'margin',
        'size',
      ];
    }

    generateCellAnimation() {
      const random = Math.random();

      return `
      animation-duration: ${random + 0.6}s;
      animation-delay: ${random - 0.2}s;
    `;
    }

    style() {
      const { color, margin, size } = this.props;

      return `
      .grid-spinner {
        font-size: 0;
        width: calc(var(--grid-spinner__size, ${size}px) * 3 + var(--grid-spinner__margin, ${margin}px) * 6);
      }

      .cell {
        animation-fill-mode: both;
        animation: grid infinite ease;
        background-color: var(--grid-spinner__color, ${color});
        border-radius: 100%;
        display: inline-block;
        height: var(--grid-spinner__size, ${size}px);
        margin: var(--grid-spinner__margin, ${margin}px);
        width: var(--grid-spinner__size, ${size}px);
      }

      .cell:nth-child(1) { ${this.generateCellAnimation()} }
      .cell:nth-child(2) { ${this.generateCellAnimation()} }
      .cell:nth-child(3) { ${this.generateCellAnimation()} }
      .cell:nth-child(4) { ${this.generateCellAnimation()} }
      .cell:nth-child(5) { ${this.generateCellAnimation()} }
      .cell:nth-child(6) { ${this.generateCellAnimation()} }
      .cell:nth-child(7) { ${this.generateCellAnimation()} }
      .cell:nth-child(8) { ${this.generateCellAnimation()} }
      .cell:nth-child(9) { ${this.generateCellAnimation()} }

      @keyframes grid {
        0%   { transform: scale(1); }
        50%  { transform: scale(0.5); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
    }

    template() {
      return `
      <div class="grid-spinner">
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
      </div>
    `;
    }
  }

  customElements.define(GridSpinner.is, GridSpinner);

  class HashSpinner extends SpinnerElement {
    static get is() { return 'hash-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        size: 50,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'size',
      ];
    }

    style() {
      const { color, size } = this.props;

      const _color = `var(--hash-spinner__color, ${color})`;
      const _size = `var(--hash-spinner__size, ${size}px)`;

      const _thickness = `calc(${_size} / 5)`;

      const _lat = `calc(calc(${_size} - ${_thickness}) / 2)`;

      const _offset = `calc(${_lat} - ${_thickness})`;

      return `
      .hash-spinner {
        height: ${_size};
        position: relative;
        transform: rotate(165deg);
        width: ${_size};
      }

      .hash {
        animation-duration: 2s;
        animation-fill-mode: none;
        animation-iteration-count: infinite;
        border-radius: calc(${_size} / 10);
        content: "";
        display: block;
        height: calc(${_size} / 5);
        left: 50%;
        opacity: .9;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: calc(${_size} / 5);
      }

      .hash:nth-child(1) { animation-name: before; }
      .hash:nth-child(2) { animation-name: after; }

      @keyframes before {
        0% {
          box-shadow: ${_lat} calc(${_offset} * -1) ${_color},
                      calc(${_lat} * -1) ${_offset} ${_color};
          width: ${_thickness};
        }

        35% {
          box-shadow: 0 calc(${_offset} * -1) ${_color},
                      0 ${_offset} ${_color};
          width: ${_size};
        }

        70% {
          box-shadow: calc(${_lat} * -1) calc(${_offset} * -1) ${_color},
                      ${_lat} ${_offset} ${_color};
          width: ${_thickness};
        }

        100% {
          box-shadow: ${_lat} calc(${_offset} * -1) ${_color},
                      calc(${_lat} * -1) ${_offset} ${_color};
        }
      }

      @keyframes after {
        0% {
          box-shadow: ${_offset} ${_lat} ${_color},
                      calc(${_offset} * -1) calc(${_lat} * -1) ${_color};
          height: ${_thickness};
        }

        35% {
          box-shadow: ${_offset} 0 ${_color},
                      calc(${_offset} * -1) 0 ${_color};
          height: ${_size};
        }

        70% {
          box-shadow: ${_offset} calc(${_lat} * -1) ${_color},
                      calc(${_offset} * -1) ${_lat} ${_color};
          height: ${_thickness};
        }

        100% {
          box-shadow: ${_offset} ${_lat} ${_color},
                      calc(${_offset} * -1) calc(${_lat} * -1) ${_color};
        }
      }
    `;
    }

    template() {
      return `
      <div class="hash-spinner">
        <div class="hash"></div>
        <div class="hash"></div>
      </div>
    `;
    }
  }

  customElements.define(HashSpinner.is, HashSpinner);

  class MoonSpinner extends SpinnerElement {
    static get is() { return 'moon-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        size: 60,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'size',
      ];
    }

    ballStyle(size) {
      return `
      border-radius: 100%;
      height: ${size};
      width: ${size};
    `;
    }

    style() {
      const { color, size } = this.props;

      const _color = `var(--moon-spinner__color, ${color})`;
      const _size = `var(--moon-spinner__size, ${size}px)`;

      const moonSize = `calc(${_size} / 7)`;

      return `
      .moon-spinner {
        animation-fill-mode: forwards;
        animation: moon 0.6s 0s infinite linear;
        height: calc(${_size} + ${moonSize} * 2);
        position: relative;
        width: calc(${_size} + ${moonSize} * 2);
      }

      .ball {
        ${this.ballStyle(moonSize)};
        animation-fill-mode: forwards;
        animation: moon 0.6s 0s infinite linear;
        background-color: ${_color};
        opacity: 0.8;
        position: absolute;
        top: calc(${_size} / 2 - ${moonSize} / 2);
      }

      .circle {
        ${this.ballStyle(_size)};
        border: ${moonSize} solid ${_color};
        box-sizing: content-box;
        opacity: 0.1;
      }

      @keyframes moon {
        100% { transform: rotate(360deg); }
      }
    `;
    }

    template() {
      return `
      <div class="moon-spinner">
        <div class="ball"></div>
        <div class="circle"></div>
      </div>
    `;
    }
  }

  customElements.define(MoonSpinner.is, MoonSpinner);

  class PacmanSpinner extends SpinnerElement {
    static get is() { return 'pacman-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        margin: 2,
        size: 25,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'margin',
        'size',
      ];
    }

    ballDelay(factor) {
      return `animation-delay: ${factor * 0.25}s;`;
    }

    style() {
      const { color, margin, size } = this.props;

      const _color = `var(--pacman-spinner__color, ${color})`;
      const _size = `var(--pacman-spinner__size, ${size}px)`;
      const _margin = `var(--pacman-spinner__margin, ${margin}px)`;

      return `
      .pacman-spinner {
        font-size: 0;
        height: calc(${_size} * 2);
        position: relative;
        width: calc(${_size} * 2);
      }

      .pacman-top {
        animation-fill-mode: both;
        animation: pacman1 0.8s infinite ease-in-out;
        border-bottom: ${_size} solid ${_color};
        border-left: ${_size} solid ${_color};
        border-radius: ${_size};
        border-right: ${_size} solid transparent;
        border-top: ${_size} solid transparent;
        height: 0;
        position: absolute;
        width: 0;
      }

      .pacman-bottom {
        animation-fill-mode: both;
        animation: pacman2 0.8s infinite ease-in-out;
        border-bottom: ${_size} solid transparent;
        border-left: ${_size} solid ${color};
        border-radius: ${_size};
        border-right: ${_size} solid transparent;
        border-top: ${_size} solid ${color};
        height: 0;
        position: absolute;
        width: 0;
      }

      .ball {
        animation-fill-mode: both;
        animation: ball 1s infinite linear;
        background-color: ${color};
        border-radius: 100%;
        height: calc(${_size} / 2.5);
        left: calc(${_size} * 4);
        margin: ${_margin};
        position: absolute;
        top: ${_size};
        transform: translate(0, calc(${_size} / -4));
        width: calc(${_size} / 2.5);
      }

      .ball:nth-child(3) { ${this.ballDelay(-3)} }
      .ball:nth-child(4) { ${this.ballDelay(-2)} }
      .ball:nth-child(5) { ${this.ballDelay(-1)} }
      .ball:nth-child(6) { ${this.ballDelay(0)} }

      @keyframes ball {
        75%  { opacity: 0.7; }

        100% {
          transform: translate(calc(${_size} * -4), calc(${_size} / -4));
        }
      }

      @keyframes pacman1 {
        0%  { transform: rotate(0deg); }
        50% { transform: rotate(-44deg); }
      }

      @keyframes pacman2 {
        0%  { transform: rotate(0deg); }
        50% { transform: rotate(44deg); }
      }
    `;
    }

    template() {
      return `
      <div class="pacman-spinner">
        <div class="pacman-top"></div>
        <div class="pacman-bottom"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
      </div>
    `;
    }
  }

  customElements.define(PacmanSpinner.is, PacmanSpinner);

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGlubmVyRWxlbWVudC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvYXRvbS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2NpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2ZpbmdlcnByaW50LXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2Zsb3dlci1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9oYWxmLWNpcmNsZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9ob2xsb3ctZG90cy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9sb29waW5nLXJob21idXNlcy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9vcmJpdC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9waXhlbC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9yYWRhci1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvc2VtaXBvbGFyLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL3NwcmluZy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL3RyaW5pdHktcmluZ3Mtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL2Jhci1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvYmVhdC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvYm91bmNlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9jaXJjbGUtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL2NsaW1iaW5nLWJveC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvY2xpcC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvZG90LXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9mYWRlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9ncmlkLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9oYXNoLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9tb29uLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9wYWNtYW4tc3Bpbm5lci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTcGlubmVyRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucHJvcHMgPSB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRzO1xuICAgIHRoaXMucm9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICB0aGlzLnByb3BzW25hbWVdID0gbmV3VmFsdWUgfHwgdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0c1tuYW1lXTtcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0eWxlIG1ldGhvZCBtdXN0IGJlIGltcGxlbWVudGVkJyk7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RlbXBsYXRlIG1ldGhvZCBtdXN0IGJlIGltcGxlbWVudGVkJyk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgY29uc3Qgc3R5bGVzID0gYFxuICAgICAgPHN0eWxlPlxuICAgICAgICAqIHsgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxuXG4gICAgICAgIDpob3N0ICAgICAgICAgICB7IGRpc3BsYXk6IGJsb2NrOyB9XG4gICAgICAgIDpob3N0KFtoaWRkZW5dKSB7IGRpc3BsYXk6IG5vbmU7IH1cblxuICAgICAgICAke3RoaXMuc3R5bGUodGhpcy5wcm9wcyl9XG4gICAgICA8L3N0eWxlPlxuICAgIGA7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUodGhpcy5wcm9wcyk7XG5cbiAgICB0aGlzLnJvb3QuaW5uZXJIVE1MID0gYCR7c3R5bGVzfSR7dGVtcGxhdGV9YDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcGlubmVyRWxlbWVudDtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBBdG9tU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdhdG9tLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuYXRvbS1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1hdG9tLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHdpZHRoOiB2YXIoLS1hdG9tLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5hdG9tLXNwaW5uZXIgLnNwaW5uZXItaW5uZXIge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWNpcmNsZSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1hdG9tLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBmb250LXNpemU6IGNhbGModmFyKC0tYXRvbS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yNCk7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgICB9XG5cbiAgICAgIC5hdG9tLXNwaW5uZXIgLnNwaW5uZXItbGluZSB7XG4gICAgICAgIGJvcmRlci1sZWZ0OiBjYWxjKHZhcigtLWF0b20tc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDI1KSBzb2xpZCB2YXIoLS1hdG9tLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyLXRvcDogY2FsYyh2YXIoLS1hdG9tLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyAyNSkgc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1saW5lOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGFuaW1hdGlvbjogYXRvbS1zcGlubmVyLWFuaW1hdGlvbi0xIHZhcigtLWF0b20tc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMTIwZGVnKSByb3RhdGVYKDY2ZGVnKSByb3RhdGVaKDBkZWcpO1xuICAgICAgfVxuXG4gICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWxpbmU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBhdG9tLXNwaW5uZXItYW5pbWF0aW9uLTIgdmFyKC0tYXRvbS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigyNDBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMGRlZyk7XG4gICAgICB9XG5cbiAgICAgIC5hdG9tLXNwaW5uZXIgLnNwaW5uZXItbGluZTpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb246IGF0b20tc3Bpbm5lci1hbmltYXRpb24tMyB2YXIoLS1hdG9tLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVaKDM2MGRlZykgcm90YXRlWCg2NmRlZykgcm90YXRlWigwZGVnKTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBhdG9tLXNwaW5uZXItYW5pbWF0aW9uLTEge1xuICAgICAgICAxMDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMTIwZGVnKSByb3RhdGVYKDY2ZGVnKSByb3RhdGVaKDM2MGRlZyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBhdG9tLXNwaW5uZXItYW5pbWF0aW9uLTIge1xuICAgICAgICAxMDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMjQwZGVnKSByb3RhdGVYKDY2ZGVnKSByb3RhdGVaKDM2MGRlZyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBhdG9tLXNwaW5uZXItYW5pbWF0aW9uLTMge1xuICAgICAgICAxMDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMzYwZGVnKSByb3RhdGVYKDY2ZGVnKSByb3RhdGVaKDM2MGRlZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJhdG9tLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItaW5uZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1saW5lXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItbGluZVwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWxpbmVcIj48L2Rpdj5cblxuICAgICAgICAgIDwhLS1DaHJvbWUgcmVuZGVycyBsaXR0bGUgY2lyY2xlcyBtYWxmb3JtZWQgOigtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1jaXJjbGVcIj4mIzk2Nzk7PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQXRvbVNwaW5uZXIuaXMsIEF0b21TcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCcmVlZGluZ1Job21idXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2JyZWVkaW5nLXJob21idXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIsIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgKiB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMge1xuICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cyk7XG4gICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA3LjUpO1xuICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDIuMzA3Nyk7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDIuMzA3Nyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcuNSk7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXM6bnRoLWNoaWxkKDJuKzApIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTEge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiAxKTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMTtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC0yIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogMik7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtMyB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDMpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0zO1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTQge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiA0KTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNDtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC01IHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogNSk7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTU7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtNiB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDYpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC02O1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTcge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiA3KTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNztcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC04IHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogOCk7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTg7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuYmlnIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjVzO1xuICAgICAgICBhbmltYXRpb246IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtYmlnIHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDMpO1xuICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDMpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDMpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMSB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMyNSUsIC0zMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTMyNSUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0zIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzMjUlLCAtMzI1JSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTQge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDMyNSUsIDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC01IHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzMjUlLCAzMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNiB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMzI1JSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTcge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0zMjUlLCAzMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtOCB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMyNSUsIDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC1iaWcge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImJyZWVkaW5nLXJob21idXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC0xXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtM1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC00XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtNlwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC03XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLThcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgYmlnXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShCcmVlZGluZ1Job21idXNTcGlubmVyLmlzLCBCcmVlZGluZ1Job21idXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBDaXJjbGVzVG9SaG9tYnVzZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2NpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGNvdW50OiAzLFxuICAgICAgZHVyYXRpb246IDEuMixcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdjb3VudCcsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBjb3VudCwgZHVyYXRpb24sIHNpemUgfSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG9iamVjdC1jdXJseS1uZXdsaW5lXG4gICAgY29uc3QgY2lyY2xlU3R5bGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMjsgaSA8PSBjb3VudDsgaSsrKSB7XG4gICAgICBjaXJjbGVTdHlsZXMucHVzaChgXG4gICAgICAgIC5jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKCR7aX0pIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyA4ICogJHtpfSk7XG4gICAgICAgIH1cbiAgICAgIGApO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICAuY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lciwgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIgKiB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICB9XG5cbiAgICAgIC5jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlclxuICAgICAgICB3aWR0aDogY2FsYygodmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSArIHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAxLjEyNSkgKiAke2NvdW50fSk7XG4gICAgICB9XG5cbiAgICAgIC5jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyIC5jaXJjbGUge1xuICAgICAgICBhbmltYXRpb246IGNpcmNsZXMtdG8tcmhvbWJ1c2VzLWFuaW1hdGlvbiB2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGhlaWdodDogdmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IGNhbGModmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDEuMTI1KTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgICB3aWR0aDogdmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyA4ICogMSk7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgfVxuXG4gICAgICAke2NpcmNsZVN0eWxlcy5qb2luKCcnKX1cblxuICAgICAgQGtleWZyYW1lcyBjaXJjbGVzLXRvLXJob21idXNlcy1hbmltYXRpb24ge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAlO1xuICAgICAgICB9XG4gICAgICAgIDE3LjUlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIH1cbiAgICAgICAgNTAlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIDkzLjUlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgY2lyY2xlcy10by1yaG9tYnVzZXMtYmFja2dyb3VuZC1hbmltYXRpb24ge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIG9wYWNpdHk6IDAuNDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSh7IGNvdW50IH0pIHtcbiAgICBjb25zdCBjaXJjbGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMjsgaSA8PSBjb3VudDsgaSsrKSB7XG4gICAgICBjaXJjbGVzLnB1c2goJzxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICAke2NpcmNsZXMuam9pbignJyl9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDaXJjbGVzVG9SaG9tYnVzZXNTcGlubmVyLmlzLCBDaXJjbGVzVG9SaG9tYnVzZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBGaW5nZXJwcmludFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnZmluZ2VycHJpbnQtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuNSxcbiAgICAgIHNpemU6IDY0LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHBhZGRpbmc6IDJweDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZyB7XG4gICAgICAgIGFuaW1hdGlvbjogZmluZ2VycHJpbnQtc3Bpbm5lci1hbmltYXRpb24gdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgY3ViaWMtYmV6aWVyKDAuNjgwLCAtMC43NTAsIDAuMjY1LCAxLjc1MCkgaW5maW5pdGUgZm9yd2FyZHM7XG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB0b3A6IDA7XG4gICAgICB9XG5cbiAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIC5zcGlubmVyLXJpbmc6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDUwbXMgKiAxKTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgMCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyAwICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogMik7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDEgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgMSAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDMpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyAyICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDIgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICB9XG5cbiAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIC5zcGlubmVyLXJpbmc6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDUwbXMgKiA0KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgMyAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyAzICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogNSk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDQgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgNCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoNikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDYpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyA1ICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDUgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICB9XG5cbiAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIC5zcGlubmVyLXJpbmc6bnRoLWNoaWxkKDcpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDUwbXMgKiA3KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgNiAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyA2ICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg4KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogOCk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDcgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgNyAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoOSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDkpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyA4ICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDggKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZmluZ2VycHJpbnQtc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICAxMDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSggMzYwZGVnICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJmaW5nZXJwcmludC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShGaW5nZXJwcmludFNwaW5uZXIuaXMsIEZpbmdlcnByaW50U3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgRmxvd2VyU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdmbG93ZXItc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIuNSxcbiAgICAgIHNpemU6IDcwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmZsb3dlci1zcGlubmVyIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1mbG93ZXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1mbG93ZXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmZsb3dlci1zcGlubmVyIC5kb3RzLWNvbnRhaW5lciB7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1mbG93ZXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1mbG93ZXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgfVxuXG4gICAgICAuZmxvd2VyLXNwaW5uZXIgLnNtYWxsZXItZG90IHtcbiAgICAgICAgYW5pbWF0aW9uOiBmbG93ZXItc3Bpbm5lci1zbWFsbGVyLWRvdC1hbmltYXRpb24gdmFyKC0tZmxvd2VyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIDBzIGluZmluaXRlIGJvdGg7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgLmZsb3dlci1zcGlubmVyIC5iaWdnZXItZG90IHtcbiAgICAgICAgYW5pbWF0aW9uOiBmbG93ZXItc3Bpbm5lci1iaWdnZXItZG90LWFuaW1hdGlvbiB2YXIoLS1mbG93ZXItc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgMHMgaW5maW5pdGUgYm90aDtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBhZGRpbmc6IDEwJTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZmxvd2VyLXNwaW5uZXItYmlnZ2VyLWRvdC1hbmltYXRpb24ge1xuICAgICAgICAwJSwgMTAwJSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4O1xuICAgICAgICB9XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbiAgICAgICAgfVxuICAgICAgICAyNSUsIDc1JSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAyNnB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAtMjZweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDI2cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IC0yNnB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDE5cHggLTE5cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMTlweCAxOXB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIC0xOXB4IC0xOXB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIC0xOXB4IDE5cHggMHB4O1xuICAgICAgICB9XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gICAgICAgICAgYm94LXNoYWRvdzogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBAa2V5ZnJhbWVzIGZsb3dlci1zcGlubmVyLXNtYWxsZXItZG90LWFuaW1hdGlvbiB7XG4gICAgICAgIDAlLCAxMDAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgMjUlLCA3NSUge1xuICAgICAgICAgIGJveC1zaGFkb3c6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMTRweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgLTE0cHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAxNHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAtMTRweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAxMHB4IC0xMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDEwcHggMTBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAtMTBweCAtMTBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAtMTBweCAxMHB4IDBweDtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJmbG93ZXItc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90cy1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmlnZ2VyLWRvdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNtYWxsZXItZG90XCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRmxvd2VyU3Bpbm5lci5pcywgRmxvd2VyU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgRnVsZmlsbGluZ0JvdW5jaW5nQ2lyY2xlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdmdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogNCxcbiAgICAgIHNpemU6IDUwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb246IGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItYW5pbWF0aW9uIGluZmluaXRlIHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGVhc2U7XG4gICAgICAgIGhlaWdodDogdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXIgLm9yYml0IHtcbiAgICAgICAgYW5pbWF0aW9uOiBmdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLW9yYml0LWFuaW1hdGlvbiBpbmZpbml0ZSB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBlYXNlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJvcmRlcjogY2FsYyh2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4wMykgc29saWQgdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6IHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUge1xuICAgICAgICBhbmltYXRpb246IGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItY2lyY2xlLWFuaW1hdGlvbiBpbmZpbml0ZSB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBlYXNlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJvcmRlcjogY2FsYyh2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4xKSBzb2xpZCB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBjb2xvcjogdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGhlaWdodDogdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKSBzY2FsZSgxKTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItb3JiaXQtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG4gICAgICAgIDYyLjUlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7XG4gICAgICAgIH1cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG4gICAgICAgIDg3LjUlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItY2lyY2xlLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cblxuICAgICAgICAxNi43JSB7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogaW5pdGlhbDtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiBpbml0aWFsO1xuICAgICAgICB9XG5cbiAgICAgICAgMzMuNCUge1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICB9XG5cbiAgICAgICAgNTAlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIDYyLjUlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICAgICAgICB9XG5cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgODcuNSUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XG4gICAgICAgIH1cblxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3JiaXRcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEZ1bGZpbGxpbmdCb3VuY2luZ0NpcmNsZVNwaW5uZXIuaXMsIEZ1bGZpbGxpbmdCb3VuY2luZ0NpcmNsZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEZ1bGZpbGxpbmdTcXVhcmVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Z1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiA0LFxuICAgICAgc2l6ZTogNTAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0tZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgYm9yZGVyOiA0cHggc29saWQgdmFyKC0tZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYW5pbWF0aW9uOiBmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZSBlYXNlO1xuICAgICAgfVxuXG4gICAgICAuZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lciAuc3Bpbm5lci1pbm5lciB7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1pbm5lci1hbmltYXRpb24gdmFyKC0tZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGUgZWFzZS1pbjtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgICAyNSUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAgICAgICA3NSUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXItaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgMCUgICB7IGhlaWdodDogMCU7IH1cbiAgICAgICAgMjUlICB7IGhlaWdodDogMCU7IH1cbiAgICAgICAgNTAlICB7IGhlaWdodDogMTAwJTsgfVxuICAgICAgICA3NSUgIHsgaGVpZ2h0OiAxMDAlOyB9XG4gICAgICAgIDEwMCUgeyBoZWlnaHQ6IDAlOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1pbm5lclwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRnVsZmlsbGluZ1NxdWFyZVNwaW5uZXIuaXMsIEZ1bGZpbGxpbmdTcXVhcmVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBIYWxmQ2lyY2xlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdoYWxmLWNpcmNsZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMSxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmhhbGYtY2lyY2xlLXNwaW5uZXIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5oYWxmLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBib3JkZXI6IGNhbGModmFyKC0taGFsZi1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDEwKSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAuaGFsZi1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlLmNpcmNsZS0xIHtcbiAgICAgICAgYW5pbWF0aW9uOiBoYWxmLWNpcmNsZS1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogdmFyKC0taGFsZi1jaXJjbGUtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgIH1cblxuICAgICAgLmhhbGYtY2lyY2xlLXNwaW5uZXIgLmNpcmNsZS5jaXJjbGUtMiB7XG4gICAgICAgIGFuaW1hdGlvbjogaGFsZi1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24gdmFyKC0taGFsZi1jaXJjbGUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGUgYWx0ZXJuYXRlO1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGhhbGYtY2lyY2xlLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiaGFsZi1jaXJjbGUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlIGNpcmNsZS0xXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgY2lyY2xlLTJcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEhhbGZDaXJjbGVTcGlubmVyLmlzLCBIYWxmQ2lyY2xlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgSG9sbG93RG90c1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnaG9sbG93LWRvdHMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgY291bnQ6IDMsXG4gICAgICBkdXJhdGlvbjogMSxcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdjb3VudCcsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgY291bnQsIHNpemUgfSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG9iamVjdC1jdXJseS1uZXdsaW5lXG4gICAgY29uc3QgZG90U3R5bGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBjb3VudDsgaSsrKSB7XG4gICAgICBkb3RTdHlsZXMucHVzaChgXG4gICAgICAgIC5ob2xsb3ctZG90cy1zcGlubmVyIC5kb3Q6bnRoLWNoaWxkKCR7aX0pIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0taG9sbG93LWRvdHMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAke2NvdW50fSAqICR7aX0pO1xuICAgICAgICB9XG4gICAgICBgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgICAgKiB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICB9XG5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG5cbiAgICAgIC5ob2xsb3ctZG90cy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMiAqICR7Y291bnR9KTtcbiAgICAgIH1cblxuICAgICAgLmhvbGxvdy1kb3RzLXNwaW5uZXIgLmRvdCB7XG4gICAgICAgIGFuaW1hdGlvbjogaG9sbG93LWRvdHMtc3Bpbm5lci1hbmltYXRpb24gdmFyKC0taG9sbG93LWRvdHMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgZWFzZSBpbmZpbml0ZSAwbXM7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA1KSBzb2xpZCB2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBtYXJnaW46IDAgY2FsYyh2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMik7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAke2RvdFN0eWxlcy5qb2luKCcnKX1cblxuICAgICAgQGtleWZyYW1lcyBob2xsb3ctZG90cy1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSh7IGNvdW50IH0pIHtcbiAgICBjb25zdCBkb3RzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBjb3VudDsgaSsrKSB7XG4gICAgICBkb3RzLnB1c2goJzxkaXYgY2xhc3M9XCJkb3RcIj48L2Rpdj4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImhvbGxvdy1kb3RzLXNwaW5uZXJcIj5cbiAgICAgICAgJHtkb3RzLmpvaW4oJycpfVxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoSG9sbG93RG90c1NwaW5uZXIuaXMsIEhvbGxvd0RvdHNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcnNlY3RpbmdDaXJjbGVzU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdpbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMS4yLFxuICAgICAgc2l6ZTogMzUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMik7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLnNwaW5uZXJCbG9jayB7XG4gICAgICAgIGFuaW1hdGlvbjogaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcnMtYW5pbWF0aW9uIHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMikge1xuICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAtMC4zNik7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yKTtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMykge1xuICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAtMC4zNik7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogLTAuMik7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAtMC4zNik7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDUpIHtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4zNik7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogLTAuMik7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDYpIHtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4zNik7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yKTtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoNykge1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMzYpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJzLWFuaW1hdGlvbiB7XG4gICAgICAgIGZyb20geyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgICB0byAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXJCbG9ja1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEludGVyc2VjdGluZ0NpcmNsZXNTcGlubmVyLmlzLCBJbnRlcnNlY3RpbmdDaXJjbGVzU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgTG9vcGluZ1Job21idXNlc1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIuNSxcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDQpO1xuICAgICAgfVxuXG4gICAgICAubG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lciAucmhvbWJ1cyB7XG4gICAgICAgIGFuaW1hdGlvbjogbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lci1hbmltYXRpb24gdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIGhlaWdodDogdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogNCk7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSByb3RhdGUoNDVkZWcpIHNjYWxlKDApO1xuICAgICAgICB3aWR0aDogdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIgLnJob21idXM6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMSAvIC0xLjUpO1xuICAgICAgfVxuXG4gICAgICAubG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lciAucmhvbWJ1czpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAyIC8gLTEuNSk7XG4gICAgICB9XG5cbiAgICAgIC5sb29waW5nLXJob21idXNlcy1zcGlubmVyIC5yaG9tYnVzOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAqIDMgLyAtMS41KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBsb29waW5nLXJob21idXNlcy1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCkgICAgIHJvdGF0ZSg0NWRlZykgc2NhbGUoMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjMzJSkgcm90YXRlKDQ1ZGVnKSBzY2FsZSgxKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC00NjYlKSByb3RhdGUoNDVkZWcpIHNjYWxlKDApOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTG9vcGluZ1Job21idXNlc1NwaW5uZXIuaXMsIExvb3BpbmdSaG9tYnVzZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBPcmJpdFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnb3JiaXQtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuMixcbiAgICAgIHNpemU6IDU1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLm9yYml0LXNwaW5uZXIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogdmFyKC0tb3JiaXQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcGVyc3BlY3RpdmU6IDgwMHB4O1xuICAgICAgICB3aWR0aDogdmFyKC0tb3JiaXQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLm9yYml0LXNwaW5uZXIgLm9yYml0IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5vcmJpdC1zcGlubmVyIC5vcmJpdDpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb246IG9yYml0LXNwaW5uZXItb3JiaXQtb25lLWFuaW1hdGlvbiB2YXIoLS1vcmJpdC1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCB2YXIoLS1vcmJpdC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBsZWZ0OiAwJTtcbiAgICAgICAgdG9wOiAwJTtcbiAgICAgIH1cblxuICAgICAgLm9yYml0LXNwaW5uZXIgLm9yYml0Om50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbjogb3JiaXQtc3Bpbm5lci1vcmJpdC10d28tYW5pbWF0aW9uIHZhcigtLW9yYml0LXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAzcHggc29saWQgdmFyKC0tb3JiaXQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgcmlnaHQ6IDAlO1xuICAgICAgICB0b3A6IDAlO1xuICAgICAgfVxuXG4gICAgICAub3JiaXQtc3Bpbm5lciAub3JiaXQ6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBvcmJpdC1zcGlubmVyLW9yYml0LXRocmVlLWFuaW1hdGlvbiB2YXIoLS1vcmJpdC1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci10b3A6IDNweCBzb2xpZCB2YXIoLS1vcmJpdC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3R0b206IDAlO1xuICAgICAgICByaWdodDogMCU7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgb3JiaXQtc3Bpbm5lci1vcmJpdC1vbmUtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWCgzNWRlZykgcm90YXRlWSgtNDVkZWcpIHJvdGF0ZVooMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWCgzNWRlZykgcm90YXRlWSgtNDVkZWcpIHJvdGF0ZVooMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG9yYml0LXNwaW5uZXItb3JiaXQtdHdvLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoNTBkZWcpIHJvdGF0ZVkoMTBkZWcpIHJvdGF0ZVooMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWCg1MGRlZykgcm90YXRlWSgxMGRlZykgcm90YXRlWigzNjBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgb3JiaXQtc3Bpbm5lci1vcmJpdC10aHJlZS1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDM1ZGVnKSByb3RhdGVZKDU1ZGVnKSByb3RhdGVaKDBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMzVkZWcpIHJvdGF0ZVkoNTVkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cIm9yYml0LXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9yYml0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvcmJpdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3JiaXRcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE9yYml0U3Bpbm5lci5pcywgT3JiaXRTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBQaXhlbFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncGl4ZWwtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA3MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5waXhlbC1zcGlubmVyIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1waXhlbC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgd2lkdGg6IHZhcigtLXBpeGVsLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5waXhlbC1zcGlubmVyIC5waXhlbC1zcGlubmVyLWlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uOiBwaXhlbC1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1waXhlbC1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBpeGVsLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJveC1zaGFkb3c6IDE1cHggMTVweCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAtMTVweCAtMTVweCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAxNXB4IC0xNXB4ICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIC0xNXB4IDE1cHggIDAgMCxcbiAgICAgICAgICAgICAgICAgICAgMCAxNXB4ICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIDE1cHggMCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAtMTVweCAwICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIDAgLTE1cHggMCAwO1xuICAgICAgICBjb2xvcjogdmFyKC0tcGl4ZWwtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXBpeGVsLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA3KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tcGl4ZWwtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHBpeGVsLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAyMHB4IDIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAtMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDIwcHggLTIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgMHB4IDEwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAxMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIC0xMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDBweCAtMTBweCAwcHggMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAyMHB4IDIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAtMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDIwcHggLTIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgMHB4IDEwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAxMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIC0xMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDBweCAtMTBweCAwcHggMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInBpeGVsLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpeGVsLXNwaW5uZXItaW5uZXJcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFBpeGVsU3Bpbm5lci5pcywgUGl4ZWxTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBSYWRhclNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncmFkYXItc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5yYWRhci1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1yYWRhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1yYWRhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlIHtcbiAgICAgICAgYW5pbWF0aW9uOiByYWRhci1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1yYWRhci1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gNi42Nyk7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMCAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gNi42Nyk7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMSAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gNi42Nyk7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMiAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwbXM7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMyAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGUtaW5uZXIsIC5yYWRhci1zcGlubmVyIC5jaXJjbGUtaW5uZXItY29udGFpbmVyIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXI6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgLyAxMTApIHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlLWlubmVyIHtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHZhcigtLXJhZGFyLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogdmFyKC0tcmFkYXItc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyByYWRhci1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInJhZGFyLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lclwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUmFkYXJTcGlubmVyLmlzLCBSYWRhclNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNjYWxpbmdTcXVhcmVzU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuMjUsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGFuaW1hdGlvbjogc2NhbGluZy1zcXVhcmVzLWFuaW1hdGlvbiB2YXIoLS1zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGhlaWdodDogdmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlIHtcbiAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cyk7XG4gICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgICBib3JkZXI6IGNhbGModmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjA0IC8gMS4zKSBzb2xpZCB2YXIoLS1zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yNSAvIDEuMyk7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjI1IC8gMS4zKTtcbiAgICAgIH1cblxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0xO1xuICAgICAgfVxuXG4gICAgICAuc2NhbGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICB9XG5cbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMztcbiAgICAgIH1cblxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC00O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNjYWxpbmctc3F1YXJlcy1hbmltYXRpb24ge1xuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTEge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMyB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLC0xNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTQge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNTAlLC0xNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2NhbGluZy1zcXVhcmVzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2NhbGluZ1NxdWFyZXNTcGlubmVyLmlzLCBTY2FsaW5nU3F1YXJlc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNlbGZCdWlsZGluZ1NxdWFyZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDYsXG4gICAgICBzaXplOiAxMCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiA0KTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyIC8gMyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiA0KTtcbiAgICAgIH1cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmUge1xuICAgICAgICBhbmltYXRpb246IHNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgdmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIG1hcmdpbi1yaWdodDogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMyk7XG4gICAgICAgIG1hcmdpbi10b3A6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDMpO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAtMiAvIDMpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDYpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogNyk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiA4KTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoNCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDMpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogNCk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDYpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiA1KTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoNykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDApO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg4KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogMSk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDkpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiAyKTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLmNsZWFyIHtcbiAgICAgICAgY2xlYXI6IGJvdGg7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgNSUge1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgNTAuOSUge1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgNTUuOSUge1xuICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgdG9wOiBpbmhlcml0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlIGNsZWFyXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlIGNsZWFyXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2VsZkJ1aWxkaW5nU3F1YXJlU3Bpbm5lci5pcywgU2VsZkJ1aWxkaW5nU3F1YXJlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgU2VtaXBvbGFyU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzZW1pcG9sYXItc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuc2VtaXBvbGFyLXNwaW5uZXIgLnJpbmcge1xuICAgICAgICBhbmltYXRpb246IHNlbWlwb2xhci1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMDUpO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMC4xICogNCk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yICogMCk7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEgKiAwKTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4xICogMCk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAwKTtcbiAgICAgICAgei1pbmRleDogNTtcbiAgICAgIH1cblxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAwLjEgKiAzKTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAxKTtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDEpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEgKiAxKTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDEpO1xuICAgICAgICB6LWluZGV4OiA0O1xuICAgICAgfVxuXG4gICAgICAuc2VtaXBvbGFyLXNwaW5uZXIgLnJpbmc6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAqIDAuMSAqIDIpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDIpO1xuICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4xICogMik7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDIpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yICogMik7XG4gICAgICAgIHotaW5kZXg6IDM7XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoNCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMC4xICogMSk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yICogMyk7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEgKiAzKTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4xICogMyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAzKTtcbiAgICAgICAgei1pbmRleDogMjtcbiAgICAgIH1cblxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAwLjEgKiAwKTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjIgKiA0KTtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDQpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEgKiA0KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDQpO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNlbWlwb2xhci1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZykgc2NhbGUoMC43KTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInNlbWlwb2xhci1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTZW1pcG9sYXJTcGlubmVyLmlzLCBTZW1pcG9sYXJTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTcHJpbmdTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3NwcmluZy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMyxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnNwcmluZy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1zcHJpbmctc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgd2lkdGg6IHZhcigtLXNwcmluZy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuc3ByaW5nLXNwaW5uZXIgLnNwcmluZy1zcGlubmVyLXBhcnQge1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tc3ByaW5nLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyAyKTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lkdGg6IHZhcigtLXNwcmluZy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuc3ByaW5nLXNwaW5uZXIgIC5zcHJpbmctc3Bpbm5lci1wYXJ0LmJvdHRvbSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKSBzY2FsZSgtMSwgMSk7XG4gICAgICB9XG5cbiAgICAgIC5zcHJpbmctc3Bpbm5lciAuc3ByaW5nLXNwaW5uZXItcm90YXRvciB7XG4gICAgICAgIGFuaW1hdGlvbjogc3ByaW5nLXNwaW5uZXItYW5pbWF0aW9uIHZhcigtLXNwcmluZy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBlYXNlLWluLW91dCBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHZhcigtLXNwcmluZy1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1zcHJpbmctc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKHZhcigtLXNwcmluZy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICAgIGhlaWdodDogdmFyKC0tc3ByaW5nLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0yMDBkZWcpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc3ByaW5nLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc3ByaW5nLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zcHJpbmctc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgICB9XG5cbiAgICAgICAgMjUlIHtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IGNhbGModmFyKC0tc3ByaW5nLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyAyMy4zMyk7XG4gICAgICAgIH1cblxuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDExNWRlZyk7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKHZhcigtLXNwcmluZy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICAgIH1cblxuICAgICAgICA3NSUge1xuICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zcHJpbmctc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDIzLjMzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zcHJpbmctc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic3ByaW5nLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXBhcnQgdG9wXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXJvdGF0b3JcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXBhcnQgYm90dG9tXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXJvdGF0b3JcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTcHJpbmdTcGlubmVyLmlzLCBTcHJpbmdTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTd2FwcGluZ1NxdWFyZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3N3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLnN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlIHtcbiAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpO1xuICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMDQgLyAxLjMpIHNvbGlkIHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMjUgLyAxLjMpO1xuICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMjUgLyAxLjMpO1xuICAgICAgfVxuXG4gICAgICAuc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyKTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTE7XG4gICAgICB9XG5cbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDBtcztcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICB9XG5cbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtMztcbiAgICAgIH1cblxuICAgICAgLnN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogMG1zO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtNDtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0xIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTUwJSwxNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0zIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MCUsLTE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC00IHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTUwJSwtMTUwJSkgc2NhbGUoMiwyKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lclwiIDpzdHlsZT1cInNwaW5uZXJTdHlsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTd2FwcGluZ1NxdWFyZXNTcGlubmVyLmlzLCBTd2FwcGluZ1NxdWFyZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBUcmluaXR5UmluZ3NTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3RyaW5pdHktcmluZ3Mtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuNSxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnRyaW5pdHktcmluZ3Mtc3Bpbm5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHBhZGRpbmc6IDNweDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgIH1cblxuICAgICAgLnRyaW5pdHktcmluZ3Mtc3Bpbm5lciAuY2lyY2xlIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB9XG5cbiAgICAgIC50cmluaXR5LXJpbmdzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb246IHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUxLWFuaW1hdGlvbiB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAzcHg7XG4gICAgICAgIGhlaWdodDogdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAudHJpbml0eS1yaW5ncy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uOiB0cmluaXR5LXJpbmdzLXNwaW5uZXItY2lyY2xlMi1hbmltYXRpb24gdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJvcmRlci13aWR0aDogMnB4O1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC42NSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXRyaW5pdHktcmluZ3Mtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuNjUpO1xuICAgICAgfVxuXG4gICAgICAudHJpbml0eS1yaW5ncy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uOnRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUzLWFuaW1hdGlvbiB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUxLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigyMGRlZykgIHJvdGF0ZVkoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpIHJvdGF0ZVkoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUyLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpIHJvdGF0ZVgoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWigwZGVnKSAgIHJvdGF0ZVgoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUzLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpICByb3RhdGVYKC0zNjBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVooLTM2MGRlZykgcm90YXRlWCgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwidHJpbml0eS1yaW5ncy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShUcmluaXR5UmluZ3NTcGlubmVyLmlzLCBUcmluaXR5UmluZ3NTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCYXJTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Jhci1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBoZWlnaHQ6IDQsXG4gICAgICB3aWR0aDogMTAwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3dpZHRoJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgY29uc3QgeyBjb2xvciwgaGVpZ2h0LCB3aWR0aCB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBgXG4gICAgICAuYmFyLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWJhci1zcGlubmVyX19oZWlnaHQsICR7aGVpZ2h0fXB4KTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogdmFyKC0tYmFyLXNwaW5uZXJfX3dpZHRoLCAke3dpZHRofXB4KTtcbiAgICAgIH1cblxuICAgICAgLmJhY2tncm91bmQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYXItc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1iYXItc3Bpbm5lcl9faGVpZ2h0LCAke2hlaWdodH1weCk7XG4gICAgICAgIG9wYWNpdHk6IDAuMjtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogdmFyKC0tYmFyLXNwaW5uZXJfX3dpZHRoLCAke3dpZHRofXB4KTtcbiAgICAgIH1cblxuICAgICAgLmxvbmcge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBsb25nIDIuMXMgY3ViaWMtYmV6aWVyKDAuNjUsIDAuODE1LCAwLjczNSwgMC4zOTUpIGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYXItc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWJhci1zcGlubmVyX19oZWlnaHQsICR7aGVpZ2h0fXB4KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWxsLWNoYW5nZTogbGVmdCwgcmlnaHQ7XG4gICAgICB9XG5cbiAgICAgIC5zaG9ydCB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb246IHNob3J0IDIuMXMgMS4xNXMgY3ViaWMtYmV6aWVyKDAuMTY1LCAwLjg0LCAwLjQ0LCAxKSBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFyLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1iYXItc3Bpbm5lcl9faGVpZ2h0LCAke2hlaWdodH1weCk7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lsbC1jaGFuZ2U6IGxlZnQsIHJpZ2h0O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGxvbmcge1xuICAgICAgICAwJSAgIHsgbGVmdDogLTM1JTsgcmlnaHQ6IDEwMCUgfVxuICAgICAgICA2MCUgIHsgbGVmdDogMTAwJTsgcmlnaHQ6IC05MCUgfVxuICAgICAgICAxMDAlIHsgbGVmdDogMTAwJTsgcmlnaHQ6IC05MCUgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNob3J0IHtcbiAgICAgICAgMCUgICB7IGxlZnQ6IC0yMDAlOyByaWdodDogMTAwJSB9XG4gICAgICAgIDYwJSAgeyBsZWZ0OiAxMDclOyByaWdodDogLTglIH1cbiAgICAgICAgMTAwJSB7IGxlZnQ6IDEwNyU7IHJpZ2h0OiAtOCUgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImJhci1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsb25nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzaG9ydFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQmFyU3Bpbm5lci5pcywgQmFyU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgQmVhdFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnYmVhdC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBtYXJnaW46IDIsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnbWFyZ2luJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgbWFyZ2luLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmJlYXQge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IGJlYXQgMC43cyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJlYXQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWJlYXQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgbWFyZ2luOiB2YXIoLS1iZWF0LXNwaW5uZXJfX21hcmdpbiwgJHttYXJnaW59cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tYmVhdC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuYmVhdDpudGgtY2hpbGQob2RkKSAgeyBhbmltYXRpb24tZGVsYXk6IDBzOyB9XG4gICAgICAuYmVhdDpudGgtY2hpbGQoZXZlbikgeyBhbmltYXRpb24tZGVsYXk6IDAuMzVzOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYmVhdCB7XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpOyBvcGFjaXR5OiAwLjIgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgICAgb3BhY2l0eTogMSB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYmVhdC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiZWF0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiZWF0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiZWF0XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShCZWF0U3Bpbm5lci5pcywgQmVhdFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEJvdW5jZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnYm91bmNlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5ib3VuY2Utc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0tYm91bmNlLWxvYWRlcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogdmFyKC0tYm91bmNlLWxvYWRlcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmJvdW5jZSB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogYm91bmNlIDIuMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJvdW5jZS1sb2FkZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogdmFyKC0tYm91bmNlLWxvYWRlcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgb3BhY2l0eTogMC42O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6IHZhcigtLWJvdW5jZS1sb2FkZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5ib3VuY2U6bnRoLWNoaWxkKDEpIHsgYW5pbWF0aW9uLWRlbGF5OiAxczsgfVxuICAgICAgLmJvdW5jZTpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tZGVsYXk6IDBzOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYm91bmNlIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogc2NhbGUoMS4wKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImJvdW5jZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3VuY2VcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJvdW5jZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQm91bmNlU3Bpbm5lci5pcywgQm91bmNlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgQ2lyY2xlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdjaXJjbGUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBjYWxjdWxhdGVDaXJjbGUoaSkge1xuICAgIGNvbnN0IHsgc2l6ZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBgXG4gICAgICBhbmltYXRpb24tZGVsYXk6ICR7aSAqIDAuMn1zO1xuICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWNpcmNsZS1sb2FkZXJfX3NpemUsICR7c2l6ZX1weCkgKiAkezEgLSBpIC8gMTB9KTtcbiAgICAgIGxlZnQ6ICR7aSAqIDAuNyAqIDIuNX0lO1xuICAgICAgdG9wOiAke2kgKiAwLjM1ICogMi41fSU7XG4gICAgICB3aWR0aDogY2FsYyh2YXIoLS1jaXJjbGUtbG9hZGVyX19zaXplLCAke3NpemV9cHgpICogJHsxIC0gaSAvIDEwfSk7XG4gICAgYDtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuY2lyY2xlLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWNpcmNsZS1sb2FkZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWNpcmNsZS1sb2FkZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5jaXJjbGUge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBcIlwiO1xuICAgICAgICBhbmltYXRpb246IGNpcmNsZSAxcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJvcmRlci10b3AtY29sb3I6IHZhcigtLWNpcmNsZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdmFyKC0tY2lyY2xlLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQgbm9uZSBub25lIHNvbGlkO1xuICAgICAgICBib3JkZXItd2lkdGg6IDFweCAxcHg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDJzIGVhc2UgMHM7XG4gICAgICB9XG5cbiAgICAgIC5jaXJjbGU6bnRoLWNoaWxkKDEpIHsgJHt0aGlzLmNhbGN1bGF0ZUNpcmNsZSgwKX0gfVxuICAgICAgLmNpcmNsZTpudGgtY2hpbGQoMikgeyAke3RoaXMuY2FsY3VsYXRlQ2lyY2xlKDEpfSB9XG4gICAgICAuY2lyY2xlOm50aC1jaGlsZCgzKSB7ICR7dGhpcy5jYWxjdWxhdGVDaXJjbGUoMil9IH1cbiAgICAgIC5jaXJjbGU6bnRoLWNoaWxkKDQpIHsgJHt0aGlzLmNhbGN1bGF0ZUNpcmNsZSgzKX0gfVxuICAgICAgLmNpcmNsZTpudGgtY2hpbGQoNSkgeyAke3RoaXMuY2FsY3VsYXRlQ2lyY2xlKDQpfSB9XG5cbiAgICAgIEBrZXlmcmFtZXMgY2lyY2xlIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDaXJjbGVTcGlubmVyLmlzLCBDaXJjbGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbi8vIFRPRE86IEltcHJvdmUgc3R5bGluZ1xuZXhwb3J0IGNsYXNzIENsaW1iaW5nQm94U3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdjbGltYmluZy1ib3gtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICBjb25zdCB7IGNvbG9yLCBzaXplIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5jbGltYmluZy1ib3gtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogNy4xZW07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IDcuMWVtO1xuICAgICAgfVxuXG4gICAgICAuYm94IHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBjbGltYmluZ0JveCAyLjVzIGluZmluaXRlIGN1YmljLWJlemllcigwLjc5LCAwLCAwLjQ3LCAwLjk3KTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE1JTtcbiAgICAgICAgYm9yZGVyOiAwLjI1ZW0gc29saWQgdmFyKC0tY2xpbWJpbmctYm94LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvdHRvbTogLTAuMWVtO1xuICAgICAgICBoZWlnaHQ6IDFlbTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMWVtKSByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgICAgd2lkdGg6IDFlbTtcbiAgICAgIH1cblxuICAgICAgLmhpbGwge1xuICAgICAgICBib3JkZXItbGVmdDogMC4yNWVtIHNvbGlkIHZhcigtLWNsaW1iaW5nLWJveC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBoZWlnaHQ6IDcuMWVtO1xuICAgICAgICBsZWZ0OiAxLjdlbTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDEuN2VtO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgIHdpZHRoOiA3LjFlbTtcbiAgICAgIH1cblxuICAgICAgLndyYXBwZXIge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIG1hcmdpbi10b3A6IC0yLjdlbTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC0yLjdlbTtcbiAgICAgICAgd2lkdGg6IDUuNGVtO1xuICAgICAgICBoZWlnaHQ6IDUuNGVtO1xuICAgICAgICBmb250LXNpemU6IHZhcigtLWNsaW1iaW5nLWJveC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNsaW1iaW5nQm94IHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0xZW0pICAgcm90YXRlKC00NWRlZykgfVxuICAgICAgICA1JSAgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTFlbSkgICByb3RhdGUoLTUwZGVnKSB9XG4gICAgICAgIDIwJSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxZW0sIC0yZW0pIHJvdGF0ZSg0N2RlZykgfVxuICAgICAgICAyNSUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMWVtLCAtMmVtKSByb3RhdGUoNDVkZWcpIH1cbiAgICAgICAgMzAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDFlbSwgLTJlbSkgcm90YXRlKDQwZGVnKSB9XG4gICAgICAgIDQ1JSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgyZW0sIC0zZW0pIHJvdGF0ZSgxMzdkZWcpIH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDJlbSwgLTNlbSkgcm90YXRlKDEzNWRlZykgfVxuICAgICAgICA1NSUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMmVtLCAtM2VtKSByb3RhdGUoMTMwZGVnKSB9XG4gICAgICAgIDcwJSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzZW0sIC00ZW0pIHJvdGF0ZSgyMTdkZWcpIH1cbiAgICAgICAgNzUlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDNlbSwgLTRlbSkgcm90YXRlKDIyMGRlZykgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTFlbSkgICByb3RhdGUoLTIyNWRlZykgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImNsaW1iaW5nLWJveC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJveFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaWxsXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ2xpbWJpbmdCb3hTcGlubmVyLmlzLCBDbGltYmluZ0JveFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIENsaXBTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2NsaXAtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogMzUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICBjb25zdCB7IGNvbG9yLCBzaXplIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5jbGlwLXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IGNsaXAgMC43NXMgMHMgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHZhcigtLWNsaXAtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB2YXIoLS1jbGlwLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgIGJvcmRlci10b3AtY29sb3I6IHZhcigtLWNsaXAtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgICAgIGhlaWdodDogdmFyKC0tY2xpcC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tY2xpcC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNsaXAge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgICBzY2FsZSgxKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKSBzY2FsZSgwLjgpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpIHNjYWxlKDEpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2xpcC1zcGlubmVyXCI+PC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ2xpcFNwaW5uZXIuaXMsIENsaXBTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBEb3RTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2RvdC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKCkge1xuICAgIGNvbnN0IHsgY29sb3IsIHNpemUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gYFxuICAgICAgLmRvdC1zcGlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG4gICAgICAgIGFuaW1hdGlvbjogcm90YXRlIDJzIDBzIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1kb3Qtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogdmFyKC0tZG90LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5kb3Qge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBib3VuY2UgMnMgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kb3Qtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWRvdC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMik7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZG90LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyAyKTtcbiAgICAgIH1cblxuICAgICAgLmRvdDpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDBzO1xuICAgICAgICBib3R0b206IGF1dG87XG4gICAgICAgIHRvcDogMDtcbiAgICAgIH1cblxuICAgICAgLmRvdDpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0xcztcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICB0b3A6IGF1dG87XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYm91bmNlIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogc2NhbGUoMS4wKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHJvdGF0ZSB7XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZG90LXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEb3RTcGlubmVyLmlzLCBEb3RTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbi8vIFRPRE86IEZpeCBwb3NpdGlvbmluZyAobm90IGNlbnRlcmVkKVxuZXhwb3J0IGNsYXNzIEZhZGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2ZhZGUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgaGVpZ2h0OiAxNSxcbiAgICAgIG1hcmdpbjogMixcbiAgICAgIHJhZGl1czogMjAsXG4gICAgICB3aWR0aDogNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnaGVpZ2h0JyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3JhZGl1cycsXG4gICAgICAnd2lkdGgnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICBjb25zdCB7IGNvbG9yLCBoZWlnaHQsIG1hcmdpbiwgcmFkaXVzLCB3aWR0aCB9ID0gdGhpcy5wcm9wczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBvYmplY3QtY3VybHktbmV3bGluZVxuXG4gICAgY29uc3QgX3JhZGl1cyA9IGB2YXIoLS1mYWRlLXNwaW5uZXJfX3JhZGl1cywgJHtyYWRpdXN9cHgpYDtcbiAgICBjb25zdCBxdWFydGVyID0gYGNhbGMoJHtfcmFkaXVzfSAvIDIgKyAke19yYWRpdXN9IC8gNS41KWA7XG5cbiAgICByZXR1cm4gYFxuICAgICAgLmZhZGUtc3Bpbm5lciB7XG4gICAgICAgIGZvbnQtc2l6ZTogMDtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7X3JhZGl1c30gKiAzKTtcbiAgICAgICAgbGVmdDogJHtfcmFkaXVzfTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6ICR7X3JhZGl1c307XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7X3JhZGl1c30gKiAzKTtcbiAgICAgIH1cblxuICAgICAgLmxpbmUge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IGZhZGUgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZmFkZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAke19yYWRpdXN9O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWZhZGUtc3Bpbm5lcl9faGVpZ2h0LCAke2hlaWdodH1weCk7XG4gICAgICAgIG1hcmdpbjogdmFyKC0tZmFkZS1zcGlubmVyX19tYXJnaW4sICR7bWFyZ2lufXB4KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0cmFuc2l0aW9uOiAycztcbiAgICAgICAgd2lkdGg6IHZhcigtLWZhZGUtc3Bpbm5lcl9fd2lkdGgsICR7d2lkdGh9cHgpO1xuICAgICAgfVxuXG4gICAgICAubGluZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDBzO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0b3A6ICR7X3JhZGl1c307XG4gICAgICB9XG5cbiAgICAgIC5saW5lOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyguMTJzICogMSk7XG4gICAgICAgIGxlZnQ6ICR7cXVhcnRlcn07XG4gICAgICAgIHRvcDogJHtxdWFydGVyfTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgIH1cblxuICAgICAgLmxpbmU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKC4xMnMgKiAyKTtcbiAgICAgICAgbGVmdDogJHtfcmFkaXVzfTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gICAgICB9XG5cbiAgICAgIC5saW5lOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyguMTJzICogMyk7XG4gICAgICAgIGxlZnQ6ICR7cXVhcnRlcn07XG4gICAgICAgIHRvcDogY2FsYygke3F1YXJ0ZXJ9ICogLTEpO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICB9XG5cbiAgICAgIC5saW5lOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyguMTJzICogNCk7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogY2FsYygke19yYWRpdXN9ICogLTEpO1xuICAgICAgfVxuXG4gICAgICAubGluZTpudGgtY2hpbGQoNikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoLjEycyAqIDUpO1xuICAgICAgICBsZWZ0OiBjYWxjKCR7cXVhcnRlcn0gKiAtMSk7XG4gICAgICAgIHRvcDogY2FsYygke3F1YXJ0ZXJ9ICogLTEpO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICAgICAgfVxuXG4gICAgICAubGluZTpudGgtY2hpbGQoNykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoLjEycyAqIDYpO1xuICAgICAgICBsZWZ0OiBjYWxjKCR7X3JhZGl1c30gKiAtMSk7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuICAgICAgfVxuXG4gICAgICAubGluZTpudGgtY2hpbGQoOCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoLjEycyAqIDcpO1xuICAgICAgICBsZWZ0OiBjYWxjKCR7cXVhcnRlcn0gKiAtMSk7XG4gICAgICAgIHRvcDogJHtxdWFydGVyfTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZhZGUge1xuICAgICAgICA1MCUgIHsgb3BhY2l0eTogMC4zOyB9XG4gICAgICAgIDEwMCUgeyBvcGFjaXR5OiAxOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZmFkZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShGYWRlU3Bpbm5lci5pcywgRmFkZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEdyaWRTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2dyaWQtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgbWFyZ2luOiAyLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ21hcmdpbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpIHtcbiAgICBjb25zdCByYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogJHtyYW5kb20gKyAwLjZ9cztcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogJHtyYW5kb20gLSAwLjJ9cztcbiAgICBgO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgY29uc3QgeyBjb2xvciwgbWFyZ2luLCBzaXplIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5ncmlkLXNwaW5uZXIge1xuICAgICAgICBmb250LXNpemU6IDA7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWdyaWQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDMgKyB2YXIoLS1ncmlkLXNwaW5uZXJfX21hcmdpbiwgJHttYXJnaW59cHgpICogNik7XG4gICAgICB9XG5cbiAgICAgIC5jZWxsIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBncmlkIGluZmluaXRlIGVhc2U7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWdyaWQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgbWFyZ2luOiB2YXIoLS1ncmlkLXNwaW5uZXJfX21hcmdpbiwgJHttYXJnaW59cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tZ3JpZC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuY2VsbDpudGgtY2hpbGQoMSkgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cbiAgICAgIC5jZWxsOm50aC1jaGlsZCgyKSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDMpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG4gICAgICAuY2VsbDpudGgtY2hpbGQoNCkgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cbiAgICAgIC5jZWxsOm50aC1jaGlsZCg1KSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDYpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG4gICAgICAuY2VsbDpudGgtY2hpbGQoNykgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cbiAgICAgIC5jZWxsOm50aC1jaGlsZCg4KSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDkpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZ3JpZCB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7IG9wYWNpdHk6IDAuNzsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgb3BhY2l0eTogMTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImdyaWQtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoR3JpZFNwaW5uZXIuaXMsIEdyaWRTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBIYXNoU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdoYXNoLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDUwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgY29uc3QgeyBjb2xvciwgc2l6ZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IF9jb2xvciA9IGB2YXIoLS1oYXNoLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSlgO1xuICAgIGNvbnN0IF9zaXplID0gYHZhcigtLWhhc2gtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KWA7XG5cbiAgICBjb25zdCBfdGhpY2tuZXNzID0gYGNhbGMoJHtfc2l6ZX0gLyA1KWA7XG5cbiAgICBjb25zdCBfbGF0ID0gYGNhbGMoY2FsYygke19zaXplfSAtICR7X3RoaWNrbmVzc30pIC8gMilgO1xuXG4gICAgY29uc3QgX29mZnNldCA9IGBjYWxjKCR7X2xhdH0gLSAke190aGlja25lc3N9KWA7XG5cbiAgICByZXR1cm4gYFxuICAgICAgLmhhc2gtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHtfc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTY1ZGVnKTtcbiAgICAgICAgd2lkdGg6ICR7X3NpemV9O1xuICAgICAgfVxuXG4gICAgICAuaGFzaCB7XG4gICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMnM7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IG5vbmU7XG4gICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiBjYWxjKCR7X3NpemV9IC8gMTApO1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7X3NpemV9IC8gNSk7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgb3BhY2l0eTogLjk7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgICB3aWR0aDogY2FsYygke19zaXplfSAvIDUpO1xuICAgICAgfVxuXG4gICAgICAuaGFzaDpudGgtY2hpbGQoMSkgeyBhbmltYXRpb24tbmFtZTogYmVmb3JlOyB9XG4gICAgICAuaGFzaDpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tbmFtZTogYWZ0ZXI7IH1cblxuICAgICAgQGtleWZyYW1lcyBiZWZvcmUge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogJHtfbGF0fSBjYWxjKCR7X29mZnNldH0gKiAtMSkgJHtfY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGMoJHtfbGF0fSAqIC0xKSAke19vZmZzZXR9ICR7X2NvbG9yfTtcbiAgICAgICAgICB3aWR0aDogJHtfdGhpY2tuZXNzfTtcbiAgICAgICAgfVxuXG4gICAgICAgIDM1JSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCBjYWxjKCR7X29mZnNldH0gKiAtMSkgJHtfY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIDAgJHtfb2Zmc2V0fSAke19jb2xvcn07XG4gICAgICAgICAgd2lkdGg6ICR7X3NpemV9O1xuICAgICAgICB9XG5cbiAgICAgICAgNzAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiBjYWxjKCR7X2xhdH0gKiAtMSkgY2FsYygke19vZmZzZXR9ICogLTEpICR7X2NvbG9yfSxcbiAgICAgICAgICAgICAgICAgICAgICAke19sYXR9ICR7X29mZnNldH0gJHtfY29sb3J9O1xuICAgICAgICAgIHdpZHRoOiAke190aGlja25lc3N9O1xuICAgICAgICB9XG5cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogJHtfbGF0fSBjYWxjKCR7X29mZnNldH0gKiAtMSkgJHtfY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGMoJHtfbGF0fSAqIC0xKSAke19vZmZzZXR9ICR7X2NvbG9yfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGFmdGVyIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6ICR7X29mZnNldH0gJHtfbGF0fSAke19jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke19vZmZzZXR9ICogLTEpIGNhbGMoJHtfbGF0fSAqIC0xKSAke19jb2xvcn07XG4gICAgICAgICAgaGVpZ2h0OiAke190aGlja25lc3N9O1xuICAgICAgICB9XG5cbiAgICAgICAgMzUlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke19vZmZzZXR9IDAgJHtfY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGMoJHtfb2Zmc2V0fSAqIC0xKSAwICR7X2NvbG9yfTtcbiAgICAgICAgICBoZWlnaHQ6ICR7X3NpemV9O1xuICAgICAgICB9XG5cbiAgICAgICAgNzAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke19vZmZzZXR9IGNhbGMoJHtfbGF0fSAqIC0xKSAke19jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke19vZmZzZXR9ICogLTEpICR7X2xhdH0gJHtfY29sb3J9O1xuICAgICAgICAgIGhlaWdodDogJHtfdGhpY2tuZXNzfTtcbiAgICAgICAgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6ICR7X29mZnNldH0gJHtfbGF0fSAke19jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke19vZmZzZXR9ICogLTEpIGNhbGMoJHtfbGF0fSAqIC0xKSAke19jb2xvcn07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJoYXNoLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhhc2hcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhhc2hcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEhhc2hTcGlubmVyLmlzLCBIYXNoU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgTW9vblNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnbW9vbi1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGJhbGxTdHlsZShzaXplKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICBoZWlnaHQ6ICR7c2l6ZX07XG4gICAgICB3aWR0aDogJHtzaXplfTtcbiAgICBgO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgY29uc3QgeyBjb2xvciwgc2l6ZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IF9jb2xvciA9IGB2YXIoLS1tb29uLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSlgO1xuICAgIGNvbnN0IF9zaXplID0gYHZhcigtLW1vb24tc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KWA7XG5cbiAgICBjb25zdCBtb29uU2l6ZSA9IGBjYWxjKCR7X3NpemV9IC8gNylgO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5tb29uLXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBtb29uIDAuNnMgMHMgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHtfc2l6ZX0gKyAke21vb25TaXplfSAqIDIpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7X3NpemV9ICsgJHttb29uU2l6ZX0gKiAyKTtcbiAgICAgIH1cblxuICAgICAgLmJhbGwge1xuICAgICAgICAke3RoaXMuYmFsbFN0eWxlKG1vb25TaXplKX07XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb246IG1vb24gMC42cyAwcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7X2NvbG9yfTtcbiAgICAgICAgb3BhY2l0eTogMC44O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogY2FsYygke19zaXplfSAvIDIgLSAke21vb25TaXplfSAvIDIpO1xuICAgICAgfVxuXG4gICAgICAuY2lyY2xlIHtcbiAgICAgICAgJHt0aGlzLmJhbGxTdHlsZShfc2l6ZSl9O1xuICAgICAgICBib3JkZXI6ICR7bW9vblNpemV9IHNvbGlkICR7X2NvbG9yfTtcbiAgICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gICAgICAgIG9wYWNpdHk6IDAuMTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBtb29uIHtcbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtb29uLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTW9vblNwaW5uZXIuaXMsIE1vb25TcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBQYWNtYW5TcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3BhY21hbi1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBtYXJnaW46IDIsXG4gICAgICBzaXplOiAyNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnbWFyZ2luJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgYmFsbERlbGF5KGZhY3Rvcikge1xuICAgIHJldHVybiBgYW5pbWF0aW9uLWRlbGF5OiAke2ZhY3RvciAqIDAuMjV9cztgO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgY29uc3QgeyBjb2xvciwgbWFyZ2luLCBzaXplIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgX2NvbG9yID0gYHZhcigtLXBhY21hbi1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pYDtcbiAgICBjb25zdCBfc2l6ZSA9IGB2YXIoLS1wYWNtYW4tc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KWA7XG4gICAgY29uc3QgX21hcmdpbiA9IGB2YXIoLS1wYWNtYW4tc3Bpbm5lcl9fbWFyZ2luLCAke21hcmdpbn1weClgO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5wYWNtYW4tc3Bpbm5lciB7XG4gICAgICAgIGZvbnQtc2l6ZTogMDtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7X3NpemV9ICogMik7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHtfc2l6ZX0gKiAyKTtcbiAgICAgIH1cblxuICAgICAgLnBhY21hbi10b3Age1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHBhY21hbjEgMC44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogJHtfc2l6ZX0gc29saWQgJHtfY29sb3J9O1xuICAgICAgICBib3JkZXItbGVmdDogJHtfc2l6ZX0gc29saWQgJHtfY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAke19zaXplfTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAke19zaXplfSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXRvcDogJHtfc2l6ZX0gc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMDtcbiAgICAgIH1cblxuICAgICAgLnBhY21hbi1ib3R0b20ge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHBhY21hbjIgMC44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogJHtfc2l6ZX0gc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1sZWZ0OiAke19zaXplfSBzb2xpZCAke2NvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogJHtfc2l6ZX07XG4gICAgICAgIGJvcmRlci1yaWdodDogJHtfc2l6ZX0gc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci10b3A6ICR7X3NpemV9IHNvbGlkICR7Y29sb3J9O1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICB9XG5cbiAgICAgIC5iYWxsIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBiYWxsIDFzIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogY2FsYygke19zaXplfSAvIDIuNSk7XG4gICAgICAgIGxlZnQ6IGNhbGMoJHtfc2l6ZX0gKiA0KTtcbiAgICAgICAgbWFyZ2luOiAke19tYXJnaW59O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogJHtfc2l6ZX07XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIGNhbGMoJHtfc2l6ZX0gLyAtNCkpO1xuICAgICAgICB3aWR0aDogY2FsYygke19zaXplfSAvIDIuNSk7XG4gICAgICB9XG5cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgzKSB7ICR7dGhpcy5iYWxsRGVsYXkoLTMpfSB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoNCkgeyAke3RoaXMuYmFsbERlbGF5KC0yKX0gfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDUpIHsgJHt0aGlzLmJhbGxEZWxheSgtMSl9IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCg2KSB7ICR7dGhpcy5iYWxsRGVsYXkoMCl9IH1cblxuICAgICAgQGtleWZyYW1lcyBiYWxsIHtcbiAgICAgICAgNzUlICB7IG9wYWNpdHk6IDAuNzsgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKGNhbGMoJHtfc2l6ZX0gKiAtNCksIGNhbGMoJHtfc2l6ZX0gLyAtNCkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgcGFjbWFuMSB7XG4gICAgICAgIDAlICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogcm90YXRlKC00NGRlZyk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBwYWNtYW4yIHtcbiAgICAgICAgMCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiByb3RhdGUoNDRkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwicGFjbWFuLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhY21hbi10b3BcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhY21hbi1ib3R0b21cIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFBhY21hblNwaW5uZXIuaXMsIFBhY21hblNwaW5uZXIpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBQUEsTUFBTSxjQUFjLFNBQVMsV0FBVyxDQUFDO0VBQ3pDLEVBQUUsV0FBVyxHQUFHO0VBQ2hCLElBQUksS0FBSyxFQUFFLENBQUM7O0VBRVosSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO0VBQzNDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7RUFDcEQsR0FBRzs7RUFFSCxFQUFFLGlCQUFpQixHQUFHO0VBQ3RCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0VBQ2xCLEdBQUc7O0VBRUgsRUFBRSx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtFQUNyRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxD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RUFBRSxJQUFJLENBQUMsK0NBQStDLEVBQUUsSUFBSSxDQUFDOzs7OztzREFLNUQsRUFBRSxJQUFJLENBQUMsK0NBQStDLEVBQUUsSUFBSSxDQUFDO3FEQUM5RCxFQUFFLElBQUksQ0FBQywrQ0FBK0MsRUFBRSxJQUFJLENBQUM7Ozs7O3NEQUs1RCxFQUFFLElBQUksQ0FBQywrQ0FBK0MsRUFBRSxJQUFJLENBQUM7cURBQzlELEVBQUUsSUFBSSxDQUFDLCtDQUErQyxFQUFFLElBQUksQ0FBQzs7Ozs7c0RBSzVELEVBQUUsSUFBSSxDQUFDLCtDQUErQyxFQUFFLElBQUksQ0FBQztxREFDOUQsRUFBRSxJQUFJLENBQUMsK0NBQStDLEVBQUUsSUFBSSxDQUFDOzs7OztzREFLNUQsRUFBRSxJQUFJLENBQUMsK0NBQStDLEVBQUUsSUFBSSxDQUFDO3FEQUM5RCxFQUFFLElBQUksQ0FBQywrQ0FBK0MsRUFBRSxJQUFJLENBQUM7Ozs7O3NEQUs1RCxFQUFFLElBQUksQ0FBQywrQ0FBK0MsRUFBRSxJQUFJLENBQUM7cURBQzlELEVBQUUsSUFBSSxDQUFDLCtDQUErQyxFQUFFLElBQUksQ0FBQzs7Ozs7c0RBSzVELEVBQUUsSUFBSSxDQUFDLCtDQUErQyxFQUFFLElBQUksQ0FBQztxREFDOUQsRUFBRSxJQUFJLENBQUMsK0NBQStDLEVBQUUsSUFBSSxDQUFDOzs7OztzREFLNUQsRUFBRSxJQUFJLENBQUMsK0NBQStDLEVBQUUsSUFBSSxDQUFDO3FEQUM5RCxFQUFFLElBQUksQ0FBQywrQ0FBK0MsRUFBRSxJQUFJLENBQUM7Ozs7O3NEQUs1RCxFQUFFLElBQUksQ0FBQywrQ0FBK0MsRUFBRSxJQUFJLENBQUM7cURBQzlELEVBQUUsSUFBSSxDQUFDLCtDQUErQyxFQUFFLElBQUksQ0FBQzs7Ozs7Ozs7SUFROUcsQ0FBQyxDQUFDO0VBQ04sR0FBRzs7RUFFSCxFQUFFLFFBQVEsR0FBRztFQUNiLElBQUksT0FBTyxDQUFDOzs7Ozs7Ozs7Ozs7SUFZUixDQUFDLENBQUM7RUFDTixHQUFHO0VBQ0gsQ0FBQzs7RUFFRCxjQUFjLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDOztFQzdIMUQsTUFBTSxhQUFhLFNBQVMsY0FBYyxDQUFDO0VBQ2xELEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxPQUFPLGdCQUFnQixDQUFDLEVBQUU7O0VBRTlDLEVBQUUsV0FBVyxRQUFRLEdBQUc7RUFDeEIsSUFBSSxPQUFPO0VBQ1gsTUFBTSxLQUFLLEVBQUUsU0FBUztFQUN0QixNQUFNLFFBQVEsRUFBRSxHQUFHO0VBQ25CLE1BQU0sSUFBSSxFQUFFLEVBQUU7RUFDZCxLQUFLLENBQUM7RUFDTixHQUFHOztFQUVILEVBQUUsV0FBVyxrQkFBa0IsR0FBRztFQUNsQyxJQUFJLE9BQU87RUFDWCxNQUFNLE9BQU87RUFDYixNQUFNLFVBQVU7RUFDaEIsTUFBTSxNQUFNO0VBQ1osS0FBSyxDQUFDO0VBQ04sR0FBRzs7RUFFSCxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7RUFDbkMsSUFBSSxPQUFPLENBQUM7Ozs7OzRDQUtnQyxFQUFFLElBQUksQ0FBQzs7MkNBRVIsRUFBRSxJQUFJLENBQUM7Ozs7aURBSUQsRUFBRSxJQUFJLENBQUM7Z0RBQ1IsRUFBRSxJQUFJLENBQUM7Ozs7d0ZBSWlDLEVBQUUsUUFBUSxDQUFDO3NEQUM3QyxFQUFFLEtBQUssQ0FBQzs7Ozs7Ozt1RkFPeUIsRUFBRSxRQUFRLENBQUM7c0RBQzVDLEVBQUUsS0FBSyxDQUFDOzs7Ozs7Ozs7d0RBU04sRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7Ozs7Ozt3REFNUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzs7Ozt3REFJUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzs7Ozs7d0RBS1IsRUFBRSxLQUFLLENBQUM7NENBQ3BCLEVBQUUsS0FBSyxDQUFDOzRDQUNSLEVBQUUsS0FBSyxDQUFDOzRDQUNSLEVBQUUsS0FBSyxDQUFDOzRDQUNSLEVBQUUsS0FBSyxDQUFDOzRDQUNSLEVBQUUsS0FBSyxDQUFDOzRDQUNSLEVBQUUsS0FBSyxDQUFDOzRDQUNSLEVBQUUsS0FBSyxDQUFDOzs7d0RBR0ksRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7d0RBQ1IsRUFBRSxLQUFLLENBQUM7Ozt3REFHUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzt3REFDUixFQUFFLEtBQUssQ0FBQzs7O0lBRzVELENBQUMsQ0FBQztFQUNOLEdBQUc7O0VBRUgsRUFBRSxRQUFRLEdBQUc7RUFDYixJQUFJLE9BQU8sQ0FBQzs7Ozs7Ozs7SUFRUixDQUFDLENBQUM7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UUFBUSxDQUFDOzsyREFFbEMsRUFBRSxLQUFLLENBQUM7Ozs7MERBSVQsRUFBRSxLQUFLLENBQUM7MERBQ1IsRUFBRSxJQUFJLENBQUM7Ozs7O2lFQUtBLEVBQUUsUUFBUSxDQUFDO29EQUN4QixFQUFFLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxJQUFJLENBQUM7a0RBQ3JELEVBQUUsSUFBSSxDQUFDO2lEQUNSLEVBQUUsSUFBSSxDQUFDO21EQUNMLEVBQUUsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLElBQUksQ0FBQzs7Ozs7aUVBS3JDLEVBQUUsUUFBUSxDQUFDO29EQUN4QixFQUFFLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxJQUFJLENBQUM7a0RBQ3JELEVBQUUsSUFBSSxDQUFDO2lEQUNSLEVBQUUsSUFBSSxDQUFDO21EQUNMLEVBQUUsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLElBQUksQ0FBQzs7Ozs7aUVBS3JDLEVBQUUsUUFBUSxDQUFDO29EQUN4QixFQUFFLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxJQUFJLENBQUM7a0RBQ3JELEVBQUUsSUFBSSxDQUFDO2lEQUNSLEVBQUUsSUFBSSxDQUFDO21EQUNMLEVBQUUsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLElBQUksQ0FBQzs7Ozs7aUVBS3JDLEVBQUUsUUFBUSxDQUFDO29EQUN4QixFQUFFLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxJQUFJLENBQUM7a0RBQ3JELEVBQUUsSUFBSSxDQUFDO2lEQUNSLEVBQUUsSUFBSSxDQUFDO21EQUNMLEVBQUUsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLElBQUksQ0FBQzs7Ozs7aUVBS3JDLEVBQUUsUUFBUSxDQUFDO29EQUN4QixFQUFFLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxJQUFJLENBQUM7a0RBQ3JELEVBQUUsSUFBSSxDQUFDO2lEQUNSLEVBQUUsSUFBSSxDQUFDO21EQUNMLEVBQUUsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLElBQUksQ0FBQzs7Ozs7OztJQU9sRyxDQUFDLENBQUM7RUFDTixHQUFHOztFQUVILEVBQUUs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
