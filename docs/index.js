(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.WcEpicSpinners = {}));
}(this, function (exports) { 'use strict';

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

    template() {
      throw new Error('template(props) must be implemented');
    }

    update() {
      const template = this.template(this.props);

      const styles = `
      <style>
        * { box-sizing: border-box; }

        :host           { display: block; }
        :host([hidden]) { display: none; }

        ${this.style(this.props)}
      </style>
    `;

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
        height: var(--atom-spinner-size, ${size}px);
        overflow: hidden;
        width: var(--atom-spinner-size, ${size}px);
      }

      .atom-spinner .spinner-inner {
        display: block;
        height: 100%;
        position: relative;
        width: 100%;
      }

      .atom-spinner .spinner-circle {
        color: var(--atom-spinner-color, ${color});
        display: block;
        font-size: calc(var(--atom-spinner-size, ${size}px) * 0.24);
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .atom-spinner .spinner-line {
        border-left: calc(var(--atom-spinner-size, ${size}px) / 25) solid var(--atom-spinner-color, ${color});
        border-radius: 50%;
        border-top: calc(var(--atom-spinner-size, ${size}px) / 25) solid transparent;
        height: 100%;
        position: absolute;
        width: 100%;
      }

      .atom-spinner .spinner-line:nth-child(1) {
        animation: atom-spinner-animation-1 var(--atom-spinner-duration, ${duration}s) linear infinite;
        transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
      }

      .atom-spinner .spinner-line:nth-child(2) {
        animation: atom-spinner-animation-2 var(--atom-spinner-duration, ${duration}s) linear infinite;
        transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
      }

      .atom-spinner .spinner-line:nth-child(3) {
        animation: atom-spinner-animation-3 var(--atom-spinner-duration, ${duration}s) linear infinite;
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
        height: var(--breeding-rhombus-spinner-size, ${size}px);
        width: var(--breeding-rhombus-spinner-size, ${size}px);
        position: relative;
        transform: rotate(45deg);
      }

      .breeding-rhombus-spinner, .breeding-rhombus-spinner * {
        box-sizing: border-box;
      }

      .breeding-rhombus-spinner .rhombus {
        animation-duration: var(--breeding-rhombus-spinner-duration, ${duration}s);
        animation-iteration-count: infinite;
        background-color: var(--breeding-rhombus-spinner-color, ${color});
        height: calc(var(--breeding-rhombus-spinner-size, ${size}px) / 7.5);
        left: calc(var(--breeding-rhombus-spinner-size, ${size}px) / 2.3077);
        position: absolute;
        top: calc(var(--breeding-rhombus-spinner-size, ${size}px) / 2.3077);
        width: calc(var(--breeding-rhombus-spinner-size, ${size}px) / 7.5);
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
        animation: breeding-rhombus-spinner-animation-child-big var(--breeding-rhombus-spinner-duration, ${duration}s) infinite;
        background-color: var(--breeding-rhombus-spinner-color, ${color});
        height: calc(var(--breeding-rhombus-spinner-size, ${size}px) / 3);
        left: calc(var(--breeding-rhombus-spinner-size, ${size}px) / 3);
        top: calc(var(--breeding-rhombus-spinner-size, ${size}px) / 3);
        width: calc(var(--breeding-rhombus-spinner-size, ${size}px) / 3);
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
          animation-delay: calc(var(--circles-to-rhombuses-spinner-duration, ${duration}s) / 8 * ${i});
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
        height: var(--circles-to-rhombuses-spinner-size, ${size}px);
        justify-content: center
        width: calc((var(--circles-to-rhombuses-spinner-size, ${size}px) + var(--circles-to-rhombuses-spinner-size, ${size}px) * 1.125) * ${count});
      }

      .circles-to-rhombuses-spinner .circle {
        animation: circles-to-rhombuses-animation var(--circles-to-rhombuses-spinner-duration, ${duration}s) linear infinite;
        background: transparent;
        border-radius: 10%;
        border: 3px solid var(--circles-to-rhombuses-spinner-color, ${color});
        height: var(--circles-to-rhombuses-spinner-size, ${size}px);
        margin-left: calc(var(--circles-to-rhombuses-spinner-size, ${size}px) * 1.125);
        overflow: hidden;
        transform: rotate(45deg);
        width: var(--circles-to-rhombuses-spinner-size, ${size}px);
      }

      .circles-to-rhombuses-spinner .circle:nth-child(1) {
        animation-delay: calc(var(--circles-to-rhombuses-spinner-duration, ${duration}s) / 8 * 1);
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
        height: var(--fingerprint-spinner-size, ${size}px);
        overflow: hidden;
        padding: 2px;
        position: relative;
        width: var(--fingerprint-spinner-size, ${size}px);
      }

      .fingerprint-spinner .spinner-ring {
        animation: fingerprint-spinner-animation var(--fingerprint-spinner-duration, ${duration}s) cubic-bezier(0.680, -0.750, 0.265, 1.750) infinite forwards;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-radius: 50%;
        border-right-color: transparent;
        border-style: solid;
        border-top-color: var(--fingerprint-spinner-color, ${color});
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
        height: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 0 * var(--fingerprint-spinner-size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 0 * var(--fingerprint-spinner-size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(2) {
        animation-delay: calc(50ms * 2);
        height: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 1 * var(--fingerprint-spinner-size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 1 * var(--fingerprint-spinner-size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(3) {
        animation-delay: calc(50ms * 3);
        height: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 2 * var(--fingerprint-spinner-size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 2 * var(--fingerprint-spinner-size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(4) {
        animation-delay: calc(50ms * 4);
        height: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 3 * var(--fingerprint-spinner-size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 3 * var(--fingerprint-spinner-size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(5) {
        animation-delay: calc(50ms * 5);
        height: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 4 * var(--fingerprint-spinner-size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 4 * var(--fingerprint-spinner-size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(6) {
        animation-delay: calc(50ms * 6);
        height: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 5 * var(--fingerprint-spinner-size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 5 * var(--fingerprint-spinner-size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(7) {
        animation-delay: calc(50ms * 7);
        height: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 6 * var(--fingerprint-spinner-size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 6 * var(--fingerprint-spinner-size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(8) {
        animation-delay: calc(50ms * 8);
        height: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 7 * var(--fingerprint-spinner-size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 7 * var(--fingerprint-spinner-size, ${size}px) / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(9) {
        animation-delay: calc(50ms * 9);
        height: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 8 * var(--fingerprint-spinner-size, ${size}px) / 9);
        width: calc(var(--fingerprint-spinner-size, ${size}px) / 9 + 8 * var(--fingerprint-spinner-size, ${size}px) / 9);
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
        height: var(--flower-spinner-size, ${size}px);
        justify-content: center;
        width: var(--flower-spinner-size, ${size}px);
      }

      .flower-spinner .dots-container {
        height: calc(var(--flower-spinner-size, ${size}px) / 7);
        width: calc(var(--flower-spinner-size, ${size}px) / 7);
      }

      .flower-spinner .smaller-dot {
        animation: flower-spinner-smaller-dot-animation var(--flower-spinner-duration, ${duration}s) 0s infinite both;
        background: var(--fingerprint-spinner-color, ${color});
        border-radius: 50%;
        height: 100%;
        width: 100%;
      }

      .flower-spinner .bigger-dot {
        animation: flower-spinner-bigger-dot-animation var(--flower-spinner-duration, ${duration}s) 0s infinite both;
        background: var(--fingerprint-spinner-color, ${color});
        border-radius: 50%;
        height: 100%;
        padding: 10%;
        width: 100%;
      }

      @keyframes flower-spinner-bigger-dot-animation {
        0%, 100% {
          box-shadow: var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px;
        }
        50% {
          transform: rotate(180deg);
        }
        25%, 75% {
          box-shadow: var(--fingerprint-spinner-color, ${color}) 26px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) -26px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 26px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px -26px 0px,
                      var(--fingerprint-spinner-color, ${color}) 19px -19px 0px,
                      var(--fingerprint-spinner-color, ${color}) 19px 19px 0px,
                      var(--fingerprint-spinner-color, ${color}) -19px -19px 0px,
                      var(--fingerprint-spinner-color, ${color}) -19px 19px 0px;
        }
        100% {
          transform: rotate(360deg);
          box-shadow: var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px;
        }
      }
      @keyframes flower-spinner-smaller-dot-animation {
        0%, 100% {
          box-shadow: var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
          var(--fingerprint-spinner-color, ${color}) 0px 0px 0px;
        }
        25%, 75% {
          box-shadow: var(--fingerprint-spinner-color, ${color}) 14px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) -14px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 14px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px -14px 0px,
                      var(--fingerprint-spinner-color, ${color}) 10px -10px 0px,
                      var(--fingerprint-spinner-color, ${color}) 10px 10px 0px,
                      var(--fingerprint-spinner-color, ${color}) -10px -10px 0px,
                      var(--fingerprint-spinner-color, ${color}) -10px 10px 0px;
        }
        100% {
          box-shadow: var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px,
                      var(--fingerprint-spinner-color, ${color}) 0px 0px 0px;
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
        animation: fulfilling-bouncing-circle-spinner-animation infinite var(--fulfilling-bouncing-circle-spinner-duration, ${duration}s) ease;
        height: var(--fulfilling-bouncing-circle-spinner-size, ${size}px);
        position: relative;
        width: var(--fulfilling-bouncing-circle-spinner-size, ${size}px);
      }

      .fulfilling-bouncing-circle-spinner .orbit {
        animation: fulfilling-bouncing-circle-spinner-orbit-animation infinite var(--fulfilling-bouncing-circle-spinner-duration, ${duration}s) ease;
        border-radius: 50%;
        border: calc(var(--fulfilling-bouncing-circle-spinner-size, ${size}px) * 0.03) solid var(--fulfilling-bouncing-circle-spinner-color, ${color});
        height: var(--fulfilling-bouncing-circle-spinner-size, ${size}px);
        left: 0;
        position: absolute;
        top: 0;
        width: var(--fulfilling-bouncing-circle-spinner-size, ${size}px);
      }

      .fulfilling-bouncing-circle-spinner .circle {
        animation: fulfilling-bouncing-circle-spinner-circle-animation infinite var(--fulfilling-bouncing-circle-spinner-duration, ${duration}s) ease;
        border-radius: 50%;
        border: calc(var(--fulfilling-bouncing-circle-spinner-size, ${size}px) * 0.1) solid var(--fulfilling-bouncing-circle-spinner-color, ${color});
        color: var(--fulfilling-bouncing-circle-spinner-color, ${color});
        display: block;
        height: var(--fulfilling-bouncing-circle-spinner-size, ${size}px);
        position: relative;
        transform: rotate(0deg) scale(1);
        width: var(--fulfilling-bouncing-circle-spinner-size, ${size}px);
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
        height: var(--fulfilling-square-spinner-size, ${size}px);
        width: var(--fulfilling-square-spinner-size, ${size}px);
        position: relative;
        border: 4px solid var(--fulfilling-square-spinner-color, ${color});
        animation: fulfilling-square-spinner-animation var(--fulfilling-square-spinner-duration, ${duration}s) infinite ease;
      }

      .fulfilling-square-spinner .spinner-inner {
        vertical-align: top;
        display: inline-block;
        background-color: var(--fulfilling-square-spinner-color, ${color});
        width: 100%;
        opacity: 1;
        animation: fulfilling-square-spinner-inner-animation var(--fulfilling-square-spinner-duration, ${duration}s) infinite ease-in;
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
        height: var(--half-circle-spinner-size, ${size}px);
        position: relative;
        width: var(--half-circle-spinner-size, ${size}px);
      }

      .half-circle-spinner .circle {
        border-radius: 100%;
        border: calc(var(--half-circle-spinner-size, ${size}px) / 10) solid transparent;
        content: "";
        height: 100%;
        position: absolute;
        width: 100%;
      }

      .half-circle-spinner .circle.circle-1 {
        animation: half-circle-spinner-animation var(--half-circle-spinner-duration, ${duration}s) infinite;
        border-top-color: var(--half-circle-spinner-color, ${color});
      }

      .half-circle-spinner .circle.circle-2 {
        animation: half-circle-spinner-animation var(--half-circle-spinner-duration, ${duration}s) infinite alternate;
        border-bottom-color: var(--half-circle-spinner-color, ${color});
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
          animation-delay: calc(var(--hollow-dots-spinner-duration, ${duration}s) / ${count} * ${i});
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
        height: var(--hollow-dots-spinner-size, ${size}px);
        width: calc(var(--hollow-dots-spinner-size, ${size}px) * 2 * ${count});
      }

      .hollow-dots-spinner .dot {
        animation: hollow-dots-spinner-animation var(--hollow-dots-spinner-duration, ${duration}s) ease infinite 0ms;
        border-radius: 50%;
        border: calc(var(--hollow-dots-spinner-size, ${size}px) / 5) solid var(--hollow-dots-spinner-color, ${color});
        float: left;
        height: var(--hollow-dots-spinner-size, ${size}px);
        margin: 0 calc(var(--hollow-dots-spinner-size, ${size}px) / 2);
        transform: scale(0);
        width: var(--hollow-dots-spinner-size, ${size}px);
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
        height: calc(var(--intersecting-circles-spinner-size, ${size}px) * 2);
        width: calc(var(--intersecting-circles-spinner-size, ${size}px) * 2);
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

      .intersecting-circles-spinner .spinnerBlock {
        animation: intersecting-circles-spinners-animation var(--intersecting-circles-spinner-duration, ${duration}s) linear infinite;
        transform-origin: center;
        display: block;
        height: var(--intersecting-circles-spinner-size, ${size}px);
        width: var(--intersecting-circles-spinner-size, ${size}px);
      }

      .intersecting-circles-spinner .circle {
        display: block;
        border: 2px solid var(--intersecting-circles-spinner-color, ${color});
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
        left: calc(var(--intersecting-circles-spinner-size, ${size}px) * -0.36);
        top: calc(var(--intersecting-circles-spinner-size, ${size}px) * 0.2);
      }

      .intersecting-circles-spinner .circle:nth-child(3) {
        left: calc(var(--intersecting-circles-spinner-size, ${size}px) * -0.36);
        top: calc(var(--intersecting-circles-spinner-size, ${size}px) * -0.2);
      }

      .intersecting-circles-spinner .circle:nth-child(4) {
        left: 0;
        top: calc(var(--intersecting-circles-spinner-size, ${size}px) * -0.36);
      }

      .intersecting-circles-spinner .circle:nth-child(5) {
        left: calc(var(--intersecting-circles-spinner-size, ${size}px) * 0.36);
        top: calc(var(--intersecting-circles-spinner-size, ${size}px) * -0.2);
      }

      .intersecting-circles-spinner .circle:nth-child(6) {
        left: calc(var(--intersecting-circles-spinner-size, ${size}px) * 0.36);
        top: calc(var(--intersecting-circles-spinner-size, ${size}px) * 0.2);
      }

      .intersecting-circles-spinner .circle:nth-child(7) {
        left: 0;
        top: calc(var(--intersecting-circles-spinner-size, ${size}px) * 0.36);
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
        height: var(--looping-rhombuses-spinner-size, ${size}px);
        position: relative;
        width: calc(var(--looping-rhombuses-spinner-size, ${size}px) * 4);
      }

      .looping-rhombuses-spinner .rhombus {
        animation: looping-rhombuses-spinner-animation var(--looping-rhombuses-spinner-duration, ${duration}s) linear infinite;
        background-color: var(--looping-rhombuses-spinner-color, ${color});
        border-radius: 2px;
        height: var(--looping-rhombuses-spinner-size, ${size}px);
        left: calc(var(--looping-rhombuses-spinner-size, ${size}px) * 4);
        margin: 0 auto;
        position: absolute;
        transform: translateY(0) rotate(45deg) scale(0);
        width: var(--looping-rhombuses-spinner-size, ${size}px);
      }

      .looping-rhombuses-spinner .rhombus:nth-child(1) {
        animation-delay: calc(var(--looping-rhombuses-spinner-duration, ${duration}s) * 1 / -1.5);
      }

      .looping-rhombuses-spinner .rhombus:nth-child(2) {
        animation-delay: calc(var(--looping-rhombuses-spinner-duration, ${duration}s) * 2 / -1.5);
      }

      .looping-rhombuses-spinner .rhombus:nth-child(3) {
        animation-delay: calc(var(--looping-rhombuses-spinner-duration, ${duration}s) * 3 / -1.5);
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
        height: var(--orbit-spinner-size, ${size}px);
        perspective: 800px;
        width: var(--orbit-spinner-size, ${size}px);
      }

      .orbit-spinner .orbit {
        border-radius: 50%;
        box-sizing: border-box;
        height: 100%;
        position: absolute;
        width: 100%;
      }

      .orbit-spinner .orbit:nth-child(1) {
        animation: orbit-spinner-orbit-one-animation var(--orbit-spinner-duration, ${duration}s) linear infinite;
        border-bottom: 3px solid var(--orbit-spinner-color, ${color});
        left: 0%;
        top: 0%;
      }

      .orbit-spinner .orbit:nth-child(2) {
        animation: orbit-spinner-orbit-two-animation var(--orbit-spinner-duration, ${duration}s) linear infinite;
        border-right: 3px solid var(--orbit-spinner-color, ${color});
        right: 0%;
        top: 0%;
      }

      .orbit-spinner .orbit:nth-child(3) {
        animation: orbit-spinner-orbit-three-animation var(--orbit-spinner-duration, ${duration}s) linear infinite;
        border-top: 3px solid var(--orbit-spinner-color, ${color});
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
        height: var(--pixel-spinner-size, ${size}px);
        justify-content: center;
        width: var(--pixel-spinner-size, ${size}px);
      }

      .pixel-spinner .pixel-spinner-inner {
        animation: pixel-spinner-animation var(--pixel-spinner-duration, ${duration}s) linear infinite;
        background-color: var(--pixel-spinner-color, ${color});
        box-shadow: 15px 15px  0 0,
                    -15px -15px  0 0,
                    15px -15px  0 0,
                    -15px 15px  0 0,
                    0 15px  0 0,
                    15px 0  0 0,
                    -15px 0  0 0,
                    0 -15px 0 0;
        color: var(--pixel-spinner-color, ${color});
        height: calc(var(--pixel-spinner-size, ${size}px) / 7);
        width: calc(var(--pixel-spinner-size, ${size}px) / 7);
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
        height: var(--radar-spinner-size, ${size}px);
        position: relative;
        width: var(--radar-spinner-size, ${size}px);
      }

      .radar-spinner .circle {
        animation: radar-spinner-animation var(--radar-spinner-duration, ${duration}s) infinite;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }

      .radar-spinner .circle:nth-child(1) {
        animation-delay: calc(var(--radar-spinner-duration, ${duration}s) / 6.67);
        padding: calc(var(--radar-spinner-size, ${size}px) * 5 * 2 * 0 / 110);
      }

      .radar-spinner .circle:nth-child(2) {
        animation-delay: calc(var(--radar-spinner-duration, ${duration}s) / 6.67);
        padding: calc(var(--radar-spinner-size, ${size}px) * 5 * 2 * 1 / 110);
      }

      .radar-spinner .circle:nth-child(3) {
        animation-delay: calc(var(--radar-spinner-duration, ${duration}s) / 6.67);
        padding: calc(var(--radar-spinner-size, ${size}px) * 5 * 2 * 2 / 110);
      }

      .radar-spinner .circle:nth-child(4) {
        animation-delay: 0ms;
        padding: calc(var(--radar-spinner-size, ${size}px) * 5 * 2 * 3 / 110);
      }

      .radar-spinner .circle-inner, .radar-spinner .circle-inner-container {
        border-radius: 50%;
        border: calc(var(--radar-spinner-size, ${size}px) * 5 / 110) solid transparent;
        height: 100%;
        width: 100%;
      }

      .radar-spinner .circle-inner {
        border-left-color: var(--radar-spinner-color, ${color});
        border-right-color: var(--radar-spinner-color, ${color});
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
        animation: scaling-squares-animation var(--scaling-squares-spinner-duration, ${duration}s) infinite;
        display: flex;
        flex-direction: row;
        height: var(--scaling-squares-spinner-size, ${size}px);
        justify-content: center;
        position: relative;
        transform: rotate(0deg);
        width: var(--scaling-squares-spinner-size, ${size}px);
      }

      .scaling-squares-spinner .square {
        animation-duration: var(--scaling-squares-spinner-duration, ${duration}s);
        animation-iteration-count: infinite;
        border: calc(var(--scaling-squares-spinner-size, ${size}px) * 0.04 / 1.3) solid var(--scaling-squares-spinner-color, ${color});
        height: calc(var(--scaling-squares-spinner-size, ${size}px) * 0.25 / 1.3);
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        width: calc(var(--scaling-squares-spinner-size, ${size}px) * 0.25 / 1.3);
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
        height: calc(var(--self-building-square-spinner-size, ${size}px) * 4);
        top: calc(var(--self-building-square-spinner-size, ${size}px) * 2 / 3);
        width: calc(var(--self-building-square-spinner-size, ${size}px) * 4);
      }
      .self-building-square-spinner .square {
        animation: self-building-square-spinner var(--self-building-square-spinner-duration, ${duration}s) infinite;
        background: var(--self-building-square-spinner-color, ${color});
        float: left;
        height: var(--self-building-square-spinner-size, ${size}px);
        margin-right: calc(var(--self-building-square-spinner-size, ${size}px) / 3);
        margin-top: calc(var(--self-building-square-spinner-size, ${size}px) / 3);
        opacity: 0;
        position:relative;
        top: calc(var(--self-building-square-spinner-size, ${size}px) * -2 / 3);
        width: var(--self-building-square-spinner-size, ${size}px);
      }

      .self-building-square-spinner .square:nth-child(1) {
        animation-delay: calc(var(--self-building-square-spinner-duration, ${duration}s) / 20 * 6);
      }

      .self-building-square-spinner .square:nth-child(2) {
        animation-delay: calc(var(--self-building-square-spinner-duration, ${duration}s) / 20 * 7);
      }

      .self-building-square-spinner .square:nth-child(3) {
        animation-delay: calc(var(--self-building-square-spinner-duration, ${duration}s) / 20 * 8);
      }

      .self-building-square-spinner .square:nth-child(4) {
        animation-delay: calc(var(--self-building-square-spinner-duration, ${duration}s) / 20 * 3);
      }

      .self-building-square-spinner .square:nth-child(5) {
        animation-delay: calc(var(--self-building-square-spinner-duration, ${duration}s) / 20 * 4);
      }

      .self-building-square-spinner .square:nth-child(6) {
        animation-delay: calc(var(--self-building-square-spinner-duration, ${duration}s) / 20 * 5);
      }

      .self-building-square-spinner .square:nth-child(7) {
        animation-delay: calc(var(--self-building-square-spinner-duration, ${duration}s) / 20 * 0);
      }

      .self-building-square-spinner .square:nth-child(8) {
        animation-delay: calc(var(--self-building-square-spinner-duration, ${duration}s) / 20 * 1);
      }

      .self-building-square-spinner .square:nth-child(9) {
        animation-delay: calc(var(--self-building-square-spinner-duration, ${duration}s) / 20 * 2);
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
        height: var(--semipolar-spinner-size, ${size}px);
        position: relative;
        width: var(--semipolar-spinner-size, ${size}px);
      }

      .semipolar-spinner .ring {
        animation: semipolar-spinner-animation var(--semipolar-spinner-duration, ${duration}s) infinite;
        border-bottom-color: transparent;
        border-left-color: var(--semipolar-spinner-color, ${color});
        border-radius: 50%;
        border-right-color: transparent;
        border-style: solid;
        border-top-color: var(--semipolar-spinner-color, ${color});
        border-width: calc(var(--semipolar-spinner-size, ${size}px) * 0.05);
        position: absolute;
      }

      .semipolar-spinner .ring:nth-child(1) {
        animation-delay: calc(var(--semipolar-spinner-duration, ${duration}s) * 0.1 * 4);
        height: calc(var(--semipolar-spinner-size, ${size}px) - var(--semipolar-spinner-size, ${size}px) * 0.2 * 0);
        left: calc(var(--semipolar-spinner-size, ${size}px) * 0.1 * 0);
        top: calc(var(--semipolar-spinner-size, ${size}px) * 0.1 * 0);
        width: calc(var(--semipolar-spinner-size, ${size}px) - var(--semipolar-spinner-size, ${size}px) * 0.2 * 0);
        z-index: 5;
      }

      .semipolar-spinner .ring:nth-child(2) {
        animation-delay: calc(var(--semipolar-spinner-duration, ${duration}s) * 0.1 * 3);
        height: calc(var(--semipolar-spinner-size, ${size}px) - var(--semipolar-spinner-size, ${size}px) * 0.2 * 1);
        left: calc(var(--semipolar-spinner-size, ${size}px) * 0.1 * 1);
        top: calc(var(--semipolar-spinner-size, ${size}px) * 0.1 * 1);
        width: calc(var(--semipolar-spinner-size, ${size}px) - var(--semipolar-spinner-size, ${size}px) * 0.2 * 1);
        z-index: 4;
      }

      .semipolar-spinner .ring:nth-child(3) {
        animation-delay: calc(var(--semipolar-spinner-duration, ${duration}s) * 0.1 * 2);
        height: calc(var(--semipolar-spinner-size, ${size}px) - var(--semipolar-spinner-size, ${size}px) * 0.2 * 2);
        left: calc(var(--semipolar-spinner-size, ${size}px) * 0.1 * 2);
        top: calc(var(--semipolar-spinner-size, ${size}px) * 0.1 * 2);
        width: calc(var(--semipolar-spinner-size, ${size}px) - var(--semipolar-spinner-size, ${size}px) * 0.2 * 2);
        z-index: 3;
      }

      .semipolar-spinner .ring:nth-child(4) {
        animation-delay: calc(var(--semipolar-spinner-duration, ${duration}s) * 0.1 * 1);
        height: calc(var(--semipolar-spinner-size, ${size}px) - var(--semipolar-spinner-size, ${size}px) * 0.2 * 3);
        left: calc(var(--semipolar-spinner-size, ${size}px) * 0.1 * 3);
        top: calc(var(--semipolar-spinner-size, ${size}px) * 0.1 * 3);
        width: calc(var(--semipolar-spinner-size, ${size}px) - var(--semipolar-spinner-size, ${size}px) * 0.2 * 3);
        z-index: 2;
      }

      .semipolar-spinner .ring:nth-child(5) {
        animation-delay: calc(var(--semipolar-spinner-duration, ${duration}s) * 0.1 * 0);
        height: calc(var(--semipolar-spinner-size, ${size}px) - var(--semipolar-spinner-size, ${size}px) * 0.2 * 4);
        left: calc(var(--semipolar-spinner-size, ${size}px) * 0.1 * 4);
        top: calc(var(--semipolar-spinner-size, ${size}px) * 0.1 * 4);
        width: calc(var(--semipolar-spinner-size, ${size}px) - var(--semipolar-spinner-size, ${size}px) * 0.2 * 4);
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
        height: var(--spring-spinner-size, ${size}px);
        width: var(--spring-spinner-size, ${size}px);
      }

      .spring-spinner .spring-spinner-part {
        height: calc(var(--spring-spinner-size, ${size}px) / 2);
        overflow: hidden;
        width: var(--spring-spinner-size, ${size}px);
      }

      .spring-spinner  .spring-spinner-part.bottom {
          transform: rotate(180deg) scale(-1, 1);
      }

      .spring-spinner .spring-spinner-rotator {
        animation: spring-spinner-animation var(--spring-spinner-duration, ${duration}s) ease-in-out infinite;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-radius: 50%;
        border-right-color: var(--spring-spinner-color, ${color});
        border-style: solid;
        border-top-color: var(--spring-spinner-color, ${color});
        border-width: calc(var(--spring-spinner-size, ${size}px) / 7);
        height: var(--spring-spinner-size, ${size}px);
        transform: rotate(-200deg);
        width: var(--spring-spinner-size, ${size}px);
      }

      @keyframes spring-spinner-animation {
        0% {
          border-width: calc(var(--spring-spinner-size, ${size}px) / 7);
        }

        25% {
          border-width: calc(var(--spring-spinner-size, ${size}px) / 23.33);
        }

        50% {
          transform: rotate(115deg);
          border-width: calc(var(--spring-spinner-size, ${size}px) / 7);
        }

        75% {
          border-width: calc(var(--spring-spinner-size, ${size}px) / 23.33);
        }

        100% {
          border-width: calc(var(--spring-spinner-size, ${size}px) / 7);
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
        height: var(--swapping-squares-spinner-size, ${size}px);
        justify-content: center;
        position: relative;
        width: var(--swapping-squares-spinner-size, ${size}px);
      }

      .swapping-squares-spinner .square {
        animation-duration: var(--swapping-squares-spinner-duration, ${duration}s);
        animation-iteration-count: infinite;
        border: calc(var(--swapping-squares-spinner-size, ${size}px) * 0.04 / 1.3) solid var(--swapping-squares-spinner-color, ${color});
        height: calc(var(--swapping-squares-spinner-size, ${size}px) * 0.25 / 1.3);
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        width: calc(var(--swapping-squares-spinner-size, ${size}px) * 0.25 / 1.3);
      }

      .swapping-squares-spinner .square:nth-child(1) {
        animation-delay: calc(var(--swapping-squares-spinner-duration, ${duration}s) / 2);
        animation-name: swapping-squares-animation-child-1;
      }

      .swapping-squares-spinner .square:nth-child(2) {
        animation-delay: 0ms;
        animation-name: swapping-squares-animation-child-2;
      }

      .swapping-squares-spinner .square:nth-child(3) {
        animation-delay: calc(var(--swapping-squares-spinner-duration, ${duration}s) / 2);
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
        height: calc(var(--trinity-rings-spinner-size, ${size}px) * 2);
        justify-content: center;
        overflow: hidden;
        padding: 3px;
        position: relative;
        width: calc(var(--trinity-rings-spinner-size, ${size}px) * 2);
      }

      .trinity-rings-spinner .circle {
        border-radius: 50%;
        border: 3px solid var(--trinity-rings-spinner-color, ${color});
        display: block;
        opacity: 1;
        position: absolute;
      }

      .trinity-rings-spinner .circle:nth-child(1) {
        animation: trinity-rings-spinner-circle1-animation var(--trinity-rings-spinner-duration, ${duration}s) infinite linear;
        border-width: 3px;
        height: var(--trinity-rings-spinner-size, ${size}px);
        width: var(--trinity-rings-spinner-size, ${size}px);
      }

      .trinity-rings-spinner .circle:nth-child(2) {
        animation: trinity-rings-spinner-circle2-animation var(--trinity-rings-spinner-duration, ${duration}s) infinite linear;
        border-width: 2px;
        height: calc(var(--trinity-rings-spinner-size, ${size}px) * 0.65);
        width: calc(var(--trinity-rings-spinner-size, ${size}px) * 0.65);
      }

      .trinity-rings-spinner .circle:nth-child(3) {
        animation:trinity-rings-spinner-circle3-animation var(--trinity-rings-spinner-duration, ${duration}s) infinite linear;
        border-width: 1px;
        height: calc(var(--trinity-rings-spinner-size, ${size}px) * 0.1);
        width: calc(var(--trinity-rings-spinner-size, ${size}px) * 0.1);
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

  exports.AtomSpinner = AtomSpinner;
  exports.BreedingRhombusSpinner = BreedingRhombusSpinner;
  exports.CirclesToRhombusesSpinner = CirclesToRhombusesSpinner;
  exports.FingerprintSpinner = FingerprintSpinner;
  exports.FlowerSpinner = FlowerSpinner;
  exports.FulfillingBouncingCircleSpinner = FulfillingBouncingCircleSpinner;
  exports.FulfillingSquareSpinner = FulfillingSquareSpinner;
  exports.HalfCircleSpinner = HalfCircleSpinner;
  exports.HollowDotsSpinner = HollowDotsSpinner;
  exports.IntersectingCirclesSpinner = IntersectingCirclesSpinner;
  exports.LoopingRhombusesSpinner = LoopingRhombusesSpinner;
  exports.OrbitSpinner = OrbitSpinner;
  exports.PixelSpinner = PixelSpinner;
  exports.RadarSpinner = RadarSpinner;
  exports.ScalingSquaresSpinner = ScalingSquaresSpinner;
  exports.SelfBuildingSquareSpinner = SelfBuildingSquareSpinner;
  exports.SemipolarSpinner = SemipolarSpinner;
  exports.SpringSpinner = SpringSpinner;
  exports.SwappingSquaresSpinner = SwappingSquaresSpinner;
  exports.TrinityRingsSpinner = TrinityRingsSpinner;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGlubmVyRWxlbWVudC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL0F0b21TcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvQnJlZWRpbmdSaG9tYnVzU3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL0NpcmNsZXNUb1Job21idXNlc1NwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9GaW5nZXJwcmludFNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9GbG93ZXJTcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvRnVsZmlsbGluZ0JvdW5jaW5nQ2lyY2xlU3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL0Z1bGZpbGxpbmdTcXVhcmVTcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvSGFsZkNpcmNsZVNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9Ib2xsb3dEb3RzU3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL0ludGVyc2VjdGluZ0NpcmNsZXNTcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvTG9vcGluZ1Job21idXNlc1NwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9PcmJpdFNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9QaXhlbFNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9SYWRhclNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9TY2FsaW5nU3F1YXJlc1NwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9TZWxmQnVpbGRpbmdTcXVhcmVTcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvU2VtaXBvbGFyU3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL1NwcmluZ1NwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9Td2FwcGluZ1NxdWFyZXNTcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvVHJpbml0eVJpbmdzU3Bpbm5lci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTcGlubmVyRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucHJvcHMgPSB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRzO1xuICAgIHRoaXMucm9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICB0aGlzLnByb3BzW25hbWVdID0gbmV3VmFsdWUgfHwgdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0c1tuYW1lXTtcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RlbXBsYXRlKHByb3BzKSBtdXN0IGJlIGltcGxlbWVudGVkJyk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlKHRoaXMucHJvcHMpO1xuXG4gICAgY29uc3Qgc3R5bGVzID0gYFxuICAgICAgPHN0eWxlPlxuICAgICAgICAqIHsgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxuXG4gICAgICAgIDpob3N0ICAgICAgICAgICB7IGRpc3BsYXk6IGJsb2NrOyB9XG4gICAgICAgIDpob3N0KFtoaWRkZW5dKSB7IGRpc3BsYXk6IG5vbmU7IH1cblxuICAgICAgICAke3RoaXMuc3R5bGUodGhpcy5wcm9wcyl9XG4gICAgICA8L3N0eWxlPlxuICAgIGA7XG5cbiAgICB0aGlzLnJvb3QuaW5uZXJIVE1MID0gYCR7c3R5bGVzfSR7dGVtcGxhdGV9YDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcGlubmVyRWxlbWVudDtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBBdG9tU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdhdG9tLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuYXRvbS1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1hdG9tLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lkdGg6IHZhcigtLWF0b20tc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWlubmVyIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1jaXJjbGUge1xuICAgICAgICBjb2xvcjogdmFyKC0tYXRvbS1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBmb250LXNpemU6IGNhbGModmFyKC0tYXRvbS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjI0KTtcbiAgICAgICAgbGVmdDogNTAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1saW5lIHtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IGNhbGModmFyKC0tYXRvbS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyAyNSkgc29saWQgdmFyKC0tYXRvbS1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyLXRvcDogY2FsYyh2YXIoLS1hdG9tLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDI1KSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWxpbmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBhdG9tLXNwaW5uZXItYW5pbWF0aW9uLTEgdmFyKC0tYXRvbS1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVaKDEyMGRlZykgcm90YXRlWCg2NmRlZykgcm90YXRlWigwZGVnKTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1saW5lOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbjogYXRvbS1zcGlubmVyLWFuaW1hdGlvbi0yIHZhcigtLWF0b20tc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigyNDBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMGRlZyk7XG4gICAgICB9XG5cbiAgICAgIC5hdG9tLXNwaW5uZXIgLnNwaW5uZXItbGluZTpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb246IGF0b20tc3Bpbm5lci1hbmltYXRpb24tMyB2YXIoLS1hdG9tLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMzYwZGVnKSByb3RhdGVYKDY2ZGVnKSByb3RhdGVaKDBkZWcpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGF0b20tc3Bpbm5lci1hbmltYXRpb24tMSB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigxMjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGF0b20tc3Bpbm5lci1hbmltYXRpb24tMiB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigyNDBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGF0b20tc3Bpbm5lci1hbmltYXRpb24tMyB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigzNjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImF0b20tc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1pbm5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWxpbmVcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1saW5lXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItbGluZVwiPjwvZGl2PlxuXG4gICAgICAgICAgPCEtLUNocm9tZSByZW5kZXJzIGxpdHRsZSBjaXJjbGVzIG1hbGZvcm1lZCA6KC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWNpcmNsZVwiPiYjOTY3OTs8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShBdG9tU3Bpbm5lci5pcywgQXRvbVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEJyZWVkaW5nUmhvbWJ1c1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMixcbiAgICAgIHNpemU6IDY1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIsIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgKiB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMge1xuICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKTtcbiAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA3LjUpO1xuICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gMi4zMDc3KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyAyLjMwNzcpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDcuNSk7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXM6bnRoLWNoaWxkKDJuKzApIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTEge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiAxKTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMTtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC0yIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogMik7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtMyB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDMpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0zO1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTQge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiA0KTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNDtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC01IHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogNSk7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTU7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtNiB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDYpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC02O1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTcge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiA3KTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNztcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC04IHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogOCk7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTg7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuYmlnIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjVzO1xuICAgICAgICBhbmltYXRpb246IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtYmlnIHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDMpO1xuICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gMyk7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDMpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDMpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMSB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMyNSUsIC0zMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTMyNSUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0zIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzMjUlLCAtMzI1JSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTQge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDMyNSUsIDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC01IHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzMjUlLCAzMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNiB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMzI1JSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTcge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0zMjUlLCAzMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtOCB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMyNSUsIDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC1iaWcge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImJyZWVkaW5nLXJob21idXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC0xXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtM1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC00XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtNlwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC03XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLThcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgYmlnXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShCcmVlZGluZ1Job21idXNTcGlubmVyLmlzLCBCcmVlZGluZ1Job21idXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBDaXJjbGVzVG9SaG9tYnVzZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2NpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGNvdW50OiAzLFxuICAgICAgZHVyYXRpb246IDEuMixcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdjb3VudCcsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBjb3VudCwgZHVyYXRpb24sIHNpemUgfSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG9iamVjdC1jdXJseS1uZXdsaW5lXG4gICAgY29uc3QgY2lyY2xlU3R5bGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMjsgaSA8PSBjb3VudDsgaSsrKSB7XG4gICAgICBjaXJjbGVTdHlsZXMucHVzaChgXG4gICAgICAgIC5jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKCR7aX0pIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDggKiAke2l9KTtcbiAgICAgICAgfVxuICAgICAgYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyLCAuY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lciAqIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cblxuICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXJcbiAgICAgICAgd2lkdGg6IGNhbGMoKHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSArIHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDEuMTI1KSAqICR7Y291bnR9KTtcbiAgICAgIH1cblxuICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGFuaW1hdGlvbjogY2lyY2xlcy10by1yaG9tYnVzZXMtYW5pbWF0aW9uIHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAlO1xuICAgICAgICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGhlaWdodDogdmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBtYXJnaW4tbGVmdDogY2FsYyh2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAxLjEyNSk7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDggKiAxKTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICB9XG5cbiAgICAgICR7Y2lyY2xlU3R5bGVzLmpvaW4oJycpfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNpcmNsZXMtdG8tcmhvbWJ1c2VzLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIH1cbiAgICAgICAgMTcuNSUge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgICAgICAgfVxuICAgICAgICA1MCUge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgOTMuNSUge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBjaXJjbGVzLXRvLXJob21idXNlcy1iYWNrZ3JvdW5kLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMC40O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY291bnQgfSkge1xuICAgIGNvbnN0IGNpcmNsZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAyOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGNpcmNsZXMucHVzaCgnPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PicpO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgICR7Y2lyY2xlcy5qb2luKCcnKX1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKENpcmNsZXNUb1Job21idXNlc1NwaW5uZXIuaXMsIENpcmNsZXNUb1Job21idXNlc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEZpbmdlcnByaW50U3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdmaW5nZXJwcmludC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMS41LFxuICAgICAgc2l6ZTogNjQsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBwYWRkaW5nOiAycHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZyB7XG4gICAgICAgIGFuaW1hdGlvbjogZmluZ2VycHJpbnQtc3Bpbm5lci1hbmltYXRpb24gdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBjdWJpYy1iZXppZXIoMC42ODAsIC0wLjc1MCwgMC4yNjUsIDEuNzUwKSBpbmZpbml0ZSBmb3J3YXJkcztcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci13aWR0aDogMnB4O1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogMSk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgMCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgMCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogMik7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgMSAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgMSAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogMyk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgMiAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgMiAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogNCk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgMyAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgMyAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogNSk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgNCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgNCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg2KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogNik7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgNSAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgNSAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg3KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogNyk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgNiAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgNiAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg4KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogOCk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgNyAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgNyAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg5KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogOSk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgOCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgOCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZpbmdlcnByaW50LXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoIDM2MGRlZyApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZmluZ2VycHJpbnQtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRmluZ2VycHJpbnRTcGlubmVyLmlzLCBGaW5nZXJwcmludFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEZsb3dlclNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnZmxvd2VyLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAyLjUsXG4gICAgICBzaXplOiA3MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5mbG93ZXItc3Bpbm5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGhlaWdodDogdmFyKC0tZmxvd2VyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1mbG93ZXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuZmxvd2VyLXNwaW5uZXIgLmRvdHMtY29udGFpbmVyIHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZsb3dlci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA3KTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZmxvd2VyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgfVxuXG4gICAgICAuZmxvd2VyLXNwaW5uZXIgLnNtYWxsZXItZG90IHtcbiAgICAgICAgYW5pbWF0aW9uOiBmbG93ZXItc3Bpbm5lci1zbWFsbGVyLWRvdC1hbmltYXRpb24gdmFyKC0tZmxvd2VyLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgMHMgaW5maW5pdGUgYm90aDtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5mbG93ZXItc3Bpbm5lciAuYmlnZ2VyLWRvdCB7XG4gICAgICAgIGFuaW1hdGlvbjogZmxvd2VyLXNwaW5uZXItYmlnZ2VyLWRvdC1hbmltYXRpb24gdmFyKC0tZmxvd2VyLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgMHMgaW5maW5pdGUgYm90aDtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcGFkZGluZzogMTAlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmbG93ZXItc3Bpbm5lci1iaWdnZXItZG90LWFuaW1hdGlvbiB7XG4gICAgICAgIDAlLCAxMDAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4O1xuICAgICAgICB9XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbiAgICAgICAgfVxuICAgICAgICAyNSUsIDc1JSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDI2cHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgLTI2cHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDI2cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggLTI2cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAxOXB4IC0xOXB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMTlweCAxOXB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgLTE5cHggLTE5cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAtMTlweCAxOXB4IDBweDtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICAgICAgICAgIGJveC1zaGFkb3c6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEBrZXlmcmFtZXMgZmxvd2VyLXNwaW5uZXItc21hbGxlci1kb3QtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUsIDEwMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgMjUlLCA3NSUge1xuICAgICAgICAgIGJveC1zaGFkb3c6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAxNHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIC0xNHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDBweCAxNHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IC0xNHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMTBweCAtMTBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDEwcHggMTBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIC0xMHB4IC0xMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgLTEwcHggMTBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImZsb3dlci1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RzLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJiaWdnZXItZG90XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic21hbGxlci1kb3RcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShGbG93ZXJTcGlubmVyLmlzLCBGbG93ZXJTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBGdWxmaWxsaW5nQm91bmNpbmdDaXJjbGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Z1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiA0LFxuICAgICAgc2l6ZTogNTAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24gaW5maW5pdGUgdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBlYXNlO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lciAub3JiaXQge1xuICAgICAgICBhbmltYXRpb246IGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItb3JiaXQtYW5pbWF0aW9uIGluZmluaXRlIHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgZWFzZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXI6IGNhbGModmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4wMykgc29saWQgdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUge1xuICAgICAgICBhbmltYXRpb246IGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItY2lyY2xlLWFuaW1hdGlvbiBpbmZpbml0ZSB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGVhc2U7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSkgc29saWQgdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBjb2xvcjogdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgc2NhbGUoMSk7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItb3JiaXQtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG4gICAgICAgIDYyLjUlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7XG4gICAgICAgIH1cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG4gICAgICAgIDg3LjUlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItY2lyY2xlLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cblxuICAgICAgICAxNi43JSB7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogaW5pdGlhbDtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiBpbml0aWFsO1xuICAgICAgICB9XG5cbiAgICAgICAgMzMuNCUge1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICB9XG5cbiAgICAgICAgNTAlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIDYyLjUlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICAgICAgICB9XG5cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgODcuNSUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XG4gICAgICAgIH1cblxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3JiaXRcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEZ1bGZpbGxpbmdCb3VuY2luZ0NpcmNsZVNwaW5uZXIuaXMsIEZ1bGZpbGxpbmdCb3VuY2luZ0NpcmNsZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEZ1bGZpbGxpbmdTcXVhcmVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Z1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiA0LFxuICAgICAgc2l6ZTogNTAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0tZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLWZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXItY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYW5pbWF0aW9uOiBmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlIGVhc2U7XG4gICAgICB9XG5cbiAgICAgIC5mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyIC5zcGlubmVyLWlubmVyIHtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBhbmltYXRpb246IGZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXItaW5uZXItYW5pbWF0aW9uIHZhcigtLWZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGUgZWFzZS1pbjtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgICAyNSUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAgICAgICA3NSUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXItaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgMCUgICB7IGhlaWdodDogMCU7IH1cbiAgICAgICAgMjUlICB7IGhlaWdodDogMCU7IH1cbiAgICAgICAgNTAlICB7IGhlaWdodDogMTAwJTsgfVxuICAgICAgICA3NSUgIHsgaGVpZ2h0OiAxMDAlOyB9XG4gICAgICAgIDEwMCUgeyBoZWlnaHQ6IDAlOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1pbm5lclwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRnVsZmlsbGluZ1NxdWFyZVNwaW5uZXIuaXMsIEZ1bGZpbGxpbmdTcXVhcmVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBIYWxmQ2lyY2xlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdoYWxmLWNpcmNsZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMSxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmhhbGYtY2lyY2xlLXNwaW5uZXIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogdmFyKC0taGFsZi1jaXJjbGUtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuaGFsZi1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDEwKSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAuaGFsZi1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlLmNpcmNsZS0xIHtcbiAgICAgICAgYW5pbWF0aW9uOiBoYWxmLWNpcmNsZS1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICB9XG5cbiAgICAgIC5oYWxmLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUuY2lyY2xlLTIge1xuICAgICAgICBhbmltYXRpb246IGhhbGYtY2lyY2xlLXNwaW5uZXItYW5pbWF0aW9uIHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGUgYWx0ZXJuYXRlO1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgaGFsZi1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJoYWxmLWNpcmNsZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgY2lyY2xlLTFcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZSBjaXJjbGUtMlwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoSGFsZkNpcmNsZVNwaW5uZXIuaXMsIEhhbGZDaXJjbGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBIb2xsb3dEb3RzU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdob2xsb3ctZG90cy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBjb3VudDogMyxcbiAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2NvdW50JyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBjb3VudCwgc2l6ZSB9KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgb2JqZWN0LWN1cmx5LW5ld2xpbmVcbiAgICBjb25zdCBkb3RTdHlsZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGRvdFN0eWxlcy5wdXNoKGBcbiAgICAgICAgLmhvbGxvdy1kb3RzLXNwaW5uZXIgLmRvdDpudGgtY2hpbGQoJHtpfSkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gJHtjb3VudH0gKiAke2l9KTtcbiAgICAgICAgfVxuICAgICAgYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICAgICoge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgfVxuXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuXG4gICAgICAuaG9sbG93LWRvdHMtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogdmFyKC0taG9sbG93LWRvdHMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAyICogJHtjb3VudH0pO1xuICAgICAgfVxuXG4gICAgICAuaG9sbG93LWRvdHMtc3Bpbm5lciAuZG90IHtcbiAgICAgICAgYW5pbWF0aW9uOiBob2xsb3ctZG90cy1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGVhc2UgaW5maW5pdGUgMG1zO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJvcmRlcjogY2FsYyh2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA1KSBzb2xpZCB2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgbWFyZ2luOiAwIGNhbGModmFyKC0taG9sbG93LWRvdHMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gMik7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgICR7ZG90U3R5bGVzLmpvaW4oJycpfVxuXG4gICAgICBAa2V5ZnJhbWVzIGhvbGxvdy1kb3RzLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIH1cblxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY291bnQgfSkge1xuICAgIGNvbnN0IGRvdHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGRvdHMucHVzaCgnPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PicpO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiaG9sbG93LWRvdHMtc3Bpbm5lclwiPlxuICAgICAgICAke2RvdHMuam9pbignJyl9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShIb2xsb3dEb3RzU3Bpbm5lci5pcywgSG9sbG93RG90c1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEludGVyc2VjdGluZ0NpcmNsZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2ludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLjIsXG4gICAgICBzaXplOiAzNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDIpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLnNwaW5uZXJCbG9jayB7XG4gICAgICAgIGFuaW1hdGlvbjogaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcnMtYW5pbWF0aW9uIHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0b3A6IDA7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogLTAuMzYpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4yKTtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMykge1xuICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIC0wLjM2KTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIC0wLjIpO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAtMC4zNik7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDUpIHtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjM2KTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIC0wLjIpO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCg2KSB7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4zNik7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjIpO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCg3KSB7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjM2KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBpbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVycy1hbmltYXRpb24ge1xuICAgICAgICBmcm9tIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgdG8gICB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyQmxvY2tcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShJbnRlcnNlY3RpbmdDaXJjbGVzU3Bpbm5lci5pcywgSW50ZXJzZWN0aW5nQ2lyY2xlc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIExvb3BpbmdSaG9tYnVzZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2xvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAyLjUsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5sb29waW5nLXJob21idXNlcy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogNCk7XG4gICAgICB9XG5cbiAgICAgIC5sb29waW5nLXJob21idXNlcy1zcGlubmVyIC5yaG9tYnVzIHtcbiAgICAgICAgYW5pbWF0aW9uOiBsb29waW5nLXJob21idXNlcy1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIGhlaWdodDogdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDQpO1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCkgcm90YXRlKDQ1ZGVnKSBzY2FsZSgwKTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLmxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIgLnJob21idXM6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAxIC8gLTEuNSk7XG4gICAgICB9XG5cbiAgICAgIC5sb29waW5nLXJob21idXNlcy1zcGlubmVyIC5yaG9tYnVzOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMiAvIC0xLjUpO1xuICAgICAgfVxuXG4gICAgICAubG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lciAucmhvbWJ1czpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAqIDMgLyAtMS41KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBsb29waW5nLXJob21idXNlcy1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCkgICAgIHJvdGF0ZSg0NWRlZykgc2NhbGUoMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjMzJSkgcm90YXRlKDQ1ZGVnKSBzY2FsZSgxKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC00NjYlKSByb3RhdGUoNDVkZWcpIHNjYWxlKDApOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTG9vcGluZ1Job21idXNlc1NwaW5uZXIuaXMsIExvb3BpbmdSaG9tYnVzZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBPcmJpdFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnb3JiaXQtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuMixcbiAgICAgIHNpemU6IDU1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLm9yYml0LXNwaW5uZXIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogdmFyKC0tb3JiaXQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBwZXJzcGVjdGl2ZTogODAwcHg7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1vcmJpdC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5vcmJpdC1zcGlubmVyIC5vcmJpdCB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAub3JiaXQtc3Bpbm5lciAub3JiaXQ6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBvcmJpdC1zcGlubmVyLW9yYml0LW9uZS1hbmltYXRpb24gdmFyKC0tb3JiaXQtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCB2YXIoLS1vcmJpdC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGxlZnQ6IDAlO1xuICAgICAgICB0b3A6IDAlO1xuICAgICAgfVxuXG4gICAgICAub3JiaXQtc3Bpbm5lciAub3JiaXQ6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBvcmJpdC1zcGlubmVyLW9yYml0LXR3by1hbmltYXRpb24gdmFyKC0tb3JiaXQtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1yaWdodDogM3B4IHNvbGlkIHZhcigtLW9yYml0LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgcmlnaHQ6IDAlO1xuICAgICAgICB0b3A6IDAlO1xuICAgICAgfVxuXG4gICAgICAub3JiaXQtc3Bpbm5lciAub3JiaXQ6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBvcmJpdC1zcGlubmVyLW9yYml0LXRocmVlLWFuaW1hdGlvbiB2YXIoLS1vcmJpdC1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyLXRvcDogM3B4IHNvbGlkIHZhcigtLW9yYml0LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgYm90dG9tOiAwJTtcbiAgICAgICAgcmlnaHQ6IDAlO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG9yYml0LXNwaW5uZXItb3JiaXQtb25lLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMzVkZWcpIHJvdGF0ZVkoLTQ1ZGVnKSByb3RhdGVaKDBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMzVkZWcpIHJvdGF0ZVkoLTQ1ZGVnKSByb3RhdGVaKDM2MGRlZyk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBvcmJpdC1zcGlubmVyLW9yYml0LXR3by1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDUwZGVnKSByb3RhdGVZKDEwZGVnKSByb3RhdGVaKDBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoNTBkZWcpIHJvdGF0ZVkoMTBkZWcpIHJvdGF0ZVooMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG9yYml0LXNwaW5uZXItb3JiaXQtdGhyZWUtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWCgzNWRlZykgcm90YXRlWSg1NWRlZykgcm90YXRlWigwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGVYKDM1ZGVnKSByb3RhdGVZKDU1ZGVnKSByb3RhdGVaKDM2MGRlZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJvcmJpdC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvcmJpdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3JiaXRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9yYml0XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShPcmJpdFNwaW5uZXIuaXMsIE9yYml0U3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgUGl4ZWxTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3BpeGVsLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAyLFxuICAgICAgc2l6ZTogNzAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAucGl4ZWwtc3Bpbm5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGhlaWdodDogdmFyKC0tcGl4ZWwtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgd2lkdGg6IHZhcigtLXBpeGVsLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLnBpeGVsLXNwaW5uZXIgLnBpeGVsLXNwaW5uZXItaW5uZXIge1xuICAgICAgICBhbmltYXRpb246IHBpeGVsLXNwaW5uZXItYW5pbWF0aW9uIHZhcigtLXBpeGVsLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1waXhlbC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJveC1zaGFkb3c6IDE1cHggMTVweCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAtMTVweCAtMTVweCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAxNXB4IC0xNXB4ICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIC0xNXB4IDE1cHggIDAgMCxcbiAgICAgICAgICAgICAgICAgICAgMCAxNXB4ICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIDE1cHggMCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAtMTVweCAwICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIDAgLTE1cHggMCAwO1xuICAgICAgICBjb2xvcjogdmFyKC0tcGl4ZWwtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tcGl4ZWwtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXBpeGVsLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHBpeGVsLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAyMHB4IDIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAtMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDIwcHggLTIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgMHB4IDEwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAxMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIC0xMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDBweCAtMTBweCAwcHggMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAyMHB4IDIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAtMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDIwcHggLTIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgMHB4IDEwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAxMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIC0xMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDBweCAtMTBweCAwcHggMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInBpeGVsLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpeGVsLXNwaW5uZXItaW5uZXJcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFBpeGVsU3Bpbm5lci5pcywgUGl4ZWxTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBSYWRhclNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncmFkYXItc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5yYWRhci1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1yYWRhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IHZhcigtLXJhZGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGFuaW1hdGlvbjogcmFkYXItc3Bpbm5lci1hbmltYXRpb24gdmFyKC0tcmFkYXItc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyA2LjY3KTtcbiAgICAgICAgcGFkZGluZzogY2FsYyh2YXIoLS1yYWRhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiA1ICogMiAqIDAgLyAxMTApO1xuICAgICAgfVxuXG4gICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1yYWRhci1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gNi42Nyk7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogNSAqIDIgKiAxIC8gMTEwKTtcbiAgICAgIH1cblxuICAgICAgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDYuNjcpO1xuICAgICAgICBwYWRkaW5nOiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMiAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwbXM7XG4gICAgICAgIHBhZGRpbmc6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogNSAqIDIgKiAzIC8gMTEwKTtcbiAgICAgIH1cblxuICAgICAgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZS1pbm5lciwgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZS1pbm5lci1jb250YWluZXIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJvcmRlcjogY2FsYyh2YXIoLS1yYWRhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiA1IC8gMTEwKSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZS1pbm5lciB7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB2YXIoLS1yYWRhci1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogdmFyKC0tcmFkYXItc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHJhZGFyLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwicmFkYXItc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lclwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShSYWRhclNwaW5uZXIuaXMsIFJhZGFyU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgU2NhbGluZ1NxdWFyZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3NjYWxpbmctc3F1YXJlcy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMS4yNSxcbiAgICAgIHNpemU6IDY1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYW5pbWF0aW9uOiBzY2FsaW5nLXNxdWFyZXMtYW5pbWF0aW9uIHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmUge1xuICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpO1xuICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjA0IC8gMS4zKSBzb2xpZCB2YXIoLS1zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMjUgLyAxLjMpO1xuICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjI1IC8gMS4zKTtcbiAgICAgIH1cblxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0xO1xuICAgICAgfVxuXG4gICAgICAuc2NhbGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICB9XG5cbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMztcbiAgICAgIH1cblxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC00O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNjYWxpbmctc3F1YXJlcy1hbmltYXRpb24ge1xuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTEge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMyB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLC0xNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTQge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNTAlLC0xNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2NhbGluZy1zcXVhcmVzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2NhbGluZ1NxdWFyZXNTcGlubmVyLmlzLCBTY2FsaW5nU3F1YXJlc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNlbGZCdWlsZGluZ1NxdWFyZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDYsXG4gICAgICBzaXplOiAxMCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDQpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMiAvIDMpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiA0KTtcbiAgICAgIH1cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmUge1xuICAgICAgICBhbmltYXRpb246IHNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgdmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIG1hcmdpbi1yaWdodDogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyAzKTtcbiAgICAgICAgbWFyZ2luLXRvcDogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyAzKTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgcG9zaXRpb246cmVsYXRpdmU7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAtMiAvIDMpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiA2KTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogNyk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDgpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiAzKTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoNSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogNCk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDYpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDUpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg3KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiAwKTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoOCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogMSk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDkpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDIpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuY2xlYXIge1xuICAgICAgICBjbGVhcjogYm90aDtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIH1cblxuICAgICAgICA1JSB7XG4gICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICB0b3A6IDA7XG4gICAgICAgIH1cblxuICAgICAgICA1MC45JSB7XG4gICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICB0b3A6IDA7XG4gICAgICAgIH1cblxuICAgICAgICA1NS45JSB7XG4gICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICB0b3A6IGluaGVyaXQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmUgY2xlYXJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmUgY2xlYXJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTZWxmQnVpbGRpbmdTcXVhcmVTcGlubmVyLmlzLCBTZWxmQnVpbGRpbmdTcXVhcmVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTZW1pcG9sYXJTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3NlbWlwb2xhci1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMixcbiAgICAgIHNpemU6IDY1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAuc2VtaXBvbGFyLXNwaW5uZXIgLnJpbmcge1xuICAgICAgICBhbmltYXRpb246IHNlbWlwb2xhci1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgIGJvcmRlci10b3AtY29sb3I6IHZhcigtLXNlbWlwb2xhci1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4wNSk7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIH1cblxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAqIDAuMSAqIDQpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAwKTtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4xICogMCk7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4xICogMCk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4yICogMCk7XG4gICAgICAgIHotaW5kZXg6IDU7XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAwLjEgKiAzKTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4yICogMSk7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDEpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDEpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDEpO1xuICAgICAgICB6LWluZGV4OiA0O1xuICAgICAgfVxuXG4gICAgICAuc2VtaXBvbGFyLXNwaW5uZXIgLnJpbmc6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMC4xICogMik7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDIpO1xuICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjEgKiAyKTtcbiAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjEgKiAyKTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAyKTtcbiAgICAgICAgei1pbmRleDogMztcbiAgICAgIH1cblxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAqIDAuMSAqIDEpO1xuICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAzKTtcbiAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4xICogMyk7XG4gICAgICAgIHRvcDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4xICogMyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4yICogMyk7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoNSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAwLjEgKiAwKTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4yICogNCk7XG4gICAgICAgIGxlZnQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDQpO1xuICAgICAgICB0b3A6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDQpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDQpO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNlbWlwb2xhci1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZykgc2NhbGUoMC43KTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInNlbWlwb2xhci1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTZW1pcG9sYXJTcGlubmVyLmlzLCBTZW1pcG9sYXJTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTcHJpbmdTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3NwcmluZy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMyxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnNwcmluZy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1zcHJpbmctc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc3ByaW5nLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgLnNwcmluZy1zcGlubmVyIC5zcHJpbmctc3Bpbm5lci1wYXJ0IHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNwcmluZy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyAyKTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lkdGg6IHZhcigtLXNwcmluZy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5zcHJpbmctc3Bpbm5lciAgLnNwcmluZy1zcGlubmVyLXBhcnQuYm90dG9tIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpIHNjYWxlKC0xLCAxKTtcbiAgICAgIH1cblxuICAgICAgLnNwcmluZy1zcGlubmVyIC5zcHJpbmctc3Bpbm5lci1yb3RhdG9yIHtcbiAgICAgICAgYW5pbWF0aW9uOiBzcHJpbmctc3Bpbm5lci1hbmltYXRpb24gdmFyKC0tc3ByaW5nLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgZWFzZS1pbi1vdXQgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB2YXIoLS1zcHJpbmctc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1zcHJpbmctc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICBib3JkZXItd2lkdGg6IGNhbGModmFyKC0tc3ByaW5nLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXNwcmluZy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0yMDBkZWcpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc3ByaW5nLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzcHJpbmctc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKHZhcigtLXNwcmluZy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIDI1JSB7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKHZhcigtLXNwcmluZy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyAyMy4zMyk7XG4gICAgICAgIH1cblxuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDExNWRlZyk7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKHZhcigtLXNwcmluZy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIDc1JSB7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKHZhcigtLXNwcmluZy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyAyMy4zMyk7XG4gICAgICAgIH1cblxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IGNhbGModmFyKC0tc3ByaW5nLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic3ByaW5nLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXBhcnQgdG9wXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXJvdGF0b3JcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXBhcnQgYm90dG9tXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXJvdGF0b3JcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTcHJpbmdTcGlubmVyLmlzLCBTcHJpbmdTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTd2FwcGluZ1NxdWFyZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3N3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogdmFyKC0tc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICB9XG5cbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZSB7XG4gICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogdmFyKC0tc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpO1xuICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4wNCAvIDEuMykgc29saWQgdmFyKC0tc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMjUgLyAxLjMpO1xuICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4yNSAvIDEuMyk7XG4gICAgICB9XG5cbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMik7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0xO1xuICAgICAgfVxuXG4gICAgICAuc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwbXM7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0yO1xuICAgICAgfVxuXG4gICAgICAuc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtMztcbiAgICAgIH1cblxuICAgICAgLnN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogMG1zO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtNDtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0xIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTUwJSwxNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0zIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MCUsLTE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC00IHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTUwJSwtMTUwJSkgc2NhbGUoMiwyKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lclwiIDpzdHlsZT1cInNwaW5uZXJTdHlsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTd2FwcGluZ1NxdWFyZXNTcGlubmVyLmlzLCBTd2FwcGluZ1NxdWFyZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBUcmluaXR5UmluZ3NTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3RyaW5pdHktcmluZ3Mtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuNSxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHN0eWxlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnRyaW5pdHktcmluZ3Mtc3Bpbm5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDIpO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgcGFkZGluZzogM3B4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXRyaW5pdHktcmluZ3Mtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMik7XG4gICAgICB9XG5cbiAgICAgIC50cmluaXR5LXJpbmdzLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB9XG5cbiAgICAgIC50cmluaXR5LXJpbmdzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb246IHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUxLWFuaW1hdGlvbiB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBib3JkZXItd2lkdGg6IDNweDtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgd2lkdGg6IHZhcigtLXRyaW5pdHktcmluZ3Mtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgfVxuXG4gICAgICAudHJpbml0eS1yaW5ncy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uOiB0cmluaXR5LXJpbmdzLXNwaW5uZXItY2lyY2xlMi1hbmltYXRpb24gdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuNjUpO1xuICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuNjUpO1xuICAgICAgfVxuXG4gICAgICAudHJpbml0eS1yaW5ncy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uOnRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUzLWFuaW1hdGlvbiB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXRyaW5pdHktcmluZ3Mtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4xKTtcbiAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjEpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUxLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigyMGRlZykgIHJvdGF0ZVkoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpIHJvdGF0ZVkoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUyLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpIHJvdGF0ZVgoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWigwZGVnKSAgIHJvdGF0ZVgoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUzLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpICByb3RhdGVYKC0zNjBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVooLTM2MGRlZykgcm90YXRlWCgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwidHJpbml0eS1yaW5ncy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShUcmluaXR5UmluZ3NTcGlubmVyLmlzLCBUcmluaXR5UmluZ3NTcGlubmVyKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7RUFBQSxNQUFNLGNBQWMsU0FBUyxXQUFXLENBQUM7RUFDekMsRUFBRSxXQUFXLEdBQUc7RUFDaEIsSUFBSSxLQUFLLEVBQUUsQ0FBQzs7RUFFWixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7RUFDM0MsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztFQUNwRCxHQUFHOztFQUVILEVBQUUsaUJBQWlCLEdBQUc7RUFDdEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7RUFDbEIsR0FBRzs7RUFFSCxFQUFFLHdCQUF3QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0VBQ3JELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7O0VBRW5FLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0VBQ2xCLEdBQUc7O0VBRUgsRUFBRSxRQUFRLEdBQUc7RUFDYixJQUFJLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztFQUMzRCxHQUFHOztFQUVILEVBQUUsTUFBTSxHQUFHO0VBQ1gsSUFBSSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7RUFFL0MsSUFBSSxNQUFNLE1BQU0sR0FBRyxDQUFDOzs7Ozs7O1FBT1osRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7SUFFN0IsQ0FBQyxDQUFDOztFQUVOLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDakQsR0FBRztFQUNILENBQUM7O0VDcENNLE1BQU0sV0FBVyxTQUFTLGNBQWMsQ0FBQztFQUNoRCxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsT0FBTyxjQUFjLENBQUMsRUFBRTs7RUFFNUMsRUFBRSxXQUFXLFFBQVEsR0FBRztFQUN4QixJQUFJLE9BQU87RUFDWCxNQUFNLEtBQUssRUFBRSxTQUFTO0VBQ3RCLE1BQU0sUUFBUSxFQUFFLENBQUM7RUFDakIsTUFBTSxJQUFJLEVBQUUsRUFBRTtFQUNkLEtBQUssQ0FBQztFQUNOLEdBQUc7O0VBRUgsRUFBRSxXQUFXLGtCQUFrQixHQUFHO0VBQ2xDLElBQUksT0FBTztFQUNYLE1BQU0sT0FBTztFQUNiLE1BQU0sVUFBVTtFQUNoQixNQUFNLE1BQU07RUFDWixLQUFLLENBQUM7RUFDTixHQUFHOztFQUVILEVBQUUsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtFQUNuQyxJQUFJLE9BQU8sQ0FBQzs7eUNBRTZCLEVBQUUsSUFBSSxDQUFDOzt3Q0FFUixFQUFFLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7eUNBV04sRUFBRSxLQUFLLENBQUM7O2lEQUVBLEVBQUUsSUFBSSxDQUFDOzs7Ozs7OzttREFRTCxFQUFFLElBQUksQ0FBQywwQ0FBMEMsRUFBRSxLQUFLLENBQUM7O2tEQUUxRCxFQUFFLElBQUksQ0FBQzs7Ozs7Ozt5RUFPZ0IsRUFBRSxRQUFRLENBQUM7Ozs7O3lFQUtYLEVBQUUsUUFBUSxDQUFDOzs7Ozt5RUFLWCxFQUFFLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUJoRixDQUFDLENBQUM7RUFDTixHQUFHOztFQUVILEVBQUUsUUFBUSxHQUFHO0VBQ2IsSUFBSSxPQUFPLENBQUM7Ozs7Ozs7Ozs7O0lBV1IsQ0FBQyxDQUFDO0VBQ04sR0FBRztFQUNILENBQUM7O0VBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDOztFQ3hHNUMsTUFBTSxzQkFBc0IsU0FBUyxjQUFjLENBQUM7RUFDM0QsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLE9BQU8sMEJBQTBCLENBQUMsRUFBRTs7RUFFeEQsRUFBRSxXQUFXLFFBQVEsR0FBRztFQUN4QixJQUFJLE9BQU87RUFDWCxNQUFNLEtBQUssRUFBRSxTQUFTO0VBQ3RCLE1BQU0sUUFBUSxFQUFFLENBQUM7RUFDakIsTUFBTSxJQUFJLEVBQUUsRUFBRTtFQUNkLEtBQUssQ0FBQztFQUNOLEdBQUc7O0VBRUgsRUFBRSxXQUFXLGtCQUFrQixHQUFHO0VBQ2xDLElBQUksT0FBTztFQUNYLE1BQU0sT0FBTztFQUNiLE1BQU0sVUFBVTtFQUNoQixNQUFNLE1BQU07RUFDWixLQUFLLENBQUM7RUFDTixHQUFHOztFQUVILEVBQUUsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRTtFQUNuQyxJQUFJLE9BQU8sQ0FBQzs7cURBRXlDLEVBQUUsSUFBSSxDQUFDO29EQUNSLEVBQUUsSUFBSSxDQUFDOzs7Ozs7Ozs7O3FFQVVVLEVBQUUsUUFBUSxDQUFDOztnRUFFaEIsRUFBRSxLQUFLLENBQUM7MERBQ2QsRUFBRSxJQUFJLENBQUM7d0RBQ1QsRUFBRSxJQUFJLENBQUM7O3VEQUVSLEVBQUUsSUFBSSxDQUFDO3lEQUNMLEVBQUUsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lHQWlEeUMsRUFBRSxRQUFRLENBQUM7Z0VBQ3BELEVBQUUsS0FBSyxDQUFDOzBEQUNkLEVBQUUsSUFBSSxDQUFDO3dEQUNULEVBQUUsSUFBSSxDQUFDO3VEQUNSLEVBQUUsSUFBSSxDQUFDO3lEQUNMLEVBQUUsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXdENUQsQ0FBQyxDQUFDO0VBQ04sR0FBRzs7RUFFSCxFQUFFLFFBQVEsR0FBRztFQUNiLElBQUksT0FBTyxDQUFDOzs7Ozs7Ozs7Ozs7SUFZUixDQUFDLENBQUM7RUFDTixHQUFHO0VBQ0gsQ0FBQzs7RUFFRCxjQUFjLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDOztFQzFLbEUsTUFBTSx5QkFBeUIsU0FBUyxjQUFjLENBQUM7RUFDOUQsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLE9BQU8sOEJBQThCLENBQUMsRUFBRTs7RUFFNUQsRUFBRSxXQUFXLFFBQVEsR0FBRztFQUN4QixJQUFJLE9BQU87RUFDWCxNQUFNLEtBQUssRUFBRSxTQUFTO0VBQ3RCLE1BQU0sS0FBSyxFQUFFLENBQUM7RUFDZCxNQUFNLFFBQVEsRUFBRSxHQUFHO0VBQ25CLE1BQU0sSUFBSSxFQUFFLEVBQUU7RUFDZCxLQUFLLENBQUM7RUFDTixHQUFHOztFQUVILEVBQUUsV0FBVyxrQkFBa0IsR0FBRztFQUNsQyxJQUFJLE9BQU87RUFDWCxNQUFNLE9BQU87RUFDYixNQUFNLE9BQU87RUFDYixNQUFNLFVBQVU7RUFDaEIsTUFBTSxNQUFNO0VBQ1osS0FBSyxDQUFDO0VBQ04sR0FBRzs7RUFFSCxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO0VBQzFDLElBQUksTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDOztFQUU1QixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDckMsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7d0RBQytCLEVBQUUsQ0FBQyxDQUFDOzZFQUNpQixFQUFFLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDOztNQUUvRixDQUFDLENBQUMsQ0FBQztFQUNULEtBQUs7O0VBRUwsSUFBSSxPQUFPLENBQUM7Ozs7Ozs7O3lEQVE2QyxFQUFFLElBQUksQ0FBQzs7OERBRUYsRUFBRSxJQUFJLENBQUMsK0NBQStDLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUM7Ozs7K0ZBSW5ELEVBQUUsUUFBUSxDQUFDOzs7b0VBR3RDLEVBQUUsS0FBSyxDQUFDO3lEQUNuQixFQUFFLElBQUksQ0FBQzttRUFDRyxFQUFFLElBQUksQ0FBQzs7O3dEQUdsQixFQUFFLElBQUksQ0FBQzs7OzsyRUFJWSxFQUFFLFFBQVEsQ0FBQzs7OztNQUloRixFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF5QjFCLENBQUMsQ0FBQztFQUNOLEdBQUc7O0VBRUgsRUFBRSxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtFQUN0QixJQUFJLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQzs7RUFFdkIsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3JDLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0VBQ2pELEtBQUs7O0VBRUwsSUFBSSxPQUFPLENBQUM7OztRQUdKLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzs7SUFFdkIsQ0FBQyxDQUFDO0VBQ04sR0FBRztFQUNILENBQUM7O0VBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLEVBQUUseUJBQXlCLENBQUMsQ0FBQzs7RUMxR3hFLE1BQU0sa0JBQWtCLFNBQVMsY0FBYyxDQUFDO0VBQ3ZELEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxPQUFPLHFCQUFxQixDQUFDLEVBQUU7O0VBRW5ELEVBQUUsV0FBVyxRQUFRLEdBQUc7RUFDeEIsSUFBSSxPQUFPO0VBQ1gsTUFBTSxLQUFLLEVBQUUsU0FBUztFQUN0QixNQUFNLFFBQVEsRUFBRSxHQUFHO0VBQ25CLE1BQU0sSUFBSSxFQUFFLEVBQUU7RUFDZCxLQUFLLENBQUM7RUFDTixHQUFHOztFQUVILEVBQUUsV0FBVyxrQkFBa0IsR0FBRztFQUNsQyxJQUFJLE9BQU87RUFDWCxNQUFNLE9BQU87RUFDYixNQUFNLFVBQVU7RUFDaEIsTUFBTSxNQUFNO0VBQ1osS0FBSyxDQUFDO0VBQ04sR0FBRzs7RUFFSCxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7RUFDbkMsSUFBSSxPQUFPLENBQUM7O2dEQUVvQyxFQUFFLElBQUksQ0FBQzs7OzsrQ0FJUixFQUFFLElBQUksQ0FBQzs7OztxRkFJK0IsRUFBRSxRQUFRLENBQUM7Ozs7OzsyREFNckMsRUFBRSxLQUFLLENBQUM7Ozs7Ozs7Ozs7OztxREFZZCxFQUFFLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxJQUFJLENBQUM7b0RBQzdELEVBQUUsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLElBQUksQ0FBQzs7Ozs7cURBSzNELEVBQUUsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLElBQUksQ0FBQztvREFDN0QsRUFBRSxJQUFJLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDOzs7OztxREFLM0QsRUFBRSxJQUFJLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDO29EQUM3RCxFQUFFLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxJQUFJLENBQUM7Ozs7O3FEQUszRCxFQUFFLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxJQUFJLENBQUM7b0RBQzdELEVBQUUsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLElBQUksQ0FBQzs7Ozs7cURBSzNELEVBQUUsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLElBQUksQ0FBQztvREFDN0QsRUFBRSxJQUFJLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDOzs7OztxREFLM0QsRUFBRSxJQUFJLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDO29EQUM3RCxFQUFFLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxJQUFJLENBQUM7Ozs7O3FEQUszRCxFQUFFLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxJQUFJLENBQUM7b0RBQzdELEVBQUUsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLElBQUksQ0FBQzs7Ozs7cURBSzNELEVBQUUsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLElBQUksQ0FBQztvREFDN0QsRUFBRSxJQUFJLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDOzs7OztxREFLM0QsRUFBRSxJQUFJLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDO29EQUM3RCxFQUFFLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxJQUFJLENBQUM7Ozs7Ozs7O0lBUTVHLENBQUMsQ0FBQztFQUNOLEdBQUc7O0VBRUgsRUFBRSxRQUFRLEdBQUc7RUFDYixJQUFJLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7O0lBWVIsQ0FBQyxDQUFDO0VBQ04sR0FBRztFQUNILENBQUM7O0VBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzs7RUM3SDFELE1BQU0sYUFBYSxTQUFTLGNBQWMsQ0FBQztFQUNsRCxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsT0FBTyxnQkFBZ0IsQ0FBQyxFQUFFOztFQUU5QyxFQUFFLFdBQVcsUUFBUSxHQUFHO0VBQ3hCLElBQUksT0FBTztFQUNYLE1BQU0sS0FBSyxFQUFFLFNBQVM7RUFDdEIsTUFBTSxRQUFRLEVBQUUsR0FBRztFQUNuQixNQUFNLElBQUksRUFBRSxFQUFFO0VBQ2QsS0FBSyxDQUFDO0VBQ04sR0FBRzs7RUFFSCxFQUFFLFdBQVcsa0JBQWtCLEdBQUc7RUFDbEMsSUFBSSxPQUFPO0VBQ1gsTUFBTSxPQUFPO0VBQ2IsTUFBTSxVQUFVO0VBQ2hCLE1BQU0sTUFBTTtFQUNaLEtBQUssQ0FBQztFQUNOLEdBQUc7O0VBRUgsRUFBRSxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO0VBQ25DLElBQUksT0FBTyxDQUFDOzs7OzsyQ0FLK0IsRUFBRSxJQUFJLENBQUM7OzBDQUVSLEVBQUUsSUFBSSxDQUFDOzs7O2dEQUlELEVBQUUsSUFBSSxDQUFDOytDQUNSLEVBQUUsSUFBSSxDQUFDOzs7O3VGQUlpQyxFQUFFLFFBQVEsQ0FBQztxREFDN0MsRUFBRSxLQUFLLENBQUM7Ozs7Ozs7c0ZBT3lCLEVBQUUsUUFBUSxDQUFDO3FEQUM1QyxFQUFFLEtBQUssQ0FBQzs7Ozs7Ozs7O3VEQVNOLEVBQUUsS0FBSyxDQUFDO3VEQUNSLEVBQUUsS0FBSyxDQUFDO3VEQUNSLEVBQUUsS0FBSyxDQUFDO3VEQUNSLEVBQUUsS0FBSyxDQUFDO3VEQUNSLEVBQUUsS0FBSyxDQUFDO3VEQUNSLEVBQUUsS0FBSyxDQUFDO3VEQUNSLEVBQUUsS0FBSyxDQUFDO3VEQUNSLEVBQUUsS0FBSyxDQUFDOzs7Ozs7dURBTVIsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7Ozs7dURBSVIsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7dURBQ1IsRUFBRSxLQUFLLENBQUM7Ozs7O3VEQUtSLEVBQUUsS0FBSyxDQUFDOzJDQUNwQixFQUFFLEtBQUssQ0FBQzsyQ0FDUixFQUFFLEtBQUssQ0FBQzsyQ0FDUixFQUFFLEtBQUssQ0FBQzsyQ0FDUixFQUFFLEtBQUssQ0FBQzsyQ0FDUixFQUFFLEtBQUss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
