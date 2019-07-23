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

    get color() { return `var(--atom-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--atom-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--atom-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .atom-spinner {
        height: ${this.size};
        overflow: hidden;
        width: ${this.size};
      }

      .atom-spinner .spinner-inner {
        display: block;
        height: 100%;
        position: relative;
        width: 100%;
      }

      .atom-spinner .spinner-circle {
        color: ${this.color};
        display: block;
        font-size: calc(${this.size} * 0.24);
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .atom-spinner .spinner-line {
        border-left: calc(${this.size} / 25) solid ${this.color};
        border-radius: 50%;
        border-top: calc(${this.size} / 25) solid transparent;
        height: 100%;
        position: absolute;
        width: 100%;
      }

      .atom-spinner .spinner-line:nth-child(1) {
        animation: atom-spinner-animation-1 ${this.duration} linear infinite;
        transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
      }

      .atom-spinner .spinner-line:nth-child(2) {
        animation: atom-spinner-animation-2 ${this.duration} linear infinite;
        transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
      }

      .atom-spinner .spinner-line:nth-child(3) {
        animation: atom-spinner-animation-3 ${this.duration} linear infinite;
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

    get color() { return `var(--breeding-rhombus-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--breeding-rhombus-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--breeding-rhombus-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .breeding-rhombus-spinner {
        height: ${this.size};
        width: ${this.size};
        position: relative;
        transform: rotate(45deg);
      }

      .breeding-rhombus-spinner, .breeding-rhombus-spinner * {
        box-sizing: border-box;
      }

      .breeding-rhombus-spinner .rhombus {
        animation-duration: ${this.duration};
        animation-iteration-count: infinite;
        background-color: ${this.color};
        height: calc(${this.size} / 7.5);
        left: calc(${this.size} / 2.3077);
        position: absolute;
        top: calc(${this.size} / 2.3077);
        width: calc(${this.size} / 7.5);
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
        animation: breeding-rhombus-spinner-animation-child-big ${this.duration} infinite;
        background-color: ${this.color};
        height: calc(${this.size} / 3);
        left: calc(${this.size} / 3);
        top: calc(${this.size} / 3);
        width: calc(${this.size} / 3);
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

    get color() { return `var(--circles-to-rhombuses-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--circles-to-rhombuses-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--circles-to-rhombuses-spinner__size, ${this.props.size}px)`; }

    style({ count }) {
      const circleStyles = [];

      for (let i = 2; i <= count; i++) {
        circleStyles.push(`
        .circles-to-rhombuses-spinner .circle:nth-child(${i}) {
          animation-delay: calc(${this.duration} / 8 * ${i});
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
        height: ${this.size};
        justify-content: center
        width: calc((${this.size} + ${this.size} * 1.125) * ${count});
      }

      .circles-to-rhombuses-spinner .circle {
        animation: circles-to-rhombuses-animation ${this.duration} linear infinite;
        background: transparent;
        border-radius: 10%;
        border: 3px solid ${this.color};
        height: ${this.size};
        margin-left: calc(${this.size} * 1.125);
        overflow: hidden;
        transform: rotate(45deg);
        width: ${this.size};
      }

      .circles-to-rhombuses-spinner .circle:nth-child(1) {
        animation-delay: calc(${this.duration} / 8 * 1);
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

    get color() { return `var(--fingerprint-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--fingerprint-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--fingerprint-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .fingerprint-spinner {
        height: ${this.size};
        overflow: hidden;
        padding: 2px;
        position: relative;
        width: ${this.size};
      }

      .fingerprint-spinner .spinner-ring {
        animation: fingerprint-spinner-animation ${this.duration} cubic-bezier(0.680, -0.750, 0.265, 1.750) infinite forwards;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-radius: 50%;
        border-right-color: transparent;
        border-style: solid;
        border-top-color: ${this.color};
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
        height: calc(${this.size} / 9 + 0 * ${this.size} / 9);
        width: calc(${this.size} / 9 + 0 * ${this.size} / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(2) {
        animation-delay: calc(50ms * 2);
        height: calc(${this.size} / 9 + 1 * ${this.size} / 9);
        width: calc(${this.size} / 9 + 1 * ${this.size} / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(3) {
        animation-delay: calc(50ms * 3);
        height: calc(${this.size} / 9 + 2 * ${this.size} / 9);
        width: calc(${this.size} / 9 + 2 * ${this.size} / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(4) {
        animation-delay: calc(50ms * 4);
        height: calc(${this.size} / 9 + 3 * ${this.size} / 9);
        width: calc(${this.size} / 9 + 3 * ${this.size} / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(5) {
        animation-delay: calc(50ms * 5);
        height: calc(${this.size} / 9 + 4 * ${this.size} / 9);
        width: calc(${this.size} / 9 + 4 * ${this.size} / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(6) {
        animation-delay: calc(50ms * 6);
        height: calc(${this.size} / 9 + 5 * ${this.size} / 9);
        width: calc(${this.size} / 9 + 5 * ${this.size} / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(7) {
        animation-delay: calc(50ms * 7);
        height: calc(${this.size} / 9 + 6 * ${this.size} / 9);
        width: calc(${this.size} / 9 + 6 * ${this.size} / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(8) {
        animation-delay: calc(50ms * 8);
        height: calc(${this.size} / 9 + 7 * ${this.size} / 9);
        width: calc(${this.size} / 9 + 7 * ${this.size} / 9);
      }

      .fingerprint-spinner .spinner-ring:nth-child(9) {
        animation-delay: calc(50ms * 9);
        height: calc(${this.size} / 9 + 8 * ${this.size} / 9);
        width: calc(${this.size} / 9 + 8 * ${this.size} / 9);
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

    get color() { return `var(--flower-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--flower-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--flower-spinner__size, ${this.props.size}px)`; }

    style({ color, duration, size }) {
      return `
      .flower-spinner {
        align-items: center;
        display: flex;
        flex-direction: row;
        height: ${this.size};
        justify-content: center;
        width: ${this.size};
      }

      .flower-spinner .dots-container {
        height: calc(${this.size} / 7);
        width: calc(${this.size} / 7);
      }

      .flower-spinner .smaller-dot {
        animation: flower-spinner-smaller-dot-animation ${this.duration} 0s infinite both;
        background: ${this.color};
        border-radius: 50%;
        height: 100%;
        width: 100%;
      }

      .flower-spinner .bigger-dot {
        animation: flower-spinner-bigger-dot-animation ${this.duration} 0s infinite both;
        background: ${this.color};
        border-radius: 50%;
        height: 100%;
        padding: 10%;
        width: 100%;
      }

      @keyframes flower-spinner-bigger-dot-animation {
        0%, 100% {
          box-shadow: ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px;
        }
        50% {
          transform: rotate(180deg);
        }
        25%, 75% {
          box-shadow: ${this.color} 26px 0px 0px,
                      ${this.color} -26px 0px 0px,
                      ${this.color} 0px 26px 0px,
                      ${this.color} 0px -26px 0px,
                      ${this.color} 19px -19px 0px,
                      ${this.color} 19px 19px 0px,
                      ${this.color} -19px -19px 0px,
                      ${this.color} -19px 19px 0px;
        }
        100% {
          transform: rotate(360deg);
          box-shadow: ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px;
        }
      }

      @keyframes flower-spinner-smaller-dot-animation {
        0%, 100% {
          box-shadow: ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px;
        }
        25%, 75% {
          box-shadow: ${this.color} 14px 0px 0px,
                      ${this.color} -14px 0px 0px,
                      ${this.color} 0px 14px 0px,
                      ${this.color} 0px -14px 0px,
                      ${this.color} 10px -10px 0px,
                      ${this.color} 10px 10px 0px,
                      ${this.color} -10px -10px 0px,
                      ${this.color} -10px 10px 0px;
        }
        100% {
          box-shadow: ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px,
                      ${this.color} 0px 0px 0px;
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

    get color() { return `var(--fulfilling-bouncing-circle-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--fulfilling-bouncing-circle-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--fulfilling-bouncing-circle-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .fulfilling-bouncing-circle-spinner {
        animation: fulfilling-bouncing-circle-spinner-animation infinite ${this.duration} ease;
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .fulfilling-bouncing-circle-spinner .orbit {
        animation: fulfilling-bouncing-circle-spinner-orbit-animation infinite ${this.duration} ease;
        border-radius: 50%;
        border: calc(${this.size} * 0.03) solid ${this.color};
        height: ${this.size};
        left: 0;
        position: absolute;
        top: 0;
        width: ${this.size};
      }

      .fulfilling-bouncing-circle-spinner .circle {
        animation: fulfilling-bouncing-circle-spinner-circle-animation infinite ${this.duration} ease;
        border-radius: 50%;
        border: calc(${this.size} * 0.1) solid ${this.color};
        color: ${this.color};
        display: block;
        height: ${this.size};
        position: relative;
        transform: rotate(0deg) scale(1);
        width: ${this.size};
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

    get color() { return `var(--fulfilling-square-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--fulfilling-square-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--fulfilling-square-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .fulfilling-square-spinner {
        height: ${this.size};
        width: ${this.size};
        position: relative;
        border: 4px solid ${this.color};
        animation: fulfilling-square-spinner-animation ${this.duration} infinite ease;
      }

      .fulfilling-square-spinner .spinner-inner {
        vertical-align: top;
        display: inline-block;
        background-color: ${this.color};
        width: 100%;
        opacity: 1;
        animation: fulfilling-square-spinner-inner-animation ${this.duration} infinite ease-in;
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

    get color() { return `var(--half-circle-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--half-circle-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--half-circle-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .half-circle-spinner {
        border-radius: 100%;
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .half-circle-spinner .circle {
        border-radius: 100%;
        border: calc(${this.size} / 10) solid transparent;
        content: "";
        height: 100%;
        position: absolute;
        width: 100%;
      }

      .half-circle-spinner .circle.circle-1 {
        animation: half-circle-spinner-animation ${this.duration} infinite;
        border-top-color: ${this.color};
      }

      .half-circle-spinner .circle.circle-2 {
        animation: half-circle-spinner-animation ${this.duration} infinite alternate;
        border-bottom-color: ${this.color};
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

    get color() { return `var(--hollow-dots-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--hollow-dots-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--hollow-dots-spinner__size, ${this.props.size}px)`; }

    style({ count }) {
      const dotStyles = [];

      for (let i = 1; i <= count; i++) {
        dotStyles.push(`
        .hollow-dots-spinner .dot:nth-child(${i}) {
          animation-delay: calc(${this.duration} / ${count} * ${i});
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
        height: ${this.size};
        width: calc(${this.size} * 2 * ${count});
      }

      .hollow-dots-spinner .dot {
        animation: hollow-dots-spinner-animation ${this.duration} ease infinite 0ms;
        border-radius: 50%;
        border: calc(${this.size} / 5) solid ${this.color};
        float: left;
        height: ${this.size};
        margin: 0 calc(${this.size} / 2);
        transform: scale(0);
        width: ${this.size};
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

    get color() { return `var(--intersecting-circles-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--intersecting-circles-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--intersecting-circles-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .intersecting-circles-spinner {
        height: calc(${this.size} * 2);
        width: calc(${this.size} * 2);
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

      .intersecting-circles-spinner .spinnerBlock {
        animation: intersecting-circles-spinner-animation ${this.duration} linear infinite;
        transform-origin: center;
        display: block;
        height: ${this.size};
        width: ${this.size};
      }

      .intersecting-circles-spinner .circle {
        display: block;
        border: 2px solid ${this.color};
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
        left: calc(${this.size} * -0.36);
        top: calc(${this.size} * 0.2);
      }

      .intersecting-circles-spinner .circle:nth-child(3) {
        left: calc(${this.size} * -0.36);
        top: calc(${this.size} * -0.2);
      }

      .intersecting-circles-spinner .circle:nth-child(4) {
        left: 0;
        top: calc(${this.size} * -0.36);
      }

      .intersecting-circles-spinner .circle:nth-child(5) {
        left: calc(${this.size} * 0.36);
        top: calc(${this.size} * -0.2);
      }

      .intersecting-circles-spinner .circle:nth-child(6) {
        left: calc(${this.size} * 0.36);
        top: calc(${this.size} * 0.2);
      }

      .intersecting-circles-spinner .circle:nth-child(7) {
        left: 0;
        top: calc(${this.size} * 0.36);
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

    get color() { return `var(--looping-rhombuses-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--looping-rhombuses-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--looping-rhombuses-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .looping-rhombuses-spinner {
        height: ${this.size};
        position: relative;
        width: calc(${this.size} * 4);
      }

      .looping-rhombuses-spinner .rhombus {
        animation: looping-rhombuses-spinner-animation ${this.duration} linear infinite;
        background-color: ${this.color};
        border-radius: 2px;
        height: ${this.size};
        left: calc(${this.size} * 4);
        margin: 0 auto;
        position: absolute;
        transform: translateY(0) rotate(45deg) scale(0);
        width: ${this.size};
      }

      .looping-rhombuses-spinner .rhombus:nth-child(1) {
        animation-delay: calc(${this.duration} * 1 / -1.5);
      }

      .looping-rhombuses-spinner .rhombus:nth-child(2) {
        animation-delay: calc(${this.duration} * 2 / -1.5);
      }

      .looping-rhombuses-spinner .rhombus:nth-child(3) {
        animation-delay: calc(${this.duration} * 3 / -1.5);
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

    get color() { return `var(--orbit-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--orbit-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--orbit-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .orbit-spinner {
        border-radius: 50%;
        height: ${this.size};
        perspective: 800px;
        width: ${this.size};
      }

      .orbit-spinner .orbit {
        border-radius: 50%;
        box-sizing: border-box;
        height: 100%;
        position: absolute;
        width: 100%;
      }

      .orbit-spinner .orbit:nth-child(1) {
        animation: orbit-spinner-orbit-one-animation ${this.duration} linear infinite;
        border-bottom: 3px solid ${this.color};
        left: 0%;
        top: 0%;
      }

      .orbit-spinner .orbit:nth-child(2) {
        animation: orbit-spinner-orbit-two-animation ${this.duration} linear infinite;
        border-right: 3px solid ${this.color};
        right: 0%;
        top: 0%;
      }

      .orbit-spinner .orbit:nth-child(3) {
        animation: orbit-spinner-orbit-three-animation ${this.duration} linear infinite;
        border-top: 3px solid ${this.color};
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

    get color() { return `var(--pixel-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--pixel-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--pixel-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .pixel-spinner {
        align-items: center;
        display: flex;
        flex-direction: row;
        height: ${this.size};
        justify-content: center;
        width: ${this.size};
      }

      .pixel-spinner .pixel-spinner-inner {
        animation: pixel-spinner-animation ${this.duration} linear infinite;
        background-color: ${this.color};
        box-shadow: 15px 15px  0 0,
                    -15px -15px  0 0,
                    15px -15px  0 0,
                    -15px 15px  0 0,
                    0 15px  0 0,
                    15px 0  0 0,
                    -15px 0  0 0,
                    0 -15px 0 0;
        color: ${this.color};
        height: calc(${this.size} / 7);
        width: calc(${this.size} / 7);
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

    get color() { return `var(--radar-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--radar-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--radar-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .radar-spinner {
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .radar-spinner .circle {
        animation: radar-spinner-animation ${this.duration} infinite;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }

      .radar-spinner .circle:nth-child(1) {
        animation-delay: calc(${this.duration} / 6.67);
        padding: calc(${this.size} * 5 * 2 * 0 / 110);
      }

      .radar-spinner .circle:nth-child(2) {
        animation-delay: calc(${this.duration} / 6.67);
        padding: calc(${this.size} * 5 * 2 * 1 / 110);
      }

      .radar-spinner .circle:nth-child(3) {
        animation-delay: calc(${this.duration} / 6.67);
        padding: calc(${this.size} * 5 * 2 * 2 / 110);
      }

      .radar-spinner .circle:nth-child(4) {
        animation-delay: 0ms;
        padding: calc(${this.size} * 5 * 2 * 3 / 110);
      }

      .radar-spinner .circle-inner, .radar-spinner .circle-inner-container {
        border-radius: 50%;
        border: calc(${this.size} * 5 / 110) solid transparent;
        height: 100%;
        width: 100%;
      }

      .radar-spinner .circle-inner {
        border-left-color: ${this.color};
        border-right-color: ${this.color};
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

    get color() { return `var(--scaling-squares-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--scaling-squares-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--scaling-squares-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .scaling-squares-spinner {
        align-items: center;
        animation: scaling-squares-animation ${this.duration} infinite;
        display: flex;
        flex-direction: row;
        height: ${this.size};
        justify-content: center;
        position: relative;
        transform: rotate(0deg);
        width: ${this.size};
      }

      .scaling-squares-spinner .square {
        animation-duration: ${this.duration};
        animation-iteration-count: infinite;
        border: calc(${this.size} * 0.04 / 1.3) solid ${this.color};
        height: calc(${this.size} * 0.25 / 1.3);
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        width: calc(${this.size} * 0.25 / 1.3);
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

    get color() { return `var(--self-building-square-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--self-building-square-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--self-building-square-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .self-building-square-spinner {
        height: calc(${this.size} * 4);
        top: calc(${this.size} * 2 / 3);
        width: calc(${this.size} * 4);
      }
      .self-building-square-spinner .square {
        animation: self-building-square-spinner ${this.duration} infinite;
        background: ${this.color};
        float: left;
        height: ${this.size};
        margin-right: calc(${this.size} / 3);
        margin-top: calc(${this.size} / 3);
        opacity: 0;
        position:relative;
        top: calc(${this.size} * -2 / 3);
        width: ${this.size};
      }

      .self-building-square-spinner .square:nth-child(1) {
        animation-delay: calc(${this.duration} / 20 * 6);
      }

      .self-building-square-spinner .square:nth-child(2) {
        animation-delay: calc(${this.duration} / 20 * 7);
      }

      .self-building-square-spinner .square:nth-child(3) {
        animation-delay: calc(${this.duration} / 20 * 8);
      }

      .self-building-square-spinner .square:nth-child(4) {
        animation-delay: calc(${this.duration} / 20 * 3);
      }

      .self-building-square-spinner .square:nth-child(5) {
        animation-delay: calc(${this.duration} / 20 * 4);
      }

      .self-building-square-spinner .square:nth-child(6) {
        animation-delay: calc(${this.duration} / 20 * 5);
      }

      .self-building-square-spinner .square:nth-child(7) {
        animation-delay: calc(${this.duration} / 20 * 0);
      }

      .self-building-square-spinner .square:nth-child(8) {
        animation-delay: calc(${this.duration} / 20 * 1);
      }

      .self-building-square-spinner .square:nth-child(9) {
        animation-delay: calc(${this.duration} / 20 * 2);
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

    get color() { return `var(--semipolar-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--semipolar-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--semipolar-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .semipolar-spinner {
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .semipolar-spinner .ring {
        animation: semipolar-spinner-animation ${this.duration} infinite;
        border-bottom-color: transparent;
        border-left-color: ${this.color};
        border-radius: 50%;
        border-right-color: transparent;
        border-style: solid;
        border-top-color: ${this.color};
        border-width: calc(${this.size} * 0.05);
        position: absolute;
      }

      .semipolar-spinner .ring:nth-child(1) {
        animation-delay: calc(${this.duration} * 0.1 * 4);
        height: calc(${this.size} - ${this.size} * 0.2 * 0);
        left: calc(${this.size} * 0.1 * 0);
        top: calc(${this.size} * 0.1 * 0);
        width: calc(${this.size} - ${this.size} * 0.2 * 0);
        z-index: 5;
      }

      .semipolar-spinner .ring:nth-child(2) {
        animation-delay: calc(${this.duration} * 0.1 * 3);
        height: calc(${this.size} - ${this.size} * 0.2 * 1);
        left: calc(${this.size} * 0.1 * 1);
        top: calc(${this.size} * 0.1 * 1);
        width: calc(${this.size} - ${this.size} * 0.2 * 1);
        z-index: 4;
      }

      .semipolar-spinner .ring:nth-child(3) {
        animation-delay: calc(${this.duration} * 0.1 * 2);
        height: calc(${this.size} - ${this.size} * 0.2 * 2);
        left: calc(${this.size} * 0.1 * 2);
        top: calc(${this.size} * 0.1 * 2);
        width: calc(${this.size} - ${this.size} * 0.2 * 2);
        z-index: 3;
      }

      .semipolar-spinner .ring:nth-child(4) {
        animation-delay: calc(${this.duration} * 0.1 * 1);
        height: calc(${this.size} - ${this.size} * 0.2 * 3);
        left: calc(${this.size} * 0.1 * 3);
        top: calc(${this.size} * 0.1 * 3);
        width: calc(${this.size} - ${this.size} * 0.2 * 3);
        z-index: 2;
      }

      .semipolar-spinner .ring:nth-child(5) {
        animation-delay: calc(${this.duration} * 0.1 * 0);
        height: calc(${this.size} - ${this.size} * 0.2 * 4);
        left: calc(${this.size} * 0.1 * 4);
        top: calc(${this.size} * 0.1 * 4);
        width: calc(${this.size} - ${this.size} * 0.2 * 4);
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

    get color() { return `var(--spring-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--spring-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--spring-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .spring-spinner {
        height: ${this.size};
        width: ${this.size};
      }

      .spring-spinner .spring-spinner-part {
        height: calc(${this.size} / 2);
        overflow: hidden;
        width: ${this.size};
      }

      .spring-spinner  .spring-spinner-part.bottom {
          transform: rotate(180deg) scale(-1, 1);
      }

      .spring-spinner .spring-spinner-rotator {
        animation: spring-spinner-animation ${this.duration} ease-in-out infinite;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-radius: 50%;
        border-right-color: ${this.color};
        border-style: solid;
        border-top-color: ${this.color};
        border-width: calc(${this.size} / 7);
        height: ${this.size};
        transform: rotate(-200deg);
        width: ${this.size};
      }

      @keyframes spring-spinner-animation {
        0% {
          border-width: calc(${this.size} / 7);
        }

        25% {
          border-width: calc(${this.size} / 23.33);
        }

        50% {
          transform: rotate(115deg);
          border-width: calc(${this.size} / 7);
        }

        75% {
          border-width: calc(${this.size} / 23.33);
        }

        100% {
          border-width: calc(${this.size} / 7);
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

    get color() { return `var(--swapping-squares-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--swapping-squares-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--swapping-squares-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .swapping-squares-spinner {
        align-items: center;
        display: flex;
        flex-direction: row;
        height: ${this.size};
        justify-content: center;
        position: relative;
        width: ${this.size};
      }

      .swapping-squares-spinner .square {
        animation-duration: ${this.duration};
        animation-iteration-count: infinite;
        border: calc(${this.size} * 0.04 / 1.3) solid ${this.color};
        height: calc(${this.size} * 0.25 / 1.3);
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        width: calc(${this.size} * 0.25 / 1.3);
      }

      .swapping-squares-spinner .square:nth-child(1) {
        animation-delay: calc(${this.duration} / 2);
        animation-name: swapping-squares-animation-child-1;
      }

      .swapping-squares-spinner .square:nth-child(2) {
        animation-delay: 0ms;
        animation-name: swapping-squares-animation-child-2;
      }

      .swapping-squares-spinner .square:nth-child(3) {
        animation-delay: calc(${this.duration} / 2);
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

    get color() { return `var(--trinity-rings-spinner__color, ${this.props.color})`; }

    get duration() { return `var(--trinity-rings-spinner__duration, ${this.props.duration}s)`; }

    get size() { return `var(--trinity-rings-spinner__size, ${this.props.size}px)`; }

    style() {
      return `
      .trinity-rings-spinner {
        align-items: center;
        display: flex;
        flex-direction: row;
        height: calc(${this.size} * 2);
        justify-content: center;
        overflow: hidden;
        padding: 3px;
        position: relative;
        width: calc(${this.size} * 2);
      }

      .trinity-rings-spinner .circle {
        border-radius: 50%;
        border: 3px solid ${this.color};
        display: block;
        opacity: 1;
        position: absolute;
      }

      .trinity-rings-spinner .circle:nth-child(1) {
        animation: trinity-rings-spinner-circle1-animation ${this.duration} infinite linear;
        border-width: 3px;
        height: ${this.size};
        width: ${this.size};
      }

      .trinity-rings-spinner .circle:nth-child(2) {
        animation: trinity-rings-spinner-circle2-animation ${this.duration} infinite linear;
        border-width: 2px;
        height: calc(${this.size} * 0.65);
        width: calc(${this.size} * 0.65);
      }

      .trinity-rings-spinner .circle:nth-child(3) {
        animation:trinity-rings-spinner-circle3-animation ${this.duration} infinite linear;
        border-width: 1px;
        height: calc(${this.size} * 0.1);
        width: calc(${this.size} * 0.1);
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
        opacity: .8;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL1NwaW5uZXJFbGVtZW50LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9hdG9tLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2JyZWVkaW5nLXJob21idXMtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvZmluZ2VycHJpbnQtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvZmxvd2VyLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2Z1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2Z1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2hhbGYtY2lyY2xlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2hvbGxvdy1kb3RzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2ludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2xvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL29yYml0LXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL3BpeGVsLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL3JhZGFyLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL3NjYWxpbmctc3F1YXJlcy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9zZW1pcG9sYXItc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvc3ByaW5nLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL3N3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvdHJpbml0eS1yaW5ncy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvYmFyLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9iZWF0LXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9ib3VuY2Utc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL2NpcmNsZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvY2xpbWJpbmctYm94LXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9jbGlwLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9kb3Qtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL2ZhZGUtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL2dyaWQtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL2hhc2gtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL21vb24tc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3BhY21hbi1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvcHJvcGFnYXRlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9wdWxzZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvcmluZy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvcmlzZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvcm90YXRlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9zY2FsZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvc2tldy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvc3F1YXJlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9zeW5jLXNwaW5uZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3Bpbm5lckVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnByb3BzID0gdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0cztcbiAgICB0aGlzLnJvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5wcm9wc1tuYW1lXSA9IG5ld1ZhbHVlIHx8IHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdHNbbmFtZV07XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzdHlsZSBtZXRob2QgbXVzdCBiZSBpbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd0ZW1wbGF0ZSBtZXRob2QgbXVzdCBiZSBpbXBsZW1lbnRlZCcpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IHN0eWxlcyA9IGBcbiAgICAgIDxzdHlsZT5cbiAgICAgICAgKiB7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cblxuICAgICAgICA6aG9zdCAgICAgICAgICAgeyBkaXNwbGF5OiBibG9jazsgfVxuICAgICAgICA6aG9zdChbaGlkZGVuXSkgeyBkaXNwbGF5OiBub25lOyB9XG5cbiAgICAgICAgJHt0aGlzLnN0eWxlKHRoaXMucHJvcHMpfVxuICAgICAgPC9zdHlsZT5cbiAgICBgO1xuXG4gICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlKHRoaXMucHJvcHMpO1xuXG4gICAgdGhpcy5yb290LmlubmVySFRNTCA9IGAke3N0eWxlc30ke3RlbXBsYXRlfWA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3Bpbm5lckVsZW1lbnQ7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgQXRvbVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnYXRvbS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMSxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1hdG9tLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0tYXRvbS1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWF0b20tc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuYXRvbS1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5hdG9tLXNwaW5uZXIgLnNwaW5uZXItaW5uZXIge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWNpcmNsZSB7XG4gICAgICAgIGNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMjQpO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgfVxuXG4gICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWxpbmUge1xuICAgICAgICBib3JkZXItbGVmdDogY2FsYygke3RoaXMuc2l6ZX0gLyAyNSkgc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXItdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAvIDI1KSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWxpbmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBhdG9tLXNwaW5uZXItYW5pbWF0aW9uLTEgJHt0aGlzLmR1cmF0aW9ufSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigxMjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMGRlZyk7XG4gICAgICB9XG5cbiAgICAgIC5hdG9tLXNwaW5uZXIgLnNwaW5uZXItbGluZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb246IGF0b20tc3Bpbm5lci1hbmltYXRpb24tMiAke3RoaXMuZHVyYXRpb259IGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVaKDI0MGRlZykgcm90YXRlWCg2NmRlZykgcm90YXRlWigwZGVnKTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1saW5lOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbjogYXRvbS1zcGlubmVyLWFuaW1hdGlvbi0zICR7dGhpcy5kdXJhdGlvbn0gbGluZWFyIGluZmluaXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMzYwZGVnKSByb3RhdGVYKDY2ZGVnKSByb3RhdGVaKDBkZWcpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGF0b20tc3Bpbm5lci1hbmltYXRpb24tMSB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigxMjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGF0b20tc3Bpbm5lci1hbmltYXRpb24tMiB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigyNDBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGF0b20tc3Bpbm5lci1hbmltYXRpb24tMyB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigzNjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImF0b20tc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1pbm5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWxpbmVcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1saW5lXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItbGluZVwiPjwvZGl2PlxuXG4gICAgICAgICAgPCEtLUNocm9tZSByZW5kZXJzIGxpdHRsZSBjaXJjbGVzIG1hbGZvcm1lZCA6KC0tPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWNpcmNsZVwiPiYjOTY3OTs8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShBdG9tU3Bpbm5lci5pcywgQXRvbVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEJyZWVkaW5nUmhvbWJ1c1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMixcbiAgICAgIHNpemU6IDY1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLCAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyICoge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzIHtcbiAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAke3RoaXMuZHVyYXRpb259O1xuICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSAvIDcuNSk7XG4gICAgICAgIGxlZnQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gMi4zMDc3KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IGNhbGMoJHt0aGlzLnNpemV9IC8gMi4zMDc3KTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gNy41KTtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1czpudGgtY2hpbGQoMm4rMCkge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtMSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDEpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0xO1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTIge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiAyKTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMjtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC0zIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogMyk7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTM7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtNCB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDQpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC00O1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTUge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiA1KTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNTtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC02IHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogNik7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTY7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtNyB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDcpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC03O1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTgge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiA4KTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtODtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5iaWcge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDAuNXM7XG4gICAgICAgIGFuaW1hdGlvbjogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC1iaWcgJHt0aGlzLmR1cmF0aW9ufSBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSAvIDMpO1xuICAgICAgICBsZWZ0OiBjYWxjKCR7dGhpcy5zaXplfSAvIDMpO1xuICAgICAgICB0b3A6IGNhbGMoJHt0aGlzLnNpemV9IC8gMyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAvIDMpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMSB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMyNSUsIC0zMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTMyNSUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0zIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzMjUlLCAtMzI1JSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTQge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDMyNSUsIDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC01IHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzMjUlLCAzMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNiB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMzI1JSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTcge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0zMjUlLCAzMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtOCB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMyNSUsIDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC1iaWcge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImJyZWVkaW5nLXJob21idXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC0xXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtM1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC00XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtNlwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC03XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLThcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgYmlnXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShCcmVlZGluZ1Job21idXNTcGlubmVyLmlzLCBCcmVlZGluZ1Job21idXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBDaXJjbGVzVG9SaG9tYnVzZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2NpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGNvdW50OiAzLFxuICAgICAgZHVyYXRpb246IDEuMixcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdjb3VudCcsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBkdXJhdGlvbigpIHsgcmV0dXJuIGB2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSh7IGNvdW50IH0pIHtcbiAgICBjb25zdCBjaXJjbGVTdHlsZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAyOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGNpcmNsZVN0eWxlcy5wdXNoKGBcbiAgICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoJHtpfSkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259IC8gOCAqICR7aX0pO1xuICAgICAgICB9XG4gICAgICBgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIsIC5jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyICoge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgfVxuXG4gICAgICAuY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlclxuICAgICAgICB3aWR0aDogY2FsYygoJHt0aGlzLnNpemV9ICsgJHt0aGlzLnNpemV9ICogMS4xMjUpICogJHtjb3VudH0pO1xuICAgICAgfVxuXG4gICAgICAuY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lciAuY2lyY2xlIHtcbiAgICAgICAgYW5pbWF0aW9uOiBjaXJjbGVzLXRvLXJob21idXNlcy1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIGJvcmRlcjogM3B4IHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBtYXJnaW4tbGVmdDogY2FsYygke3RoaXMuc2l6ZX0gKiAxLjEyNSk7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAvIDggKiAxKTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICB9XG5cbiAgICAgICR7Y2lyY2xlU3R5bGVzLmpvaW4oJycpfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNpcmNsZXMtdG8tcmhvbWJ1c2VzLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIH1cbiAgICAgICAgMTcuNSUge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgICAgICAgfVxuICAgICAgICA1MCUge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgOTMuNSUge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBjaXJjbGVzLXRvLXJob21idXNlcy1iYWNrZ3JvdW5kLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMC40O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY291bnQgfSkge1xuICAgIGNvbnN0IGNpcmNsZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAyOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGNpcmNsZXMucHVzaCgnPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PicpO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgICR7Y2lyY2xlcy5qb2luKCcnKX1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKENpcmNsZXNUb1Job21idXNlc1NwaW5uZXIuaXMsIENpcmNsZXNUb1Job21idXNlc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEZpbmdlcnByaW50U3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdmaW5nZXJwcmludC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMS41LFxuICAgICAgc2l6ZTogNjQsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fZHVyYXRpb24sICR7dGhpcy5wcm9wcy5kdXJhdGlvbn1zKWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHBhZGRpbmc6IDJweDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nIHtcbiAgICAgICAgYW5pbWF0aW9uOiBmaW5nZXJwcmludC1zcGlubmVyLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGN1YmljLWJlemllcigwLjY4MCwgLTAuNzUwLCAwLjI2NSwgMS43NTApIGluZmluaXRlIGZvcndhcmRzO1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgIGJvcmRlci10b3AtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci13aWR0aDogMnB4O1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogMSk7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgMCAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgMCAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogMik7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgMSAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgMSAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogMyk7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgMiAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgMiAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogNCk7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgMyAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgMyAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogNSk7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgNCAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgNCAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg2KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogNik7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgNSAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgNSAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg3KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogNyk7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgNiAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgNiAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg4KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogOCk7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgNyAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgNyAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgfVxuXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg5KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogOSk7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgOCAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyA5ICsgOCAqICR7dGhpcy5zaXplfSAvIDkpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZpbmdlcnByaW50LXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoIDM2MGRlZyApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZmluZ2VycHJpbnQtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRmluZ2VycHJpbnRTcGlubmVyLmlzLCBGaW5nZXJwcmludFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEZsb3dlclNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnZmxvd2VyLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAyLjUsXG4gICAgICBzaXplOiA3MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tZmxvd2VyLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0tZmxvd2VyLXNwaW5uZXJfX2R1cmF0aW9uLCAke3RoaXMucHJvcHMuZHVyYXRpb259cylgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tZmxvd2VyLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5mbG93ZXItc3Bpbm5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmZsb3dlci1zcGlubmVyIC5kb3RzLWNvbnRhaW5lciB7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyA3KTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gNyk7XG4gICAgICB9XG5cbiAgICAgIC5mbG93ZXItc3Bpbm5lciAuc21hbGxlci1kb3Qge1xuICAgICAgICBhbmltYXRpb246IGZsb3dlci1zcGlubmVyLXNtYWxsZXItZG90LWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IDBzIGluZmluaXRlIGJvdGg7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgLmZsb3dlci1zcGlubmVyIC5iaWdnZXItZG90IHtcbiAgICAgICAgYW5pbWF0aW9uOiBmbG93ZXItc3Bpbm5lci1iaWdnZXItZG90LWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IDBzIGluZmluaXRlIGJvdGg7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwYWRkaW5nOiAxMCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZsb3dlci1zcGlubmVyLWJpZ2dlci1kb3QtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUsIDEwMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6ICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweDtcbiAgICAgICAgfVxuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgMjUlLCA3NSUge1xuICAgICAgICAgIGJveC1zaGFkb3c6ICR7dGhpcy5jb2xvcn0gMjZweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gLTI2cHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAyNnB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAtMjZweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAxOXB4IC0xOXB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDE5cHggMTlweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAtMTlweCAtMTlweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAtMTlweCAxOXB4IDBweDtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICAgICAgICAgIGJveC1zaGFkb3c6ICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZsb3dlci1zcGlubmVyLXNtYWxsZXItZG90LWFuaW1hdGlvbiB7XG4gICAgICAgIDAlLCAxMDAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgMjUlLCA3NSUge1xuICAgICAgICAgIGJveC1zaGFkb3c6ICR7dGhpcy5jb2xvcn0gMTRweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gLTE0cHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAxNHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAtMTRweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAxMHB4IC0xMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDEwcHggMTBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAtMTBweCAtMTBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAtMTBweCAxMHB4IDBweDtcbiAgICAgICAgfVxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJmbG93ZXItc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90cy1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmlnZ2VyLWRvdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNtYWxsZXItZG90XCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRmxvd2VyU3Bpbm5lci5pcywgRmxvd2VyU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgRnVsZmlsbGluZ0JvdW5jaW5nQ2lyY2xlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdmdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogNCxcbiAgICAgIHNpemU6IDUwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX2R1cmF0aW9uLCAke3RoaXMucHJvcHMuZHVyYXRpb259cylgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24gaW5maW5pdGUgJHt0aGlzLmR1cmF0aW9ufSBlYXNlO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lciAub3JiaXQge1xuICAgICAgICBhbmltYXRpb246IGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItb3JiaXQtYW5pbWF0aW9uIGluZmluaXRlICR7dGhpcy5kdXJhdGlvbn0gZWFzZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXI6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4wMykgc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlIHtcbiAgICAgICAgYW5pbWF0aW9uOiBmdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLWNpcmNsZS1hbmltYXRpb24gaW5maW5pdGUgJHt0aGlzLmR1cmF0aW9ufSBlYXNlO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJvcmRlcjogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjEpIHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgc2NhbGUoMSk7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItb3JiaXQtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG4gICAgICAgIDYyLjUlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7XG4gICAgICAgIH1cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG4gICAgICAgIDg3LjUlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItY2lyY2xlLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cblxuICAgICAgICAxNi43JSB7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogaW5pdGlhbDtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiBpbml0aWFsO1xuICAgICAgICB9XG5cbiAgICAgICAgMzMuNCUge1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICB9XG5cbiAgICAgICAgNTAlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIDYyLjUlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICAgICAgICB9XG5cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgODcuNSUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XG4gICAgICAgIH1cblxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3JiaXRcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEZ1bGZpbGxpbmdCb3VuY2luZ0NpcmNsZVNwaW5uZXIuaXMsIEZ1bGZpbGxpbmdCb3VuY2luZ0NpcmNsZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEZ1bGZpbGxpbmdTcXVhcmVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Z1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiA0LFxuICAgICAgc2l6ZTogNTAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0tZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lcl9fZHVyYXRpb24sICR7dGhpcy5wcm9wcy5kdXJhdGlvbn1zKWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgYm9yZGVyOiA0cHggc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYW5pbWF0aW9uOiBmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGluZmluaXRlIGVhc2U7XG4gICAgICB9XG5cbiAgICAgIC5mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyIC5zcGlubmVyLWlubmVyIHtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgYW5pbWF0aW9uOiBmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLWlubmVyLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGluZmluaXRlIGVhc2UtaW47XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgMjUlICB7IHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7IH1cbiAgICAgICAgNzUlICB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLWlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyBoZWlnaHQ6IDAlOyB9XG4gICAgICAgIDI1JSAgeyBoZWlnaHQ6IDAlOyB9XG4gICAgICAgIDUwJSAgeyBoZWlnaHQ6IDEwMCU7IH1cbiAgICAgICAgNzUlICB7IGhlaWdodDogMTAwJTsgfVxuICAgICAgICAxMDAlIHsgaGVpZ2h0OiAwJTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItaW5uZXJcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEZ1bGZpbGxpbmdTcXVhcmVTcGlubmVyLmlzLCBGdWxmaWxsaW5nU3F1YXJlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgSGFsZkNpcmNsZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnaGFsZi1jaXJjbGUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0taGFsZi1jaXJjbGUtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBkdXJhdGlvbigpIHsgcmV0dXJuIGB2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmhhbGYtY2lyY2xlLXNwaW5uZXIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuaGFsZi1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKCR7dGhpcy5zaXplfSAvIDEwKSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAuaGFsZi1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlLmNpcmNsZS0xIHtcbiAgICAgICAgYW5pbWF0aW9uOiBoYWxmLWNpcmNsZS1zcGlubmVyLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGluZmluaXRlO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgfVxuXG4gICAgICAuaGFsZi1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlLmNpcmNsZS0yIHtcbiAgICAgICAgYW5pbWF0aW9uOiBoYWxmLWNpcmNsZS1zcGlubmVyLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGluZmluaXRlIGFsdGVybmF0ZTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBoYWxmLWNpcmNsZS1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImhhbGYtY2lyY2xlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZSBjaXJjbGUtMVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlIGNpcmNsZS0yXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShIYWxmQ2lyY2xlU3Bpbm5lci5pcywgSGFsZkNpcmNsZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEhvbGxvd0RvdHNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2hvbGxvdy1kb3RzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGNvdW50OiAzLFxuICAgICAgZHVyYXRpb246IDEsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnY291bnQnLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0taG9sbG93LWRvdHMtc3Bpbm5lcl9fZHVyYXRpb24sICR7dGhpcy5wcm9wcy5kdXJhdGlvbn1zKWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoeyBjb3VudCB9KSB7XG4gICAgY29uc3QgZG90U3R5bGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBjb3VudDsgaSsrKSB7XG4gICAgICBkb3RTdHlsZXMucHVzaChgXG4gICAgICAgIC5ob2xsb3ctZG90cy1zcGlubmVyIC5kb3Q6bnRoLWNoaWxkKCR7aX0pIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAvICR7Y291bnR9ICogJHtpfSk7XG4gICAgICAgIH1cbiAgICAgIGApO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICAqIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cblxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cblxuICAgICAgLmhvbGxvdy1kb3RzLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9ICogMiAqICR7Y291bnR9KTtcbiAgICAgIH1cblxuICAgICAgLmhvbGxvdy1kb3RzLXNwaW5uZXIgLmRvdCB7XG4gICAgICAgIGFuaW1hdGlvbjogaG9sbG93LWRvdHMtc3Bpbm5lci1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBlYXNlIGluZmluaXRlIDBtcztcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXI6IGNhbGMoJHt0aGlzLnNpemV9IC8gNSkgc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBtYXJnaW46IDAgY2FsYygke3RoaXMuc2l6ZX0gLyAyKTtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgJHtkb3RTdHlsZXMuam9pbignJyl9XG5cbiAgICAgIEBrZXlmcmFtZXMgaG9sbG93LWRvdHMtc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoeyBjb3VudCB9KSB7XG4gICAgY29uc3QgZG90cyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gY291bnQ7IGkrKykge1xuICAgICAgZG90cy5wdXNoKCc8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJob2xsb3ctZG90cy1zcGlubmVyXCI+XG4gICAgICAgICR7ZG90cy5qb2luKCcnKX1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEhvbGxvd0RvdHNTcGlubmVyLmlzLCBIb2xsb3dEb3RzU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJzZWN0aW5nQ2lyY2xlc1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuMixcbiAgICAgIHNpemU6IDM1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJfX2R1cmF0aW9uLCAke3RoaXMucHJvcHMuZHVyYXRpb259cylgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gKiAyKTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9ICogMik7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5zcGlubmVyQmxvY2sge1xuICAgICAgICBhbmltYXRpb246IGludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItYW5pbWF0aW9uICR7dGhpcy5kdXJhdGlvbn0gbGluZWFyIGluZmluaXRlO1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMikge1xuICAgICAgICBsZWZ0OiBjYWxjKCR7dGhpcy5zaXplfSAqIC0wLjM2KTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMik7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgbGVmdDogY2FsYygke3RoaXMuc2l6ZX0gKiAtMC4zNik7XG4gICAgICAgIHRvcDogY2FsYygke3RoaXMuc2l6ZX0gKiAtMC4yKTtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoNCkge1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0b3A6IGNhbGMoJHt0aGlzLnNpemV9ICogLTAuMzYpO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGxlZnQ6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4zNik7XG4gICAgICAgIHRvcDogY2FsYygke3RoaXMuc2l6ZX0gKiAtMC4yKTtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoNikge1xuICAgICAgICBsZWZ0OiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMzYpO1xuICAgICAgICB0b3A6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4yKTtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoNykge1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0b3A6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4zNik7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICBmcm9tIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgdG8gICB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyQmxvY2tcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNpcmNsZVwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShJbnRlcnNlY3RpbmdDaXJjbGVzU3Bpbm5lci5pcywgSW50ZXJzZWN0aW5nQ2lyY2xlc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIExvb3BpbmdSaG9tYnVzZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2xvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAyLjUsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBkdXJhdGlvbigpIHsgcmV0dXJuIGB2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gKiA0KTtcbiAgICAgIH1cblxuICAgICAgLmxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIgLnJob21idXMge1xuICAgICAgICBhbmltYXRpb246IGxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXItYW5pbWF0aW9uICR7dGhpcy5kdXJhdGlvbn0gbGluZWFyIGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBsZWZ0OiBjYWxjKCR7dGhpcy5zaXplfSAqIDQpO1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCkgcm90YXRlKDQ1ZGVnKSBzY2FsZSgwKTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIgLnJob21idXM6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKCR7dGhpcy5kdXJhdGlvbn0gKiAxIC8gLTEuNSk7XG4gICAgICB9XG5cbiAgICAgIC5sb29waW5nLXJob21idXNlcy1zcGlubmVyIC5yaG9tYnVzOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259ICogMiAvIC0xLjUpO1xuICAgICAgfVxuXG4gICAgICAubG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lciAucmhvbWJ1czpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAqIDMgLyAtMS41KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBsb29waW5nLXJob21idXNlcy1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCkgICAgIHJvdGF0ZSg0NWRlZykgc2NhbGUoMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMjMzJSkgcm90YXRlKDQ1ZGVnKSBzY2FsZSgxKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC00NjYlKSByb3RhdGUoNDVkZWcpIHNjYWxlKDApOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1c1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTG9vcGluZ1Job21idXNlc1NwaW5uZXIuaXMsIExvb3BpbmdSaG9tYnVzZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBPcmJpdFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnb3JiaXQtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuMixcbiAgICAgIHNpemU6IDU1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1vcmJpdC1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLW9yYml0LXNwaW5uZXJfX2R1cmF0aW9uLCAke3RoaXMucHJvcHMuZHVyYXRpb259cylgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tb3JiaXQtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAub3JiaXQtc3Bpbm5lciB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBlcnNwZWN0aXZlOiA4MDBweDtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLm9yYml0LXNwaW5uZXIgLm9yYml0IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5vcmJpdC1zcGlubmVyIC5vcmJpdDpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb246IG9yYml0LXNwaW5uZXItb3JiaXQtb25lLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGxlZnQ6IDAlO1xuICAgICAgICB0b3A6IDAlO1xuICAgICAgfVxuXG4gICAgICAub3JiaXQtc3Bpbm5lciAub3JiaXQ6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBvcmJpdC1zcGlubmVyLW9yYml0LXR3by1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1yaWdodDogM3B4IHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIHJpZ2h0OiAwJTtcbiAgICAgICAgdG9wOiAwJTtcbiAgICAgIH1cblxuICAgICAgLm9yYml0LXNwaW5uZXIgLm9yYml0Om50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbjogb3JiaXQtc3Bpbm5lci1vcmJpdC10aHJlZS1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci10b3A6IDNweCBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3R0b206IDAlO1xuICAgICAgICByaWdodDogMCU7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgb3JiaXQtc3Bpbm5lci1vcmJpdC1vbmUtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWCgzNWRlZykgcm90YXRlWSgtNDVkZWcpIHJvdGF0ZVooMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWCgzNWRlZykgcm90YXRlWSgtNDVkZWcpIHJvdGF0ZVooMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG9yYml0LXNwaW5uZXItb3JiaXQtdHdvLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoNTBkZWcpIHJvdGF0ZVkoMTBkZWcpIHJvdGF0ZVooMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWCg1MGRlZykgcm90YXRlWSgxMGRlZykgcm90YXRlWigzNjBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgb3JiaXQtc3Bpbm5lci1vcmJpdC10aHJlZS1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDM1ZGVnKSByb3RhdGVZKDU1ZGVnKSByb3RhdGVaKDBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMzVkZWcpIHJvdGF0ZVkoNTVkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cIm9yYml0LXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9yYml0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvcmJpdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3JiaXRcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKE9yYml0U3Bpbm5lci5pcywgT3JiaXRTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBQaXhlbFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncGl4ZWwtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA3MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tcGl4ZWwtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBkdXJhdGlvbigpIHsgcmV0dXJuIGB2YXIoLS1waXhlbC1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXBpeGVsLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnBpeGVsLXNwaW5uZXIge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5waXhlbC1zcGlubmVyIC5waXhlbC1zcGlubmVyLWlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uOiBwaXhlbC1zcGlubmVyLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm94LXNoYWRvdzogMTVweCAxNXB4ICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIC0xNXB4IC0xNXB4ICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIDE1cHggLTE1cHggIDAgMCxcbiAgICAgICAgICAgICAgICAgICAgLTE1cHggMTVweCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAwIDE1cHggIDAgMCxcbiAgICAgICAgICAgICAgICAgICAgMTVweCAwICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIC0xNXB4IDAgIDAgMCxcbiAgICAgICAgICAgICAgICAgICAgMCAtMTVweCAwIDA7XG4gICAgICAgIGNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gNyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAvIDcpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHBpeGVsLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAyMHB4IDIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAtMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDIwcHggLTIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgMHB4IDEwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAxMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIC0xMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDBweCAtMTBweCAwcHggMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAyMHB4IDIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAtMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDIwcHggLTIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgMHB4IDEwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAxMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIC0xMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDBweCAtMTBweCAwcHggMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInBpeGVsLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpeGVsLXNwaW5uZXItaW5uZXJcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFBpeGVsU3Bpbm5lci5pcywgUGl4ZWxTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBSYWRhclNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncmFkYXItc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tcmFkYXItc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBkdXJhdGlvbigpIHsgcmV0dXJuIGB2YXIoLS1yYWRhci1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXJhZGFyLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnJhZGFyLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlIHtcbiAgICAgICAgYW5pbWF0aW9uOiByYWRhci1zcGlubmVyLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGluZmluaXRlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAvIDYuNjcpO1xuICAgICAgICBwYWRkaW5nOiBjYWxjKCR7dGhpcy5zaXplfSAqIDUgKiAyICogMCAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKCR7dGhpcy5kdXJhdGlvbn0gLyA2LjY3KTtcbiAgICAgICAgcGFkZGluZzogY2FsYygke3RoaXMuc2l6ZX0gKiA1ICogMiAqIDEgLyAxMTApO1xuICAgICAgfVxuXG4gICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259IC8gNi42Nyk7XG4gICAgICAgIHBhZGRpbmc6IGNhbGMoJHt0aGlzLnNpemV9ICogNSAqIDIgKiAyIC8gMTEwKTtcbiAgICAgIH1cblxuICAgICAgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoNCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDBtcztcbiAgICAgICAgcGFkZGluZzogY2FsYygke3RoaXMuc2l6ZX0gKiA1ICogMiAqIDMgLyAxMTApO1xuICAgICAgfVxuXG4gICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlLWlubmVyLCAucmFkYXItc3Bpbm5lciAuY2lyY2xlLWlubmVyLWNvbnRhaW5lciB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKCR7dGhpcy5zaXplfSAqIDUgLyAxMTApIHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlLWlubmVyIHtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyByYWRhci1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInJhZGFyLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lclwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUmFkYXJTcGlubmVyLmlzLCBSYWRhclNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNjYWxpbmdTcXVhcmVzU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuMjUsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX2R1cmF0aW9uLCAke3RoaXMucHJvcHMuZHVyYXRpb259cylgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYW5pbWF0aW9uOiBzY2FsaW5nLXNxdWFyZXMtYW5pbWF0aW9uICR7dGhpcy5kdXJhdGlvbn0gaW5maW5pdGU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmUge1xuICAgICAgICBhbmltYXRpb24tZHVyYXRpb246ICR7dGhpcy5kdXJhdGlvbn07XG4gICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgICBib3JkZXI6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4wNCAvIDEuMykgc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMjUgLyAxLjMpO1xuICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMjUgLyAxLjMpO1xuICAgICAgfVxuXG4gICAgICAuc2NhbGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTE7XG4gICAgICB9XG5cbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMjtcbiAgICAgIH1cblxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0zO1xuICAgICAgfVxuXG4gICAgICAuc2NhbGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoNCkge1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTQ7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2NhbGluZy1zcXVhcmVzLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMSB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDE1MCUsMTUwJSkgc2NhbGUoMiwyKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0yIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MCUsMTUwJSkgc2NhbGUoMiwyKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0zIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MCUsLTE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNCB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDE1MCUsLTE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTY2FsaW5nU3F1YXJlc1NwaW5uZXIuaXMsIFNjYWxpbmdTcXVhcmVzU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgU2VsZkJ1aWxkaW5nU3F1YXJlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogNixcbiAgICAgIHNpemU6IDEwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX2R1cmF0aW9uLCAke3RoaXMucHJvcHMuZHVyYXRpb259cylgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gKiA0KTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAqIDIgLyAzKTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9ICogNCk7XG4gICAgICB9XG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlIHtcbiAgICAgICAgYW5pbWF0aW9uOiBzZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyICR7dGhpcy5kdXJhdGlvbn0gaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQ6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSAvIDMpO1xuICAgICAgICBtYXJnaW4tdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAvIDMpO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAqIC0yIC8gMyk7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKCR7dGhpcy5kdXJhdGlvbn0gLyAyMCAqIDYpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259IC8gMjAgKiA3KTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAvIDIwICogOCk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKCR7dGhpcy5kdXJhdGlvbn0gLyAyMCAqIDMpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259IC8gMjAgKiA0KTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoNikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAvIDIwICogNSk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDcpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKCR7dGhpcy5kdXJhdGlvbn0gLyAyMCAqIDApO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg4KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259IC8gMjAgKiAxKTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoOSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAvIDIwICogMik7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5jbGVhciB7XG4gICAgICAgIGNsZWFyOiBib3RoO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIDUlIHtcbiAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIDUwLjklIHtcbiAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIDU1LjklIHtcbiAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgIHRvcDogaW5oZXJpdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZSBjbGVhclwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZSBjbGVhclwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFNlbGZCdWlsZGluZ1NxdWFyZVNwaW5uZXIuaXMsIFNlbGZCdWlsZGluZ1NxdWFyZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNlbWlwb2xhclNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc2VtaXBvbGFyLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAyLFxuICAgICAgc2l6ZTogNjUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXNlbWlwb2xhci1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZyB7XG4gICAgICAgIGFuaW1hdGlvbjogc2VtaXBvbGFyLXNwaW5uZXItYW5pbWF0aW9uICR7dGhpcy5kdXJhdGlvbn0gaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4wNSk7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIH1cblxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259ICogMC4xICogNCk7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLSAke3RoaXMuc2l6ZX0gKiAwLjIgKiAwKTtcbiAgICAgICAgbGVmdDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjEgKiAwKTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMSAqIDApO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLSAke3RoaXMuc2l6ZX0gKiAwLjIgKiAwKTtcbiAgICAgICAgei1pbmRleDogNTtcbiAgICAgIH1cblxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259ICogMC4xICogMyk7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLSAke3RoaXMuc2l6ZX0gKiAwLjIgKiAxKTtcbiAgICAgICAgbGVmdDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjEgKiAxKTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMSAqIDEpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLSAke3RoaXMuc2l6ZX0gKiAwLjIgKiAxKTtcbiAgICAgICAgei1pbmRleDogNDtcbiAgICAgIH1cblxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259ICogMC4xICogMik7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLSAke3RoaXMuc2l6ZX0gKiAwLjIgKiAyKTtcbiAgICAgICAgbGVmdDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjEgKiAyKTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMSAqIDIpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLSAke3RoaXMuc2l6ZX0gKiAwLjIgKiAyKTtcbiAgICAgICAgei1pbmRleDogMztcbiAgICAgIH1cblxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259ICogMC4xICogMSk7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLSAke3RoaXMuc2l6ZX0gKiAwLjIgKiAzKTtcbiAgICAgICAgbGVmdDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjEgKiAzKTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMSAqIDMpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLSAke3RoaXMuc2l6ZX0gKiAwLjIgKiAzKTtcbiAgICAgICAgei1pbmRleDogMjtcbiAgICAgIH1cblxuICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCg1KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259ICogMC4xICogMCk7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLSAke3RoaXMuc2l6ZX0gKiAwLjIgKiA0KTtcbiAgICAgICAgbGVmdDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjEgKiA0KTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMSAqIDQpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLSAke3RoaXMuc2l6ZX0gKiAwLjIgKiA0KTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzZW1pcG9sYXItc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpIHNjYWxlKDAuNyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzZW1pcG9sYXItc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2VtaXBvbGFyU3Bpbm5lci5pcywgU2VtaXBvbGFyU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgU3ByaW5nU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzcHJpbmctc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDMsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tc3ByaW5nLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0tc3ByaW5nLXNwaW5uZXJfX2R1cmF0aW9uLCAke3RoaXMucHJvcHMuZHVyYXRpb259cylgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tc3ByaW5nLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnNwcmluZy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5zcHJpbmctc3Bpbm5lciAuc3ByaW5nLXNwaW5uZXItcGFydCB7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyAyKTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLnNwcmluZy1zcGlubmVyICAuc3ByaW5nLXNwaW5uZXItcGFydC5ib3R0b20ge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZykgc2NhbGUoLTEsIDEpO1xuICAgICAgfVxuXG4gICAgICAuc3ByaW5nLXNwaW5uZXIgLnNwcmluZy1zcGlubmVyLXJvdGF0b3Ige1xuICAgICAgICBhbmltYXRpb246IHNwcmluZy1zcGlubmVyLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGVhc2UtaW4tb3V0IGluZmluaXRlO1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAvIDcpO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTIwMGRlZyk7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc3ByaW5nLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyA3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIDI1JSB7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAvIDIzLjMzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTE1ZGVnKTtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gNyk7XG4gICAgICAgIH1cblxuICAgICAgICA3NSUge1xuICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyAyMy4zMyk7XG4gICAgICAgIH1cblxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gNyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzcHJpbmctc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3ByaW5nLXNwaW5uZXItcGFydCB0b3BcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ByaW5nLXNwaW5uZXItcm90YXRvclwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwic3ByaW5nLXNwaW5uZXItcGFydCBib3R0b21cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ByaW5nLXNwaW5uZXItcm90YXRvclwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFNwcmluZ1NwaW5uZXIuaXMsIFNwcmluZ1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFN3YXBwaW5nU3F1YXJlc1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMSxcbiAgICAgIHNpemU6IDY1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0tc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZSB7XG4gICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogJHt0aGlzLmR1cmF0aW9ufTtcbiAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgICAgIGJvcmRlcjogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjA0IC8gMS4zKSBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4yNSAvIDEuMyk7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4yNSAvIDEuMyk7XG4gICAgICB9XG5cbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAvIDIpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtMTtcbiAgICAgIH1cblxuICAgICAgLnN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogMG1zO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtMjtcbiAgICAgIH1cblxuICAgICAgLnN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259IC8gMik7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0zO1xuICAgICAgfVxuXG4gICAgICAuc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwbXM7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC00O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTEge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0yIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MCUsMTUwJSkgc2NhbGUoMiwyKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTMge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTUwJSwtMTUwJSkgc2NhbGUoMiwyKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTQge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNTAlLC0xNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic3dhcHBpbmctc3F1YXJlcy1zcGlubmVyXCIgOnN0eWxlPVwic3Bpbm5lclN0eWxlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFN3YXBwaW5nU3F1YXJlc1NwaW5uZXIuaXMsIFN3YXBwaW5nU3F1YXJlc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFRyaW5pdHlSaW5nc1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAndHJpbml0eS1yaW5ncy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMS41LFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXRyaW5pdHktcmluZ3Mtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBkdXJhdGlvbigpIHsgcmV0dXJuIGB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX2R1cmF0aW9uLCAke3RoaXMucHJvcHMuZHVyYXRpb259cylgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC50cmluaXR5LXJpbmdzLXNwaW5uZXIge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9ICogMik7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBwYWRkaW5nOiAzcHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9ICogMik7XG4gICAgICB9XG5cbiAgICAgIC50cmluaXR5LXJpbmdzLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyOiAzcHggc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIH1cblxuICAgICAgLnRyaW5pdHktcmluZ3Mtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGFuaW1hdGlvbjogdHJpbml0eS1yaW5ncy1zcGlubmVyLWNpcmNsZTEtYW5pbWF0aW9uICR7dGhpcy5kdXJhdGlvbn0gaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBib3JkZXItd2lkdGg6IDNweDtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC50cmluaXR5LXJpbmdzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb246IHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUyLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjY1KTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9ICogMC42NSk7XG4gICAgICB9XG5cbiAgICAgIC50cmluaXR5LXJpbmdzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb246dHJpbml0eS1yaW5ncy1zcGlubmVyLWNpcmNsZTMtYW5pbWF0aW9uICR7dGhpcy5kdXJhdGlvbn0gaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMSk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgdHJpbml0eS1yaW5ncy1zcGlubmVyLWNpcmNsZTEtYW5pbWF0aW9ue1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGVaKDIwZGVnKSAgcm90YXRlWSgwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGVaKDEwMGRlZykgcm90YXRlWSgzNjBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgdHJpbml0eS1yaW5ncy1zcGlubmVyLWNpcmNsZTItYW5pbWF0aW9ue1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGVaKDEwMGRlZykgcm90YXRlWCgwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGVaKDBkZWcpICAgcm90YXRlWCgzNjBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgdHJpbml0eS1yaW5ncy1zcGlubmVyLWNpcmNsZTMtYW5pbWF0aW9ue1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGVaKDEwMGRlZykgIHJvdGF0ZVgoLTM2MGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWigtMzYwZGVnKSByb3RhdGVYKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJ0cmluaXR5LXJpbmdzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFRyaW5pdHlSaW5nc1NwaW5uZXIuaXMsIFRyaW5pdHlSaW5nc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEJhclNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnYmFyLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIGhlaWdodDogNCxcbiAgICAgIHdpZHRoOiAxMDAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2hlaWdodCcsXG4gICAgICAnd2lkdGgnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tYmFyLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgaGVpZ2h0KCkgeyByZXR1cm4gYHZhcigtLWJhci1zcGlubmVyX19oZWlnaHQsICR7dGhpcy5wcm9wcy5oZWlnaHR9cHgpYDsgfVxuXG4gIGdldCB3aWR0aCgpIHsgcmV0dXJuIGB2YXIoLS1iYXItc3Bpbm5lcl9fd2lkdGgsICR7dGhpcy5wcm9wcy53aWR0aH1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5iYXItc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLmhlaWdodH07XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy53aWR0aH07XG4gICAgICB9XG5cbiAgICAgIC5iYWNrZ3JvdW5kIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuaGVpZ2h0fTtcbiAgICAgICAgb3BhY2l0eTogMC4yO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAke3RoaXMud2lkdGh9O1xuICAgICAgfVxuXG4gICAgICAubG9uZyB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb246IGxvbmcgMi4xcyBjdWJpYy1iZXppZXIoMC42NSwgMC44MTUsIDAuNzM1LCAwLjM5NSkgaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuaGVpZ2h0fTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWxsLWNoYW5nZTogbGVmdCwgcmlnaHQ7XG4gICAgICB9XG5cbiAgICAgIC5zaG9ydCB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb246IHNob3J0IDIuMXMgMS4xNXMgY3ViaWMtYmV6aWVyKDAuMTY1LCAwLjg0LCAwLjQ0LCAxKSBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5oZWlnaHR9O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpbGwtY2hhbmdlOiBsZWZ0LCByaWdodDtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBsb25nIHtcbiAgICAgICAgMCUgICB7IGxlZnQ6IC0zNSU7IHJpZ2h0OiAxMDAlIH1cbiAgICAgICAgNjAlICB7IGxlZnQ6IDEwMCU7IHJpZ2h0OiAtOTAlIH1cbiAgICAgICAgMTAwJSB7IGxlZnQ6IDEwMCU7IHJpZ2h0OiAtOTAlIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzaG9ydCB7XG4gICAgICAgIDAlICAgeyBsZWZ0OiAtMjAwJTsgcmlnaHQ6IDEwMCUgfVxuICAgICAgICA2MCUgIHsgbGVmdDogMTA3JTsgcmlnaHQ6IC04JSB9XG4gICAgICAgIDEwMCUgeyBsZWZ0OiAxMDclOyByaWdodDogLTglIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJiYXItc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFja2dyb3VuZFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibG9uZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2hvcnRcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEJhclNwaW5uZXIuaXMsIEJhclNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEJlYXRTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2JlYXQtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgbWFyZ2luOiAyLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ21hcmdpbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1iZWF0LXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgbWFyZ2luKCkgeyByZXR1cm4gYHZhcigtLWJlYXQtc3Bpbm5lcl9fbWFyZ2luLCAke3RoaXMucHJvcHMubWFyZ2lufXB4KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1iZWF0LXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmJlYXQge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IGJlYXQgMC43cyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIG1hcmdpbjogJHt0aGlzLm1hcmdpbn07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5iZWF0Om50aC1jaGlsZChvZGQpICB7IGFuaW1hdGlvbi1kZWxheTogMHM7IH1cbiAgICAgIC5iZWF0Om50aC1jaGlsZChldmVuKSB7IGFuaW1hdGlvbi1kZWxheTogMC4zNXM7IH1cblxuICAgICAgQGtleWZyYW1lcyBiZWF0IHtcbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogc2NhbGUoMC43NSk7IG9wYWNpdHk6IDAuMiB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHNjYWxlKDEpOyAgICBvcGFjaXR5OiAxIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJiZWF0LXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJlYXRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJlYXRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJlYXRcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEJlYXRTcGlubmVyLmlzLCBCZWF0U3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgQm91bmNlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdib3VuY2Utc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tYm91bmNlLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1ib3VuY2Utc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuYm91bmNlLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYm91bmNlIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBib3VuY2UgMi4xcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIG9wYWNpdHk6IDAuNjtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5ib3VuY2U6bnRoLWNoaWxkKDEpIHsgYW5pbWF0aW9uLWRlbGF5OiAxczsgfVxuICAgICAgLmJvdW5jZTpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tZGVsYXk6IDBzOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYm91bmNlIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogc2NhbGUoMS4wKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImJvdW5jZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3VuY2VcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJvdW5jZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQm91bmNlU3Bpbm5lci5pcywgQm91bmNlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgQ2lyY2xlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdjaXJjbGUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tY2lyY2xlLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1jaXJjbGUtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIGNhbGN1bGF0ZUNpcmNsZShpKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogJHtpICogLTAuMn1zO1xuICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSAqICR7MSAtIGkgLyAxMH0pO1xuICAgICAgbGVmdDogJHtpICogMC43ICogMi41fSU7XG4gICAgICB0b3A6ICR7aSAqIDAuMzUgKiAyLjV9JTtcbiAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAqICR7MSAtIGkgLyAxMH0pO1xuICAgIGA7XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmNpcmNsZS1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmNpcmNsZSB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IFwiXCI7XG4gICAgICAgIGFuaW1hdGlvbjogY2lyY2xlIDFzIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQgbm9uZSBub25lIHNvbGlkO1xuICAgICAgICBib3JkZXItd2lkdGg6IDFweCAxcHg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDJzIGVhc2UgMHM7XG4gICAgICB9XG5cbiAgICAgIC5jaXJjbGU6bnRoLWNoaWxkKDEpIHsgJHt0aGlzLmNhbGN1bGF0ZUNpcmNsZSgwKX0gfVxuICAgICAgLmNpcmNsZTpudGgtY2hpbGQoMikgeyAke3RoaXMuY2FsY3VsYXRlQ2lyY2xlKDEpfSB9XG4gICAgICAuY2lyY2xlOm50aC1jaGlsZCgzKSB7ICR7dGhpcy5jYWxjdWxhdGVDaXJjbGUoMil9IH1cbiAgICAgIC5jaXJjbGU6bnRoLWNoaWxkKDQpIHsgJHt0aGlzLmNhbGN1bGF0ZUNpcmNsZSgzKX0gfVxuICAgICAgLmNpcmNsZTpudGgtY2hpbGQoNSkgeyAke3RoaXMuY2FsY3VsYXRlQ2lyY2xlKDQpfSB9XG5cbiAgICAgIEBrZXlmcmFtZXMgY2lyY2xlIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDaXJjbGVTcGlubmVyLmlzLCBDaXJjbGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBDbGltYmluZ0JveFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnY2xpbWJpbmctYm94LXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWNsaW1iaW5nLWJveC1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tY2xpbWJpbmctYm94LXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmNsaW1iaW5nLWJveC1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiA3LjFlbTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogNy4xZW07XG4gICAgICB9XG5cbiAgICAgIC5ib3gge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IGNsaW1iaW5nQm94IDIuNXMgaW5maW5pdGUgY3ViaWMtYmV6aWVyKDAuNzksIDAsIDAuNDcsIDAuOTcpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTUlO1xuICAgICAgICBib3JkZXI6IDAuMjVlbSBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3R0b206IC0wLjFlbTtcbiAgICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gICAgICAgIGhlaWdodDogMWVtO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0xZW0pIHJvdGF0ZSgtNDVkZWcpO1xuICAgICAgICB3aWR0aDogMWVtO1xuICAgICAgfVxuXG4gICAgICAuaGlsbCB7XG4gICAgICAgIGJvcmRlci1sZWZ0OiAwLjI1ZW0gc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgaGVpZ2h0OiA3LjFlbTtcbiAgICAgICAgbGVmdDogMS43ZW07XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAxLjdlbTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuICAgICAgICB3aWR0aDogNy4xZW07XG4gICAgICB9XG5cbiAgICAgIC53cmFwcGVyIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgbGVmdDogNTAlO1xuICAgICAgICBtYXJnaW4tdG9wOiAtMi43ZW07XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtMi43ZW07XG4gICAgICAgIHdpZHRoOiA1LjRlbTtcbiAgICAgICAgaGVpZ2h0OiA1LjRlbTtcbiAgICAgICAgZm9udC1zaXplOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgY2xpbWJpbmdCb3gge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTFlbSkgICByb3RhdGUoLTQ1ZGVnKSB9XG4gICAgICAgIDUlICAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMWVtKSAgIHJvdGF0ZSgtNTBkZWcpIH1cbiAgICAgICAgMjAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDFlbSwgLTJlbSkgcm90YXRlKDQ3ZGVnKSB9XG4gICAgICAgIDI1JSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxZW0sIC0yZW0pIHJvdGF0ZSg0NWRlZykgfVxuICAgICAgICAzMCUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMWVtLCAtMmVtKSByb3RhdGUoNDBkZWcpIH1cbiAgICAgICAgNDUlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDJlbSwgLTNlbSkgcm90YXRlKDEzN2RlZykgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMmVtLCAtM2VtKSByb3RhdGUoMTM1ZGVnKSB9XG4gICAgICAgIDU1JSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgyZW0sIC0zZW0pIHJvdGF0ZSgxMzBkZWcpIH1cbiAgICAgICAgNzAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDNlbSwgLTRlbSkgcm90YXRlKDIxN2RlZykgfVxuICAgICAgICA3NSUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoM2VtLCAtNGVtKSByb3RhdGUoMjIwZGVnKSB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMWVtKSAgIHJvdGF0ZSgtMjI1ZGVnKSB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2xpbWJpbmctYm94LXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94XCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImhpbGxcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDbGltYmluZ0JveFNwaW5uZXIuaXMsIENsaW1iaW5nQm94U3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgQ2xpcFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnY2xpcC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiAzNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1jbGlwLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1jbGlwLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmNsaXAtc3Bpbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogY2xpcCAwLjc1cyAwcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItd2lkdGg6IDJweDtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgY2xpcCB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKSAgIHNjYWxlKDEpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpIHNjYWxlKDAuOCk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZykgc2NhbGUoMSk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJjbGlwLXNwaW5uZXJcIj48L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDbGlwU3Bpbm5lci5pcywgQ2xpcFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIERvdFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnZG90LXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWRvdC1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tZG90LXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmRvdC1zcGlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG4gICAgICAgIGFuaW1hdGlvbjogcm90YXRlIDJzIDBzIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmRvdCB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb246IGJvdW5jZSAycyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyAyKTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyAyKTtcbiAgICAgIH1cblxuICAgICAgLmRvdDpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDBzO1xuICAgICAgICBib3R0b206IGF1dG87XG4gICAgICAgIHRvcDogMDtcbiAgICAgIH1cblxuICAgICAgLmRvdDpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0xcztcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICB0b3A6IGF1dG87XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYm91bmNlIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogc2NhbGUoMS4wKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHJvdGF0ZSB7XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZG90LXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShEb3RTcGlubmVyLmlzLCBEb3RTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBGYWRlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdmYWRlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIGhlaWdodDogMTUsXG4gICAgICByYWRpdXM6IDEwLFxuICAgICAgd2lkdGg6IDUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2hlaWdodCcsXG4gICAgICAncmFkaXVzJyxcbiAgICAgICd3aWR0aCcsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1mYWRlLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgaGVpZ2h0KCkgeyByZXR1cm4gYHZhcigtLWZhZGUtc3Bpbm5lcl9faGVpZ2h0LCAke3RoaXMucHJvcHMuaGVpZ2h0fXB4KWA7IH1cblxuICBnZXQgcmFkaXVzKCkgeyByZXR1cm4gYHZhcigtLWZhZGUtc3Bpbm5lcl9fcmFkaXVzLCAke3RoaXMucHJvcHMucmFkaXVzfXB4KWA7IH1cblxuICBnZXQgd2lkdGgoKSB7IHJldHVybiBgdmFyKC0tZmFkZS1zcGlubmVyX193aWR0aCwgJHt0aGlzLnByb3BzLndpZHRofXB4KWA7IH1cblxuICBnZXQgY2VudGVyKCkgeyByZXR1cm4gYGNhbGMoJHt0aGlzLnJhZGl1c30gKyAke3RoaXMuaGVpZ2h0fSlgOyB9XG5cbiAgYnVpbGRMaW5lKGkpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmNvbnRhaW5lcjpudGgtY2hpbGQoJHtpfSkgeyB0cmFuc2Zvcm06IHJvdGF0ZSgkeyhpIC0gMSkgKiA0NX1kZWcpOyB9XG4gICAgICAuY29udGFpbmVyOm50aC1jaGlsZCgke2l9KSAubGluZSB7IGFuaW1hdGlvbi1kZWxheTogY2FsYygke2kgLSAxfSAqIC4xMnMpOyB9XG4gICAgYDtcbiAgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuZmFkZS1zcGlubmVyIHtcbiAgICAgICAgZm9udC1zaXplOiAwO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLmNlbnRlcn0gKiAyKTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLmNlbnRlcn0gKiAyKTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuXG4gICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5jZW50ZXJ9ICogMik7XG4gICAgICAgIHdpZHRoOiAke3RoaXMud2lkdGh9O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogY2FsYygke3RoaXMuY2VudGVyfSAtICR7dGhpcy53aWR0aH0gLyAyKTtcbiAgICAgIH1cblxuICAgICAgLmxpbmUge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IGZhZGUgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5oZWlnaHR9O1xuICAgICAgICB0cmFuc2l0aW9uOiAycztcbiAgICAgICAgd2lkdGg6ICR7dGhpcy53aWR0aH07XG4gICAgICB9XG5cbiAgICAgICR7dGhpcy5idWlsZExpbmUoMSl9XG4gICAgICAke3RoaXMuYnVpbGRMaW5lKDIpfVxuICAgICAgJHt0aGlzLmJ1aWxkTGluZSgzKX1cbiAgICAgICR7dGhpcy5idWlsZExpbmUoNCl9XG4gICAgICAke3RoaXMuYnVpbGRMaW5lKDUpfVxuICAgICAgJHt0aGlzLmJ1aWxkTGluZSg2KX1cbiAgICAgICR7dGhpcy5idWlsZExpbmUoNyl9XG4gICAgICAke3RoaXMuYnVpbGRMaW5lKDgpfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZhZGUge1xuICAgICAgICA1MCUgIHsgb3BhY2l0eTogMC4zOyB9XG4gICAgICAgIDEwMCUgeyBvcGFjaXR5OiAxOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZmFkZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShGYWRlU3Bpbm5lci5pcywgRmFkZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEdyaWRTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2dyaWQtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgbWFyZ2luOiAyLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ21hcmdpbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1ncmlkLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgbWFyZ2luKCkgeyByZXR1cm4gYHZhcigtLWdyaWQtc3Bpbm5lcl9fbWFyZ2luLCAke3RoaXMucHJvcHMubWFyZ2lufXB4KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1ncmlkLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBnZW5lcmF0ZUNlbGxBbmltYXRpb24oKSB7XG4gICAgY29uc3QgcmFuZG9tID0gTWF0aC5yYW5kb20oKTtcblxuICAgIHJldHVybiBgXG4gICAgICBhbmltYXRpb24tZHVyYXRpb246ICR7cmFuZG9tICsgMC42fXM7XG4gICAgICBhbmltYXRpb24tZGVsYXk6ICR7cmFuZG9tIC0gMC4yfXM7XG4gICAgYDtcbiAgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuZ3JpZC1zcGlubmVyIHtcbiAgICAgICAgZm9udC1zaXplOiAwO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gKiAzICsgJHt0aGlzLm1hcmdpbn0gKiA2KTtcbiAgICAgIH1cblxuICAgICAgLmNlbGwge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IGdyaWQgaW5maW5pdGUgZWFzZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgbWFyZ2luOiAke3RoaXMubWFyZ2lufTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDEpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG4gICAgICAuY2VsbDpudGgtY2hpbGQoMikgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cbiAgICAgIC5jZWxsOm50aC1jaGlsZCgzKSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDQpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG4gICAgICAuY2VsbDpudGgtY2hpbGQoNSkgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cbiAgICAgIC5jZWxsOm50aC1jaGlsZCg2KSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDcpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG4gICAgICAuY2VsbDpudGgtY2hpbGQoOCkgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cbiAgICAgIC5jZWxsOm50aC1jaGlsZCg5KSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuXG4gICAgICBAa2V5ZnJhbWVzIGdyaWQge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiBzY2FsZSgwLjUpOyBvcGFjaXR5OiAwLjc7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSk7IG9wYWNpdHk6IDE7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJncmlkLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNlbGxcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEdyaWRTcGlubmVyLmlzLCBHcmlkU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgSGFzaFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnaGFzaC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiA1MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1oYXNoLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgbGF0KCkgeyByZXR1cm4gYGNhbGMoY2FsYygke3RoaXMuc2l6ZX0gLSAke3RoaXMudGhpY2tuZXNzfSkgLyAyKWA7IH1cblxuICBnZXQgb2Zmc2V0KCkgeyByZXR1cm4gYGNhbGMoJHt0aGlzLmxhdH0gLSAke3RoaXMudGhpY2tuZXNzfSlgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0taGFzaC1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgZ2V0IHRoaWNrbmVzcygpIHsgcmV0dXJuIGBjYWxjKCR7dGhpcy5zaXplfSAvIDUpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuaGFzaC1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTY1ZGVnKTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmhhc2gge1xuICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDJzO1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBub25lO1xuICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogY2FsYygke3RoaXMuc2l6ZX0gLyAxMCk7XG4gICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gNSk7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgb3BhY2l0eTogLjg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyA1KTtcbiAgICAgIH1cblxuICAgICAgLmhhc2g6bnRoLWNoaWxkKDEpIHsgYW5pbWF0aW9uLW5hbWU6IGJlZm9yZTsgfVxuICAgICAgLmhhc2g6bnRoLWNoaWxkKDIpIHsgYW5pbWF0aW9uLW5hbWU6IGFmdGVyOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYmVmb3JlIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6ICR7dGhpcy5sYXR9IGNhbGMoJHt0aGlzLm9mZnNldH0gKiAtMSkgJHt0aGlzLmNvbG9yfSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxjKCR7dGhpcy5sYXR9ICogLTEpICR7dGhpcy5vZmZzZXR9ICR7dGhpcy5jb2xvcn07XG4gICAgICAgICAgd2lkdGg6ICR7dGhpcy50aGlja25lc3N9O1xuICAgICAgICB9XG5cbiAgICAgICAgMzUlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIGNhbGMoJHt0aGlzLm9mZnNldH0gKiAtMSkgJHt0aGlzLmNvbG9yfSxcbiAgICAgICAgICAgICAgICAgICAgICAwICR7dGhpcy5vZmZzZXR9ICR7dGhpcy5jb2xvcn07XG4gICAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgfVxuXG4gICAgICAgIDcwJSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogY2FsYygke3RoaXMubGF0fSAqIC0xKSBjYWxjKCR7dGhpcy5vZmZzZXR9ICogLTEpICR7dGhpcy5jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmxhdH0gJHt0aGlzLm9mZnNldH0gJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgICB3aWR0aDogJHt0aGlzLnRoaWNrbmVzc307XG4gICAgICAgIH1cblxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMubGF0fSBjYWxjKCR7dGhpcy5vZmZzZXR9ICogLTEpICR7dGhpcy5jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke3RoaXMubGF0fSAqIC0xKSAke3RoaXMub2Zmc2V0fSAke3RoaXMuY29sb3J9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYWZ0ZXIge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogJHt0aGlzLm9mZnNldH0gJHt0aGlzLmxhdH0gJHt0aGlzLmNvbG9yfSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxjKCR7dGhpcy5vZmZzZXR9ICogLTEpIGNhbGMoJHt0aGlzLmxhdH0gKiAtMSkgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgICBoZWlnaHQ6ICR7dGhpcy50aGlja25lc3N9O1xuICAgICAgICB9XG5cbiAgICAgICAgMzUlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMub2Zmc2V0fSAwICR7dGhpcy5jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke3RoaXMub2Zmc2V0fSAqIC0xKSAwICR7dGhpcy5jb2xvcn07XG4gICAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIH1cblxuICAgICAgICA3MCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6ICR7dGhpcy5vZmZzZXR9IGNhbGMoJHt0aGlzLmxhdH0gKiAtMSkgJHt0aGlzLmNvbG9yfSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxjKCR7dGhpcy5vZmZzZXR9ICogLTEpICR7dGhpcy5sYXR9ICR7dGhpcy5jb2xvcn07XG4gICAgICAgICAgaGVpZ2h0OiAke3RoaXMudGhpY2tuZXNzfTtcbiAgICAgICAgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6ICR7dGhpcy5vZmZzZXR9ICR7dGhpcy5sYXR9ICR7dGhpcy5jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke3RoaXMub2Zmc2V0fSAqIC0xKSBjYWxjKCR7dGhpcy5sYXR9ICogLTEpICR7dGhpcy5jb2xvcn07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJoYXNoLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhhc2hcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhhc2hcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEhhc2hTcGlubmVyLmlzLCBIYXNoU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgTW9vblNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnbW9vbi1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1tb29uLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgbW9vblNpemUoKSB7IHJldHVybiBgY2FsYygke3RoaXMuc2l6ZX0gLyA3KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1tb29uLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBiYWxsU3R5bGUoc2l6ZSkge1xuICAgIHJldHVybiBgXG4gICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAke3NpemV9O1xuICAgICAgd2lkdGg6ICR7c2l6ZX07XG4gICAgYDtcbiAgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAubW9vbi1zcGlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG4gICAgICAgIGFuaW1hdGlvbjogbW9vbiAwLjZzIDBzIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSArICR7dGhpcy5tb29uU2l6ZX0gKiAyKTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gKyAke3RoaXMubW9vblNpemV9ICogMik7XG4gICAgICB9XG5cbiAgICAgIC5iYWxsIHtcbiAgICAgICAgJHt0aGlzLmJhbGxTdHlsZSh0aGlzLm1vb25TaXplKX07XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb246IG1vb24gMC42cyAwcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIG9wYWNpdHk6IDAuODtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IGNhbGMoJHt0aGlzLnNpemV9IC8gMiAtICR7dGhpcy5tb29uU2l6ZX0gLyAyKTtcbiAgICAgIH1cblxuICAgICAgLmNpcmNsZSB7XG4gICAgICAgICR7dGhpcy5iYWxsU3R5bGUodGhpcy5zaXplKX07XG4gICAgICAgIGJvcmRlcjogJHt0aGlzLm1vb25TaXplfSBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbiAgICAgICAgb3BhY2l0eTogMC4xO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG1vb24ge1xuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cIm1vb24tc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShNb29uU3Bpbm5lci5pcywgTW9vblNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFBhY21hblNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncGFjbWFuLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIG1hcmdpbjogMixcbiAgICAgIHNpemU6IDI1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tcGFjbWFuLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgbWFyZ2luKCkgeyByZXR1cm4gYHZhcigtLXBhY21hbi1zcGlubmVyX19tYXJnaW4sICR7dGhpcy5wcm9wcy5tYXJnaW59cHgpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXBhY21hbi1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgYmFsbERlbGF5KGZhY3Rvcikge1xuICAgIHJldHVybiBgYW5pbWF0aW9uLWRlbGF5OiAke2ZhY3RvciAqIDAuMjV9cztgO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5wYWNtYW4tc3Bpbm5lciB7XG4gICAgICAgIGZvbnQtc2l6ZTogMDtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSAqIDIpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAqIDIpO1xuICAgICAgfVxuXG4gICAgICAucGFjbWFuLXRvcCB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogcGFjbWFuMSAwLjhzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xuICAgICAgICBib3JkZXItYm90dG9tOiAke3RoaXMuc2l6ZX0gc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLWxlZnQ6ICR7dGhpcy5zaXplfSBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAke3RoaXMuc2l6ZX07XG4gICAgICAgIGJvcmRlci1yaWdodDogJHt0aGlzLnNpemV9IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItdG9wOiAke3RoaXMuc2l6ZX0gc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMDtcbiAgICAgIH1cblxuICAgICAgLnBhY21hbi1ib3R0b20ge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHBhY21hbjIgMC44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogJHt0aGlzLnNpemV9IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItbGVmdDogJHt0aGlzLnNpemV9IHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAke3RoaXMuc2l6ZX0gc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci10b3A6ICR7dGhpcy5zaXplfSBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICB9XG5cbiAgICAgIC5iYWxsIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBiYWxsIDFzIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSAvIDIuNSk7XG4gICAgICAgIGxlZnQ6IGNhbGMoJHt0aGlzLnNpemV9ICogNCk7XG4gICAgICAgIG1hcmdpbjogJHt0aGlzLm1hcmdpbn07XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIGNhbGMoJHt0aGlzLnNpemV9IC8gLTQpKTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gMi41KTtcbiAgICAgIH1cblxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDMpIHsgJHt0aGlzLmJhbGxEZWxheSgtMyl9IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCg0KSB7ICR7dGhpcy5iYWxsRGVsYXkoLTIpfSB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoNSkgeyAke3RoaXMuYmFsbERlbGF5KC0xKX0gfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDYpIHsgJHt0aGlzLmJhbGxEZWxheSgwKX0gfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJhbGwge1xuICAgICAgICA3NSUgIHsgb3BhY2l0eTogMC43OyB9XG5cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoY2FsYygke3RoaXMuc2l6ZX0gKiAtNCksIGNhbGMoJHt0aGlzLnNpemV9IC8gLTQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHBhY21hbjEge1xuICAgICAgICAwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgtNDRkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgcGFjbWFuMiB7XG4gICAgICAgIDAlICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogcm90YXRlKDQ0ZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInBhY21hbi1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYWNtYW4tdG9wXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYWNtYW4tYm90dG9tXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShQYWNtYW5TcGlubmVyLmlzLCBQYWNtYW5TcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBQcm9wYWdhdGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3Byb3BhZ2F0ZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1wcm9wYWdhdGUtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXByb3BhZ2F0ZS1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgY29uc3QgZGlzdGFuY2UgPSBbMSwgMywgNV07XG5cbiAgICByZXR1cm4gYFxuICAgICAgLnByb3BhZ2F0ZS1zcGlubmVyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuXG4gICAgICAuYmFsbCB7XG4gICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMS41cztcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG4gICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygke3RoaXMuc2l6ZX0gLyAzKTtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIGxlZnQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gLTIpO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogY2FsYygke3RoaXMuc2l6ZX0gLyAtMik7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgxKSB7IGFuaW1hdGlvbi1uYW1lOiBiYWxsMTsgfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDIpIHsgYW5pbWF0aW9uLW5hbWU6IGJhbGwyOyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoMykgeyBhbmltYXRpb24tbmFtZTogYmFsbDM7IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCg0KSB7IGFuaW1hdGlvbi1uYW1lOiBiYWxsNDsgfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDUpIHsgYW5pbWF0aW9uLW5hbWU6IGJhbGw1OyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoNikgeyBhbmltYXRpb24tbmFtZTogYmFsbDY7IH1cblxuICAgICAgQGtleWZyYW1lcyBiYWxsMSB7XG4gICAgICAgIDI1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtkaXN0YW5jZVswXX1yZW0pIHNjYWxlKDAuNzUpOyB9XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtkaXN0YW5jZVsxXX1yZW0pIHNjYWxlKDAuNik7IH1cbiAgICAgICAgNzUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2Rpc3RhbmNlWzJdfXJlbSkgc2NhbGUoMC41KTsgfVxuICAgICAgICA5NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHJlbSkgICAgICAgICAgICAgICBzY2FsZSgxKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJhbGwyIHtcbiAgICAgICAgMjUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2Rpc3RhbmNlWzBdfXJlbSkgc2NhbGUoMC43NSk7IH1cbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2Rpc3RhbmNlWzFdfXJlbSkgc2NhbGUoMC42KTsgfVxuICAgICAgICA3NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZGlzdGFuY2VbMV19cmVtKSBzY2FsZSgwLjYpOyB9XG4gICAgICAgIDk1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcmVtKSAgICAgICAgICAgICAgIHNjYWxlKDEpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYmFsbDMge1xuICAgICAgICAyNSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZGlzdGFuY2VbMF19cmVtKSBzY2FsZSgwLjc1KTsgfVxuICAgICAgICA3NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZGlzdGFuY2VbMF19cmVtKSBzY2FsZSgwLjc1KTsgfVxuICAgICAgICA5NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHJlbSkgICAgICAgICAgICAgICBzY2FsZSgxKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJhbGw0IHtcbiAgICAgICAgMjUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7ZGlzdGFuY2VbMF19cmVtKSBzY2FsZSgwLjc1KTsgfVxuICAgICAgICA3NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoJHtkaXN0YW5jZVswXX1yZW0pIHNjYWxlKDAuNzUpOyB9XG4gICAgICAgIDk1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcmVtKSAgICAgICAgICAgICAgc2NhbGUoMSk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBiYWxsNSB7XG4gICAgICAgIDI1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgke2Rpc3RhbmNlWzBdfXJlbSkgc2NhbGUoMC43NSk7IH1cbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7ZGlzdGFuY2VbMV19cmVtKSBzY2FsZSgwLjYpOyB9XG4gICAgICAgIDc1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgke2Rpc3RhbmNlWzFdfXJlbSkgc2NhbGUoMC42KTsgfVxuICAgICAgICA5NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHJlbSkgICAgICAgICAgICAgIHNjYWxlKDEpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYmFsbDYge1xuICAgICAgICAyNSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoJHtkaXN0YW5jZVswXX1yZW0pIHNjYWxlKDAuNzUpOyB9XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgke2Rpc3RhbmNlWzFdfXJlbSkgc2NhbGUoMC42KTsgfVxuICAgICAgICA3NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoJHtkaXN0YW5jZVsyXX1yZW0pIHNjYWxlKDAuNSk7IH1cbiAgICAgICAgOTUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDByZW0pICAgICAgICAgICAgICBzY2FsZSgxKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInByb3BhZ2F0ZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShQcm9wYWdhdGVTcGlubmVyLmlzLCBQcm9wYWdhdGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBQdWxzZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncHVsc2Utc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgbWFyZ2luOiAyLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ21hcmdpbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1wdWxzZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1hcmdpbigpIHsgcmV0dXJuIGB2YXIoLS1wdWxzZS1zcGlubmVyX19tYXJnaW4sICR7dGhpcy5wcm9wcy5tYXJnaW59cHgpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXB1bHNlLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnB1bHNlLXNwaW5uZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgfVxuXG4gICAgICAuYmFsbCB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogcHVsc2UgMC43NXMgaW5maW5pdGUgY3ViaWMtYmV6aWVyKDAuMiwgMC42OCwgMC4xOCwgMS4wOCk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIG1hcmdpbjogJHt0aGlzLm1hcmdpbn07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgxKSB7IGFuaW1hdGlvbi1kZWxheTogMHM7IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgyKSB7IGFuaW1hdGlvbi1kZWxheTogLjEyczsgfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDMpIHsgYW5pbWF0aW9uLWRlbGF5OiAuMjRzOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgcHVsc2Uge1xuICAgICAgICAwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDEpOyAgIG9wYWNpdHk6IDE7IH1cbiAgICAgICAgNDUlIHsgdHJhbnNmb3JtOiBzY2FsZSgwLjEpOyBvcGFjaXR5OiAwLjc7IH1cbiAgICAgICAgODAlIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgICBvcGFjaXR5OiAxOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwicHVsc2Utc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUHVsc2VTcGlubmVyLmlzLCBQdWxzZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFJpbmdTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3Jpbmctc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tcmluZy1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tcmluZy1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5yaW5nLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAucmluZyB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb246IDJzIDBzIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKCR7dGhpcy5zaXplfSAvIDEwKSBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgb3BhY2l0eTogMC40O1xuICAgICAgICBwZXJzcGVjdGl2ZTogODAwcHg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAucmluZzpudGgtY2hpbGQoMSkgeyBhbmltYXRpb24tbmFtZTogcmlnaHQ7IH1cbiAgICAgIC5yaW5nOm50aC1jaGlsZCgyKSB7IGFuaW1hdGlvbi1uYW1lOiBsZWZ0OyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgbGVmdCB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMGRlZykgICByb3RhdGVZKDBkZWcpICAgcm90YXRlWigwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGVYKDM2MGRlZykgcm90YXRlWSgxODBkZWcpIHJvdGF0ZVooMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHJpZ2h0IHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWCgwZGVnKSAgIHJvdGF0ZVkoMGRlZykgICByb3RhdGVaKDBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGVZKDM2MGRlZykgcm90YXRlWigzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwicmluZy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaW5nXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShSaW5nU3Bpbm5lci5pcywgUmluZ1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFJpc2VTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3Jpc2Utc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgbWFyZ2luOiAyLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ21hcmdpbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1yaXNlLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgbWFyZ2luKCkgeyByZXR1cm4gYHZhcigtLXJpc2Utc3Bpbm5lcl9fbWFyZ2luLCAke3RoaXMucHJvcHMubWFyZ2lufXB4KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1yaXNlLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmJhbGwge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IDFzIDBzIGluZmluaXRlIGN1YmljLWJlemllcigwLjE1LCAwLjQ2LCAwLjksIDAuNik7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIG1hcmdpbjogJHt0aGlzLm1hcmdpbn07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5iYWxsOm50aC1jaGlsZChldmVuKSB7IGFuaW1hdGlvbi1uYW1lOiBldmVuOyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQob2RkKSB7IGFuaW1hdGlvbi1uYW1lOiBvZGQ7IH1cblxuICAgICAgQGtleWZyYW1lcyBldmVuIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGUoMS4xKTsgfVxuICAgICAgICAyNSUgIHsgdHJhbnNsYXRlWSgtMzBweCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogc2NhbGUoMC40KTsgfVxuICAgICAgICA3NSUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDMwcHgpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCkgc2NhbGUoMS4wKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG9kZCB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHNjYWxlKDAuNCk7IH1cbiAgICAgICAgMjUlICB7IHRyYW5zbGF0ZVkoMzBweCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogc2NhbGUoMS4xKTsgfVxuICAgICAgICA3NSUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMHB4KTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApIHNjYWxlKDAuNzUpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwicmlzZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShSaXNlU3Bpbm5lci5pcywgUmlzZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFJvdGF0ZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncm90YXRlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIG1hcmdpbjogNSxcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tcm90YXRlLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgbWFyZ2luKCkgeyByZXR1cm4gYHZhcigtLXJvdGF0ZS1zcGlubmVyX19tYXJnaW4sICR7dGhpcy5wcm9wcy5tYXJnaW59cHgpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXJvdGF0ZS1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5yb3RhdGUtc3Bpbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogcm90YXRlIDFzIDBzIGluZmluaXRlIGN1YmljLWJlemllcigwLjcsIC0wLjEzLCAwLjIyLCAwLjg2KTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuXG4gICAgICAuYmFsbCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBtYXJnaW46ICR7dGhpcy5tYXJnaW59O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHJvdGF0ZSB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInJvdGF0ZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShSb3RhdGVTcGlubmVyLmlzLCBSb3RhdGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTY2FsZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc2NhbGUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgaGVpZ2h0OiAzNSxcbiAgICAgIG1hcmdpbjogMixcbiAgICAgIHJhZGl1czogMixcbiAgICAgIHdpZHRoOiA0LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ21hcmdpbicsXG4gICAgICAncmFkaXVzJyxcbiAgICAgICd3aWR0aCcsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1zY2FsZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGhlaWdodCgpIHsgcmV0dXJuIGB2YXIoLS1zY2FsZS1zcGlubmVyX19oZWlnaHQsICR7dGhpcy5wcm9wcy5oZWlnaHR9cHgpYDsgfVxuXG4gIGdldCBtYXJnaW4oKSB7IHJldHVybiBgdmFyKC0tc2NhbGUtc3Bpbm5lcl9fbWFyZ2luLCAke3RoaXMucHJvcHMubWFyZ2lufXB4KWA7IH1cblxuICBnZXQgcmFkaXVzKCkgeyByZXR1cm4gYHZhcigtLXNjYWxlLXNwaW5uZXJfX3JhZGl1cywgJHt0aGlzLnByb3BzLnJhZGl1c31weClgOyB9XG5cbiAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gYHZhcigtLXNjYWxlLXNwaW5uZXJfX3dpZHRoLCAke3RoaXMucHJvcHMud2lkdGh9cHgpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXNjYWxlLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnNjYWxlLXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHJvdGF0ZSAxcyAwcyBpbmZpbml0ZSBjdWJpYy1iZXppZXIoMC43LCAtMC4xMywgMC4yMiwgMC44Nik7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLmxpbmUge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHNjYWxlIDFzIGluZmluaXRlIGN1YmljLWJlemllcigwLjIsIDAuNjgsIDAuMTgsIDEuMDgpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAke3RoaXMucmFkaXVzfTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5oZWlnaHR9O1xuICAgICAgICBtYXJnaW46ICR7dGhpcy5tYXJnaW59O1xuICAgICAgICB3aWR0aDogJHt0aGlzLndpZHRofTtcbiAgICAgIH1cblxuICAgICAgLmxpbmU6bnRoLWNoaWxkKDEpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjFzOyB9XG4gICAgICAubGluZTpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tZGVsYXk6IDAuMnM7IH1cbiAgICAgIC5saW5lOm50aC1jaGlsZCgzKSB7IGFuaW1hdGlvbi1kZWxheTogMC4zczsgfVxuICAgICAgLmxpbmU6bnRoLWNoaWxkKDQpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjRzOyB9XG4gICAgICAubGluZTpudGgtY2hpbGQoNSkgeyBhbmltYXRpb24tZGVsYXk6IDAuNXM7IH1cblxuICAgICAgQGtleWZyYW1lcyBzY2FsZSB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHNjYWxleSgxLjApOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxleSgwLjQpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHNjYWxleSgxLjApOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2NhbGUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2NhbGVTcGlubmVyLmlzLCBTY2FsZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNrZXdTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3NrZXctc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogMjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tc2tldy1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tc2tldy1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5za2V3LXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHNrZXcgM3MgMHMgaW5maW5pdGUgY3ViaWMtYmV6aWVyKDAuMDksIDAuNTcsIDAuNDksIDAuOSk7XG4gICAgICAgIGJvcmRlci1ib3R0b206ICR7dGhpcy5zaXplfSBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItbGVmdDogJHt0aGlzLnNpemV9IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItcmlnaHQ6ICR7dGhpcy5zaXplfSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIHdpZHRoOiAwO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNrZXcge1xuICAgICAgICAyNSUgIHsgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMDBweCkgcm90YXRlWCgxODBkZWcpIHJvdGF0ZVkoMCk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwcHgpIHJvdGF0ZVgoMTgwZGVnKSByb3RhdGVZKDE4MGRlZyk7IH1cbiAgICAgICAgNzUlICB7IHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwcHgpIHJvdGF0ZVgoMCkgICAgICByb3RhdGVZKDE4MGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwcHgpIHJvdGF0ZVgoMCkgICAgICByb3RhdGVZKDApOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2tldy1zcGlubmVyXCI+PC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2tld1NwaW5uZXIuaXMsIFNrZXdTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTcXVhcmVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3NxdWFyZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiA1MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1zcXVhcmUtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXNxdWFyZS1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zcXVhcmUtc3Bpbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogc3F1YXJlIDNzIDBzIGluZmluaXRlIGN1YmljLWJlemllcigwLjA5LCAwLjU3LCAwLjQ5LCAwLjkpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNxdWFyZSB7XG4gICAgICAgIDI1JSAgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGVZKDApOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMTgwZGVnKSByb3RhdGVZKDE4MGRlZyk7IH1cbiAgICAgICAgNzUlICB7IHRyYW5zZm9ybTogcm90YXRlWCgwKSAgICAgIHJvdGF0ZVkoMTgwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGVYKDApICAgICAgcm90YXRlWSgwKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZS1zcGlubmVyXCI+PC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU3F1YXJlU3Bpbm5lci5pcywgU3F1YXJlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgU3luY1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc3luYy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBtYXJnaW46IDIsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnbWFyZ2luJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXN5bmMtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBtYXJnaW4oKSB7IHJldHVybiBgdmFyKC0tc3luYy1zcGlubmVyX19tYXJnaW4sICR7dGhpcy5wcm9wcy5tYXJnaW59cHgpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXN5bmMtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuc3luYy1zcGlubmVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIH1cblxuICAgICAgLmJhbGwge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHN5bmMgMC42cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIG1hcmdpbjogJHt0aGlzLm1hcmdpbn07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgxKSB7IGFuaW1hdGlvbi1kZWxheTogMHM7IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgyKSB7IGFuaW1hdGlvbi1kZWxheTogMC4wN3M7IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgzKSB7IGFuaW1hdGlvbi1kZWxheTogMC4xNHM7IH1cblxuICAgICAgQGtleWZyYW1lcyBzeW5jIHtcbiAgICAgICAgMzMlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTsgfVxuICAgICAgICA2NiUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMHB4KTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic3luYy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYWxsXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTeW5jU3Bpbm5lci5pcywgU3luY1NwaW5uZXIpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBQUEsTUFBTSxjQUFj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bEIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNwQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O3FCQUtsQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3BDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7cUJBS2xDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDcEMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztxQkFLbEMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNwQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O3FCQUtsQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3BDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7cUJBS2xDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDcEMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztxQkFLbEMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNwQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O3FCQUtsQyxF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RSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQzs7OztzQkFJYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDOzs7Ozs7c0JBTWIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQzs7O3NCQUdiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7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
