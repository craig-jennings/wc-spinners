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
        animation: intersecting-circles-spinner-animation var(--intersecting-circles-spinner__duration, ${duration}s) linear infinite;
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

      @keyframes intersecting-circles-spinner-animation {
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

  class PropagateSpinner extends SpinnerElement {
    static get is() { return 'propagate-spinner'; }

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

    get color() { return `var(--propagate-spinner__color, ${this.props.color})`; }

    get size() { return `var(--propagate-spinner__size, ${this.props.size}px)`; }

    style() {
      const distance = [1, 3, 5];

      return `
      .propagate-spinner {
        position: relative;
      }

      .ball {
        animation-duration: 1.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        background: ${this.color};
        border-radius: 50%;
        font-size: calc(${this.size} / 3);
        height: ${this.size};
        left: calc(${this.size} / -2);
        position: absolute;
        top: calc(${this.size} / -2);
        width: ${this.size};
      }

      .ball:nth-child(1) { animation-name: ball1; }
      .ball:nth-child(2) { animation-name: ball2; }
      .ball:nth-child(3) { animation-name: ball3; }
      .ball:nth-child(4) { animation-name: ball4; }
      .ball:nth-child(5) { animation-name: ball5; }
      .ball:nth-child(6) { animation-name: ball6; }

      @keyframes ball1 {
        25% { transform: translateX(-${distance[0]}rem) scale(0.75); }
        50% { transform: translateX(-${distance[1]}rem) scale(0.6); }
        75% { transform: translateX(-${distance[2]}rem) scale(0.5); }
        95% { transform: translateX(0rem)               scale(1); }
      }

      @keyframes ball2 {
        25% { transform: translateX(-${distance[0]}rem) scale(0.75); }
        50% { transform: translateX(-${distance[1]}rem) scale(0.6); }
        75% { transform: translateX(-${distance[1]}rem) scale(0.6); }
        95% { transform: translateX(0rem)               scale(1); }
      }

      @keyframes ball3 {
        25% { transform: translateX(-${distance[0]}rem) scale(0.75); }
        75% { transform: translateX(-${distance[0]}rem) scale(0.75); }
        95% { transform: translateX(0rem)               scale(1); }
      }

      @keyframes ball4 {
        25% { transform: translateX(${distance[0]}rem) scale(0.75); }
        75% { transform: translateX(${distance[0]}rem) scale(0.75); }
        95% { transform: translateX(0rem)              scale(1); }
      }

      @keyframes ball5 {
        25% { transform: translateX(${distance[0]}rem) scale(0.75); }
        50% { transform: translateX(${distance[1]}rem) scale(0.6); }
        75% { transform: translateX(${distance[1]}rem) scale(0.6); }
        95% { transform: translateX(0rem)              scale(1); }
      }

      @keyframes ball6 {
        25% { transform: translateX(${distance[0]}rem) scale(0.75); }
        50% { transform: translateX(${distance[1]}rem) scale(0.6); }
        75% { transform: translateX(${distance[2]}rem) scale(0.5); }
        95% { transform: translateX(0rem)              scale(1); }
      }
    `;
    }

    template() {
      return `
      <div class="propagate-spinner">
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
      </div>
    `;
    }
  }

  customElements.define(PropagateSpinner.is, PropagateSpinner);

  class PulseSpinner extends SpinnerElement {
    static get is() { return 'pulse-spinner'; }

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

    get color() { return `var(--pulse-spinner__color, ${this.props.color})`; }

    get margin() { return `var(--pulse-spinner__margin, ${this.props.margin}px)`; }

    get size() { return `var(--pulse-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .pulse-spinner {
        display: flex;
        align-items: center;
      }

      .ball {
        animation-fill-mode: both;
        animation: pulse 0.75s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
        background-color: ${this.color};
        border-radius: 100%;
        display: inline-block;
        height: ${this.size};
        margin: ${this.margin};
        width: ${this.size};
      }

      .ball:nth-child(1) { animation-delay: 0s; }
      .ball:nth-child(2) { animation-delay: .12s; }
      .ball:nth-child(3) { animation-delay: .24s; }

      @keyframes pulse {
        0%  { transform: scale(1);   opacity: 1; }
        45% { transform: scale(0.1); opacity: 0.7; }
        80% { transform: scale(1);   opacity: 1; }
      }
    `;
    }

    template() {
      return `
      <div class="pulse-spinner">
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
      </div>
    `;
    }
  }

  customElements.define(PulseSpinner.is, PulseSpinner);

  class RingSpinner extends SpinnerElement {
    static get is() { return 'ring-spinner'; }

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

    get color() { return `var(--ring-spinner__color, ${this.props.color})`; }

    get size() { return `var(--ring-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .ring-spinner {
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .ring {
        animation-fill-mode: forwards;
        animation: 2s 0s infinite linear;
        border-radius: 100%;
        border: calc(${this.size} / 10) solid ${this.color};
        height: ${this.size};
        left: 0;
        opacity: 0.4;
        perspective: 800px;
        position: absolute;
        top: 0;
        width: ${this.size};
      }

      .ring:nth-child(1) { animation-name: right; }
      .ring:nth-child(2) { animation-name: left; }

      @keyframes left {
        0%   { transform: rotateX(0deg)   rotateY(0deg)   rotateZ(0deg); }
        100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg); }
      }

      @keyframes right {
        0%   { transform: rotateX(0deg)   rotateY(0deg)   rotateZ(0deg); }
        100% { transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg); }
      }
    `;
    }

    template() {
      return `
      <div class="ring-spinner">
        <div class="ring"></div>
        <div class="ring"></div>
      </div>
    `;
    }
  }

  customElements.define(RingSpinner.is, RingSpinner);

  class RiseSpinner extends SpinnerElement {
    static get is() { return 'rise-spinner'; }

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

    get color() { return `var(--rise-spinner__color, ${this.props.color})`; }

    get margin() { return `var(--rise-spinner__margin, ${this.props.margin}px)`; }

    get size() { return `var(--rise-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .ball {
        animation-fill-mode: both;
        animation: 1s 0s infinite cubic-bezier(0.15, 0.46, 0.9, 0.6);
        background-color: ${this.color};
        border-radius: 100%;
        display: inline-block;
        height: ${this.size};
        margin: ${this.margin};
        width: ${this.size};
      }

      .ball:nth-child(even) { animation-name: even; }
      .ball:nth-child(odd) { animation-name: odd; }

      @keyframes even {
        0%   { transform: scale(1.1); }
        25%  { translateY(-30px); }
        50%  { transform: scale(0.4); }
        75%  { transform: translateY(30px); }
        100% { transform: translateY(0) scale(1.0); }
      }

      @keyframes odd {
        0%   { transform: scale(0.4); }
        25%  { translateY(30px); }
        50%  { transform: scale(1.1); }
        75%  { transform: translateY(-30px); }
        100% { transform: translateY(0) scale(0.75); }
      }
    `;
    }

    template() {
      return `
      <div class="rise-spinner">
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
      </div>
    `;
    }
  }

  customElements.define(RiseSpinner.is, RiseSpinner);

  class RotateSpinner extends SpinnerElement {
    static get is() { return 'rotate-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        margin: 5,
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

    get color() { return `var(--rotate-spinner__color, ${this.props.color})`; }

    get margin() { return `var(--rotate-spinner__margin, ${this.props.margin}px)`; }

    get size() { return `var(--rotate-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .rotate-spinner {
        animation-fill-mode: both;
        animation: rotate 1s 0s infinite cubic-bezier(0.7, -0.13, 0.22, 0.86);
        display: flex;
        position: relative;
      }

      .ball {
        background-color: ${this.color};
        border-radius: 100%;
        height: ${this.size};
        margin: ${this.margin};
        width: ${this.size};
      }

      @keyframes rotate {
        0%   { transform: rotate(0deg); }
        50%  { transform: rotate(180deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    }

    template() {
      return `
      <div class="rotate-spinner">
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
      </div>
    `;
    }
  }

  customElements.define(RotateSpinner.is, RotateSpinner);

  class ScaleSpinner extends SpinnerElement {
    static get is() { return 'scale-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        height: 35,
        margin: 2,
        radius: 2,
        width: 4,
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

    get color() { return `var(--scale-spinner__color, ${this.props.color})`; }

    get height() { return `var(--scale-spinner__height, ${this.props.height}px)`; }

    get margin() { return `var(--scale-spinner__margin, ${this.props.margin}px)`; }

    get radius() { return `var(--scale-spinner__radius, ${this.props.radius}px)`; }

    get width() { return `var(--scale-spinner__width, ${this.props.width}px)`; }

    get size() { return `var(--scale-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .scale-spinner {
        animation-fill-mode: both;
        animation: rotate 1s 0s infinite cubic-bezier(0.7, -0.13, 0.22, 0.86);
        display: flex;
        position: relative;
      }

      .line {
        animation-fill-mode: both;
        animation: scale 1s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
        background-color: ${this.color};
        border-radius: ${this.radius};
        display: inline-block;
        height: ${this.height};
        margin: ${this.margin};
        width: ${this.width};
      }

      .line:nth-child(1) { animation-delay: 0.1s; }
      .line:nth-child(2) { animation-delay: 0.2s; }
      .line:nth-child(3) { animation-delay: 0.3s; }
      .line:nth-child(4) { animation-delay: 0.4s; }
      .line:nth-child(5) { animation-delay: 0.5s; }

      @keyframes scale {
        0%   { transform: scaley(1.0); }
        50%  { transform: scaley(0.4); }
        100% { transform: scaley(1.0); }
      }
    `;
    }

    template() {
      return `
      <div class="scale-spinner">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    `;
    }
  }

  customElements.define(ScaleSpinner.is, ScaleSpinner);

  class SkewSpinner extends SpinnerElement {
    static get is() { return 'skew-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        size: 20,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'size',
      ];
    }

    get color() { return `var(--skew-spinner__color, ${this.props.color})`; }

    get size() { return `var(--skew-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .skew-spinner {
        animation-fill-mode: both;
        animation: skew 3s 0s infinite cubic-bezier(0.09, 0.57, 0.49, 0.9);
        border-bottom: ${this.size} solid ${this.color};
        border-left: ${this.size} solid transparent;
        border-right: ${this.size} solid transparent;
        display: inline-block;
        height: 0;
        width: 0;
      }

      @keyframes skew {
        25%  { transform: perspective(100px) rotateX(180deg) rotateY(0); }
        50%  { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
        75%  { transform: perspective(100px) rotateX(0)      rotateY(180deg); }
        100% { transform: perspective(100px) rotateX(0)      rotateY(0); }
      }
    `;
    }

    template() {
      return `
      <div class="skew-spinner"></div>
    `;
    }
  }

  customElements.define(SkewSpinner.is, SkewSpinner);

  class SquareSpinner extends SpinnerElement {
    static get is() { return 'square-spinner'; }

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

    get color() { return `var(--square-spinner__color, ${this.props.color})`; }

    get size() { return `var(--square-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .square-spinner {
        animation-fill-mode: both;
        animation: square 3s 0s infinite cubic-bezier(0.09, 0.57, 0.49, 0.9);
        background-color: ${this.color};
        display: inline-block;
        height: ${this.size};
        width: ${this.size};
      }

      @keyframes square {
        25%  { transform: rotateX(180deg) rotateY(0); }
        50%  { transform: rotateX(180deg) rotateY(180deg); }
        75%  { transform: rotateX(0)      rotateY(180deg); }
        100% { transform: rotateX(0)      rotateY(0); }
      }
    `;
    }

    template() {
      return `
      <div class="square-spinner"></div>
    `;
    }
  }

  customElements.define(SquareSpinner.is, SquareSpinner);

  class SyncSpinner extends SpinnerElement {
    static get is() { return 'sync-spinner'; }

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

    get color() { return `var(--sync-spinner__color, ${this.props.color})`; }

    get margin() { return `var(--sync-spinner__margin, ${this.props.margin}px)`; }

    get size() { return `var(--sync-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .sync-spinner {
        display: flex;
      }

      .ball {
        animation-fill-mode: both;
        animation: sync 0.6s infinite ease-in-out;
        background-color: ${this.color};
        border-radius: 100%;
        height: ${this.size};
        margin: ${this.margin};
        width: ${this.size};
      }

      .ball:nth-child(1) { animation-delay: 0s; }
      .ball:nth-child(2) { animation-delay: 0.07s; }
      .ball:nth-child(3) { animation-delay: 0.14s; }

      @keyframes sync {
        33%  { transform: translateY(10px); }
        66%  { transform: translateY(-10px); }
        100% { transform: translateY(0); }
      }
    `;
    }

    template() {
      return `
      <div class="sync-spinner">
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
      </div>
    `;
    }
  }

  customElements.define(SyncSpinner.is, SyncSpinner);

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGlubmVyRWxlbWVudC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvYXRvbS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2NpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2ZpbmdlcnByaW50LXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2Zsb3dlci1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9oYWxmLWNpcmNsZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9ob2xsb3ctZG90cy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9sb29waW5nLXJob21idXNlcy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9vcmJpdC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9waXhlbC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9yYWRhci1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvc2VtaXBvbGFyLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL3NwcmluZy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL3RyaW5pdHktcmluZ3Mtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL2Jhci1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvYmVhdC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvYm91bmNlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9jaXJjbGUtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL2NsaW1iaW5nLWJveC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvY2xpcC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvZG90LXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9mYWRlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9ncmlkLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9oYXNoLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9tb29uLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9wYWNtYW4tc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3Byb3BhZ2F0ZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvcHVsc2Utc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3Jpbmctc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3Jpc2Utc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3JvdGF0ZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvc2NhbGUtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3NrZXctc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3NxdWFyZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvc3luYy1zcGlubmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNwaW5uZXJFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wcm9wcyA9IHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdHM7XG4gICAgdGhpcy5yb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIHRoaXMucHJvcHNbbmFtZV0gPSBuZXdWYWx1ZSB8fCB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRzW25hbWVdO1xuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHN0eWxlKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc3R5bGUgbWV0aG9kIG11c3QgYmUgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndGVtcGxhdGUgbWV0aG9kIG11c3QgYmUgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBzdHlsZXMgPSBgXG4gICAgICA8c3R5bGU+XG4gICAgICAgICogeyBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XG5cbiAgICAgICAgOmhvc3QgICAgICAgICAgIHsgZGlzcGxheTogYmxvY2s7IH1cbiAgICAgICAgOmhvc3QoW2hpZGRlbl0pIHsgZGlzcGxheTogbm9uZTsgfVxuXG4gICAgICAgICR7dGhpcy5zdHlsZSh0aGlzLnByb3BzKX1cbiAgICAgIDwvc3R5bGU+XG4gICAgYDtcblxuICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZSh0aGlzLnByb3BzKTtcblxuICAgIHRoaXMucm9vdC5pbm5lckhUTUwgPSBgJHtzdHlsZXN9JHt0ZW1wbGF0ZX1gO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNwaW5uZXJFbGVtZW50O1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEF0b21TcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2F0b20tc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5hdG9tLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWF0b20tc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lkdGg6IHZhcigtLWF0b20tc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1pbm5lciB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5hdG9tLXNwaW5uZXIgLnNwaW5uZXItY2lyY2xlIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWF0b20tc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYyh2YXIoLS1hdG9tLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjI0KTtcbiAgICAgICAgbGVmdDogNTAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1saW5lIHtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IGNhbGModmFyKC0tYXRvbS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMjUpIHNvbGlkIHZhcigtLWF0b20tc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXItdG9wOiBjYWxjKHZhcigtLWF0b20tc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDI1KSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWxpbmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBhdG9tLXNwaW5uZXItYW5pbWF0aW9uLTEgdmFyKC0tYXRvbS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigxMjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMGRlZyk7XG4gICAgICB9XG5cbiAgICAgIC5hdG9tLXNwaW5uZXIgLnNwaW5uZXItbGluZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb246IGF0b20tc3Bpbm5lci1hbmltYXRpb24tMiB2YXIoLS1hdG9tLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVaKDI0MGRlZykgcm90YXRlWCg2NmRlZykgcm90YXRlWigwZGVnKTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1saW5lOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbjogYXRvbS1zcGlubmVyLWFuaW1hdGlvbi0zIHZhcigtLWF0b20tc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMzYwZGVnKSByb3RhdGVYKDY2ZGVnKSByb3RhdGVaKDBkZWcpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGF0b20tc3Bpbm5lci1hbmltYXRpb24tMSB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigxMjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGF0b20tc3Bpbm5lci1hbmltYXRpb24tMiB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigyNDBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGF0b20tc3Bpbm5lci1hbmltYXRpb24tMyB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigzNjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImF0b20tc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1pbm5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWxpbmVcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1saW5lXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItbGluZVwiPjwvZGl2PlxuXG4gICAgICAgICAgPCEtLUNocm9tZSByZW5kZXJzIGxpdHRsZSBjaXJjbGVzIG1hbGZvcm1lZCA6KC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWNpcmNsZVwiPiYjOTY3OTs8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShBdG9tU3Bpbm5lci5pcywgQXRvbVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEJyZWVkaW5nUmhvbWJ1c1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMixcbiAgICAgIHNpemU6IDY1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciwgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAqIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cyB7XG4gICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKTtcbiAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcuNSk7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMi4zMDc3KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMi4zMDc3KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gNy41KTtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1czpudGgtY2hpbGQoMm4rMCkge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtMSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDEpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0xO1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTIge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiAyKTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMjtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC0zIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogMyk7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTM7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtNCB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDQpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC00O1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTUge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiA1KTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNTtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC02IHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogNik7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTY7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtNyB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDcpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC03O1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTgge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiA4KTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtODtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5iaWcge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDAuNXM7XG4gICAgICAgIGFuaW1hdGlvbjogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC1iaWcgdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMyk7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMyk7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyAzKTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMyk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0xIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMzI1JSwgLTMyNSUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0yIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMzI1JSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTMge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDMyNSUsIC0zMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNCB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMzI1JSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTUge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDMyNSUsIDMyNSUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC02IHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAzMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNyB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMyNSUsIDMyNSUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC04IHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMzI1JSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLWJpZyB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTFcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtMlwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC0zXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtNVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC02XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtOFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBiaWdcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEJyZWVkaW5nUmhvbWJ1c1NwaW5uZXIuaXMsIEJyZWVkaW5nUmhvbWJ1c1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIENpcmNsZXNUb1Job21idXNlc1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgY291bnQ6IDMsXG4gICAgICBkdXJhdGlvbjogMS4yLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2NvdW50JyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGNvdW50LCBkdXJhdGlvbiwgc2l6ZSB9KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgb2JqZWN0LWN1cmx5LW5ld2xpbmVcbiAgICBjb25zdCBjaXJjbGVTdHlsZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAyOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGNpcmNsZVN0eWxlcy5wdXNoKGBcbiAgICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoJHtpfSkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDggKiAke2l9KTtcbiAgICAgICAgfVxuICAgICAgYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyLCAuY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lciAqIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cblxuICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyXG4gICAgICAgIHdpZHRoOiBjYWxjKCh2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICsgdmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDEuMTI1KSAqICR7Y291bnR9KTtcbiAgICAgIH1cblxuICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGFuaW1hdGlvbjogY2lyY2xlcy10by1yaG9tYnVzZXMtYW5pbWF0aW9uIHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgICAgICAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBtYXJnaW4tbGVmdDogY2FsYyh2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMS4xMjUpO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDggKiAxKTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICB9XG5cbiAgICAgICR7Y2lyY2xlU3R5bGVzLmpvaW4oJycpfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNpcmNsZXMtdG8tcmhvbWJ1c2VzLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIH1cbiAgICAgICAgMTcuNSUge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgICAgICAgfVxuICAgICAgICA1MCUge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgOTMuNSUge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBjaXJjbGVzLXRvLXJob21idXNlcy1iYWNrZ3JvdW5kLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMC40O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY291bnQgfSkge1xuICAgIGNvbnN0IGNpcmNsZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAyOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGNpcmNsZXMucHVzaCgnPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PicpO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgICR7Y2lyY2xlcy5qb2luKCcnKX1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKENpcmNsZXNUb1Job21idXNlc1NwaW5uZXIuaXMsIENpcmNsZXNUb1Job21idXNlc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEZpbmdlcnByaW50U3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdmaW5nZXJwcmludC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMS41LFxuICAgICAgc2l6ZTogNjQsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgcGFkZGluZzogMnB4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nIHtcbiAgICAgICAgYW5pbWF0aW9uOiBmaW5nZXJwcmludC1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBjdWJpYy1iZXppZXIoMC42ODAsIC0wLjc1MCwgMC4yNjUsIDEuNzUwKSBpbmZpbml0ZSBmb3J3YXJkcztcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItd2lkdGg6IDJweDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDEpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyAwICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDAgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICB9XG5cbiAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIC5zcGlubmVyLXJpbmc6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDUwbXMgKiAyKTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgMSAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyAxICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogMyk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDIgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgMiAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoNCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDQpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyAzICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDMgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICB9XG5cbiAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIC5zcGlubmVyLXJpbmc6bnRoLWNoaWxkKDUpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDUwbXMgKiA1KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgNCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyA0ICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg2KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogNik7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDUgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgNSAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoNykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDcpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyA2ICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDYgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICB9XG5cbiAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIC5zcGlubmVyLXJpbmc6bnRoLWNoaWxkKDgpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDUwbXMgKiA4KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgNyAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyA3ICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg5KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogOSk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDggKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgOCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmaW5nZXJwcmludC1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKCAzNjBkZWcgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImZpbmdlcnByaW50LXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEZpbmdlcnByaW50U3Bpbm5lci5pcywgRmluZ2VycHJpbnRTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBGbG93ZXJTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Zsb3dlci1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMi41LFxuICAgICAgc2l6ZTogNzAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuZmxvd2VyLXNwaW5uZXIge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWZsb3dlci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgd2lkdGg6IHZhcigtLWZsb3dlci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuZmxvd2VyLXNwaW5uZXIgLmRvdHMtY29udGFpbmVyIHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZsb3dlci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZsb3dlci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICB9XG5cbiAgICAgIC5mbG93ZXItc3Bpbm5lciAuc21hbGxlci1kb3Qge1xuICAgICAgICBhbmltYXRpb246IGZsb3dlci1zcGlubmVyLXNtYWxsZXItZG90LWFuaW1hdGlvbiB2YXIoLS1mbG93ZXItc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgMHMgaW5maW5pdGUgYm90aDtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAuZmxvd2VyLXNwaW5uZXIgLmJpZ2dlci1kb3Qge1xuICAgICAgICBhbmltYXRpb246IGZsb3dlci1zcGlubmVyLWJpZ2dlci1kb3QtYW5pbWF0aW9uIHZhcigtLWZsb3dlci1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAwcyBpbmZpbml0ZSBib3RoO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcGFkZGluZzogMTAlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmbG93ZXItc3Bpbm5lci1iaWdnZXItZG90LWFuaW1hdGlvbiB7XG4gICAgICAgIDAlLCAxMDAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDI1JSwgNzUlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDI2cHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIC0yNnB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMjZweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggLTI2cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMTlweCAtMTlweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAxOXB4IDE5cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgLTE5cHggLTE5cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgLTE5cHggMTlweCAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgICBib3gtc2hhZG93OiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEBrZXlmcmFtZXMgZmxvd2VyLXNwaW5uZXItc21hbGxlci1kb3QtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUsIDEwMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweDtcbiAgICAgICAgfVxuICAgICAgICAyNSUsIDc1JSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAxNHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAtMTRweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDE0cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IC0xNHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDEwcHggLTEwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMTBweCAxMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIC0xMHB4IC0xMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIC0xMHB4IDEwcHggMHB4O1xuICAgICAgICB9XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImZsb3dlci1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RzLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJiaWdnZXItZG90XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic21hbGxlci1kb3RcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShGbG93ZXJTcGlubmVyLmlzLCBGbG93ZXJTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBGdWxmaWxsaW5nQm91bmNpbmdDaXJjbGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Z1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiA0LFxuICAgICAgc2l6ZTogNTAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24gaW5maW5pdGUgdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgZWFzZTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lciAub3JiaXQge1xuICAgICAgICBhbmltYXRpb246IGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItb3JiaXQtYW5pbWF0aW9uIGluZmluaXRlIHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGVhc2U7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjAzKSBzb2xpZCB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1jaXJjbGUtYW5pbWF0aW9uIGluZmluaXRlIHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGVhc2U7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEpIHNvbGlkIHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpIHNjYWxlKDEpO1xuICAgICAgICB3aWR0aDogdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1vcmJpdC1hbmltYXRpb24ge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cbiAgICAgICAgNjIuNSUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC44KTtcbiAgICAgICAgfVxuICAgICAgICA3NSUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cbiAgICAgICAgODcuNSUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC44KTtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1jaXJjbGUtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIDE2LjclIHtcbiAgICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiBpbml0aWFsO1xuICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6IGluaXRpYWw7XG4gICAgICAgIH1cblxuICAgICAgICAzMy40JSB7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIH1cblxuICAgICAgICA1MCUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgNjIuNSUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XG4gICAgICAgIH1cblxuICAgICAgICA3NSUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cblxuICAgICAgICA4Ny41JSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcbiAgICAgICAgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvcmJpdFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRnVsZmlsbGluZ0JvdW5jaW5nQ2lyY2xlU3Bpbm5lci5pcywgRnVsZmlsbGluZ0JvdW5jaW5nQ2lyY2xlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgRnVsZmlsbGluZ1NxdWFyZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDQsXG4gICAgICBzaXplOiA1MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBib3JkZXI6IDRweCBzb2xpZCB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBhbmltYXRpb246IGZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXItYW5pbWF0aW9uIHZhcigtLWZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlIGVhc2U7XG4gICAgICB9XG5cbiAgICAgIC5mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyIC5zcGlubmVyLWlubmVyIHtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgYW5pbWF0aW9uOiBmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLWlubmVyLWFuaW1hdGlvbiB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZSBlYXNlLWluO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIDI1JSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDc1JSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1pbm5lci1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgaGVpZ2h0OiAwJTsgfVxuICAgICAgICAyNSUgIHsgaGVpZ2h0OiAwJTsgfVxuICAgICAgICA1MCUgIHsgaGVpZ2h0OiAxMDAlOyB9XG4gICAgICAgIDc1JSAgeyBoZWlnaHQ6IDEwMCU7IH1cbiAgICAgICAgMTAwJSB7IGhlaWdodDogMCU7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWlubmVyXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShGdWxmaWxsaW5nU3F1YXJlU3Bpbm5lci5pcywgRnVsZmlsbGluZ1NxdWFyZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEhhbGZDaXJjbGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2hhbGYtY2lyY2xlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuaGFsZi1jaXJjbGUtc3Bpbm5lciB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogdmFyKC0taGFsZi1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogdmFyKC0taGFsZi1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmhhbGYtY2lyY2xlLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGJvcmRlcjogY2FsYyh2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMTApIHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5oYWxmLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUuY2lyY2xlLTEge1xuICAgICAgICBhbmltYXRpb246IGhhbGYtY2lyY2xlLXNwaW5uZXItYW5pbWF0aW9uIHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgfVxuXG4gICAgICAuaGFsZi1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlLmNpcmNsZS0yIHtcbiAgICAgICAgYW5pbWF0aW9uOiBoYWxmLWNpcmNsZS1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZSBhbHRlcm5hdGU7XG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgaGFsZi1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJoYWxmLWNpcmNsZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgY2lyY2xlLTFcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZSBjaXJjbGUtMlwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoSGFsZkNpcmNsZVNwaW5uZXIuaXMsIEhhbGZDaXJjbGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBIb2xsb3dEb3RzU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdob2xsb3ctZG90cy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBjb3VudDogMyxcbiAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2NvdW50JyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBjb3VudCwgc2l6ZSB9KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgb2JqZWN0LWN1cmx5LW5ld2xpbmVcbiAgICBjb25zdCBkb3RTdHlsZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGRvdFN0eWxlcy5wdXNoKGBcbiAgICAgICAgLmhvbGxvdy1kb3RzLXNwaW5uZXIgLmRvdDpudGgtY2hpbGQoJHtpfSkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvICR7Y291bnR9ICogJHtpfSk7XG4gICAgICAgIH1cbiAgICAgIGApO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICAqIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cblxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cblxuICAgICAgLmhvbGxvdy1kb3RzLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyICogJHtjb3VudH0pO1xuICAgICAgfVxuXG4gICAgICAuaG9sbG93LWRvdHMtc3Bpbm5lciAuZG90IHtcbiAgICAgICAgYW5pbWF0aW9uOiBob2xsb3ctZG90cy1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBlYXNlIGluZmluaXRlIDBtcztcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXI6IGNhbGModmFyKC0taG9sbG93LWRvdHMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDUpIHNvbGlkIHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIG1hcmdpbjogMCBjYWxjKHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyAyKTtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgICR7ZG90U3R5bGVzLmpvaW4oJycpfVxuXG4gICAgICBAa2V5ZnJhbWVzIGhvbGxvdy1kb3RzLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIH1cblxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY291bnQgfSkge1xuICAgIGNvbnN0IGRvdHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGRvdHMucHVzaCgnPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PicpO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiaG9sbG93LWRvdHMtc3Bpbm5lclwiPlxuICAgICAgICAke2RvdHMuam9pbignJyl9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShIb2xsb3dEb3RzU3Bpbm5lci5pcywgSG9sbG93RG90c1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEludGVyc2VjdGluZ0NpcmNsZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2ludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLjIsXG4gICAgICBzaXplOiAzNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDIpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuc3Bpbm5lckJsb2NrIHtcbiAgICAgICAgYW5pbWF0aW9uOiBpbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGhlaWdodDogdmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0b3A6IDA7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogLTAuMzYpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMik7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogLTAuMzYpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIC0wLjIpO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogLTAuMzYpO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMzYpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIC0wLjIpO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCg2KSB7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMzYpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMik7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDcpIHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjM2KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBpbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIGZyb20geyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgICB0byAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXJCbG9ja1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEludGVyc2VjdGluZ0NpcmNsZXNTcGlubmVyLmlzLCBJbnRlcnNlY3RpbmdDaXJjbGVzU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgTG9vcGluZ1Job21idXNlc1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIuNSxcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDQpO1xuICAgICAgfVxuXG4gICAgICAubG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lciAucmhvbWJ1cyB7XG4gICAgICAgIGFuaW1hdGlvbjogbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lci1hbmltYXRpb24gdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIGhlaWdodDogdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogNCk7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSByb3RhdGUoNDVkZWcpIHNjYWxlKDApO1xuICAgICAgICB3aWR0aDogdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIgLnJob21idXM6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMSAvIC0xLjUpO1xuICAgICAgfVxuXG4gICAgICAubG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lciAucmhvbWJ1czpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAyIC8gLTEuNSk7XG4gICAgICB9XG5cbiAgICAgIC5sb29waW5nLXJob21idXNlcy1zcGlubmVyIC5yaG9tYnVzOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAqIDMgLyAtMS41KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBsb29waW5nLXJob21idXNlcy1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCkgICAgIHJvdGF0ZSg0NWRlZykgc2NhbGUoMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjMzJSkgcm90YXRlKDQ1ZGVnKSBzY2FsZSgxKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC00NjYlKSByb3RhdGUoNDVkZWcpIHNjYWxlKDApOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTG9vcGluZ1Job21idXNlc1NwaW5uZXIuaXMsIExvb3BpbmdSaG9tYnVzZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBPcmJpdFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnb3JiaXQtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuMixcbiAgICAgIHNpemU6IDU1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLm9yYml0LXNwaW5uZXIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogdmFyKC0tb3JiaXQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcGVyc3BlY3RpdmU6IDgwMHB4O1xuICAgICAgICB3aWR0aDogdmFyKC0tb3JiaXQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLm9yYml0LXNwaW5uZXIgLm9yYml0IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5vcmJpdC1zcGlubmVyIC5vcmJpdDpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb246IG9yYml0LXNwaW5uZXItb3JiaXQtb25lLWFuaW1hdGlvbiB2YXIoLS1vcmJpdC1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCB2YXIoLS1vcmJpdC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBsZWZ0OiAwJTtcbiAgICAgICAgdG9wOiAwJTtcbiAgICAgIH1cblxuICAgICAgLm9yYml0LXNwaW5uZXIgLm9yYml0Om50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbjogb3JiaXQtc3Bpbm5lci1vcmJpdC10d28tYW5pbWF0aW9uIHZhcigtLW9yYml0LXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAzcHggc29saWQgdmFyKC0tb3JiaXQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgcmlnaHQ6IDAlO1xuICAgICAgICB0b3A6IDAlO1xuICAgICAgfVxuXG4gICAgICAub3JiaXQtc3Bpbm5lciAub3JiaXQ6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBvcmJpdC1zcGlubmVyLW9yYml0LXRocmVlLWFuaW1hdGlvbiB2YXIoLS1vcmJpdC1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci10b3A6IDNweCBzb2xpZCB2YXIoLS1vcmJpdC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3R0b206IDAlO1xuICAgICAgICByaWdodDogMCU7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgb3JiaXQtc3Bpbm5lci1vcmJpdC1vbmUtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWCgzNWRlZykgcm90YXRlWSgtNDVkZWcpIHJvdGF0ZVooMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWCgzNWRlZykgcm90YXRlWSgtNDVkZWcpIHJvdGF0ZVooMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG9yYml0LXNwaW5uZXItb3JiaXQtdHdvLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoNTBkZWcpIHJvdGF0ZVkoMTBkZWcpIHJvdGF0ZVooMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWCg1MGRlZykgcm90YXRlWSgxMGRlZykgcm90YXRlWigzNjBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgb3JiaXQtc3Bpbm5lci1vcmJpdC10aHJlZS1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDM1ZGVnKSByb3RhdGVZKDU1ZGVnKSByb3RhdGVaKDBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMzVkZWcpIHJvdGF0ZVkoNTVkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cIm9yYml0LXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9yYml0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvcmJpdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3JiaXRcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE9yYml0U3Bpbm5lci5pcywgT3JiaXRTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBQaXhlbFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncGl4ZWwtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA3MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5waXhlbC1zcGlubmVyIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1waXhlbC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgd2lkdGg6IHZhcigtLXBpeGVsLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5waXhlbC1zcGlubmVyIC5waXhlbC1zcGlubmVyLWlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uOiBwaXhlbC1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1waXhlbC1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBpeGVsLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJveC1zaGFkb3c6IDE1cHggMTVweCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAtMTVweCAtMTVweCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAxNXB4IC0xNXB4ICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIC0xNXB4IDE1cHggIDAgMCxcbiAgICAgICAgICAgICAgICAgICAgMCAxNXB4ICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIDE1cHggMCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAtMTVweCAwICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIDAgLTE1cHggMCAwO1xuICAgICAgICBjb2xvcjogdmFyKC0tcGl4ZWwtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXBpeGVsLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA3KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tcGl4ZWwtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHBpeGVsLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAyMHB4IDIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAtMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDIwcHggLTIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgMHB4IDEwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAxMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIC0xMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDBweCAtMTBweCAwcHggMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAyMHB4IDIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAtMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDIwcHggLTIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgMHB4IDEwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAxMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIC0xMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDBweCAtMTBweCAwcHggMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInBpeGVsLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpeGVsLXNwaW5uZXItaW5uZXJcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFBpeGVsU3Bpbm5lci5pcywgUGl4ZWxTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBSYWRhclNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncmFkYXItc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5yYWRhci1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1yYWRhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1yYWRhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlIHtcbiAgICAgICAgYW5pbWF0aW9uOiByYWRhci1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1yYWRhci1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gNi42Nyk7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMCAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gNi42Nyk7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMSAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gNi42Nyk7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMiAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwbXM7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMyAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGUtaW5uZXIsIC5yYWRhci1zcGlubmVyIC5jaXJjbGUtaW5uZXItY29udGFpbmVyIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXI6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgLyAxMTApIHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlLWlubmVyIHtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHZhcigtLXJhZGFyLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogdmFyKC0tcmFkYXItc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyByYWRhci1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInJhZGFyLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lclwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUmFkYXJTcGlubmVyLmlzLCBSYWRhclNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNjYWxpbmdTcXVhcmVzU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuMjUsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGFuaW1hdGlvbjogc2NhbGluZy1zcXVhcmVzLWFuaW1hdGlvbiB2YXIoLS1zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGhlaWdodDogdmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlIHtcbiAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cyk7XG4gICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgICBib3JkZXI6IGNhbGModmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjA0IC8gMS4zKSBzb2xpZCB2YXIoLS1zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yNSAvIDEuMyk7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjI1IC8gMS4zKTtcbiAgICAgIH1cblxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0xO1xuICAgICAgfVxuXG4gICAgICAuc2NhbGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICB9XG5cbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMztcbiAgICAgIH1cblxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC00O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNjYWxpbmctc3F1YXJlcy1hbmltYXRpb24ge1xuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTEge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMyB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLC0xNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTQge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNTAlLC0xNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2NhbGluZy1zcXVhcmVzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2NhbGluZ1NxdWFyZXNTcGlubmVyLmlzLCBTY2FsaW5nU3F1YXJlc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNlbGZCdWlsZGluZ1NxdWFyZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDYsXG4gICAgICBzaXplOiAxMCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiA0KTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyIC8gMyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiA0KTtcbiAgICAgIH1cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmUge1xuICAgICAgICBhbmltYXRpb246IHNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgdmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIG1hcmdpbi1yaWdodDogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMyk7XG4gICAgICAgIG1hcmdpbi10b3A6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDMpO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAtMiAvIDMpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDYpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogNyk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiA4KTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoNCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDMpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogNCk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDYpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiA1KTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoNykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDApO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg4KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogMSk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDkpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiAyKTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLmNsZWFyIHtcbiAgICAgICAgY2xlYXI6IGJvdGg7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgNSUge1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgNTAuOSUge1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgNTUuOSUge1xuICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgdG9wOiBpbmhlcml0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlIGNsZWFyXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlIGNsZWFyXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2VsZkJ1aWxkaW5nU3F1YXJlU3Bpbm5lci5pcywgU2VsZkJ1aWxkaW5nU3F1YXJlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgU2VtaXBvbGFyU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzZW1pcG9sYXItc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuc2VtaXBvbGFyLXNwaW5uZXIgLnJpbmcge1xuICAgICAgICBhbmltYXRpb246IHNlbWlwb2xhci1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMDUpO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMC4xICogNCk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yICogMCk7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEgKiAwKTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4xICogMCk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAwKTtcbiAgICAgICAgei1pbmRleDogNTtcbiAgICAgIH1cblxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAwLjEgKiAzKTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAxKTtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDEpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEgKiAxKTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDEpO1xuICAgICAgICB6LWluZGV4OiA0O1xuICAgICAgfVxuXG4gICAgICAuc2VtaXBvbGFyLXNwaW5uZXIgLnJpbmc6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAqIDAuMSAqIDIpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDIpO1xuICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4xICogMik7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDIpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yICogMik7XG4gICAgICAgIHotaW5kZXg6IDM7XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoNCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMC4xICogMSk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yICogMyk7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEgKiAzKTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4xICogMyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAzKTtcbiAgICAgICAgei1pbmRleDogMjtcbiAgICAgIH1cblxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAwLjEgKiAwKTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjIgKiA0KTtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDQpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEgKiA0KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDQpO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNlbWlwb2xhci1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZykgc2NhbGUoMC43KTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInNlbWlwb2xhci1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTZW1pcG9sYXJTcGlubmVyLmlzLCBTZW1pcG9sYXJTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTcHJpbmdTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3NwcmluZy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMyxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnNwcmluZy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1zcHJpbmctc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgd2lkdGg6IHZhcigtLXNwcmluZy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuc3ByaW5nLXNwaW5uZXIgLnNwcmluZy1zcGlubmVyLXBhcnQge1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tc3ByaW5nLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyAyKTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lkdGg6IHZhcigtLXNwcmluZy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuc3ByaW5nLXNwaW5uZXIgIC5zcHJpbmctc3Bpbm5lci1wYXJ0LmJvdHRvbSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKSBzY2FsZSgtMSwgMSk7XG4gICAgICB9XG5cbiAgICAgIC5zcHJpbmctc3Bpbm5lciAuc3ByaW5nLXNwaW5uZXItcm90YXRvciB7XG4gICAgICAgIGFuaW1hdGlvbjogc3ByaW5nLXNwaW5uZXItYW5pbWF0aW9uIHZhcigtLXNwcmluZy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBlYXNlLWluLW91dCBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHZhcigtLXNwcmluZy1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1zcHJpbmctc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKHZhcigtLXNwcmluZy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICAgIGhlaWdodDogdmFyKC0tc3ByaW5nLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0yMDBkZWcpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc3ByaW5nLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc3ByaW5nLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zcHJpbmctc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgICB9XG5cbiAgICAgICAgMjUlIHtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IGNhbGModmFyKC0tc3ByaW5nLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyAyMy4zMyk7XG4gICAgICAgIH1cblxuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDExNWRlZyk7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKHZhcigtLXNwcmluZy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICAgIH1cblxuICAgICAgICA3NSUge1xuICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zcHJpbmctc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDIzLjMzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zcHJpbmctc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic3ByaW5nLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXBhcnQgdG9wXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXJvdGF0b3JcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXBhcnQgYm90dG9tXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXJvdGF0b3JcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTcHJpbmdTcGlubmVyLmlzLCBTcHJpbmdTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTd2FwcGluZ1NxdWFyZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3N3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLnN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlIHtcbiAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpO1xuICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMDQgLyAxLjMpIHNvbGlkIHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMjUgLyAxLjMpO1xuICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMjUgLyAxLjMpO1xuICAgICAgfVxuXG4gICAgICAuc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyKTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTE7XG4gICAgICB9XG5cbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDBtcztcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICB9XG5cbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtMztcbiAgICAgIH1cblxuICAgICAgLnN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogMG1zO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtNDtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0xIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTUwJSwxNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0zIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MCUsLTE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC00IHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTUwJSwtMTUwJSkgc2NhbGUoMiwyKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lclwiIDpzdHlsZT1cInNwaW5uZXJTdHlsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTd2FwcGluZ1NxdWFyZXNTcGlubmVyLmlzLCBTd2FwcGluZ1NxdWFyZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBUcmluaXR5UmluZ3NTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3RyaW5pdHktcmluZ3Mtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuNSxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnRyaW5pdHktcmluZ3Mtc3Bpbm5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHBhZGRpbmc6IDNweDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgIH1cblxuICAgICAgLnRyaW5pdHktcmluZ3Mtc3Bpbm5lciAuY2lyY2xlIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB9XG5cbiAgICAgIC50cmluaXR5LXJpbmdzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb246IHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUxLWFuaW1hdGlvbiB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAzcHg7XG4gICAgICAgIGhlaWdodDogdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAudHJpbml0eS1yaW5ncy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uOiB0cmluaXR5LXJpbmdzLXNwaW5uZXItY2lyY2xlMi1hbmltYXRpb24gdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJvcmRlci13aWR0aDogMnB4O1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC42NSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXRyaW5pdHktcmluZ3Mtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuNjUpO1xuICAgICAgfVxuXG4gICAgICAudHJpbml0eS1yaW5ncy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uOnRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUzLWFuaW1hdGlvbiB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUxLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigyMGRlZykgIHJvdGF0ZVkoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpIHJvdGF0ZVkoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUyLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpIHJvdGF0ZVgoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWigwZGVnKSAgIHJvdGF0ZVgoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUzLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpICByb3RhdGVYKC0zNjBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVooLTM2MGRlZykgcm90YXRlWCgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwidHJpbml0eS1yaW5ncy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShUcmluaXR5UmluZ3NTcGlubmVyLmlzLCBUcmluaXR5UmluZ3NTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCYXJTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Jhci1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBoZWlnaHQ6IDQsXG4gICAgICB3aWR0aDogMTAwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3dpZHRoJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgY29uc3QgeyBjb2xvciwgaGVpZ2h0LCB3aWR0aCB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBgXG4gICAgICAuYmFyLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWJhci1zcGlubmVyX19oZWlnaHQsICR7aGVpZ2h0fXB4KTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogdmFyKC0tYmFyLXNwaW5uZXJfX3dpZHRoLCAke3dpZHRofXB4KTtcbiAgICAgIH1cblxuICAgICAgLmJhY2tncm91bmQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYXItc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1iYXItc3Bpbm5lcl9faGVpZ2h0LCAke2hlaWdodH1weCk7XG4gICAgICAgIG9wYWNpdHk6IDAuMjtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogdmFyKC0tYmFyLXNwaW5uZXJfX3dpZHRoLCAke3dpZHRofXB4KTtcbiAgICAgIH1cblxuICAgICAgLmxvbmcge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBsb25nIDIuMXMgY3ViaWMtYmV6aWVyKDAuNjUsIDAuODE1LCAwLjczNSwgMC4zOTUpIGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYXItc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWJhci1zcGlubmVyX19oZWlnaHQsICR7aGVpZ2h0fXB4KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWxsLWNoYW5nZTogbGVmdCwgcmlnaHQ7XG4gICAgICB9XG5cbiAgICAgIC5zaG9ydCB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb246IHNob3J0IDIuMXMgMS4xNXMgY3ViaWMtYmV6aWVyKDAuMTY1LCAwLjg0LCAwLjQ0LCAxKSBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFyLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1iYXItc3Bpbm5lcl9faGVpZ2h0LCAke2hlaWdodH1weCk7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lsbC1jaGFuZ2U6IGxlZnQsIHJpZ2h0O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGxvbmcge1xuICAgICAgICAwJSAgIHsgbGVmdDogLTM1JTsgcmlnaHQ6IDEwMCUgfVxuICAgICAgICA2MCUgIHsgbGVmdDogMTAwJTsgcmlnaHQ6IC05MCUgfVxuICAgICAgICAxMDAlIHsgbGVmdDogMTAwJTsgcmlnaHQ6IC05MCUgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNob3J0IHtcbiAgICAgICAgMCUgICB7IGxlZnQ6IC0yMDAlOyByaWdodDogMTAwJSB9XG4gICAgICAgIDYwJSAgeyBsZWZ0OiAxMDclOyByaWdodDogLTglIH1cbiAgICAgICAgMTAwJSB7IGxlZnQ6IDEwNyU7IHJpZ2h0OiAtOCUgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImJhci1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsb25nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzaG9ydFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQmFyU3Bpbm5lci5pcywgQmFyU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgQmVhdFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnYmVhdC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBtYXJnaW46IDIsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnbWFyZ2luJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgbWFyZ2luLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmJlYXQge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IGJlYXQgMC43cyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJlYXQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWJlYXQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgbWFyZ2luOiB2YXIoLS1iZWF0LXNwaW5uZXJfX21hcmdpbiwgJHttYXJnaW59cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tYmVhdC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuYmVhdDpudGgtY2hpbGQob2RkKSAgeyBhbmltYXRpb24tZGVsYXk6IDBzOyB9XG4gICAgICAuYmVhdDpudGgtY2hpbGQoZXZlbikgeyBhbmltYXRpb24tZGVsYXk6IDAuMzVzOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYmVhdCB7XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpOyBvcGFjaXR5OiAwLjIgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgICAgb3BhY2l0eTogMSB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYmVhdC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiZWF0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiZWF0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiZWF0XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShCZWF0U3Bpbm5lci5pcywgQmVhdFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEJvdW5jZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnYm91bmNlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5ib3VuY2Utc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0tYm91bmNlLWxvYWRlcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogdmFyKC0tYm91bmNlLWxvYWRlcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmJvdW5jZSB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogYm91bmNlIDIuMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJvdW5jZS1sb2FkZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogdmFyKC0tYm91bmNlLWxvYWRlcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgb3BhY2l0eTogMC42O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6IHZhcigtLWJvdW5jZS1sb2FkZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5ib3VuY2U6bnRoLWNoaWxkKDEpIHsgYW5pbWF0aW9uLWRlbGF5OiAxczsgfVxuICAgICAgLmJvdW5jZTpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tZGVsYXk6IDBzOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYm91bmNlIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogc2NhbGUoMS4wKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImJvdW5jZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3VuY2VcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJvdW5jZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQm91bmNlU3Bpbm5lci5pcywgQm91bmNlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgQ2lyY2xlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdjaXJjbGUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBjYWxjdWxhdGVDaXJjbGUoaSkge1xuICAgIGNvbnN0IHsgc2l6ZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBgXG4gICAgICBhbmltYXRpb24tZGVsYXk6ICR7aSAqIDAuMn1zO1xuICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWNpcmNsZS1sb2FkZXJfX3NpemUsICR7c2l6ZX1weCkgKiAkezEgLSBpIC8gMTB9KTtcbiAgICAgIGxlZnQ6ICR7aSAqIDAuNyAqIDIuNX0lO1xuICAgICAgdG9wOiAke2kgKiAwLjM1ICogMi41fSU7XG4gICAgICB3aWR0aDogY2FsYyh2YXIoLS1jaXJjbGUtbG9hZGVyX19zaXplLCAke3NpemV9cHgpICogJHsxIC0gaSAvIDEwfSk7XG4gICAgYDtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuY2lyY2xlLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWNpcmNsZS1sb2FkZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWNpcmNsZS1sb2FkZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5jaXJjbGUge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBcIlwiO1xuICAgICAgICBhbmltYXRpb246IGNpcmNsZSAxcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJvcmRlci10b3AtY29sb3I6IHZhcigtLWNpcmNsZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdmFyKC0tY2lyY2xlLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQgbm9uZSBub25lIHNvbGlkO1xuICAgICAgICBib3JkZXItd2lkdGg6IDFweCAxcHg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDJzIGVhc2UgMHM7XG4gICAgICB9XG5cbiAgICAgIC5jaXJjbGU6bnRoLWNoaWxkKDEpIHsgJHt0aGlzLmNhbGN1bGF0ZUNpcmNsZSgwKX0gfVxuICAgICAgLmNpcmNsZTpudGgtY2hpbGQoMikgeyAke3RoaXMuY2FsY3VsYXRlQ2lyY2xlKDEpfSB9XG4gICAgICAuY2lyY2xlOm50aC1jaGlsZCgzKSB7ICR7dGhpcy5jYWxjdWxhdGVDaXJjbGUoMil9IH1cbiAgICAgIC5jaXJjbGU6bnRoLWNoaWxkKDQpIHsgJHt0aGlzLmNhbGN1bGF0ZUNpcmNsZSgzKX0gfVxuICAgICAgLmNpcmNsZTpudGgtY2hpbGQoNSkgeyAke3RoaXMuY2FsY3VsYXRlQ2lyY2xlKDQpfSB9XG5cbiAgICAgIEBrZXlmcmFtZXMgY2lyY2xlIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDaXJjbGVTcGlubmVyLmlzLCBDaXJjbGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbi8vIFRPRE86IEltcHJvdmUgc3R5bGluZ1xuZXhwb3J0IGNsYXNzIENsaW1iaW5nQm94U3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdjbGltYmluZy1ib3gtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICBjb25zdCB7IGNvbG9yLCBzaXplIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5jbGltYmluZy1ib3gtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogNy4xZW07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IDcuMWVtO1xuICAgICAgfVxuXG4gICAgICAuYm94IHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBjbGltYmluZ0JveCAyLjVzIGluZmluaXRlIGN1YmljLWJlemllcigwLjc5LCAwLCAwLjQ3LCAwLjk3KTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE1JTtcbiAgICAgICAgYm9yZGVyOiAwLjI1ZW0gc29saWQgdmFyKC0tY2xpbWJpbmctYm94LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvdHRvbTogLTAuMWVtO1xuICAgICAgICBoZWlnaHQ6IDFlbTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMWVtKSByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgICAgd2lkdGg6IDFlbTtcbiAgICAgIH1cblxuICAgICAgLmhpbGwge1xuICAgICAgICBib3JkZXItbGVmdDogMC4yNWVtIHNvbGlkIHZhcigtLWNsaW1iaW5nLWJveC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBoZWlnaHQ6IDcuMWVtO1xuICAgICAgICBsZWZ0OiAxLjdlbTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDEuN2VtO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgIHdpZHRoOiA3LjFlbTtcbiAgICAgIH1cblxuICAgICAgLndyYXBwZXIge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIG1hcmdpbi10b3A6IC0yLjdlbTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IC0yLjdlbTtcbiAgICAgICAgd2lkdGg6IDUuNGVtO1xuICAgICAgICBoZWlnaHQ6IDUuNGVtO1xuICAgICAgICBmb250LXNpemU6IHZhcigtLWNsaW1iaW5nLWJveC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNsaW1iaW5nQm94IHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0xZW0pICAgcm90YXRlKC00NWRlZykgfVxuICAgICAgICA1JSAgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTFlbSkgICByb3RhdGUoLTUwZGVnKSB9XG4gICAgICAgIDIwJSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxZW0sIC0yZW0pIHJvdGF0ZSg0N2RlZykgfVxuICAgICAgICAyNSUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMWVtLCAtMmVtKSByb3RhdGUoNDVkZWcpIH1cbiAgICAgICAgMzAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDFlbSwgLTJlbSkgcm90YXRlKDQwZGVnKSB9XG4gICAgICAgIDQ1JSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgyZW0sIC0zZW0pIHJvdGF0ZSgxMzdkZWcpIH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDJlbSwgLTNlbSkgcm90YXRlKDEzNWRlZykgfVxuICAgICAgICA1NSUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMmVtLCAtM2VtKSByb3RhdGUoMTMwZGVnKSB9XG4gICAgICAgIDcwJSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzZW0sIC00ZW0pIHJvdGF0ZSgyMTdkZWcpIH1cbiAgICAgICAgNzUlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDNlbSwgLTRlbSkgcm90YXRlKDIyMGRlZykgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTFlbSkgICByb3RhdGUoLTIyNWRlZykgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImNsaW1iaW5nLWJveC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJveFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaWxsXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ2xpbWJpbmdCb3hTcGlubmVyLmlzLCBDbGltYmluZ0JveFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIENsaXBTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2NsaXAtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogMzUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICBjb25zdCB7IGNvbG9yLCBzaXplIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5jbGlwLXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IGNsaXAgMC43NXMgMHMgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHZhcigtLWNsaXAtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB2YXIoLS1jbGlwLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgIGJvcmRlci10b3AtY29sb3I6IHZhcigtLWNsaXAtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgICAgIGhlaWdodDogdmFyKC0tY2xpcC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tY2xpcC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNsaXAge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgICBzY2FsZSgxKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKSBzY2FsZSgwLjgpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpIHNjYWxlKDEpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2xpcC1zcGlubmVyXCI+PC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ2xpcFNwaW5uZXIuaXMsIENsaXBTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBEb3RTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2RvdC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKCkge1xuICAgIGNvbnN0IHsgY29sb3IsIHNpemUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gYFxuICAgICAgLmRvdC1zcGlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG4gICAgICAgIGFuaW1hdGlvbjogcm90YXRlIDJzIDBzIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1kb3Qtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogdmFyKC0tZG90LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5kb3Qge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBib3VuY2UgMnMgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kb3Qtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWRvdC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMik7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZG90LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyAyKTtcbiAgICAgIH1cblxuICAgICAgLmRvdDpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDBzO1xuICAgICAgICBib3R0b206IGF1dG87XG4gICAgICAgIHRvcDogMDtcbiAgICAgIH1cblxuICAgICAgLmRvdDpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0xcztcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICB0b3A6IGF1dG87XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYm91bmNlIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogc2NhbGUoMS4wKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHJvdGF0ZSB7XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZG90LXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEb3RTcGlubmVyLmlzLCBEb3RTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbi8vIFRPRE86IEZpeCBwb3NpdGlvbmluZyAobm90IGNlbnRlcmVkKVxuZXhwb3J0IGNsYXNzIEZhZGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2ZhZGUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgaGVpZ2h0OiAxNSxcbiAgICAgIG1hcmdpbjogMixcbiAgICAgIHJhZGl1czogMjAsXG4gICAgICB3aWR0aDogNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnaGVpZ2h0JyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3JhZGl1cycsXG4gICAgICAnd2lkdGgnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICBjb25zdCB7IGNvbG9yLCBoZWlnaHQsIG1hcmdpbiwgcmFkaXVzLCB3aWR0aCB9ID0gdGhpcy5wcm9wczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBvYmplY3QtY3VybHktbmV3bGluZVxuXG4gICAgY29uc3QgX3JhZGl1cyA9IGB2YXIoLS1mYWRlLXNwaW5uZXJfX3JhZGl1cywgJHtyYWRpdXN9cHgpYDtcbiAgICBjb25zdCBxdWFydGVyID0gYGNhbGMoJHtfcmFkaXVzfSAvIDIgKyAke19yYWRpdXN9IC8gNS41KWA7XG5cbiAgICByZXR1cm4gYFxuICAgICAgLmZhZGUtc3Bpbm5lciB7XG4gICAgICAgIGZvbnQtc2l6ZTogMDtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7X3JhZGl1c30gKiAzKTtcbiAgICAgICAgbGVmdDogJHtfcmFkaXVzfTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6ICR7X3JhZGl1c307XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7X3JhZGl1c30gKiAzKTtcbiAgICAgIH1cblxuICAgICAgLmxpbmUge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IGZhZGUgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZmFkZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAke19yYWRpdXN9O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWZhZGUtc3Bpbm5lcl9faGVpZ2h0LCAke2hlaWdodH1weCk7XG4gICAgICAgIG1hcmdpbjogdmFyKC0tZmFkZS1zcGlubmVyX19tYXJnaW4sICR7bWFyZ2lufXB4KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0cmFuc2l0aW9uOiAycztcbiAgICAgICAgd2lkdGg6IHZhcigtLWZhZGUtc3Bpbm5lcl9fd2lkdGgsICR7d2lkdGh9cHgpO1xuICAgICAgfVxuXG4gICAgICAubGluZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDBzO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0b3A6ICR7X3JhZGl1c307XG4gICAgICB9XG5cbiAgICAgIC5saW5lOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyguMTJzICogMSk7XG4gICAgICAgIGxlZnQ6ICR7cXVhcnRlcn07XG4gICAgICAgIHRvcDogJHtxdWFydGVyfTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgIH1cblxuICAgICAgLmxpbmU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKC4xMnMgKiAyKTtcbiAgICAgICAgbGVmdDogJHtfcmFkaXVzfTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XG4gICAgICB9XG5cbiAgICAgIC5saW5lOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyguMTJzICogMyk7XG4gICAgICAgIGxlZnQ6ICR7cXVhcnRlcn07XG4gICAgICAgIHRvcDogY2FsYygke3F1YXJ0ZXJ9ICogLTEpO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICB9XG5cbiAgICAgIC5saW5lOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyguMTJzICogNCk7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogY2FsYygke19yYWRpdXN9ICogLTEpO1xuICAgICAgfVxuXG4gICAgICAubGluZTpudGgtY2hpbGQoNikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoLjEycyAqIDUpO1xuICAgICAgICBsZWZ0OiBjYWxjKCR7cXVhcnRlcn0gKiAtMSk7XG4gICAgICAgIHRvcDogY2FsYygke3F1YXJ0ZXJ9ICogLTEpO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICAgICAgfVxuXG4gICAgICAubGluZTpudGgtY2hpbGQoNykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoLjEycyAqIDYpO1xuICAgICAgICBsZWZ0OiBjYWxjKCR7X3JhZGl1c30gKiAtMSk7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xuICAgICAgfVxuXG4gICAgICAubGluZTpudGgtY2hpbGQoOCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoLjEycyAqIDcpO1xuICAgICAgICBsZWZ0OiBjYWxjKCR7cXVhcnRlcn0gKiAtMSk7XG4gICAgICAgIHRvcDogJHtxdWFydGVyfTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZhZGUge1xuICAgICAgICA1MCUgIHsgb3BhY2l0eTogMC4zOyB9XG4gICAgICAgIDEwMCUgeyBvcGFjaXR5OiAxOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZmFkZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShGYWRlU3Bpbm5lci5pcywgRmFkZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEdyaWRTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2dyaWQtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgbWFyZ2luOiAyLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ21hcmdpbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpIHtcbiAgICBjb25zdCByYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogJHtyYW5kb20gKyAwLjZ9cztcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogJHtyYW5kb20gLSAwLjJ9cztcbiAgICBgO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgY29uc3QgeyBjb2xvciwgbWFyZ2luLCBzaXplIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5ncmlkLXNwaW5uZXIge1xuICAgICAgICBmb250LXNpemU6IDA7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWdyaWQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDMgKyB2YXIoLS1ncmlkLXNwaW5uZXJfX21hcmdpbiwgJHttYXJnaW59cHgpICogNik7XG4gICAgICB9XG5cbiAgICAgIC5jZWxsIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBncmlkIGluZmluaXRlIGVhc2U7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWdyaWQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgbWFyZ2luOiB2YXIoLS1ncmlkLXNwaW5uZXJfX21hcmdpbiwgJHttYXJnaW59cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tZ3JpZC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuY2VsbDpudGgtY2hpbGQoMSkgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cbiAgICAgIC5jZWxsOm50aC1jaGlsZCgyKSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDMpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG4gICAgICAuY2VsbDpudGgtY2hpbGQoNCkgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cbiAgICAgIC5jZWxsOm50aC1jaGlsZCg1KSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDYpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG4gICAgICAuY2VsbDpudGgtY2hpbGQoNykgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cbiAgICAgIC5jZWxsOm50aC1jaGlsZCg4KSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDkpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZ3JpZCB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7IG9wYWNpdHk6IDAuNzsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgb3BhY2l0eTogMTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImdyaWQtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VsbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoR3JpZFNwaW5uZXIuaXMsIEdyaWRTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBIYXNoU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdoYXNoLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDUwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgY29uc3QgeyBjb2xvciwgc2l6ZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IF9jb2xvciA9IGB2YXIoLS1oYXNoLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSlgO1xuICAgIGNvbnN0IF9zaXplID0gYHZhcigtLWhhc2gtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KWA7XG5cbiAgICBjb25zdCBfdGhpY2tuZXNzID0gYGNhbGMoJHtfc2l6ZX0gLyA1KWA7XG5cbiAgICBjb25zdCBfbGF0ID0gYGNhbGMoY2FsYygke19zaXplfSAtICR7X3RoaWNrbmVzc30pIC8gMilgO1xuXG4gICAgY29uc3QgX29mZnNldCA9IGBjYWxjKCR7X2xhdH0gLSAke190aGlja25lc3N9KWA7XG5cbiAgICByZXR1cm4gYFxuICAgICAgLmhhc2gtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHtfc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTY1ZGVnKTtcbiAgICAgICAgd2lkdGg6ICR7X3NpemV9O1xuICAgICAgfVxuXG4gICAgICAuaGFzaCB7XG4gICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMnM7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IG5vbmU7XG4gICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiBjYWxjKCR7X3NpemV9IC8gMTApO1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7X3NpemV9IC8gNSk7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgb3BhY2l0eTogLjk7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgICB3aWR0aDogY2FsYygke19zaXplfSAvIDUpO1xuICAgICAgfVxuXG4gICAgICAuaGFzaDpudGgtY2hpbGQoMSkgeyBhbmltYXRpb24tbmFtZTogYmVmb3JlOyB9XG4gICAgICAuaGFzaDpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tbmFtZTogYWZ0ZXI7IH1cblxuICAgICAgQGtleWZyYW1lcyBiZWZvcmUge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogJHtfbGF0fSBjYWxjKCR7X29mZnNldH0gKiAtMSkgJHtfY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGMoJHtfbGF0fSAqIC0xKSAke19vZmZzZXR9ICR7X2NvbG9yfTtcbiAgICAgICAgICB3aWR0aDogJHtfdGhpY2tuZXNzfTtcbiAgICAgICAgfVxuXG4gICAgICAgIDM1JSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCBjYWxjKCR7X29mZnNldH0gKiAtMSkgJHtfY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIDAgJHtfb2Zmc2V0fSAke19jb2xvcn07XG4gICAgICAgICAgd2lkdGg6ICR7X3NpemV9O1xuICAgICAgICB9XG5cbiAgICAgICAgNzAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiBjYWxjKCR7X2xhdH0gKiAtMSkgY2FsYygke19vZmZzZXR9ICogLTEpICR7X2NvbG9yfSxcbiAgICAgICAgICAgICAgICAgICAgICAke19sYXR9ICR7X29mZnNldH0gJHtfY29sb3J9O1xuICAgICAgICAgIHdpZHRoOiAke190aGlja25lc3N9O1xuICAgICAgICB9XG5cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogJHtfbGF0fSBjYWxjKCR7X29mZnNldH0gKiAtMSkgJHtfY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGMoJHtfbGF0fSAqIC0xKSAke19vZmZzZXR9ICR7X2NvbG9yfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGFmdGVyIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6ICR7X29mZnNldH0gJHtfbGF0fSAke19jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke19vZmZzZXR9ICogLTEpIGNhbGMoJHtfbGF0fSAqIC0xKSAke19jb2xvcn07XG4gICAgICAgICAgaGVpZ2h0OiAke190aGlja25lc3N9O1xuICAgICAgICB9XG5cbiAgICAgICAgMzUlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke19vZmZzZXR9IDAgJHtfY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGMoJHtfb2Zmc2V0fSAqIC0xKSAwICR7X2NvbG9yfTtcbiAgICAgICAgICBoZWlnaHQ6ICR7X3NpemV9O1xuICAgICAgICB9XG5cbiAgICAgICAgNzAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke19vZmZzZXR9IGNhbGMoJHtfbGF0fSAqIC0xKSAke19jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke19vZmZzZXR9ICogLTEpICR7X2xhdH0gJHtfY29sb3J9O1xuICAgICAgICAgIGhlaWdodDogJHtfdGhpY2tuZXNzfTtcbiAgICAgICAgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6ICR7X29mZnNldH0gJHtfbGF0fSAke19jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke19vZmZzZXR9ICogLTEpIGNhbGMoJHtfbGF0fSAqIC0xKSAke19jb2xvcn07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJoYXNoLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhhc2hcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhhc2hcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEhhc2hTcGlubmVyLmlzLCBIYXNoU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgTW9vblNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnbW9vbi1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGJhbGxTdHlsZShzaXplKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICBoZWlnaHQ6ICR7c2l6ZX07XG4gICAgICB3aWR0aDogJHtzaXplfTtcbiAgICBgO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgY29uc3QgeyBjb2xvciwgc2l6ZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IF9jb2xvciA9IGB2YXIoLS1tb29uLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSlgO1xuICAgIGNvbnN0IF9zaXplID0gYHZhcigtLW1vb24tc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KWA7XG5cbiAgICBjb25zdCBtb29uU2l6ZSA9IGBjYWxjKCR7X3NpemV9IC8gNylgO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5tb29uLXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBtb29uIDAuNnMgMHMgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHtfc2l6ZX0gKyAke21vb25TaXplfSAqIDIpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7X3NpemV9ICsgJHttb29uU2l6ZX0gKiAyKTtcbiAgICAgIH1cblxuICAgICAgLmJhbGwge1xuICAgICAgICAke3RoaXMuYmFsbFN0eWxlKG1vb25TaXplKX07XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb246IG1vb24gMC42cyAwcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7X2NvbG9yfTtcbiAgICAgICAgb3BhY2l0eTogMC44O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogY2FsYygke19zaXplfSAvIDIgLSAke21vb25TaXplfSAvIDIpO1xuICAgICAgfVxuXG4gICAgICAuY2lyY2xlIHtcbiAgICAgICAgJHt0aGlzLmJhbGxTdHlsZShfc2l6ZSl9O1xuICAgICAgICBib3JkZXI6ICR7bW9vblNpemV9IHNvbGlkICR7X2NvbG9yfTtcbiAgICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gICAgICAgIG9wYWNpdHk6IDAuMTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBtb29uIHtcbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtb29uLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTW9vblNwaW5uZXIuaXMsIE1vb25TcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBQYWNtYW5TcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3BhY21hbi1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBtYXJnaW46IDIsXG4gICAgICBzaXplOiAyNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnbWFyZ2luJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgYmFsbERlbGF5KGZhY3Rvcikge1xuICAgIHJldHVybiBgYW5pbWF0aW9uLWRlbGF5OiAke2ZhY3RvciAqIDAuMjV9cztgO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgY29uc3QgeyBjb2xvciwgbWFyZ2luLCBzaXplIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgX2NvbG9yID0gYHZhcigtLXBhY21hbi1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pYDtcbiAgICBjb25zdCBfc2l6ZSA9IGB2YXIoLS1wYWNtYW4tc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KWA7XG4gICAgY29uc3QgX21hcmdpbiA9IGB2YXIoLS1wYWNtYW4tc3Bpbm5lcl9fbWFyZ2luLCAke21hcmdpbn1weClgO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5wYWNtYW4tc3Bpbm5lciB7XG4gICAgICAgIGZvbnQtc2l6ZTogMDtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7X3NpemV9ICogMik7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHtfc2l6ZX0gKiAyKTtcbiAgICAgIH1cblxuICAgICAgLnBhY21hbi10b3Age1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHBhY21hbjEgMC44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogJHtfc2l6ZX0gc29saWQgJHtfY29sb3J9O1xuICAgICAgICBib3JkZXItbGVmdDogJHtfc2l6ZX0gc29saWQgJHtfY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAke19zaXplfTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAke19zaXplfSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXRvcDogJHtfc2l6ZX0gc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMDtcbiAgICAgIH1cblxuICAgICAgLnBhY21hbi1ib3R0b20ge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHBhY21hbjIgMC44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogJHtfc2l6ZX0gc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1sZWZ0OiAke19zaXplfSBzb2xpZCAke2NvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogJHtfc2l6ZX07XG4gICAgICAgIGJvcmRlci1yaWdodDogJHtfc2l6ZX0gc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci10b3A6ICR7X3NpemV9IHNvbGlkICR7Y29sb3J9O1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICB9XG5cbiAgICAgIC5iYWxsIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBiYWxsIDFzIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogY2FsYygke19zaXplfSAvIDIuNSk7XG4gICAgICAgIGxlZnQ6IGNhbGMoJHtfc2l6ZX0gKiA0KTtcbiAgICAgICAgbWFyZ2luOiAke19tYXJnaW59O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogJHtfc2l6ZX07XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIGNhbGMoJHtfc2l6ZX0gLyAtNCkpO1xuICAgICAgICB3aWR0aDogY2FsYygke19zaXplfSAvIDIuNSk7XG4gICAgICB9XG5cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgzKSB7ICR7dGhpcy5iYWxsRGVsYXkoLTMpfSB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoNCkgeyAke3RoaXMuYmFsbERlbGF5KC0yKX0gfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDUpIHsgJHt0aGlzLmJhbGxEZWxheSgtMSl9IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCg2KSB7ICR7dGhpcy5iYWxsRGVsYXkoMCl9IH1cblxuICAgICAgQGtleWZyYW1lcyBiYWxsIHtcbiAgICAgICAgNzUlICB7IG9wYWNpdHk6IDAuNzsgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKGNhbGMoJHtfc2l6ZX0gKiAtNCksIGNhbGMoJHtfc2l6ZX0gLyAtNCkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgcGFjbWFuMSB7XG4gICAgICAgIDAlICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogcm90YXRlKC00NGRlZyk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBwYWNtYW4yIHtcbiAgICAgICAgMCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiByb3RhdGUoNDRkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwicGFjbWFuLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhY21hbi10b3BcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBhY21hbi1ib3R0b21cIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFBhY21hblNwaW5uZXIuaXMsIFBhY21hblNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFByb3BhZ2F0ZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncHJvcGFnYXRlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXByb3BhZ2F0ZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tcHJvcGFnYXRlLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICBjb25zdCBkaXN0YW5jZSA9IFsxLCAzLCA1XTtcblxuICAgIHJldHVybiBgXG4gICAgICAucHJvcGFnYXRlLXNwaW5uZXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgIC5iYWxsIHtcbiAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxLjVzO1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCR7dGhpcy5zaXplfSAvIDMpO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgbGVmdDogY2FsYygke3RoaXMuc2l6ZX0gLyAtMik7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAvIC0yKTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDEpIHsgYW5pbWF0aW9uLW5hbWU6IGJhbGwxOyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tbmFtZTogYmFsbDI7IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgzKSB7IGFuaW1hdGlvbi1uYW1lOiBiYWxsMzsgfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDQpIHsgYW5pbWF0aW9uLW5hbWU6IGJhbGw0OyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoNSkgeyBhbmltYXRpb24tbmFtZTogYmFsbDU7IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCg2KSB7IGFuaW1hdGlvbi1uYW1lOiBiYWxsNjsgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJhbGwxIHtcbiAgICAgICAgMjUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2Rpc3RhbmNlWzBdfXJlbSkgc2NhbGUoMC43NSk7IH1cbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2Rpc3RhbmNlWzFdfXJlbSkgc2NhbGUoMC42KTsgfVxuICAgICAgICA3NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZGlzdGFuY2VbMl19cmVtKSBzY2FsZSgwLjUpOyB9XG4gICAgICAgIDk1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcmVtKSAgICAgICAgICAgICAgIHNjYWxlKDEpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYmFsbDIge1xuICAgICAgICAyNSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZGlzdGFuY2VbMF19cmVtKSBzY2FsZSgwLjc1KTsgfVxuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZGlzdGFuY2VbMV19cmVtKSBzY2FsZSgwLjYpOyB9XG4gICAgICAgIDc1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtkaXN0YW5jZVsxXX1yZW0pIHNjYWxlKDAuNik7IH1cbiAgICAgICAgOTUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDByZW0pICAgICAgICAgICAgICAgc2NhbGUoMSk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBiYWxsMyB7XG4gICAgICAgIDI1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtkaXN0YW5jZVswXX1yZW0pIHNjYWxlKDAuNzUpOyB9XG4gICAgICAgIDc1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtkaXN0YW5jZVswXX1yZW0pIHNjYWxlKDAuNzUpOyB9XG4gICAgICAgIDk1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcmVtKSAgICAgICAgICAgICAgIHNjYWxlKDEpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYmFsbDQge1xuICAgICAgICAyNSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoJHtkaXN0YW5jZVswXX1yZW0pIHNjYWxlKDAuNzUpOyB9XG4gICAgICAgIDc1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgke2Rpc3RhbmNlWzBdfXJlbSkgc2NhbGUoMC43NSk7IH1cbiAgICAgICAgOTUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDByZW0pICAgICAgICAgICAgICBzY2FsZSgxKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJhbGw1IHtcbiAgICAgICAgMjUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7ZGlzdGFuY2VbMF19cmVtKSBzY2FsZSgwLjc1KTsgfVxuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoJHtkaXN0YW5jZVsxXX1yZW0pIHNjYWxlKDAuNik7IH1cbiAgICAgICAgNzUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7ZGlzdGFuY2VbMV19cmVtKSBzY2FsZSgwLjYpOyB9XG4gICAgICAgIDk1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcmVtKSAgICAgICAgICAgICAgc2NhbGUoMSk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBiYWxsNiB7XG4gICAgICAgIDI1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgke2Rpc3RhbmNlWzBdfXJlbSkgc2NhbGUoMC43NSk7IH1cbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7ZGlzdGFuY2VbMV19cmVtKSBzY2FsZSgwLjYpOyB9XG4gICAgICAgIDc1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgke2Rpc3RhbmNlWzJdfXJlbSkgc2NhbGUoMC41KTsgfVxuICAgICAgICA5NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHJlbSkgICAgICAgICAgICAgIHNjYWxlKDEpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwicHJvcGFnYXRlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFByb3BhZ2F0ZVNwaW5uZXIuaXMsIFByb3BhZ2F0ZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFB1bHNlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdwdWxzZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBtYXJnaW46IDIsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnbWFyZ2luJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXB1bHNlLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgbWFyZ2luKCkgeyByZXR1cm4gYHZhcigtLXB1bHNlLXNwaW5uZXJfX21hcmdpbiwgJHt0aGlzLnByb3BzLm1hcmdpbn1weClgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tcHVsc2Utc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAucHVsc2Utc3Bpbm5lciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICB9XG5cbiAgICAgIC5iYWxsIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBwdWxzZSAwLjc1cyBpbmZpbml0ZSBjdWJpYy1iZXppZXIoMC4yLCAwLjY4LCAwLjE4LCAxLjA4KTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgbWFyZ2luOiAke3RoaXMubWFyZ2lufTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDEpIHsgYW5pbWF0aW9uLWRlbGF5OiAwczsgfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDIpIHsgYW5pbWF0aW9uLWRlbGF5OiAuMTJzOyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoMykgeyBhbmltYXRpb24tZGVsYXk6IC4yNHM7IH1cblxuICAgICAgQGtleWZyYW1lcyBwdWxzZSB7XG4gICAgICAgIDAlICB7IHRyYW5zZm9ybTogc2NhbGUoMSk7ICAgb3BhY2l0eTogMTsgfVxuICAgICAgICA0NSUgeyB0cmFuc2Zvcm06IHNjYWxlKDAuMSk7IG9wYWNpdHk6IDAuNzsgfVxuICAgICAgICA4MCUgeyB0cmFuc2Zvcm06IHNjYWxlKDEpOyAgIG9wYWNpdHk6IDE7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJwdWxzZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShQdWxzZVNwaW5uZXIuaXMsIFB1bHNlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgUmluZ1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncmluZy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1yaW5nLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1yaW5nLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnJpbmctc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5yaW5nIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG4gICAgICAgIGFuaW1hdGlvbjogMnMgMHMgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBib3JkZXI6IGNhbGMoJHt0aGlzLnNpemV9IC8gMTApIHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBvcGFjaXR5OiAwLjQ7XG4gICAgICAgIHBlcnNwZWN0aXZlOiA4MDBweDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5yaW5nOm50aC1jaGlsZCgxKSB7IGFuaW1hdGlvbi1uYW1lOiByaWdodDsgfVxuICAgICAgLnJpbmc6bnRoLWNoaWxkKDIpIHsgYW5pbWF0aW9uLW5hbWU6IGxlZnQ7IH1cblxuICAgICAgQGtleWZyYW1lcyBsZWZ0IHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWCgwZGVnKSAgIHJvdGF0ZVkoMGRlZykgICByb3RhdGVaKDBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMzYwZGVnKSByb3RhdGVZKDE4MGRlZykgcm90YXRlWigzNjBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgcmlnaHQge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDBkZWcpICAgcm90YXRlWSgwZGVnKSAgIHJvdGF0ZVooMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMzYwZGVnKSByb3RhdGVaKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJyaW5nLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJpbmdcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFJpbmdTcGlubmVyLmlzLCBSaW5nU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgUmlzZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncmlzZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBtYXJnaW46IDIsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnbWFyZ2luJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXJpc2Utc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBtYXJnaW4oKSB7IHJldHVybiBgdmFyKC0tcmlzZS1zcGlubmVyX19tYXJnaW4sICR7dGhpcy5wcm9wcy5tYXJnaW59cHgpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXJpc2Utc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuYmFsbCB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogMXMgMHMgaW5maW5pdGUgY3ViaWMtYmV6aWVyKDAuMTUsIDAuNDYsIDAuOSwgMC42KTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgbWFyZ2luOiAke3RoaXMubWFyZ2lufTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmJhbGw6bnRoLWNoaWxkKGV2ZW4pIHsgYW5pbWF0aW9uLW5hbWU6IGV2ZW47IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZChvZGQpIHsgYW5pbWF0aW9uLW5hbWU6IG9kZDsgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGV2ZW4ge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiBzY2FsZSgxLjEpOyB9XG4gICAgICAgIDI1JSAgeyB0cmFuc2xhdGVZKC0zMHB4KTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiBzY2FsZSgwLjQpOyB9XG4gICAgICAgIDc1JSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMzBweCk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSBzY2FsZSgxLjApOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgb2RkIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGUoMC40KTsgfVxuICAgICAgICAyNSUgIHsgdHJhbnNsYXRlWSgzMHB4KTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiBzY2FsZSgxLjEpOyB9XG4gICAgICAgIDc1JSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMwcHgpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCkgc2NhbGUoMC43NSk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJyaXNlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFJpc2VTcGlubmVyLmlzLCBSaXNlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgUm90YXRlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdyb3RhdGUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgbWFyZ2luOiA1LFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ21hcmdpbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1yb3RhdGUtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBtYXJnaW4oKSB7IHJldHVybiBgdmFyKC0tcm90YXRlLXNwaW5uZXJfX21hcmdpbiwgJHt0aGlzLnByb3BzLm1hcmdpbn1weClgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tcm90YXRlLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnJvdGF0ZS1zcGlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiByb3RhdGUgMXMgMHMgaW5maW5pdGUgY3ViaWMtYmV6aWVyKDAuNywgLTAuMTMsIDAuMjIsIDAuODYpO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgIC5iYWxsIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIG1hcmdpbjogJHt0aGlzLm1hcmdpbn07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgcm90YXRlIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwicm90YXRlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFJvdGF0ZVNwaW5uZXIuaXMsIFJvdGF0ZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNjYWxlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzY2FsZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBoZWlnaHQ6IDM1LFxuICAgICAgbWFyZ2luOiAyLFxuICAgICAgcmFkaXVzOiAyLFxuICAgICAgd2lkdGg6IDQsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2hlaWdodCcsXG4gICAgICAnbWFyZ2luJyxcbiAgICAgICdyYWRpdXMnLFxuICAgICAgJ3dpZHRoJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXNjYWxlLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgaGVpZ2h0KCkgeyByZXR1cm4gYHZhcigtLXNjYWxlLXNwaW5uZXJfX2hlaWdodCwgJHt0aGlzLnByb3BzLmhlaWdodH1weClgOyB9XG5cbiAgZ2V0IG1hcmdpbigpIHsgcmV0dXJuIGB2YXIoLS1zY2FsZS1zcGlubmVyX19tYXJnaW4sICR7dGhpcy5wcm9wcy5tYXJnaW59cHgpYDsgfVxuXG4gIGdldCByYWRpdXMoKSB7IHJldHVybiBgdmFyKC0tc2NhbGUtc3Bpbm5lcl9fcmFkaXVzLCAke3RoaXMucHJvcHMucmFkaXVzfXB4KWA7IH1cblxuICBnZXQgd2lkdGgoKSB7IHJldHVybiBgdmFyKC0tc2NhbGUtc3Bpbm5lcl9fd2lkdGgsICR7dGhpcy5wcm9wcy53aWR0aH1weClgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tc2NhbGUtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuc2NhbGUtc3Bpbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogcm90YXRlIDFzIDBzIGluZmluaXRlIGN1YmljLWJlemllcigwLjcsIC0wLjEzLCAwLjIyLCAwLjg2KTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuXG4gICAgICAubGluZSB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogc2NhbGUgMXMgaW5maW5pdGUgY3ViaWMtYmV6aWVyKDAuMiwgMC42OCwgMC4xOCwgMS4wOCk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6ICR7dGhpcy5yYWRpdXN9O1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLmhlaWdodH07XG4gICAgICAgIG1hcmdpbjogJHt0aGlzLm1hcmdpbn07XG4gICAgICAgIHdpZHRoOiAke3RoaXMud2lkdGh9O1xuICAgICAgfVxuXG4gICAgICAubGluZTpudGgtY2hpbGQoMSkgeyBhbmltYXRpb24tZGVsYXk6IDAuMXM7IH1cbiAgICAgIC5saW5lOm50aC1jaGlsZCgyKSB7IGFuaW1hdGlvbi1kZWxheTogMC4yczsgfVxuICAgICAgLmxpbmU6bnRoLWNoaWxkKDMpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjNzOyB9XG4gICAgICAubGluZTpudGgtY2hpbGQoNCkgeyBhbmltYXRpb24tZGVsYXk6IDAuNHM7IH1cbiAgICAgIC5saW5lOm50aC1jaGlsZCg1KSB7IGFuaW1hdGlvbi1kZWxheTogMC41czsgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNjYWxlIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGV5KDEuMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogc2NhbGV5KDAuNCk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGV5KDEuMCk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzY2FsZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTY2FsZVNwaW5uZXIuaXMsIFNjYWxlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgU2tld1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc2tldy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiAyMCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1za2V3LXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1za2V3LXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnNrZXctc3Bpbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogc2tldyAzcyAwcyBpbmZpbml0ZSBjdWJpYy1iZXppZXIoMC4wOSwgMC41NywgMC40OSwgMC45KTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogJHt0aGlzLnNpemV9IHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1sZWZ0OiAke3RoaXMuc2l6ZX0gc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1yaWdodDogJHt0aGlzLnNpemV9IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2tldyB7XG4gICAgICAgIDI1JSAgeyB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgwKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMTgwZGVnKTsgfVxuICAgICAgICA3NSUgIHsgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgwKSAgICAgIHJvdGF0ZVkoMTgwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgwKSAgICAgIHJvdGF0ZVkoMCk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJza2V3LXNwaW5uZXJcIj48L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTa2V3U3Bpbm5lci5pcywgU2tld1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNxdWFyZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc3F1YXJlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDUwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXNxdWFyZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnNxdWFyZS1zcGlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBzcXVhcmUgM3MgMHMgaW5maW5pdGUgY3ViaWMtYmV6aWVyKDAuMDksIDAuNTcsIDAuNDksIDAuOSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc3F1YXJlIHtcbiAgICAgICAgMjUlICB7IHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogcm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMTgwZGVnKTsgfVxuICAgICAgICA3NSUgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDApICAgICAgcm90YXRlWSgxODBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMCkgICAgICByb3RhdGVZKDApOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlLXNwaW5uZXJcIj48L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTcXVhcmVTcGlubmVyLmlzLCBTcXVhcmVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTeW5jU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzeW5jLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIG1hcmdpbjogMixcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tc3luYy1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1hcmdpbigpIHsgcmV0dXJuIGB2YXIoLS1zeW5jLXNwaW5uZXJfX21hcmdpbiwgJHt0aGlzLnByb3BzLm1hcmdpbn1weClgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tc3luYy1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zeW5jLXNwaW5uZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgfVxuXG4gICAgICAuYmFsbCB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogc3luYyAwLjZzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgbWFyZ2luOiAke3RoaXMubWFyZ2lufTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDEpIHsgYW5pbWF0aW9uLWRlbGF5OiAwczsgfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDIpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjA3czsgfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDMpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjE0czsgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHN5bmMge1xuICAgICAgICAzMyUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpOyB9XG4gICAgICAgIDY2JSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwcHgpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzeW5jLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFN5bmNTcGlubmVyLmlzLCBTeW5jU3Bpbm5lcik7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFBQSxNQUFNLGNBQWMsU0FBUyxXQUFXLENBQUM7RUFDekMsRUFBRSxXQUFXLEdBQUc7RUFDaEIsSUFBSSxLQUFLLEVBQUUsQ0FBQzs7RUFFWixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7RUFDM0MsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztFQUNwRCxHQUFHOztFQUVILEVBQUUsaUJBQWlCLEdBQUc7RUFDdEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7RUFDbEIsR0FBRzs7RUFFSCxFQUFFLHdCQUF3QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0VBQ3JELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7O0VBRW5FLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0VBQ2xCLEdBQUc7O0VBRUgsRUFBRSxLQUFLLEdBQUc7RUFDVixJQUFJLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztFQUN4RCxHQUFHOztFQUVILEVBQUUsUUFBUSxHQUFHO0VBQ2IsSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7RUFDM0QsR0FBRzs7RUFFSCxFQUFFLE1BQU0sR0FBRztFQUNYLElBQUksTUFBTSxNQUFNLEdBQUcsQ0FBQzs7Ozs7OztRQU9aLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0lBRTdCLENBQUMs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
