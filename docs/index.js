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

    get color() { return `var(--bar-spinner__color, ${this.props.color})`; }

    get height() { return `var(--bar-spinner__height, ${this.props.height}px)`; }

    get width() { return `var(--bar-spinner__width, ${this.props.width}px)`; }

    style() {
      return `
      .bar-spinner {
        height: ${this.height};
        overflow: hidden;
        position: relative;
        width: ${this.width};
      }

      .background {
        background-color: ${this.color};
        height: ${this.height};
        opacity: 0.2;
        position: absolute;
        width: ${this.width};
      }

      .long {
        animation-fill-mode: forwards;
        animation: long 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
        background-color: ${this.color};
        border-radius: 2px;
        height: ${this.height};
        position: absolute;
        will-change: left, right;
      }

      .short {
        animation-fill-mode: forwards;
        animation: short 2.1s 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        background-color: ${this.color};
        border-radius: 2px;
        height: ${this.height};
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

    get color() { return `var(--beat-spinner__color, ${this.props.color})`; }

    get margin() { return `var(--beat-spinner__margin, ${this.props.margin}px)`; }

    get size() { return `var(--beat-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .beat {
        animation-fill-mode: both;
        animation: beat 0.7s infinite linear;
        background-color: ${this.color};
        border-radius: 100%;
        display: inline-block;
        height: ${this.size};
        margin: ${this.margin};
        width: ${this.size};
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

    get color() { return `var(--bounce-spinner__color, ${this.props.color})`; }

    get size() { return `var(--bounce-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .bounce-spinner {
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .bounce {
        animation-fill-mode: both;
        animation: bounce 2.1s infinite ease-in-out;
        background-color: ${this.color};
        border-radius: 100%;
        height: ${this.size};
        left: 0;
        opacity: 0.6;
        position: absolute;
        top: 0;
        width: ${this.size};
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

    get color() { return `var(--circle-spinner__color, ${this.props.color})`; }

    get size() { return `var(--circle-spinner__size, ${this.props.size}px)`; }

    calculateCircle(i) {
      return `
      animation-delay: ${i * -0.2}s;
      height: calc(${this.size} * ${1 - i / 10});
      left: ${i * 0.7 * 2.5}%;
      top: ${i * 0.35 * 2.5}%;
      width: calc(${this.size} * ${1 - i / 10});
    `;
    }

    style() {
      return `
      .circle-spinner {
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .circle {
        animation-fill-mode: "";
        animation: circle 1s infinite linear;
        border-top-color: ${this.color};
        border-left-color: ${this.color};
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

    get color() { return `var(--climbing-box-spinner__color, ${this.props.color})`; }

    get size() { return `var(--climbing-box-spinner__size, ${this.props.size}px)`; }

    style() {
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
        border: 0.25em solid ${this.color};
        bottom: -0.1em;
        box-sizing: content-box;
        height: 1em;
        left: 0;
        position: absolute;
        transform: translate(0, -1em) rotate(-45deg);
        width: 1em;
      }

      .hill {
        border-left: 0.25em solid ${this.color};
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
        font-size: ${this.size};
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

    get color() { return `var(--clip-spinner__color, ${this.props.color})`; }

    get size() { return `var(--clip-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .clip-spinner {
        animation-fill-mode: both;
        animation: clip 0.75s 0s infinite linear;
        background: transparent !important;
        border-bottom-color: transparent;
        border-left-color: ${this.color};
        border-radius: 100%;
        border-right-color: ${this.color};
        border-style: solid;
        border-top-color: ${this.color};
        border-width: 2px;
        height: ${this.size};
        width: ${this.size};
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

    get color() { return `var(--dot-spinner__color, ${this.props.color})`; }

    get size() { return `var(--dot-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .dot-spinner {
        animation-fill-mode: forwards;
        animation: rotate 2s 0s infinite linear;
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .dot {
        animation-fill-mode: forwards;
        animation: bounce 2s infinite linear;
        background-color: ${this.color};
        border-radius: 100%;
        height: calc(${this.size} / 2);
        position: absolute;
        width: calc(${this.size} / 2);
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

  class FadeSpinner extends SpinnerElement {
    static get is() { return 'fade-spinner'; }

    static get defaults() {
      return {
        color: '#36d7b7',
        height: 15,
        radius: 10,
        width: 5,
      };
    }

    static get observedAttributes() {
      return [
        'color',
        'height',
        'radius',
        'width',
      ];
    }

    get color() { return `var(--fade-spinner__color, ${this.props.color})`; }

    get height() { return `var(--fade-spinner__height, ${this.props.height}px)`; }

    get radius() { return `var(--fade-spinner__radius, ${this.props.radius}px)`; }

    get width() { return `var(--fade-spinner__width, ${this.props.width}px)`; }

    get center() { return `calc(${this.radius} + ${this.height})`; }

    buildLine(i) {
      return `
      .container:nth-child(${i}) { transform: rotate(${(i - 1) * 45}deg); }
      .container:nth-child(${i}) .line { animation-delay: calc(${i - 1} * .12s); }
    `;
    }

    style() {
      return `
      .fade-spinner {
        font-size: 0;
        height: calc(${this.center} * 2);
        width: calc(${this.center} * 2);
        position: relative;
      }

      .container {
        height: calc(${this.center} * 2);
        width: ${this.width};
        position: absolute;
        top: 0;
        left: calc(${this.center} - ${this.width} / 2);
      }

      .line {
        animation-fill-mode: both;
        animation: fade 1.2s infinite ease-in-out;
        background-color: ${this.color};
        border-radius: 4px;
        height: ${this.height};
        transition: 2s;
        width: ${this.width};
      }

      ${this.buildLine(1)}
      ${this.buildLine(2)}
      ${this.buildLine(3)}
      ${this.buildLine(4)}
      ${this.buildLine(5)}
      ${this.buildLine(6)}
      ${this.buildLine(7)}
      ${this.buildLine(8)}

      @keyframes fade {
        50%  { opacity: 0.3; }
        100% { opacity: 1; }
      }
    `;
    }

    template() {
      return `
      <div class="fade-spinner">
        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>
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

    get color() { return `var(--grid-spinner__color, ${this.props.color})`; }

    get margin() { return `var(--grid-spinner__margin, ${this.props.margin}px)`; }

    get size() { return `var(--grid-spinner__size, ${this.props.size}px)`; }

    generateCellAnimation() {
      const random = Math.random();

      return `
      animation-duration: ${random + 0.6}s;
      animation-delay: ${random - 0.2}s;
    `;
    }

    style() {
      return `
      .grid-spinner {
        font-size: 0;
        width: calc(${this.size} * 3 + ${this.margin} * 6);
      }

      .cell {
        animation-fill-mode: both;
        animation: grid infinite ease;
        background-color: ${this.color};
        border-radius: 100%;
        display: inline-block;
        height: ${this.size};
        margin: ${this.margin};
        width: ${this.size};
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

    get color() { return `var(--hash-spinner__color, ${this.props.color})`; }

    get lat() { return `calc(calc(${this.size} - ${this.thickness}) / 2)`; }

    get offset() { return `calc(${this.lat} - ${this.thickness})`; }

    get size() { return `var(--hash-spinner__size, ${this.props.size}px)`; }

    get thickness() { return `calc(${this.size} / 5)`; }

    style() {
      return `
      .hash-spinner {
        height: ${this.size};
        position: relative;
        transform: rotate(165deg);
        width: ${this.size};
      }

      .hash {
        animation-duration: 2s;
        animation-fill-mode: none;
        animation-iteration-count: infinite;
        border-radius: calc(${this.size} / 10);
        content: "";
        display: block;
        height: calc(${this.size} / 5);
        left: 50%;
        opacity: .9;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: calc(${this.size} / 5);
      }

      .hash:nth-child(1) { animation-name: before; }
      .hash:nth-child(2) { animation-name: after; }

      @keyframes before {
        0% {
          box-shadow: ${this.lat} calc(${this.offset} * -1) ${this.color},
                      calc(${this.lat} * -1) ${this.offset} ${this.color};
          width: ${this.thickness};
        }

        35% {
          box-shadow: 0 calc(${this.offset} * -1) ${this.color},
                      0 ${this.offset} ${this.color};
          width: ${this.size};
        }

        70% {
          box-shadow: calc(${this.lat} * -1) calc(${this.offset} * -1) ${this.color},
                      ${this.lat} ${this.offset} ${this.color};
          width: ${this.thickness};
        }

        100% {
          box-shadow: ${this.lat} calc(${this.offset} * -1) ${this.color},
                      calc(${this.lat} * -1) ${this.offset} ${this.color};
        }
      }

      @keyframes after {
        0% {
          box-shadow: ${this.offset} ${this.lat} ${this.color},
                      calc(${this.offset} * -1) calc(${this.lat} * -1) ${this.color};
          height: ${this.thickness};
        }

        35% {
          box-shadow: ${this.offset} 0 ${this.color},
                      calc(${this.offset} * -1) 0 ${this.color};
          height: ${this.size};
        }

        70% {
          box-shadow: ${this.offset} calc(${this.lat} * -1) ${this.color},
                      calc(${this.offset} * -1) ${this.lat} ${this.color};
          height: ${this.thickness};
        }

        100% {
          box-shadow: ${this.offset} ${this.lat} ${this.color},
                      calc(${this.offset} * -1) calc(${this.lat} * -1) ${this.color};
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

    get color() { return `var(--moon-spinner__color, ${this.props.color})`; }

    get moonSize() { return `calc(${this.size} / 7)`; }

    get size() { return `var(--moon-spinner__size, ${this.props.size}px)`; }

    ballStyle(size) {
      return `
      border-radius: 100%;
      height: ${size};
      width: ${size};
    `;
    }

    style() {
      return `
      .moon-spinner {
        animation-fill-mode: forwards;
        animation: moon 0.6s 0s infinite linear;
        height: calc(${this.size} + ${this.moonSize} * 2);
        position: relative;
        width: calc(${this.size} + ${this.moonSize} * 2);
      }

      .ball {
        ${this.ballStyle(this.moonSize)};
        animation-fill-mode: forwards;
        animation: moon 0.6s 0s infinite linear;
        background-color: ${this.color};
        opacity: 0.8;
        position: absolute;
        top: calc(${this.size} / 2 - ${this.moonSize} / 2);
      }

      .circle {
        ${this.ballStyle(this.size)};
        border: ${this.moonSize} solid ${this.color};
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

    get color() { return `var(--pacman-spinner__color, ${this.props.color})`; }

    get margin() { return `var(--pacman-spinner__margin, ${this.props.margin}px)`; }

    get size() { return `var(--pacman-spinner__size, ${this.props.size}px)`; }

    ballDelay(factor) {
      return `animation-delay: ${factor * 0.25}s;`;
    }

    style() {
      return `
      .pacman-spinner {
        font-size: 0;
        height: calc(${this.size} * 2);
        position: relative;
        width: calc(${this.size} * 2);
      }

      .pacman-top {
        animation-fill-mode: both;
        animation: pacman1 0.8s infinite ease-in-out;
        border-bottom: ${this.size} solid ${this.color};
        border-left: ${this.size} solid ${this.color};
        border-radius: ${this.size};
        border-right: ${this.size} solid transparent;
        border-top: ${this.size} solid transparent;
        height: 0;
        position: absolute;
        width: 0;
      }

      .pacman-bottom {
        animation-fill-mode: both;
        animation: pacman2 0.8s infinite ease-in-out;
        border-bottom: ${this.size} solid transparent;
        border-left: ${this.size} solid ${this.color};
        border-radius: ${this.size};
        border-right: ${this.size} solid transparent;
        border-top: ${this.size} solid ${this.color};
        height: 0;
        position: absolute;
        width: 0;
      }

      .ball {
        animation-fill-mode: both;
        animation: ball 1s infinite linear;
        background-color: ${this.color};
        border-radius: 100%;
        height: calc(${this.size} / 2.5);
        left: calc(${this.size} * 4);
        margin: ${this.margin};
        position: absolute;
        top: ${this.size};
        transform: translate(0, calc(${this.size} / -4));
        width: calc(${this.size} / 2.5);
      }

      .ball:nth-child(3) { ${this.ballDelay(-3)} }
      .ball:nth-child(4) { ${this.ballDelay(-2)} }
      .ball:nth-child(5) { ${this.ballDelay(-1)} }
      .ball:nth-child(6) { ${this.ballDelay(0)} }

      @keyframes ball {
        75%  { opacity: 0.7; }

        100% {
          transform: translate(calc(${this.size} * -4), calc(${this.size} / -4));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGlubmVyRWxlbWVudC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvYXRvbS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2NpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2ZpbmdlcnByaW50LXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2Zsb3dlci1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9oYWxmLWNpcmNsZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9ob2xsb3ctZG90cy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9sb29waW5nLXJob21idXNlcy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9vcmJpdC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9waXhlbC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9yYWRhci1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvc2VtaXBvbGFyLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL3NwcmluZy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL3RyaW5pdHktcmluZ3Mtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL2Jhci1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvYmVhdC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvYm91bmNlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9jaXJjbGUtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL2NsaW1iaW5nLWJveC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvY2xpcC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvZG90LXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9mYWRlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9ncmlkLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9oYXNoLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9tb29uLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9wYWNtYW4tc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3Byb3BhZ2F0ZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvcHVsc2Utc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3Jpbmctc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3Jpc2Utc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3JvdGF0ZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvc2NhbGUtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3NrZXctc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3NxdWFyZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvc3luYy1zcGlubmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNwaW5uZXJFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wcm9wcyA9IHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdHM7XG4gICAgdGhpcy5yb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIHRoaXMucHJvcHNbbmFtZV0gPSBuZXdWYWx1ZSB8fCB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRzW25hbWVdO1xuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHN0eWxlKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc3R5bGUgbWV0aG9kIG11c3QgYmUgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndGVtcGxhdGUgbWV0aG9kIG11c3QgYmUgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBzdHlsZXMgPSBgXG4gICAgICA8c3R5bGU+XG4gICAgICAgICogeyBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XG5cbiAgICAgICAgOmhvc3QgICAgICAgICAgIHsgZGlzcGxheTogYmxvY2s7IH1cbiAgICAgICAgOmhvc3QoW2hpZGRlbl0pIHsgZGlzcGxheTogbm9uZTsgfVxuXG4gICAgICAgICR7dGhpcy5zdHlsZSh0aGlzLnByb3BzKX1cbiAgICAgIDwvc3R5bGU+XG4gICAgYDtcblxuICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZSh0aGlzLnByb3BzKTtcblxuICAgIHRoaXMucm9vdC5pbm5lckhUTUwgPSBgJHtzdHlsZXN9JHt0ZW1wbGF0ZX1gO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNwaW5uZXJFbGVtZW50O1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEF0b21TcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2F0b20tc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5hdG9tLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWF0b20tc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lkdGg6IHZhcigtLWF0b20tc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1pbm5lciB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5hdG9tLXNwaW5uZXIgLnNwaW5uZXItY2lyY2xlIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWF0b20tc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYyh2YXIoLS1hdG9tLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjI0KTtcbiAgICAgICAgbGVmdDogNTAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1saW5lIHtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IGNhbGModmFyKC0tYXRvbS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMjUpIHNvbGlkIHZhcigtLWF0b20tc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXItdG9wOiBjYWxjKHZhcigtLWF0b20tc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDI1KSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWxpbmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBhdG9tLXNwaW5uZXItYW5pbWF0aW9uLTEgdmFyKC0tYXRvbS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigxMjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMGRlZyk7XG4gICAgICB9XG5cbiAgICAgIC5hdG9tLXNwaW5uZXIgLnNwaW5uZXItbGluZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb246IGF0b20tc3Bpbm5lci1hbmltYXRpb24tMiB2YXIoLS1hdG9tLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVaKDI0MGRlZykgcm90YXRlWCg2NmRlZykgcm90YXRlWigwZGVnKTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1saW5lOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbjogYXRvbS1zcGlubmVyLWFuaW1hdGlvbi0zIHZhcigtLWF0b20tc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMzYwZGVnKSByb3RhdGVYKDY2ZGVnKSByb3RhdGVaKDBkZWcpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGF0b20tc3Bpbm5lci1hbmltYXRpb24tMSB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigxMjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGF0b20tc3Bpbm5lci1hbmltYXRpb24tMiB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigyNDBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGF0b20tc3Bpbm5lci1hbmltYXRpb24tMyB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigzNjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImF0b20tc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1pbm5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWxpbmVcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1saW5lXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItbGluZVwiPjwvZGl2PlxuXG4gICAgICAgICAgPCEtLUNocm9tZSByZW5kZXJzIGxpdHRsZSBjaXJjbGVzIG1hbGZvcm1lZCA6KC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWNpcmNsZVwiPiYjOTY3OTs8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShBdG9tU3Bpbm5lci5pcywgQXRvbVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEJyZWVkaW5nUmhvbWJ1c1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMixcbiAgICAgIHNpemU6IDY1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciwgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAqIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cyB7XG4gICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKTtcbiAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcuNSk7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMi4zMDc3KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMi4zMDc3KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gNy41KTtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1czpudGgtY2hpbGQoMm4rMCkge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtMSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDEpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0xO1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTIge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiAyKTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMjtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC0zIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogMyk7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTM7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtNCB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDQpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC00O1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTUge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiA1KTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNTtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC02IHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogNik7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTY7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtNyB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDcpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC03O1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTgge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiA4KTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtODtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5iaWcge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDAuNXM7XG4gICAgICAgIGFuaW1hdGlvbjogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC1iaWcgdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMyk7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMyk7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyAzKTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMyk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0xIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMzI1JSwgLTMyNSUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0yIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMzI1JSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTMge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDMyNSUsIC0zMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNCB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMzI1JSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTUge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDMyNSUsIDMyNSUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC02IHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAzMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNyB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMyNSUsIDMyNSUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC04IHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMzI1JSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLWJpZyB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTFcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtMlwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC0zXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtNVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC02XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtOFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBiaWdcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEJyZWVkaW5nUmhvbWJ1c1NwaW5uZXIuaXMsIEJyZWVkaW5nUmhvbWJ1c1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIENpcmNsZXNUb1Job21idXNlc1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgY291bnQ6IDMsXG4gICAgICBkdXJhdGlvbjogMS4yLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2NvdW50JyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGNvdW50LCBkdXJhdGlvbiwgc2l6ZSB9KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgb2JqZWN0LWN1cmx5LW5ld2xpbmVcbiAgICBjb25zdCBjaXJjbGVTdHlsZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAyOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGNpcmNsZVN0eWxlcy5wdXNoKGBcbiAgICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoJHtpfSkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDggKiAke2l9KTtcbiAgICAgICAgfVxuICAgICAgYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyLCAuY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lciAqIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cblxuICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyXG4gICAgICAgIHdpZHRoOiBjYWxjKCh2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICsgdmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDEuMTI1KSAqICR7Y291bnR9KTtcbiAgICAgIH1cblxuICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGFuaW1hdGlvbjogY2lyY2xlcy10by1yaG9tYnVzZXMtYW5pbWF0aW9uIHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgICAgICAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBtYXJnaW4tbGVmdDogY2FsYyh2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMS4xMjUpO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDggKiAxKTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICB9XG5cbiAgICAgICR7Y2lyY2xlU3R5bGVzLmpvaW4oJycpfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNpcmNsZXMtdG8tcmhvbWJ1c2VzLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIH1cbiAgICAgICAgMTcuNSUge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgICAgICAgfVxuICAgICAgICA1MCUge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgOTMuNSUge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBjaXJjbGVzLXRvLXJob21idXNlcy1iYWNrZ3JvdW5kLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMC40O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY291bnQgfSkge1xuICAgIGNvbnN0IGNpcmNsZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAyOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGNpcmNsZXMucHVzaCgnPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PicpO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgICR7Y2lyY2xlcy5qb2luKCcnKX1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKENpcmNsZXNUb1Job21idXNlc1NwaW5uZXIuaXMsIENpcmNsZXNUb1Job21idXNlc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEZpbmdlcnByaW50U3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdmaW5nZXJwcmludC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMS41LFxuICAgICAgc2l6ZTogNjQsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgcGFkZGluZzogMnB4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nIHtcbiAgICAgICAgYW5pbWF0aW9uOiBmaW5nZXJwcmludC1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBjdWJpYy1iZXppZXIoMC42ODAsIC0wLjc1MCwgMC4yNjUsIDEuNzUwKSBpbmZpbml0ZSBmb3J3YXJkcztcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItd2lkdGg6IDJweDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDEpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyAwICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDAgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICB9XG5cbiAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIC5zcGlubmVyLXJpbmc6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDUwbXMgKiAyKTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgMSAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyAxICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogMyk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDIgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgMiAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoNCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDQpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyAzICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDMgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICB9XG5cbiAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIC5zcGlubmVyLXJpbmc6bnRoLWNoaWxkKDUpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDUwbXMgKiA1KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgNCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyA0ICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg2KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogNik7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDUgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgNSAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoNykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDcpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyA2ICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDYgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICB9XG5cbiAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIC5zcGlubmVyLXJpbmc6bnRoLWNoaWxkKDgpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDUwbXMgKiA4KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgNyAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyA3ICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg5KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogOSk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSArIDggKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5ICsgOCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmaW5nZXJwcmludC1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKCAzNjBkZWcgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImZpbmdlcnByaW50LXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEZpbmdlcnByaW50U3Bpbm5lci5pcywgRmluZ2VycHJpbnRTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBGbG93ZXJTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Zsb3dlci1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMi41LFxuICAgICAgc2l6ZTogNzAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuZmxvd2VyLXNwaW5uZXIge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWZsb3dlci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgd2lkdGg6IHZhcigtLWZsb3dlci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuZmxvd2VyLXNwaW5uZXIgLmRvdHMtY29udGFpbmVyIHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZsb3dlci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZsb3dlci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICB9XG5cbiAgICAgIC5mbG93ZXItc3Bpbm5lciAuc21hbGxlci1kb3Qge1xuICAgICAgICBhbmltYXRpb246IGZsb3dlci1zcGlubmVyLXNtYWxsZXItZG90LWFuaW1hdGlvbiB2YXIoLS1mbG93ZXItc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgMHMgaW5maW5pdGUgYm90aDtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAuZmxvd2VyLXNwaW5uZXIgLmJpZ2dlci1kb3Qge1xuICAgICAgICBhbmltYXRpb246IGZsb3dlci1zcGlubmVyLWJpZ2dlci1kb3QtYW5pbWF0aW9uIHZhcigtLWZsb3dlci1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAwcyBpbmZpbml0ZSBib3RoO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcGFkZGluZzogMTAlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmbG93ZXItc3Bpbm5lci1iaWdnZXItZG90LWFuaW1hdGlvbiB7XG4gICAgICAgIDAlLCAxMDAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDI1JSwgNzUlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDI2cHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIC0yNnB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMjZweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggLTI2cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMTlweCAtMTlweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAxOXB4IDE5cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgLTE5cHggLTE5cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgLTE5cHggMTlweCAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgICBib3gtc2hhZG93OiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEBrZXlmcmFtZXMgZmxvd2VyLXNwaW5uZXItc21hbGxlci1kb3QtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUsIDEwMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweDtcbiAgICAgICAgfVxuICAgICAgICAyNSUsIDc1JSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAxNHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAtMTRweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDE0cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IC0xNHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDEwcHggLTEwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMTBweCAxMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIC0xMHB4IC0xMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIC0xMHB4IDEwcHggMHB4O1xuICAgICAgICB9XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImZsb3dlci1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RzLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJiaWdnZXItZG90XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic21hbGxlci1kb3RcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShGbG93ZXJTcGlubmVyLmlzLCBGbG93ZXJTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBGdWxmaWxsaW5nQm91bmNpbmdDaXJjbGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Z1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiA0LFxuICAgICAgc2l6ZTogNTAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24gaW5maW5pdGUgdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgZWFzZTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lciAub3JiaXQge1xuICAgICAgICBhbmltYXRpb246IGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItb3JiaXQtYW5pbWF0aW9uIGluZmluaXRlIHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGVhc2U7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjAzKSBzb2xpZCB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1jaXJjbGUtYW5pbWF0aW9uIGluZmluaXRlIHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGVhc2U7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEpIHNvbGlkIHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpIHNjYWxlKDEpO1xuICAgICAgICB3aWR0aDogdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1vcmJpdC1hbmltYXRpb24ge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cbiAgICAgICAgNjIuNSUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC44KTtcbiAgICAgICAgfVxuICAgICAgICA3NSUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cbiAgICAgICAgODcuNSUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC44KTtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1jaXJjbGUtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIDE2LjclIHtcbiAgICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiBpbml0aWFsO1xuICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6IGluaXRpYWw7XG4gICAgICAgIH1cblxuICAgICAgICAzMy40JSB7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIH1cblxuICAgICAgICA1MCUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgNjIuNSUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XG4gICAgICAgIH1cblxuICAgICAgICA3NSUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cblxuICAgICAgICA4Ny41JSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcbiAgICAgICAgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvcmJpdFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRnVsZmlsbGluZ0JvdW5jaW5nQ2lyY2xlU3Bpbm5lci5pcywgRnVsZmlsbGluZ0JvdW5jaW5nQ2lyY2xlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgRnVsZmlsbGluZ1NxdWFyZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDQsXG4gICAgICBzaXplOiA1MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBib3JkZXI6IDRweCBzb2xpZCB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBhbmltYXRpb246IGZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXItYW5pbWF0aW9uIHZhcigtLWZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlIGVhc2U7XG4gICAgICB9XG5cbiAgICAgIC5mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyIC5zcGlubmVyLWlubmVyIHtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgYW5pbWF0aW9uOiBmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLWlubmVyLWFuaW1hdGlvbiB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZSBlYXNlLWluO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIDI1JSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDc1JSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1pbm5lci1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgaGVpZ2h0OiAwJTsgfVxuICAgICAgICAyNSUgIHsgaGVpZ2h0OiAwJTsgfVxuICAgICAgICA1MCUgIHsgaGVpZ2h0OiAxMDAlOyB9XG4gICAgICAgIDc1JSAgeyBoZWlnaHQ6IDEwMCU7IH1cbiAgICAgICAgMTAwJSB7IGhlaWdodDogMCU7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWlubmVyXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShGdWxmaWxsaW5nU3F1YXJlU3Bpbm5lci5pcywgRnVsZmlsbGluZ1NxdWFyZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEhhbGZDaXJjbGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2hhbGYtY2lyY2xlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuaGFsZi1jaXJjbGUtc3Bpbm5lciB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogdmFyKC0taGFsZi1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogdmFyKC0taGFsZi1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmhhbGYtY2lyY2xlLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGJvcmRlcjogY2FsYyh2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMTApIHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5oYWxmLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUuY2lyY2xlLTEge1xuICAgICAgICBhbmltYXRpb246IGhhbGYtY2lyY2xlLXNwaW5uZXItYW5pbWF0aW9uIHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgfVxuXG4gICAgICAuaGFsZi1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlLmNpcmNsZS0yIHtcbiAgICAgICAgYW5pbWF0aW9uOiBoYWxmLWNpcmNsZS1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZSBhbHRlcm5hdGU7XG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgaGFsZi1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJoYWxmLWNpcmNsZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgY2lyY2xlLTFcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZSBjaXJjbGUtMlwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoSGFsZkNpcmNsZVNwaW5uZXIuaXMsIEhhbGZDaXJjbGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBIb2xsb3dEb3RzU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdob2xsb3ctZG90cy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBjb3VudDogMyxcbiAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2NvdW50JyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBjb3VudCwgc2l6ZSB9KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgb2JqZWN0LWN1cmx5LW5ld2xpbmVcbiAgICBjb25zdCBkb3RTdHlsZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGRvdFN0eWxlcy5wdXNoKGBcbiAgICAgICAgLmhvbGxvdy1kb3RzLXNwaW5uZXIgLmRvdDpudGgtY2hpbGQoJHtpfSkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvICR7Y291bnR9ICogJHtpfSk7XG4gICAgICAgIH1cbiAgICAgIGApO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICAqIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cblxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cblxuICAgICAgLmhvbGxvdy1kb3RzLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyICogJHtjb3VudH0pO1xuICAgICAgfVxuXG4gICAgICAuaG9sbG93LWRvdHMtc3Bpbm5lciAuZG90IHtcbiAgICAgICAgYW5pbWF0aW9uOiBob2xsb3ctZG90cy1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBlYXNlIGluZmluaXRlIDBtcztcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXI6IGNhbGModmFyKC0taG9sbG93LWRvdHMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDUpIHNvbGlkIHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIG1hcmdpbjogMCBjYWxjKHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyAyKTtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgICR7ZG90U3R5bGVzLmpvaW4oJycpfVxuXG4gICAgICBAa2V5ZnJhbWVzIGhvbGxvdy1kb3RzLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIH1cblxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY291bnQgfSkge1xuICAgIGNvbnN0IGRvdHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGRvdHMucHVzaCgnPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PicpO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiaG9sbG93LWRvdHMtc3Bpbm5lclwiPlxuICAgICAgICAke2RvdHMuam9pbignJyl9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShIb2xsb3dEb3RzU3Bpbm5lci5pcywgSG9sbG93RG90c1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEludGVyc2VjdGluZ0NpcmNsZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2ludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLjIsXG4gICAgICBzaXplOiAzNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDIpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuc3Bpbm5lckJsb2NrIHtcbiAgICAgICAgYW5pbWF0aW9uOiBpbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGhlaWdodDogdmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0b3A6IDA7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogLTAuMzYpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMik7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogLTAuMzYpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIC0wLjIpO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogLTAuMzYpO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMzYpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIC0wLjIpO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCg2KSB7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMzYpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMik7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDcpIHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjM2KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBpbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIGZyb20geyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgICB0byAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXJCbG9ja1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEludGVyc2VjdGluZ0NpcmNsZXNTcGlubmVyLmlzLCBJbnRlcnNlY3RpbmdDaXJjbGVzU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgTG9vcGluZ1Job21idXNlc1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIuNSxcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDQpO1xuICAgICAgfVxuXG4gICAgICAubG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lciAucmhvbWJ1cyB7XG4gICAgICAgIGFuaW1hdGlvbjogbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lci1hbmltYXRpb24gdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIGhlaWdodDogdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogNCk7XG4gICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSByb3RhdGUoNDVkZWcpIHNjYWxlKDApO1xuICAgICAgICB3aWR0aDogdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIgLnJob21idXM6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMSAvIC0xLjUpO1xuICAgICAgfVxuXG4gICAgICAubG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lciAucmhvbWJ1czpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAyIC8gLTEuNSk7XG4gICAgICB9XG5cbiAgICAgIC5sb29waW5nLXJob21idXNlcy1zcGlubmVyIC5yaG9tYnVzOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAqIDMgLyAtMS41KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBsb29waW5nLXJob21idXNlcy1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCkgICAgIHJvdGF0ZSg0NWRlZykgc2NhbGUoMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjMzJSkgcm90YXRlKDQ1ZGVnKSBzY2FsZSgxKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC00NjYlKSByb3RhdGUoNDVkZWcpIHNjYWxlKDApOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTG9vcGluZ1Job21idXNlc1NwaW5uZXIuaXMsIExvb3BpbmdSaG9tYnVzZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBPcmJpdFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnb3JiaXQtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuMixcbiAgICAgIHNpemU6IDU1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLm9yYml0LXNwaW5uZXIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogdmFyKC0tb3JiaXQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcGVyc3BlY3RpdmU6IDgwMHB4O1xuICAgICAgICB3aWR0aDogdmFyKC0tb3JiaXQtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLm9yYml0LXNwaW5uZXIgLm9yYml0IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5vcmJpdC1zcGlubmVyIC5vcmJpdDpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb246IG9yYml0LXNwaW5uZXItb3JiaXQtb25lLWFuaW1hdGlvbiB2YXIoLS1vcmJpdC1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCB2YXIoLS1vcmJpdC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBsZWZ0OiAwJTtcbiAgICAgICAgdG9wOiAwJTtcbiAgICAgIH1cblxuICAgICAgLm9yYml0LXNwaW5uZXIgLm9yYml0Om50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbjogb3JiaXQtc3Bpbm5lci1vcmJpdC10d28tYW5pbWF0aW9uIHZhcigtLW9yYml0LXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAzcHggc29saWQgdmFyKC0tb3JiaXQtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgcmlnaHQ6IDAlO1xuICAgICAgICB0b3A6IDAlO1xuICAgICAgfVxuXG4gICAgICAub3JiaXQtc3Bpbm5lciAub3JiaXQ6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBvcmJpdC1zcGlubmVyLW9yYml0LXRocmVlLWFuaW1hdGlvbiB2YXIoLS1vcmJpdC1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci10b3A6IDNweCBzb2xpZCB2YXIoLS1vcmJpdC1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3R0b206IDAlO1xuICAgICAgICByaWdodDogMCU7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgb3JiaXQtc3Bpbm5lci1vcmJpdC1vbmUtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWCgzNWRlZykgcm90YXRlWSgtNDVkZWcpIHJvdGF0ZVooMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWCgzNWRlZykgcm90YXRlWSgtNDVkZWcpIHJvdGF0ZVooMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG9yYml0LXNwaW5uZXItb3JiaXQtdHdvLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoNTBkZWcpIHJvdGF0ZVkoMTBkZWcpIHJvdGF0ZVooMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWCg1MGRlZykgcm90YXRlWSgxMGRlZykgcm90YXRlWigzNjBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgb3JiaXQtc3Bpbm5lci1vcmJpdC10aHJlZS1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDM1ZGVnKSByb3RhdGVZKDU1ZGVnKSByb3RhdGVaKDBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMzVkZWcpIHJvdGF0ZVkoNTVkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cIm9yYml0LXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9yYml0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvcmJpdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3JiaXRcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE9yYml0U3Bpbm5lci5pcywgT3JiaXRTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBQaXhlbFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncGl4ZWwtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA3MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5waXhlbC1zcGlubmVyIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1waXhlbC1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgd2lkdGg6IHZhcigtLXBpeGVsLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5waXhlbC1zcGlubmVyIC5waXhlbC1zcGlubmVyLWlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uOiBwaXhlbC1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1waXhlbC1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBpeGVsLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJveC1zaGFkb3c6IDE1cHggMTVweCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAtMTVweCAtMTVweCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAxNXB4IC0xNXB4ICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIC0xNXB4IDE1cHggIDAgMCxcbiAgICAgICAgICAgICAgICAgICAgMCAxNXB4ICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIDE1cHggMCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAtMTVweCAwICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIDAgLTE1cHggMCAwO1xuICAgICAgICBjb2xvcjogdmFyKC0tcGl4ZWwtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXBpeGVsLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyA3KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tcGl4ZWwtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHBpeGVsLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAyMHB4IDIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAtMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDIwcHggLTIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgMHB4IDEwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAxMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIC0xMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDBweCAtMTBweCAwcHggMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAyMHB4IDIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAtMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDIwcHggLTIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgMHB4IDEwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAxMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIC0xMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDBweCAtMTBweCAwcHggMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInBpeGVsLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpeGVsLXNwaW5uZXItaW5uZXJcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFBpeGVsU3Bpbm5lci5pcywgUGl4ZWxTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBSYWRhclNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncmFkYXItc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5yYWRhci1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1yYWRhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1yYWRhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlIHtcbiAgICAgICAgYW5pbWF0aW9uOiByYWRhci1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1yYWRhci1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gNi42Nyk7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMCAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gNi42Nyk7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMSAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gNi42Nyk7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMiAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwbXM7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMyAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGUtaW5uZXIsIC5yYWRhci1zcGlubmVyIC5jaXJjbGUtaW5uZXItY29udGFpbmVyIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXI6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDUgLyAxMTApIHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlLWlubmVyIHtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHZhcigtLXJhZGFyLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogdmFyKC0tcmFkYXItc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyByYWRhci1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInJhZGFyLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lclwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUmFkYXJTcGlubmVyLmlzLCBSYWRhclNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNjYWxpbmdTcXVhcmVzU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuMjUsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGFuaW1hdGlvbjogc2NhbGluZy1zcXVhcmVzLWFuaW1hdGlvbiB2YXIoLS1zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGhlaWdodDogdmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlIHtcbiAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cyk7XG4gICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgICBib3JkZXI6IGNhbGModmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjA0IC8gMS4zKSBzb2xpZCB2YXIoLS1zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yNSAvIDEuMyk7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjI1IC8gMS4zKTtcbiAgICAgIH1cblxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0xO1xuICAgICAgfVxuXG4gICAgICAuc2NhbGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICB9XG5cbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMztcbiAgICAgIH1cblxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC00O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNjYWxpbmctc3F1YXJlcy1hbmltYXRpb24ge1xuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTEge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMyB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLC0xNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTQge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNTAlLC0xNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2NhbGluZy1zcXVhcmVzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2NhbGluZ1NxdWFyZXNTcGlubmVyLmlzLCBTY2FsaW5nU3F1YXJlc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNlbGZCdWlsZGluZ1NxdWFyZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDYsXG4gICAgICBzaXplOiAxMCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiA0KTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyIC8gMyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiA0KTtcbiAgICAgIH1cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmUge1xuICAgICAgICBhbmltYXRpb246IHNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgdmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIG1hcmdpbi1yaWdodDogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gMyk7XG4gICAgICAgIG1hcmdpbi10b3A6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDMpO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAtMiAvIDMpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDYpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogNyk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiA4KTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoNCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDMpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogNCk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDYpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiA1KTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoNykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDApO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg4KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogMSk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDkpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiAyKTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLmNsZWFyIHtcbiAgICAgICAgY2xlYXI6IGJvdGg7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgNSUge1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgNTAuOSUge1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgNTUuOSUge1xuICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgdG9wOiBpbmhlcml0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlIGNsZWFyXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlIGNsZWFyXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2VsZkJ1aWxkaW5nU3F1YXJlU3Bpbm5lci5pcywgU2VsZkJ1aWxkaW5nU3F1YXJlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgU2VtaXBvbGFyU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzZW1pcG9sYXItc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuc2VtaXBvbGFyLXNwaW5uZXIgLnJpbmcge1xuICAgICAgICBhbmltYXRpb246IHNlbWlwb2xhci1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMDUpO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMC4xICogNCk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yICogMCk7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEgKiAwKTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4xICogMCk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAwKTtcbiAgICAgICAgei1pbmRleDogNTtcbiAgICAgIH1cblxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAwLjEgKiAzKTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAxKTtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDEpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEgKiAxKTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDEpO1xuICAgICAgICB6LWluZGV4OiA0O1xuICAgICAgfVxuXG4gICAgICAuc2VtaXBvbGFyLXNwaW5uZXIgLnJpbmc6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAqIDAuMSAqIDIpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDIpO1xuICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4xICogMik7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDIpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yICogMik7XG4gICAgICAgIHotaW5kZXg6IDM7XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoNCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMC4xICogMSk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4yICogMyk7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEgKiAzKTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC4xICogMyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAzKTtcbiAgICAgICAgei1pbmRleDogMjtcbiAgICAgIH1cblxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAwLjEgKiAwKTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjIgKiA0KTtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDQpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEgKiA0KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDQpO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNlbWlwb2xhci1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZykgc2NhbGUoMC43KTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInNlbWlwb2xhci1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTZW1pcG9sYXJTcGlubmVyLmlzLCBTZW1pcG9sYXJTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTcHJpbmdTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3NwcmluZy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMyxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnNwcmluZy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1zcHJpbmctc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgd2lkdGg6IHZhcigtLXNwcmluZy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuc3ByaW5nLXNwaW5uZXIgLnNwcmluZy1zcGlubmVyLXBhcnQge1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tc3ByaW5nLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyAyKTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lkdGg6IHZhcigtLXNwcmluZy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuc3ByaW5nLXNwaW5uZXIgIC5zcHJpbmctc3Bpbm5lci1wYXJ0LmJvdHRvbSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKSBzY2FsZSgtMSwgMSk7XG4gICAgICB9XG5cbiAgICAgIC5zcHJpbmctc3Bpbm5lciAuc3ByaW5nLXNwaW5uZXItcm90YXRvciB7XG4gICAgICAgIGFuaW1hdGlvbjogc3ByaW5nLXNwaW5uZXItYW5pbWF0aW9uIHZhcigtLXNwcmluZy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBlYXNlLWluLW91dCBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHZhcigtLXNwcmluZy1zcGlubmVyX19jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1zcHJpbmctc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKHZhcigtLXNwcmluZy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICAgIGhlaWdodDogdmFyKC0tc3ByaW5nLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0yMDBkZWcpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc3ByaW5nLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc3ByaW5nLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zcHJpbmctc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgICB9XG5cbiAgICAgICAgMjUlIHtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IGNhbGModmFyKC0tc3ByaW5nLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgLyAyMy4zMyk7XG4gICAgICAgIH1cblxuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDExNWRlZyk7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKHZhcigtLXNwcmluZy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICAgIH1cblxuICAgICAgICA3NSUge1xuICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zcHJpbmctc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDIzLjMzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zcHJpbmctc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic3ByaW5nLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXBhcnQgdG9wXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXJvdGF0b3JcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXBhcnQgYm90dG9tXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXJvdGF0b3JcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTcHJpbmdTcGlubmVyLmlzLCBTcHJpbmdTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTd2FwcGluZ1NxdWFyZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3N3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLnN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlIHtcbiAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpO1xuICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMDQgLyAxLjMpIHNvbGlkIHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMjUgLyAxLjMpO1xuICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuMjUgLyAxLjMpO1xuICAgICAgfVxuXG4gICAgICAuc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyKTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTE7XG4gICAgICB9XG5cbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDBtcztcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICB9XG5cbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtMztcbiAgICAgIH1cblxuICAgICAgLnN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogMG1zO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtNDtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0xIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTUwJSwxNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0zIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MCUsLTE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC00IHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTUwJSwtMTUwJSkgc2NhbGUoMiwyKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lclwiIDpzdHlsZT1cInNwaW5uZXJTdHlsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTd2FwcGluZ1NxdWFyZXNTcGlubmVyLmlzLCBTd2FwcGluZ1NxdWFyZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBUcmluaXR5UmluZ3NTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3RyaW5pdHktcmluZ3Mtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuNSxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnRyaW5pdHktcmluZ3Mtc3Bpbm5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHBhZGRpbmc6IDNweDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgIH1cblxuICAgICAgLnRyaW5pdHktcmluZ3Mtc3Bpbm5lciAuY2lyY2xlIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX2NvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB9XG5cbiAgICAgIC50cmluaXR5LXJpbmdzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb246IHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUxLWFuaW1hdGlvbiB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAzcHg7XG4gICAgICAgIGhlaWdodDogdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAudHJpbml0eS1yaW5ncy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uOiB0cmluaXR5LXJpbmdzLXNwaW5uZXItY2lyY2xlMi1hbmltYXRpb24gdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJvcmRlci13aWR0aDogMnB4O1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19zaXplLCAke3NpemV9cHgpICogMC42NSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXRyaW5pdHktcmluZ3Mtc3Bpbm5lcl9fc2l6ZSwgJHtzaXplfXB4KSAqIDAuNjUpO1xuICAgICAgfVxuXG4gICAgICAudHJpbml0eS1yaW5ncy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uOnRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUzLWFuaW1hdGlvbiB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX2R1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX3NpemUsICR7c2l6ZX1weCkgKiAwLjEpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUxLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigyMGRlZykgIHJvdGF0ZVkoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpIHJvdGF0ZVkoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUyLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpIHJvdGF0ZVgoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWigwZGVnKSAgIHJvdGF0ZVgoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUzLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpICByb3RhdGVYKC0zNjBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVooLTM2MGRlZykgcm90YXRlWCgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwidHJpbml0eS1yaW5ncy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShUcmluaXR5UmluZ3NTcGlubmVyLmlzLCBUcmluaXR5UmluZ3NTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCYXJTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Jhci1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBoZWlnaHQ6IDQsXG4gICAgICB3aWR0aDogMTAwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3dpZHRoJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWJhci1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGhlaWdodCgpIHsgcmV0dXJuIGB2YXIoLS1iYXItc3Bpbm5lcl9faGVpZ2h0LCAke3RoaXMucHJvcHMuaGVpZ2h0fXB4KWA7IH1cblxuICBnZXQgd2lkdGgoKSB7IHJldHVybiBgdmFyKC0tYmFyLXNwaW5uZXJfX3dpZHRoLCAke3RoaXMucHJvcHMud2lkdGh9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuYmFyLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5oZWlnaHR9O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAke3RoaXMud2lkdGh9O1xuICAgICAgfVxuXG4gICAgICAuYmFja2dyb3VuZCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGhlaWdodDogJHt0aGlzLmhlaWdodH07XG4gICAgICAgIG9wYWNpdHk6IDAuMjtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogJHt0aGlzLndpZHRofTtcbiAgICAgIH1cblxuICAgICAgLmxvbmcge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBsb25nIDIuMXMgY3ViaWMtYmV6aWVyKDAuNjUsIDAuODE1LCAwLjczNSwgMC4zOTUpIGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLmhlaWdodH07XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lsbC1jaGFuZ2U6IGxlZnQsIHJpZ2h0O1xuICAgICAgfVxuXG4gICAgICAuc2hvcnQge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBzaG9ydCAyLjFzIDEuMTVzIGN1YmljLWJlemllcigwLjE2NSwgMC44NCwgMC40NCwgMSkgaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuaGVpZ2h0fTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWxsLWNoYW5nZTogbGVmdCwgcmlnaHQ7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgbG9uZyB7XG4gICAgICAgIDAlICAgeyBsZWZ0OiAtMzUlOyByaWdodDogMTAwJSB9XG4gICAgICAgIDYwJSAgeyBsZWZ0OiAxMDAlOyByaWdodDogLTkwJSB9XG4gICAgICAgIDEwMCUgeyBsZWZ0OiAxMDAlOyByaWdodDogLTkwJSB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2hvcnQge1xuICAgICAgICAwJSAgIHsgbGVmdDogLTIwMCU7IHJpZ2h0OiAxMDAlIH1cbiAgICAgICAgNjAlICB7IGxlZnQ6IDEwNyU7IHJpZ2h0OiAtOCUgfVxuICAgICAgICAxMDAlIHsgbGVmdDogMTA3JTsgcmlnaHQ6IC04JSB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYmFyLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhY2tncm91bmRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxvbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNob3J0XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShCYXJTcGlubmVyLmlzLCBCYXJTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCZWF0U3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdiZWF0LXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIG1hcmdpbjogMixcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tYmVhdC1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1hcmdpbigpIHsgcmV0dXJuIGB2YXIoLS1iZWF0LXNwaW5uZXJfX21hcmdpbiwgJHt0aGlzLnByb3BzLm1hcmdpbn1weClgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tYmVhdC1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5iZWF0IHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBiZWF0IDAuN3MgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBtYXJnaW46ICR7dGhpcy5tYXJnaW59O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYmVhdDpudGgtY2hpbGQob2RkKSAgeyBhbmltYXRpb24tZGVsYXk6IDBzOyB9XG4gICAgICAuYmVhdDpudGgtY2hpbGQoZXZlbikgeyBhbmltYXRpb24tZGVsYXk6IDAuMzVzOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYmVhdCB7XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpOyBvcGFjaXR5OiAwLjIgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgICAgb3BhY2l0eTogMSB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYmVhdC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiZWF0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiZWF0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiZWF0XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShCZWF0U3Bpbm5lci5pcywgQmVhdFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEJvdW5jZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnYm91bmNlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWJvdW5jZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tYm91bmNlLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmJvdW5jZS1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmJvdW5jZSB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogYm91bmNlIDIuMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBvcGFjaXR5OiAwLjY7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYm91bmNlOm50aC1jaGlsZCgxKSB7IGFuaW1hdGlvbi1kZWxheTogMXM7IH1cbiAgICAgIC5ib3VuY2U6bnRoLWNoaWxkKDIpIHsgYW5pbWF0aW9uLWRlbGF5OiAwczsgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJvdW5jZSB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHNjYWxlKDApOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMCk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJib3VuY2Utc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm91bmNlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3VuY2VcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEJvdW5jZVNwaW5uZXIuaXMsIEJvdW5jZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIENpcmNsZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnY2lyY2xlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWNpcmNsZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBjYWxjdWxhdGVDaXJjbGUoaSkge1xuICAgIHJldHVybiBgXG4gICAgICBhbmltYXRpb24tZGVsYXk6ICR7aSAqIC0wLjJ9cztcbiAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gKiAkezEgLSBpIC8gMTB9KTtcbiAgICAgIGxlZnQ6ICR7aSAqIDAuNyAqIDIuNX0lO1xuICAgICAgdG9wOiAke2kgKiAwLjM1ICogMi41fSU7XG4gICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gKiAkezEgLSBpIC8gMTB9KTtcbiAgICBgO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5jaXJjbGUtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5jaXJjbGUge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBcIlwiO1xuICAgICAgICBhbmltYXRpb246IGNpcmNsZSAxcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJvcmRlci10b3AtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkIG5vbmUgbm9uZSBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHggMXB4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAycyBlYXNlIDBzO1xuICAgICAgfVxuXG4gICAgICAuY2lyY2xlOm50aC1jaGlsZCgxKSB7ICR7dGhpcy5jYWxjdWxhdGVDaXJjbGUoMCl9IH1cbiAgICAgIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHsgJHt0aGlzLmNhbGN1bGF0ZUNpcmNsZSgxKX0gfVxuICAgICAgLmNpcmNsZTpudGgtY2hpbGQoMykgeyAke3RoaXMuY2FsY3VsYXRlQ2lyY2xlKDIpfSB9XG4gICAgICAuY2lyY2xlOm50aC1jaGlsZCg0KSB7ICR7dGhpcy5jYWxjdWxhdGVDaXJjbGUoMyl9IH1cbiAgICAgIC5jaXJjbGU6bnRoLWNoaWxkKDUpIHsgJHt0aGlzLmNhbGN1bGF0ZUNpcmNsZSg0KX0gfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNpcmNsZSB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ2lyY2xlU3Bpbm5lci5pcywgQ2lyY2xlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgQ2xpbWJpbmdCb3hTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2NsaW1iaW5nLWJveC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1jbGltYmluZy1ib3gtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWNsaW1iaW5nLWJveC1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5jbGltYmluZy1ib3gtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogNy4xZW07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IDcuMWVtO1xuICAgICAgfVxuXG4gICAgICAuYm94IHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBjbGltYmluZ0JveCAyLjVzIGluZmluaXRlIGN1YmljLWJlemllcigwLjc5LCAwLCAwLjQ3LCAwLjk3KTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE1JTtcbiAgICAgICAgYm9yZGVyOiAwLjI1ZW0gc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm90dG9tOiAtMC4xZW07XG4gICAgICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgICAgICBoZWlnaHQ6IDFlbTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMWVtKSByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgICAgd2lkdGg6IDFlbTtcbiAgICAgIH1cblxuICAgICAgLmhpbGwge1xuICAgICAgICBib3JkZXItbGVmdDogMC4yNWVtIHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGhlaWdodDogNy4xZW07XG4gICAgICAgIGxlZnQ6IDEuN2VtO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMS43ZW07XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgICAgd2lkdGg6IDcuMWVtO1xuICAgICAgfVxuXG4gICAgICAud3JhcHBlciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgbWFyZ2luLXRvcDogLTIuN2VtO1xuICAgICAgICBtYXJnaW4tbGVmdDogLTIuN2VtO1xuICAgICAgICB3aWR0aDogNS40ZW07XG4gICAgICAgIGhlaWdodDogNS40ZW07XG4gICAgICAgIGZvbnQtc2l6ZTogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNsaW1iaW5nQm94IHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0xZW0pICAgcm90YXRlKC00NWRlZykgfVxuICAgICAgICA1JSAgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTFlbSkgICByb3RhdGUoLTUwZGVnKSB9XG4gICAgICAgIDIwJSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxZW0sIC0yZW0pIHJvdGF0ZSg0N2RlZykgfVxuICAgICAgICAyNSUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMWVtLCAtMmVtKSByb3RhdGUoNDVkZWcpIH1cbiAgICAgICAgMzAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDFlbSwgLTJlbSkgcm90YXRlKDQwZGVnKSB9XG4gICAgICAgIDQ1JSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgyZW0sIC0zZW0pIHJvdGF0ZSgxMzdkZWcpIH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDJlbSwgLTNlbSkgcm90YXRlKDEzNWRlZykgfVxuICAgICAgICA1NSUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMmVtLCAtM2VtKSByb3RhdGUoMTMwZGVnKSB9XG4gICAgICAgIDcwJSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzZW0sIC00ZW0pIHJvdGF0ZSgyMTdkZWcpIH1cbiAgICAgICAgNzUlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDNlbSwgLTRlbSkgcm90YXRlKDIyMGRlZykgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTFlbSkgICByb3RhdGUoLTIyNWRlZykgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImNsaW1iaW5nLWJveC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJveFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaWxsXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ2xpbWJpbmdCb3hTcGlubmVyLmlzLCBDbGltYmluZ0JveFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIENsaXBTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2NsaXAtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogMzUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tY2xpcC1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tY2xpcC1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5jbGlwLXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IGNsaXAgMC43NXMgMHMgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNsaXAge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgICBzY2FsZSgxKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKSBzY2FsZSgwLjgpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpIHNjYWxlKDEpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2xpcC1zcGlubmVyXCI+PC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ2xpcFNwaW5uZXIuaXMsIENsaXBTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBEb3RTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2RvdC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1kb3Qtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWRvdC1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5kb3Qtc3Bpbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb246IHJvdGF0ZSAycyAwcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5kb3Qge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBib3VuY2UgMnMgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gMik7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gMik7XG4gICAgICB9XG5cbiAgICAgIC5kb3Q6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwcztcbiAgICAgICAgYm90dG9tOiBhdXRvO1xuICAgICAgICB0b3A6IDA7XG4gICAgICB9XG5cbiAgICAgIC5kb3Q6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMXM7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgdG9wOiBhdXRvO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJvdW5jZSB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHNjYWxlKDApOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMCk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyByb3RhdGUge1xuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImRvdC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRG90U3Bpbm5lci5pcywgRG90U3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgRmFkZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnZmFkZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBoZWlnaHQ6IDE1LFxuICAgICAgcmFkaXVzOiAxMCxcbiAgICAgIHdpZHRoOiA1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3JhZGl1cycsXG4gICAgICAnd2lkdGgnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tZmFkZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGhlaWdodCgpIHsgcmV0dXJuIGB2YXIoLS1mYWRlLXNwaW5uZXJfX2hlaWdodCwgJHt0aGlzLnByb3BzLmhlaWdodH1weClgOyB9XG5cbiAgZ2V0IHJhZGl1cygpIHsgcmV0dXJuIGB2YXIoLS1mYWRlLXNwaW5uZXJfX3JhZGl1cywgJHt0aGlzLnByb3BzLnJhZGl1c31weClgOyB9XG5cbiAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gYHZhcigtLWZhZGUtc3Bpbm5lcl9fd2lkdGgsICR7dGhpcy5wcm9wcy53aWR0aH1weClgOyB9XG5cbiAgZ2V0IGNlbnRlcigpIHsgcmV0dXJuIGBjYWxjKCR7dGhpcy5yYWRpdXN9ICsgJHt0aGlzLmhlaWdodH0pYDsgfVxuXG4gIGJ1aWxkTGluZShpKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5jb250YWluZXI6bnRoLWNoaWxkKCR7aX0pIHsgdHJhbnNmb3JtOiByb3RhdGUoJHsoaSAtIDEpICogNDV9ZGVnKTsgfVxuICAgICAgLmNvbnRhaW5lcjpudGgtY2hpbGQoJHtpfSkgLmxpbmUgeyBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHtpIC0gMX0gKiAuMTJzKTsgfVxuICAgIGA7XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmZhZGUtc3Bpbm5lciB7XG4gICAgICAgIGZvbnQtc2l6ZTogMDtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5jZW50ZXJ9ICogMik7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5jZW50ZXJ9ICogMik7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLmNvbnRhaW5lciB7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuY2VudGVyfSAqIDIpO1xuICAgICAgICB3aWR0aDogJHt0aGlzLndpZHRofTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IGNhbGMoJHt0aGlzLmNlbnRlcn0gLSAke3RoaXMud2lkdGh9IC8gMik7XG4gICAgICB9XG5cbiAgICAgIC5saW5lIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBmYWRlIDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuaGVpZ2h0fTtcbiAgICAgICAgdHJhbnNpdGlvbjogMnM7XG4gICAgICAgIHdpZHRoOiAke3RoaXMud2lkdGh9O1xuICAgICAgfVxuXG4gICAgICAke3RoaXMuYnVpbGRMaW5lKDEpfVxuICAgICAgJHt0aGlzLmJ1aWxkTGluZSgyKX1cbiAgICAgICR7dGhpcy5idWlsZExpbmUoMyl9XG4gICAgICAke3RoaXMuYnVpbGRMaW5lKDQpfVxuICAgICAgJHt0aGlzLmJ1aWxkTGluZSg1KX1cbiAgICAgICR7dGhpcy5idWlsZExpbmUoNil9XG4gICAgICAke3RoaXMuYnVpbGRMaW5lKDcpfVxuICAgICAgJHt0aGlzLmJ1aWxkTGluZSg4KX1cblxuICAgICAgQGtleWZyYW1lcyBmYWRlIHtcbiAgICAgICAgNTAlICB7IG9wYWNpdHk6IDAuMzsgfVxuICAgICAgICAxMDAlIHsgb3BhY2l0eTogMTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImZhZGUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRmFkZVNwaW5uZXIuaXMsIEZhZGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBHcmlkU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdncmlkLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIG1hcmdpbjogMixcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tZ3JpZC1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1hcmdpbigpIHsgcmV0dXJuIGB2YXIoLS1ncmlkLXNwaW5uZXJfX21hcmdpbiwgJHt0aGlzLnByb3BzLm1hcmdpbn1weClgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tZ3JpZC1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCkge1xuICAgIGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tKCk7XG5cbiAgICByZXR1cm4gYFxuICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAke3JhbmRvbSArIDAuNn1zO1xuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAke3JhbmRvbSAtIDAuMn1zO1xuICAgIGA7XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmdyaWQtc3Bpbm5lciB7XG4gICAgICAgIGZvbnQtc2l6ZTogMDtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9ICogMyArICR7dGhpcy5tYXJnaW59ICogNik7XG4gICAgICB9XG5cbiAgICAgIC5jZWxsIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBncmlkIGluZmluaXRlIGVhc2U7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIG1hcmdpbjogJHt0aGlzLm1hcmdpbn07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5jZWxsOm50aC1jaGlsZCgxKSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDIpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG4gICAgICAuY2VsbDpudGgtY2hpbGQoMykgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cbiAgICAgIC5jZWxsOm50aC1jaGlsZCg0KSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDUpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG4gICAgICAuY2VsbDpudGgtY2hpbGQoNikgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cbiAgICAgIC5jZWxsOm50aC1jaGlsZCg3KSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDgpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG4gICAgICAuY2VsbDpudGgtY2hpbGQoOSkgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cblxuICAgICAgQGtleWZyYW1lcyBncmlkIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGUoMSk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogc2NhbGUoMC41KTsgb3BhY2l0eTogMC43OyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHNjYWxlKDEpOyBvcGFjaXR5OiAxOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShHcmlkU3Bpbm5lci5pcywgR3JpZFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEhhc2hTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2hhc2gtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogNTAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0taGFzaC1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGxhdCgpIHsgcmV0dXJuIGBjYWxjKGNhbGMoJHt0aGlzLnNpemV9IC0gJHt0aGlzLnRoaWNrbmVzc30pIC8gMilgOyB9XG5cbiAgZ2V0IG9mZnNldCgpIHsgcmV0dXJuIGBjYWxjKCR7dGhpcy5sYXR9IC0gJHt0aGlzLnRoaWNrbmVzc30pYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWhhc2gtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIGdldCB0aGlja25lc3MoKSB7IHJldHVybiBgY2FsYygke3RoaXMuc2l6ZX0gLyA1KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmhhc2gtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE2NWRlZyk7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5oYXNoIHtcbiAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAycztcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogbm9uZTtcbiAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IGNhbGMoJHt0aGlzLnNpemV9IC8gMTApO1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSAvIDUpO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIG9wYWNpdHk6IC45O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gNSk7XG4gICAgICB9XG5cbiAgICAgIC5oYXNoOm50aC1jaGlsZCgxKSB7IGFuaW1hdGlvbi1uYW1lOiBiZWZvcmU7IH1cbiAgICAgIC5oYXNoOm50aC1jaGlsZCgyKSB7IGFuaW1hdGlvbi1uYW1lOiBhZnRlcjsgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJlZm9yZSB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMubGF0fSBjYWxjKCR7dGhpcy5vZmZzZXR9ICogLTEpICR7dGhpcy5jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke3RoaXMubGF0fSAqIC0xKSAke3RoaXMub2Zmc2V0fSAke3RoaXMuY29sb3J9O1xuICAgICAgICAgIHdpZHRoOiAke3RoaXMudGhpY2tuZXNzfTtcbiAgICAgICAgfVxuXG4gICAgICAgIDM1JSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCBjYWxjKCR7dGhpcy5vZmZzZXR9ICogLTEpICR7dGhpcy5jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgMCAke3RoaXMub2Zmc2V0fSAke3RoaXMuY29sb3J9O1xuICAgICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICAgIH1cblxuICAgICAgICA3MCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6IGNhbGMoJHt0aGlzLmxhdH0gKiAtMSkgY2FsYygke3RoaXMub2Zmc2V0fSAqIC0xKSAke3RoaXMuY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5sYXR9ICR7dGhpcy5vZmZzZXR9ICR7dGhpcy5jb2xvcn07XG4gICAgICAgICAgd2lkdGg6ICR7dGhpcy50aGlja25lc3N9O1xuICAgICAgICB9XG5cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogJHt0aGlzLmxhdH0gY2FsYygke3RoaXMub2Zmc2V0fSAqIC0xKSAke3RoaXMuY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGMoJHt0aGlzLmxhdH0gKiAtMSkgJHt0aGlzLm9mZnNldH0gJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGFmdGVyIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6ICR7dGhpcy5vZmZzZXR9ICR7dGhpcy5sYXR9ICR7dGhpcy5jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke3RoaXMub2Zmc2V0fSAqIC0xKSBjYWxjKCR7dGhpcy5sYXR9ICogLTEpICR7dGhpcy5jb2xvcn07XG4gICAgICAgICAgaGVpZ2h0OiAke3RoaXMudGhpY2tuZXNzfTtcbiAgICAgICAgfVxuXG4gICAgICAgIDM1JSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogJHt0aGlzLm9mZnNldH0gMCAke3RoaXMuY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGMoJHt0aGlzLm9mZnNldH0gKiAtMSkgMCAke3RoaXMuY29sb3J9O1xuICAgICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICB9XG5cbiAgICAgICAgNzAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMub2Zmc2V0fSBjYWxjKCR7dGhpcy5sYXR9ICogLTEpICR7dGhpcy5jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke3RoaXMub2Zmc2V0fSAqIC0xKSAke3RoaXMubGF0fSAke3RoaXMuY29sb3J9O1xuICAgICAgICAgIGhlaWdodDogJHt0aGlzLnRoaWNrbmVzc307XG4gICAgICAgIH1cblxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMub2Zmc2V0fSAke3RoaXMubGF0fSAke3RoaXMuY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGMoJHt0aGlzLm9mZnNldH0gKiAtMSkgY2FsYygke3RoaXMubGF0fSAqIC0xKSAke3RoaXMuY29sb3J9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiaGFzaC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoYXNoXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoYXNoXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShIYXNoU3Bpbm5lci5pcywgSGFzaFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIE1vb25TcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ21vb24tc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tbW9vbi1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1vb25TaXplKCkgeyByZXR1cm4gYGNhbGMoJHt0aGlzLnNpemV9IC8gNylgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tbW9vbi1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgYmFsbFN0eWxlKHNpemUpIHtcbiAgICByZXR1cm4gYFxuICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgIGhlaWdodDogJHtzaXplfTtcbiAgICAgIHdpZHRoOiAke3NpemV9O1xuICAgIGA7XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLm1vb24tc3Bpbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb246IG1vb24gMC42cyAwcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gKyAke3RoaXMubW9vblNpemV9ICogMik7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9ICsgJHt0aGlzLm1vb25TaXplfSAqIDIpO1xuICAgICAgfVxuXG4gICAgICAuYmFsbCB7XG4gICAgICAgICR7dGhpcy5iYWxsU3R5bGUodGhpcy5tb29uU2l6ZSl9O1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBtb29uIDAuNnMgMHMgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBvcGFjaXR5OiAwLjg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAvIDIgLSAke3RoaXMubW9vblNpemV9IC8gMik7XG4gICAgICB9XG5cbiAgICAgIC5jaXJjbGUge1xuICAgICAgICAke3RoaXMuYmFsbFN0eWxlKHRoaXMuc2l6ZSl9O1xuICAgICAgICBib3JkZXI6ICR7dGhpcy5tb29uU2l6ZX0gc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gICAgICAgIG9wYWNpdHk6IDAuMTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBtb29uIHtcbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtb29uLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTW9vblNwaW5uZXIuaXMsIE1vb25TcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBQYWNtYW5TcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3BhY21hbi1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBtYXJnaW46IDIsXG4gICAgICBzaXplOiAyNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnbWFyZ2luJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXBhY21hbi1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1hcmdpbigpIHsgcmV0dXJuIGB2YXIoLS1wYWNtYW4tc3Bpbm5lcl9fbWFyZ2luLCAke3RoaXMucHJvcHMubWFyZ2lufXB4KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1wYWNtYW4tc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIGJhbGxEZWxheShmYWN0b3IpIHtcbiAgICByZXR1cm4gYGFuaW1hdGlvbi1kZWxheTogJHtmYWN0b3IgKiAwLjI1fXM7YDtcbiAgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAucGFjbWFuLXNwaW5uZXIge1xuICAgICAgICBmb250LXNpemU6IDA7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gKiAyKTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gKiAyKTtcbiAgICAgIH1cblxuICAgICAgLnBhY21hbi10b3Age1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHBhY21hbjEgMC44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogJHt0aGlzLnNpemV9IHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1sZWZ0OiAke3RoaXMuc2l6ZX0gc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogJHt0aGlzLnNpemV9O1xuICAgICAgICBib3JkZXItcmlnaHQ6ICR7dGhpcy5zaXplfSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXRvcDogJHt0aGlzLnNpemV9IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICB9XG5cbiAgICAgIC5wYWNtYW4tYm90dG9tIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBwYWNtYW4yIDAuOHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XG4gICAgICAgIGJvcmRlci1ib3R0b206ICR7dGhpcy5zaXplfSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLWxlZnQ6ICR7dGhpcy5zaXplfSBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAke3RoaXMuc2l6ZX07XG4gICAgICAgIGJvcmRlci1yaWdodDogJHt0aGlzLnNpemV9IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItdG9wOiAke3RoaXMuc2l6ZX0gc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgaGVpZ2h0OiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAwO1xuICAgICAgfVxuXG4gICAgICAuYmFsbCB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogYmFsbCAxcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyAyLjUpO1xuICAgICAgICBsZWZ0OiBjYWxjKCR7dGhpcy5zaXplfSAqIDQpO1xuICAgICAgICBtYXJnaW46ICR7dGhpcy5tYXJnaW59O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogJHt0aGlzLnNpemV9O1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCBjYWxjKCR7dGhpcy5zaXplfSAvIC00KSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAvIDIuNSk7XG4gICAgICB9XG5cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgzKSB7ICR7dGhpcy5iYWxsRGVsYXkoLTMpfSB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoNCkgeyAke3RoaXMuYmFsbERlbGF5KC0yKX0gfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDUpIHsgJHt0aGlzLmJhbGxEZWxheSgtMSl9IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCg2KSB7ICR7dGhpcy5iYWxsRGVsYXkoMCl9IH1cblxuICAgICAgQGtleWZyYW1lcyBiYWxsIHtcbiAgICAgICAgNzUlICB7IG9wYWNpdHk6IDAuNzsgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKGNhbGMoJHt0aGlzLnNpemV9ICogLTQpLCBjYWxjKCR7dGhpcy5zaXplfSAvIC00KSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBwYWNtYW4xIHtcbiAgICAgICAgMCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiByb3RhdGUoLTQ0ZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHBhY21hbjIge1xuICAgICAgICAwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSg0NGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJwYWNtYW4tc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFjbWFuLXRvcFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFjbWFuLWJvdHRvbVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUGFjbWFuU3Bpbm5lci5pcywgUGFjbWFuU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgUHJvcGFnYXRlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdwcm9wYWdhdGUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tcHJvcGFnYXRlLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1wcm9wYWdhdGUtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIGNvbnN0IGRpc3RhbmNlID0gWzEsIDMsIDVdO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5wcm9wYWdhdGUtc3Bpbm5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLmJhbGwge1xuICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDEuNXM7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZDogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBmb250LXNpemU6IGNhbGMoJHt0aGlzLnNpemV9IC8gMyk7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBsZWZ0OiBjYWxjKCR7dGhpcy5zaXplfSAvIC0yKTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IGNhbGMoJHt0aGlzLnNpemV9IC8gLTIpO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYmFsbDpudGgtY2hpbGQoMSkgeyBhbmltYXRpb24tbmFtZTogYmFsbDE7IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgyKSB7IGFuaW1hdGlvbi1uYW1lOiBiYWxsMjsgfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDMpIHsgYW5pbWF0aW9uLW5hbWU6IGJhbGwzOyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoNCkgeyBhbmltYXRpb24tbmFtZTogYmFsbDQ7IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCg1KSB7IGFuaW1hdGlvbi1uYW1lOiBiYWxsNTsgfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDYpIHsgYW5pbWF0aW9uLW5hbWU6IGJhbGw2OyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYmFsbDEge1xuICAgICAgICAyNSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZGlzdGFuY2VbMF19cmVtKSBzY2FsZSgwLjc1KTsgfVxuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZGlzdGFuY2VbMV19cmVtKSBzY2FsZSgwLjYpOyB9XG4gICAgICAgIDc1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtkaXN0YW5jZVsyXX1yZW0pIHNjYWxlKDAuNSk7IH1cbiAgICAgICAgOTUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDByZW0pICAgICAgICAgICAgICAgc2NhbGUoMSk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBiYWxsMiB7XG4gICAgICAgIDI1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtkaXN0YW5jZVswXX1yZW0pIHNjYWxlKDAuNzUpOyB9XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtkaXN0YW5jZVsxXX1yZW0pIHNjYWxlKDAuNik7IH1cbiAgICAgICAgNzUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2Rpc3RhbmNlWzFdfXJlbSkgc2NhbGUoMC42KTsgfVxuICAgICAgICA5NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHJlbSkgICAgICAgICAgICAgICBzY2FsZSgxKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJhbGwzIHtcbiAgICAgICAgMjUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2Rpc3RhbmNlWzBdfXJlbSkgc2NhbGUoMC43NSk7IH1cbiAgICAgICAgNzUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2Rpc3RhbmNlWzBdfXJlbSkgc2NhbGUoMC43NSk7IH1cbiAgICAgICAgOTUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDByZW0pICAgICAgICAgICAgICAgc2NhbGUoMSk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBiYWxsNCB7XG4gICAgICAgIDI1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgke2Rpc3RhbmNlWzBdfXJlbSkgc2NhbGUoMC43NSk7IH1cbiAgICAgICAgNzUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7ZGlzdGFuY2VbMF19cmVtKSBzY2FsZSgwLjc1KTsgfVxuICAgICAgICA5NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHJlbSkgICAgICAgICAgICAgIHNjYWxlKDEpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYmFsbDUge1xuICAgICAgICAyNSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoJHtkaXN0YW5jZVswXX1yZW0pIHNjYWxlKDAuNzUpOyB9XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgke2Rpc3RhbmNlWzFdfXJlbSkgc2NhbGUoMC42KTsgfVxuICAgICAgICA3NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoJHtkaXN0YW5jZVsxXX1yZW0pIHNjYWxlKDAuNik7IH1cbiAgICAgICAgOTUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDByZW0pICAgICAgICAgICAgICBzY2FsZSgxKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJhbGw2IHtcbiAgICAgICAgMjUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7ZGlzdGFuY2VbMF19cmVtKSBzY2FsZSgwLjc1KTsgfVxuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoJHtkaXN0YW5jZVsxXX1yZW0pIHNjYWxlKDAuNik7IH1cbiAgICAgICAgNzUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7ZGlzdGFuY2VbMl19cmVtKSBzY2FsZSgwLjUpOyB9XG4gICAgICAgIDk1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcmVtKSAgICAgICAgICAgICAgc2NhbGUoMSk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJwcm9wYWdhdGUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUHJvcGFnYXRlU3Bpbm5lci5pcywgUHJvcGFnYXRlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgUHVsc2VTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3B1bHNlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIG1hcmdpbjogMixcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tcHVsc2Utc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBtYXJnaW4oKSB7IHJldHVybiBgdmFyKC0tcHVsc2Utc3Bpbm5lcl9fbWFyZ2luLCAke3RoaXMucHJvcHMubWFyZ2lufXB4KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1wdWxzZS1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5wdWxzZS1zcGlubmVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLmJhbGwge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHB1bHNlIDAuNzVzIGluZmluaXRlIGN1YmljLWJlemllcigwLjIsIDAuNjgsIDAuMTgsIDEuMDgpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBtYXJnaW46ICR7dGhpcy5tYXJnaW59O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYmFsbDpudGgtY2hpbGQoMSkgeyBhbmltYXRpb24tZGVsYXk6IDBzOyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tZGVsYXk6IC4xMnM7IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgzKSB7IGFuaW1hdGlvbi1kZWxheTogLjI0czsgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHB1bHNlIHtcbiAgICAgICAgMCUgIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgICBvcGFjaXR5OiAxOyB9XG4gICAgICAgIDQ1JSB7IHRyYW5zZm9ybTogc2NhbGUoMC4xKTsgb3BhY2l0eTogMC43OyB9XG4gICAgICAgIDgwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSk7ICAgb3BhY2l0eTogMTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInB1bHNlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFB1bHNlU3Bpbm5lci5pcywgUHVsc2VTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBSaW5nU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdyaW5nLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXJpbmctc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXJpbmctc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAucmluZy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLnJpbmcge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiAycyAwcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGJvcmRlcjogY2FsYygke3RoaXMuc2l6ZX0gLyAxMCkgc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIG9wYWNpdHk6IDAuNDtcbiAgICAgICAgcGVyc3BlY3RpdmU6IDgwMHB4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLnJpbmc6bnRoLWNoaWxkKDEpIHsgYW5pbWF0aW9uLW5hbWU6IHJpZ2h0OyB9XG4gICAgICAucmluZzpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tbmFtZTogbGVmdDsgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGxlZnQge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDBkZWcpICAgcm90YXRlWSgwZGVnKSAgIHJvdGF0ZVooMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWCgzNjBkZWcpIHJvdGF0ZVkoMTgwZGVnKSByb3RhdGVaKDM2MGRlZyk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyByaWdodCB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMGRlZykgICByb3RhdGVZKDBkZWcpICAgcm90YXRlWigwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgzNjBkZWcpIHJvdGF0ZVooMzYwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInJpbmctc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUmluZ1NwaW5uZXIuaXMsIFJpbmdTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBSaXNlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdyaXNlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIG1hcmdpbjogMixcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tcmlzZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1hcmdpbigpIHsgcmV0dXJuIGB2YXIoLS1yaXNlLXNwaW5uZXJfX21hcmdpbiwgJHt0aGlzLnByb3BzLm1hcmdpbn1weClgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tcmlzZS1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5iYWxsIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiAxcyAwcyBpbmZpbml0ZSBjdWJpYy1iZXppZXIoMC4xNSwgMC40NiwgMC45LCAwLjYpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBtYXJnaW46ICR7dGhpcy5tYXJnaW59O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYmFsbDpudGgtY2hpbGQoZXZlbikgeyBhbmltYXRpb24tbmFtZTogZXZlbjsgfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKG9kZCkgeyBhbmltYXRpb24tbmFtZTogb2RkOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZXZlbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7IH1cbiAgICAgICAgMjUlICB7IHRyYW5zbGF0ZVkoLTMwcHgpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDAuNCk7IH1cbiAgICAgICAgNzUlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzMHB4KTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApIHNjYWxlKDEuMCk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBvZGQge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiBzY2FsZSgwLjQpOyB9XG4gICAgICAgIDI1JSAgeyB0cmFuc2xhdGVZKDMwcHgpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7IH1cbiAgICAgICAgNzUlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzBweCk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSBzY2FsZSgwLjc1KTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInJpc2Utc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUmlzZVNwaW5uZXIuaXMsIFJpc2VTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBSb3RhdGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3JvdGF0ZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBtYXJnaW46IDUsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnbWFyZ2luJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXJvdGF0ZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1hcmdpbigpIHsgcmV0dXJuIGB2YXIoLS1yb3RhdGUtc3Bpbm5lcl9fbWFyZ2luLCAke3RoaXMucHJvcHMubWFyZ2lufXB4KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1yb3RhdGUtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAucm90YXRlLXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHJvdGF0ZSAxcyAwcyBpbmZpbml0ZSBjdWJpYy1iZXppZXIoMC43LCAtMC4xMywgMC4yMiwgMC44Nik7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLmJhbGwge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgbWFyZ2luOiAke3RoaXMubWFyZ2lufTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyByb3RhdGUge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3RhdGUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUm90YXRlU3Bpbm5lci5pcywgUm90YXRlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgU2NhbGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3NjYWxlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIGhlaWdodDogMzUsXG4gICAgICBtYXJnaW46IDIsXG4gICAgICByYWRpdXM6IDIsXG4gICAgICB3aWR0aDogNCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnaGVpZ2h0JyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3JhZGl1cycsXG4gICAgICAnd2lkdGgnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tc2NhbGUtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBoZWlnaHQoKSB7IHJldHVybiBgdmFyKC0tc2NhbGUtc3Bpbm5lcl9faGVpZ2h0LCAke3RoaXMucHJvcHMuaGVpZ2h0fXB4KWA7IH1cblxuICBnZXQgbWFyZ2luKCkgeyByZXR1cm4gYHZhcigtLXNjYWxlLXNwaW5uZXJfX21hcmdpbiwgJHt0aGlzLnByb3BzLm1hcmdpbn1weClgOyB9XG5cbiAgZ2V0IHJhZGl1cygpIHsgcmV0dXJuIGB2YXIoLS1zY2FsZS1zcGlubmVyX19yYWRpdXMsICR7dGhpcy5wcm9wcy5yYWRpdXN9cHgpYDsgfVxuXG4gIGdldCB3aWR0aCgpIHsgcmV0dXJuIGB2YXIoLS1zY2FsZS1zcGlubmVyX193aWR0aCwgJHt0aGlzLnByb3BzLndpZHRofXB4KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1zY2FsZS1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zY2FsZS1zcGlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiByb3RhdGUgMXMgMHMgaW5maW5pdGUgY3ViaWMtYmV6aWVyKDAuNywgLTAuMTMsIDAuMjIsIDAuODYpO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgIC5saW5lIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBzY2FsZSAxcyBpbmZpbml0ZSBjdWJpYy1iZXppZXIoMC4yLCAwLjY4LCAwLjE4LCAxLjA4KTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogJHt0aGlzLnJhZGl1c307XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuaGVpZ2h0fTtcbiAgICAgICAgbWFyZ2luOiAke3RoaXMubWFyZ2lufTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy53aWR0aH07XG4gICAgICB9XG5cbiAgICAgIC5saW5lOm50aC1jaGlsZCgxKSB7IGFuaW1hdGlvbi1kZWxheTogMC4xczsgfVxuICAgICAgLmxpbmU6bnRoLWNoaWxkKDIpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjJzOyB9XG4gICAgICAubGluZTpudGgtY2hpbGQoMykgeyBhbmltYXRpb24tZGVsYXk6IDAuM3M7IH1cbiAgICAgIC5saW5lOm50aC1jaGlsZCg0KSB7IGFuaW1hdGlvbi1kZWxheTogMC40czsgfVxuICAgICAgLmxpbmU6bnRoLWNoaWxkKDUpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjVzOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2NhbGUge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiBzY2FsZXkoMS4wKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiBzY2FsZXkoMC40KTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZXkoMS4wKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInNjYWxlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFNjYWxlU3Bpbm5lci5pcywgU2NhbGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTa2V3U3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdza2V3LXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDIwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXNrZXctc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXNrZXctc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuc2tldy1zcGlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBza2V3IDNzIDBzIGluZmluaXRlIGN1YmljLWJlemllcigwLjA5LCAwLjU3LCAwLjQ5LCAwLjkpO1xuICAgICAgICBib3JkZXItYm90dG9tOiAke3RoaXMuc2l6ZX0gc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLWxlZnQ6ICR7dGhpcy5zaXplfSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAke3RoaXMuc2l6ZX0gc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgaGVpZ2h0OiAwO1xuICAgICAgICB3aWR0aDogMDtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBza2V3IHtcbiAgICAgICAgMjUlICB7IHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwcHgpIHJvdGF0ZVgoMTgwZGVnKSByb3RhdGVZKDApOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgxODBkZWcpOyB9XG4gICAgICAgIDc1JSAgeyB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDApICAgICAgcm90YXRlWSgxODBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDApICAgICAgcm90YXRlWSgwKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInNrZXctc3Bpbm5lclwiPjwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFNrZXdTcGlubmVyLmlzLCBTa2V3U3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgU3F1YXJlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzcXVhcmUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogNTAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tc3F1YXJlLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1zcXVhcmUtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuc3F1YXJlLXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHNxdWFyZSAzcyAwcyBpbmZpbml0ZSBjdWJpYy1iZXppZXIoMC4wOSwgMC41NywgMC40OSwgMC45KTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzcXVhcmUge1xuICAgICAgICAyNSUgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgwKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgxODBkZWcpOyB9XG4gICAgICAgIDc1JSAgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMCkgICAgICByb3RhdGVZKDE4MGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWCgwKSAgICAgIHJvdGF0ZVkoMCk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmUtc3Bpbm5lclwiPjwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFNxdWFyZVNwaW5uZXIuaXMsIFNxdWFyZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFN5bmNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3N5bmMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgbWFyZ2luOiAyLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ21hcmdpbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1zeW5jLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgbWFyZ2luKCkgeyByZXR1cm4gYHZhcigtLXN5bmMtc3Bpbm5lcl9fbWFyZ2luLCAke3RoaXMucHJvcHMubWFyZ2lufXB4KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1zeW5jLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnN5bmMtc3Bpbm5lciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICB9XG5cbiAgICAgIC5iYWxsIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBzeW5jIDAuNnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBtYXJnaW46ICR7dGhpcy5tYXJnaW59O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYmFsbDpudGgtY2hpbGQoMSkgeyBhbmltYXRpb24tZGVsYXk6IDBzOyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tZGVsYXk6IDAuMDdzOyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoMykgeyBhbmltYXRpb24tZGVsYXk6IDAuMTRzOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc3luYyB7XG4gICAgICAgIDMzJSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTBweCk7IH1cbiAgICAgICAgNjYlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTBweCk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInN5bmMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU3luY1NwaW5uZXIuaXMsIFN5bmNTcGlubmVyKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQUFBLE1BQU0sY0FBYyxTQUFTLFdBQVcsQ0FBQztFQUN6QyxFQUFFLFdBQVcsR0FBRztFQUNoQixJQUFJLEtBQUssRUFBRSxDQUFDOztFQUVaLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztFQUMzQyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0VBQ3BELEdBQUc7O0VBRUgsRUFBRSxpQkFBaUIsR0FBRztFQUN0QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztFQUNsQixHQUFHOztFQUVILEVBQUUsd0JBQXdCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7RUFDckQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7RUFFbkUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7RUFDbEIsR0FBRzs7RUFFSCxFQUFFLEtBQUssR0FBRztFQUNWLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFD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
