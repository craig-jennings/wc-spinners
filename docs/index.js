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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGlubmVyRWxlbWVudC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvYXRvbS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2NpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2ZpbmdlcnByaW50LXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL2Zsb3dlci1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9oYWxmLWNpcmNsZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9ob2xsb3ctZG90cy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9sb29waW5nLXJob21idXNlcy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9vcmJpdC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9waXhlbC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9yYWRhci1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2VwaWMtc3Bpbm5lcnMvc2VtaXBvbGFyLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL3NwcmluZy1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZXBpYy1zcGlubmVycy9zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9lcGljLXNwaW5uZXJzL3RyaW5pdHktcmluZ3Mtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL2Jhci1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvYmVhdC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvYm91bmNlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9jaXJjbGUtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL2NsaW1iaW5nLWJveC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvY2xpcC1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvZG90LXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9mYWRlLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9ncmlkLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9oYXNoLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9tb29uLXNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZWFjdC1zcGlubmVycy9wYWNtYW4tc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3Byb3BhZ2F0ZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvcHVsc2Utc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3Jpbmctc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3Jpc2Utc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3JvdGF0ZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvc2NhbGUtc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3NrZXctc3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3JlYWN0LXNwaW5uZXJzL3NxdWFyZS1zcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcmVhY3Qtc3Bpbm5lcnMvc3luYy1zcGlubmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNwaW5uZXJFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wcm9wcyA9IHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdHM7XG4gICAgdGhpcy5yb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIHRoaXMucHJvcHNbbmFtZV0gPSBuZXdWYWx1ZSB8fCB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRzW25hbWVdO1xuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHN0eWxlKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc3R5bGUgbWV0aG9kIG11c3QgYmUgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndGVtcGxhdGUgbWV0aG9kIG11c3QgYmUgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBzdHlsZXMgPSBgXG4gICAgICA8c3R5bGU+XG4gICAgICAgICogeyBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XG5cbiAgICAgICAgOmhvc3QgICAgICAgICAgIHsgZGlzcGxheTogYmxvY2s7IH1cbiAgICAgICAgOmhvc3QoW2hpZGRlbl0pIHsgZGlzcGxheTogbm9uZTsgfVxuXG4gICAgICAgICR7dGhpcy5zdHlsZSh0aGlzLnByb3BzKX1cbiAgICAgIDwvc3R5bGU+XG4gICAgYDtcblxuICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZSh0aGlzLnByb3BzKTtcblxuICAgIHRoaXMucm9vdC5pbm5lckhUTUwgPSBgJHtzdHlsZXN9JHt0ZW1wbGF0ZX1gO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNwaW5uZXJFbGVtZW50O1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEF0b21TcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2F0b20tc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tYXRvbS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLWF0b20tc3Bpbm5lcl9fZHVyYXRpb24sICR7dGhpcy5wcm9wcy5kdXJhdGlvbn1zKWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1hdG9tLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmF0b20tc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWlubmVyIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1jaXJjbGUge1xuICAgICAgICBjb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjI0KTtcbiAgICAgICAgbGVmdDogNTAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1saW5lIHtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gMjUpIHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyLXRvcDogY2FsYygke3RoaXMuc2l6ZX0gLyAyNSkgc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgLmF0b20tc3Bpbm5lciAuc3Bpbm5lci1saW5lOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGFuaW1hdGlvbjogYXRvbS1zcGlubmVyLWFuaW1hdGlvbi0xICR7dGhpcy5kdXJhdGlvbn0gbGluZWFyIGluZmluaXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMTIwZGVnKSByb3RhdGVYKDY2ZGVnKSByb3RhdGVaKDBkZWcpO1xuICAgICAgfVxuXG4gICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWxpbmU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBhdG9tLXNwaW5uZXItYW5pbWF0aW9uLTIgJHt0aGlzLmR1cmF0aW9ufSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigyNDBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMGRlZyk7XG4gICAgICB9XG5cbiAgICAgIC5hdG9tLXNwaW5uZXIgLnNwaW5uZXItbGluZTpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb246IGF0b20tc3Bpbm5lci1hbmltYXRpb24tMyAke3RoaXMuZHVyYXRpb259IGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVaKDM2MGRlZykgcm90YXRlWCg2NmRlZykgcm90YXRlWigwZGVnKTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBhdG9tLXNwaW5uZXItYW5pbWF0aW9uLTEge1xuICAgICAgICAxMDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMTIwZGVnKSByb3RhdGVYKDY2ZGVnKSByb3RhdGVaKDM2MGRlZyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBhdG9tLXNwaW5uZXItYW5pbWF0aW9uLTIge1xuICAgICAgICAxMDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMjQwZGVnKSByb3RhdGVYKDY2ZGVnKSByb3RhdGVaKDM2MGRlZyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBhdG9tLXNwaW5uZXItYW5pbWF0aW9uLTMge1xuICAgICAgICAxMDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMzYwZGVnKSByb3RhdGVYKDY2ZGVnKSByb3RhdGVaKDM2MGRlZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJhdG9tLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItaW5uZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1saW5lXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItbGluZVwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWxpbmVcIj48L2Rpdj5cblxuICAgICAgICAgIDwhLS1DaHJvbWUgcmVuZGVycyBsaXR0bGUgY2lyY2xlcyBtYWxmb3JtZWQgOigtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1jaXJjbGVcIj4mIzk2Nzk7PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQXRvbVNwaW5uZXIuaXMsIEF0b21TcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCcmVlZGluZ1Job21idXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2JyZWVkaW5nLXJob21idXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7dGhpcy5wcm9wcy5kdXJhdGlvbn1zKWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciwgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAqIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cyB7XG4gICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogJHt0aGlzLmR1cmF0aW9ufTtcbiAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyA3LjUpO1xuICAgICAgICBsZWZ0OiBjYWxjKCR7dGhpcy5zaXplfSAvIDIuMzA3Nyk7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAvIDIuMzA3Nyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAvIDcuNSk7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXM6bnRoLWNoaWxkKDJuKzApIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTEge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiAxKTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMTtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC0yIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogMik7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtMyB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDMpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0zO1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTQge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiA0KTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNDtcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC01IHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogNSk7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTU7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuY2hpbGQtNiB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDYpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC02O1xuICAgICAgfVxuXG4gICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTcge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoMTAwbXMgKiA3KTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNztcbiAgICAgIH1cblxuICAgICAgLmJyZWVkaW5nLXJob21idXMtc3Bpbm5lciAucmhvbWJ1cy5jaGlsZC04IHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDEwMG1zICogOCk7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTg7XG4gICAgICB9XG5cbiAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXMuYmlnIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjVzO1xuICAgICAgICBhbmltYXRpb246IGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtYmlnICR7dGhpcy5kdXJhdGlvbn0gaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyAzKTtcbiAgICAgICAgbGVmdDogY2FsYygke3RoaXMuc2l6ZX0gLyAzKTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAvIDMpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyAzKTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTEge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0zMjUlLCAtMzI1JSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTIge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0zMjUlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMyB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMzI1JSwgLTMyNSUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC00IHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzMjUlLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNSB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMzI1JSwgMzI1JSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTYge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDMyNSUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC03IHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMzI1JSwgMzI1JSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTgge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0zMjUlLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtYmlnIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJicmVlZGluZy1yaG9tYnVzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtMVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC0yXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTNcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtNFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC01XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTZcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtN1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC04XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGJpZ1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQnJlZWRpbmdSaG9tYnVzU3Bpbm5lci5pcywgQnJlZWRpbmdSaG9tYnVzU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgQ2lyY2xlc1RvUmhvbWJ1c2VzU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdjaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBjb3VudDogMyxcbiAgICAgIGR1cmF0aW9uOiAxLjIsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnY291bnQnLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7dGhpcy5wcm9wcy5kdXJhdGlvbn1zKWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoeyBjb3VudCB9KSB7XG4gICAgY29uc3QgY2lyY2xlU3R5bGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMjsgaSA8PSBjb3VudDsgaSsrKSB7XG4gICAgICBjaXJjbGVTdHlsZXMucHVzaChgXG4gICAgICAgIC5jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKCR7aX0pIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAvIDggKiAke2l9KTtcbiAgICAgICAgfVxuICAgICAgYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyLCAuY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lciAqIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgIH1cblxuICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXJcbiAgICAgICAgd2lkdGg6IGNhbGMoKCR7dGhpcy5zaXplfSArICR7dGhpcy5zaXplfSAqIDEuMTI1KSAqICR7Y291bnR9KTtcbiAgICAgIH1cblxuICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGFuaW1hdGlvbjogY2lyY2xlcy10by1yaG9tYnVzZXMtYW5pbWF0aW9uICR7dGhpcy5kdXJhdGlvbn0gbGluZWFyIGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAlO1xuICAgICAgICBib3JkZXI6IDNweCBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IGNhbGMoJHt0aGlzLnNpemV9ICogMS4xMjUpO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKCR7dGhpcy5kdXJhdGlvbn0gLyA4ICogMSk7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgfVxuXG4gICAgICAke2NpcmNsZVN0eWxlcy5qb2luKCcnKX1cblxuICAgICAgQGtleWZyYW1lcyBjaXJjbGVzLXRvLXJob21idXNlcy1hbmltYXRpb24ge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAlO1xuICAgICAgICB9XG4gICAgICAgIDE3LjUlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIH1cbiAgICAgICAgNTAlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIDkzLjUlIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgY2lyY2xlcy10by1yaG9tYnVzZXMtYmFja2dyb3VuZC1hbmltYXRpb24ge1xuICAgICAgICA1MCUge1xuICAgICAgICAgIG9wYWNpdHk6IDAuNDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSh7IGNvdW50IH0pIHtcbiAgICBjb25zdCBjaXJjbGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMjsgaSA8PSBjb3VudDsgaSsrKSB7XG4gICAgICBjaXJjbGVzLnB1c2goJzxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICAke2NpcmNsZXMuam9pbignJyl9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShDaXJjbGVzVG9SaG9tYnVzZXNTcGlubmVyLmlzLCBDaXJjbGVzVG9SaG9tYnVzZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBGaW5nZXJwcmludFNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnZmluZ2VycHJpbnQtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuNSxcbiAgICAgIHNpemU6IDY0LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXJfX2R1cmF0aW9uLCAke3RoaXMucHJvcHMuZHVyYXRpb259cylgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBwYWRkaW5nOiAycHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZyB7XG4gICAgICAgIGFuaW1hdGlvbjogZmluZ2VycHJpbnQtc3Bpbm5lci1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBjdWJpYy1iZXppZXIoMC42ODAsIC0wLjc1MCwgMC4yNjUsIDEuNzUwKSBpbmZpbml0ZSBmb3J3YXJkcztcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgICAgICBib3JkZXItdG9wLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItd2lkdGg6IDJweDtcbiAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDEpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDAgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDAgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDIpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDEgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDEgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDMpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDIgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDIgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoNCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDQpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDMgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDMgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoNSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDUpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDQgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDQgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoNikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDYpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDUgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDUgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoNykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDcpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDYgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDYgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoOCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDgpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDcgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDcgKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgIH1cblxuICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoOSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDkpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDggKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gOSArIDggKiAke3RoaXMuc2l6ZX0gLyA5KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmaW5nZXJwcmludC1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKCAzNjBkZWcgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImZpbmdlcnByaW50LXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEZpbmdlcnByaW50U3Bpbm5lci5pcywgRmluZ2VycHJpbnRTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBGbG93ZXJTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Zsb3dlci1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMi41LFxuICAgICAgc2l6ZTogNzAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWZsb3dlci1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLWZsb3dlci1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWZsb3dlci1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICAuZmxvd2VyLXNwaW5uZXIge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5mbG93ZXItc3Bpbm5lciAuZG90cy1jb250YWluZXIge1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gNyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAvIDcpO1xuICAgICAgfVxuXG4gICAgICAuZmxvd2VyLXNwaW5uZXIgLnNtYWxsZXItZG90IHtcbiAgICAgICAgYW5pbWF0aW9uOiBmbG93ZXItc3Bpbm5lci1zbWFsbGVyLWRvdC1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSAwcyBpbmZpbml0ZSBib3RoO1xuICAgICAgICBiYWNrZ3JvdW5kOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5mbG93ZXItc3Bpbm5lciAuYmlnZ2VyLWRvdCB7XG4gICAgICAgIGFuaW1hdGlvbjogZmxvd2VyLXNwaW5uZXItYmlnZ2VyLWRvdC1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSAwcyBpbmZpbml0ZSBib3RoO1xuICAgICAgICBiYWNrZ3JvdW5kOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcGFkZGluZzogMTAlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmbG93ZXItc3Bpbm5lci1iaWdnZXItZG90LWFuaW1hdGlvbiB7XG4gICAgICAgIDAlLCAxMDAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDI1JSwgNzUlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMuY29sb3J9IDI2cHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IC0yNnB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMjZweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggLTI2cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMTlweCAtMTlweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAxOXB4IDE5cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gLTE5cHggLTE5cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gLTE5cHggMTlweCAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmbG93ZXItc3Bpbm5lci1zbWFsbGVyLWRvdC1hbmltYXRpb24ge1xuICAgICAgICAwJSwgMTAwJSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4O1xuICAgICAgICB9XG4gICAgICAgIDI1JSwgNzUlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMuY29sb3J9IDE0cHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IC0xNHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMTRweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggLTE0cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMTBweCAtMTBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAxMHB4IDEwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gLTEwcHggLTEwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gLTEwcHggMTBweCAwcHg7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5jb2xvcn0gMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbG9yfSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29sb3J9IDBweCAwcHggMHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZmxvd2VyLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJpZ2dlci1kb3RcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzbWFsbGVyLWRvdFwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEZsb3dlclNwaW5uZXIuaXMsIEZsb3dlclNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEZ1bGZpbGxpbmdCb3VuY2luZ0NpcmNsZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDQsXG4gICAgICBzaXplOiA1MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBkdXJhdGlvbigpIHsgcmV0dXJuIGB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb246IGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItYW5pbWF0aW9uIGluZmluaXRlICR7dGhpcy5kdXJhdGlvbn0gZWFzZTtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXIgLm9yYml0IHtcbiAgICAgICAgYW5pbWF0aW9uOiBmdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLW9yYml0LWFuaW1hdGlvbiBpbmZpbml0ZSAke3RoaXMuZHVyYXRpb259IGVhc2U7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMDMpIHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1jaXJjbGUtYW5pbWF0aW9uIGluZmluaXRlICR7dGhpcy5kdXJhdGlvbn0gZWFzZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXI6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4xKSBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBjb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpIHNjYWxlKDEpO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLW9yYml0LWFuaW1hdGlvbiB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuICAgICAgICA2Mi41JSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjgpO1xuICAgICAgICB9XG4gICAgICAgIDc1JSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuICAgICAgICA4Ny41JSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjgpO1xuICAgICAgICB9XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBmdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLWNpcmNsZS1hbmltYXRpb24ge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgMTYuNyUge1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IGluaXRpYWw7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogaW5pdGlhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIDMzLjQlIHtcbiAgICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgfVxuXG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cblxuICAgICAgICA2Mi41JSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcbiAgICAgICAgfVxuXG4gICAgICAgIDc1JSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIDg3LjUlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICAgICAgICB9XG5cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJmdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9yYml0XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShGdWxmaWxsaW5nQm91bmNpbmdDaXJjbGVTcGlubmVyLmlzLCBGdWxmaWxsaW5nQm91bmNpbmdDaXJjbGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBGdWxmaWxsaW5nU3F1YXJlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogNCxcbiAgICAgIHNpemU6IDUwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLWZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXJfX2R1cmF0aW9uLCAke3RoaXMucHJvcHMuZHVyYXRpb259cylgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGJvcmRlcjogNHB4IHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBpbmZpbml0ZSBlYXNlO1xuICAgICAgfVxuXG4gICAgICAuZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lciAuc3Bpbm5lci1pbm5lciB7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1pbm5lci1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBpbmZpbml0ZSBlYXNlLWluO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIDI1JSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgIDc1JSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1pbm5lci1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgaGVpZ2h0OiAwJTsgfVxuICAgICAgICAyNSUgIHsgaGVpZ2h0OiAwJTsgfVxuICAgICAgICA1MCUgIHsgaGVpZ2h0OiAxMDAlOyB9XG4gICAgICAgIDc1JSAgeyBoZWlnaHQ6IDEwMCU7IH1cbiAgICAgICAgMTAwJSB7IGhlaWdodDogMCU7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWlubmVyXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShGdWxmaWxsaW5nU3F1YXJlU3Bpbm5lci5pcywgRnVsZmlsbGluZ1NxdWFyZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEhhbGZDaXJjbGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2hhbGYtY2lyY2xlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0taGFsZi1jaXJjbGUtc3Bpbm5lcl9fZHVyYXRpb24sICR7dGhpcy5wcm9wcy5kdXJhdGlvbn1zKWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5oYWxmLWNpcmNsZS1zcGlubmVyIHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmhhbGYtY2lyY2xlLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGJvcmRlcjogY2FsYygke3RoaXMuc2l6ZX0gLyAxMCkgc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgLmhhbGYtY2lyY2xlLXNwaW5uZXIgLmNpcmNsZS5jaXJjbGUtMSB7XG4gICAgICAgIGFuaW1hdGlvbjogaGFsZi1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgIH1cblxuICAgICAgLmhhbGYtY2lyY2xlLXNwaW5uZXIgLmNpcmNsZS5jaXJjbGUtMiB7XG4gICAgICAgIGFuaW1hdGlvbjogaGFsZi1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBpbmZpbml0ZSBhbHRlcm5hdGU7XG4gICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgaGFsZi1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJoYWxmLWNpcmNsZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgY2lyY2xlLTFcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZSBjaXJjbGUtMlwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoSGFsZkNpcmNsZVNwaW5uZXIuaXMsIEhhbGZDaXJjbGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBIb2xsb3dEb3RzU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdob2xsb3ctZG90cy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBjb3VudDogMyxcbiAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2NvdW50JyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXJfX2R1cmF0aW9uLCAke3RoaXMucHJvcHMuZHVyYXRpb259cylgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0taG9sbG93LWRvdHMtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKHsgY291bnQgfSkge1xuICAgIGNvbnN0IGRvdFN0eWxlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gY291bnQ7IGkrKykge1xuICAgICAgZG90U3R5bGVzLnB1c2goYFxuICAgICAgICAuaG9sbG93LWRvdHMtc3Bpbm5lciAuZG90Om50aC1jaGlsZCgke2l9KSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKCR7dGhpcy5kdXJhdGlvbn0gLyAke2NvdW50fSAqICR7aX0pO1xuICAgICAgICB9XG4gICAgICBgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgICAgKiB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICB9XG5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG5cbiAgICAgIC5ob2xsb3ctZG90cy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAqIDIgKiAke2NvdW50fSk7XG4gICAgICB9XG5cbiAgICAgIC5ob2xsb3ctZG90cy1zcGlubmVyIC5kb3Qge1xuICAgICAgICBhbmltYXRpb246IGhvbGxvdy1kb3RzLXNwaW5uZXItYW5pbWF0aW9uICR7dGhpcy5kdXJhdGlvbn0gZWFzZSBpbmZpbml0ZSAwbXM7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKCR7dGhpcy5zaXplfSAvIDUpIHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgbWFyZ2luOiAwIGNhbGMoJHt0aGlzLnNpemV9IC8gMik7XG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgICR7ZG90U3R5bGVzLmpvaW4oJycpfVxuXG4gICAgICBAa2V5ZnJhbWVzIGhvbGxvdy1kb3RzLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgNTAlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIH1cblxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY291bnQgfSkge1xuICAgIGNvbnN0IGRvdHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGRvdHMucHVzaCgnPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PicpO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiaG9sbG93LWRvdHMtc3Bpbm5lclwiPlxuICAgICAgICAke2RvdHMuam9pbignJyl9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShIb2xsb3dEb3RzU3Bpbm5lci5pcywgSG9sbG93RG90c1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEludGVyc2VjdGluZ0NpcmNsZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2ludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLjIsXG4gICAgICBzaXplOiAzNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBkdXJhdGlvbigpIHsgcmV0dXJuIGB2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9ICogMik7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAqIDIpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuc3Bpbm5lckJsb2NrIHtcbiAgICAgICAgYW5pbWF0aW9uOiBpbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHRvcDogMDtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0b3A6IDA7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgbGVmdDogY2FsYygke3RoaXMuc2l6ZX0gKiAtMC4zNik7XG4gICAgICAgIHRvcDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjIpO1xuICAgICAgfVxuXG4gICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGxlZnQ6IGNhbGMoJHt0aGlzLnNpemV9ICogLTAuMzYpO1xuICAgICAgICB0b3A6IGNhbGMoJHt0aGlzLnNpemV9ICogLTAuMik7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAqIC0wLjM2KTtcbiAgICAgIH1cblxuICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoNSkge1xuICAgICAgICBsZWZ0OiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMzYpO1xuICAgICAgICB0b3A6IGNhbGMoJHt0aGlzLnNpemV9ICogLTAuMik7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDYpIHtcbiAgICAgICAgbGVmdDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjM2KTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMik7XG4gICAgICB9XG5cbiAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDcpIHtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMzYpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgZnJvbSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIHRvICAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lckJsb2NrXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaXJjbGVcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaXJjbGVcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaXJjbGVcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaXJjbGVcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaXJjbGVcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaXJjbGVcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaXJjbGVcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoSW50ZXJzZWN0aW5nQ2lyY2xlc1NwaW5uZXIuaXMsIEludGVyc2VjdGluZ0NpcmNsZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBMb29waW5nUmhvbWJ1c2VzU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdsb29waW5nLXJob21idXNlcy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMi41LFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7dGhpcy5wcm9wcy5kdXJhdGlvbn1zKWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5sb29waW5nLXJob21idXNlcy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9ICogNCk7XG4gICAgICB9XG5cbiAgICAgIC5sb29waW5nLXJob21idXNlcy1zcGlubmVyIC5yaG9tYnVzIHtcbiAgICAgICAgYW5pbWF0aW9uOiBsb29waW5nLXJob21idXNlcy1zcGlubmVyLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgbGVmdDogY2FsYygke3RoaXMuc2l6ZX0gKiA0KTtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApIHJvdGF0ZSg0NWRlZykgc2NhbGUoMCk7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5sb29waW5nLXJob21idXNlcy1zcGlubmVyIC5yaG9tYnVzOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259ICogMSAvIC0xLjUpO1xuICAgICAgfVxuXG4gICAgICAubG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lciAucmhvbWJ1czpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAqIDIgLyAtMS41KTtcbiAgICAgIH1cblxuICAgICAgLmxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIgLnJob21idXM6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKCR7dGhpcy5kdXJhdGlvbn0gKiAzIC8gLTEuNSk7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApICAgICByb3RhdGUoNDVkZWcpIHNjYWxlKDApOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIzMyUpIHJvdGF0ZSg0NWRlZykgc2NhbGUoMSk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNDY2JSkgcm90YXRlKDQ1ZGVnKSBzY2FsZSgwKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXNcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXNcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXNcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKExvb3BpbmdSaG9tYnVzZXNTcGlubmVyLmlzLCBMb29waW5nUmhvbWJ1c2VzU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgT3JiaXRTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ29yYml0LXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLjIsXG4gICAgICBzaXplOiA1NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tb3JiaXQtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBkdXJhdGlvbigpIHsgcmV0dXJuIGB2YXIoLS1vcmJpdC1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLW9yYml0LXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLm9yYml0LXNwaW5uZXIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBwZXJzcGVjdGl2ZTogODAwcHg7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5vcmJpdC1zcGlubmVyIC5vcmJpdCB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAub3JiaXQtc3Bpbm5lciAub3JiaXQ6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uOiBvcmJpdC1zcGlubmVyLW9yYml0LW9uZS1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBsZWZ0OiAwJTtcbiAgICAgICAgdG9wOiAwJTtcbiAgICAgIH1cblxuICAgICAgLm9yYml0LXNwaW5uZXIgLm9yYml0Om50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbjogb3JiaXQtc3Bpbm5lci1vcmJpdC10d28tYW5pbWF0aW9uICR7dGhpcy5kdXJhdGlvbn0gbGluZWFyIGluZmluaXRlO1xuICAgICAgICBib3JkZXItcmlnaHQ6IDNweCBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICByaWdodDogMCU7XG4gICAgICAgIHRvcDogMCU7XG4gICAgICB9XG5cbiAgICAgIC5vcmJpdC1zcGlubmVyIC5vcmJpdDpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb246IG9yYml0LXNwaW5uZXItb3JiaXQtdGhyZWUtYW5pbWF0aW9uICR7dGhpcy5kdXJhdGlvbn0gbGluZWFyIGluZmluaXRlO1xuICAgICAgICBib3JkZXItdG9wOiAzcHggc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm90dG9tOiAwJTtcbiAgICAgICAgcmlnaHQ6IDAlO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG9yYml0LXNwaW5uZXItb3JiaXQtb25lLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMzVkZWcpIHJvdGF0ZVkoLTQ1ZGVnKSByb3RhdGVaKDBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMzVkZWcpIHJvdGF0ZVkoLTQ1ZGVnKSByb3RhdGVaKDM2MGRlZyk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBvcmJpdC1zcGlubmVyLW9yYml0LXR3by1hbmltYXRpb24ge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDUwZGVnKSByb3RhdGVZKDEwZGVnKSByb3RhdGVaKDBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoNTBkZWcpIHJvdGF0ZVkoMTBkZWcpIHJvdGF0ZVooMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIG9yYml0LXNwaW5uZXItb3JiaXQtdGhyZWUtYW5pbWF0aW9uIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWCgzNWRlZykgcm90YXRlWSg1NWRlZykgcm90YXRlWigwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGVYKDM1ZGVnKSByb3RhdGVZKDU1ZGVnKSByb3RhdGVaKDM2MGRlZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJvcmJpdC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvcmJpdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3JiaXRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9yYml0XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShPcmJpdFNwaW5uZXIuaXMsIE9yYml0U3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgUGl4ZWxTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3BpeGVsLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAyLFxuICAgICAgc2l6ZTogNzAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXBpeGVsLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0tcGl4ZWwtc3Bpbm5lcl9fZHVyYXRpb24sICR7dGhpcy5wcm9wcy5kdXJhdGlvbn1zKWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1waXhlbC1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5waXhlbC1zcGlubmVyIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAucGl4ZWwtc3Bpbm5lciAucGl4ZWwtc3Bpbm5lci1pbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbjogcGl4ZWwtc3Bpbm5lci1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJveC1zaGFkb3c6IDE1cHggMTVweCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAtMTVweCAtMTVweCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAxNXB4IC0xNXB4ICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIC0xNXB4IDE1cHggIDAgMCxcbiAgICAgICAgICAgICAgICAgICAgMCAxNXB4ICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIDE1cHggMCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAtMTVweCAwICAwIDAsXG4gICAgICAgICAgICAgICAgICAgIDAgLTE1cHggMCAwO1xuICAgICAgICBjb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSAvIDcpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyA3KTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBwaXhlbC1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDUwJSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgLTIwcHggLTIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAyMHB4IC0yMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgLTIwcHggMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDBweCAxMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgMTBweCAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMTBweCAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAwcHggLTEwcHggMHB4IDBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIDc1JSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgLTIwcHggLTIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAyMHB4IC0yMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgLTIwcHggMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgIDBweCAxMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgMTBweCAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAtMTBweCAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAwcHggLTEwcHggMHB4IDBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJwaXhlbC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwaXhlbC1zcGlubmVyLWlubmVyXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShQaXhlbFNwaW5uZXIuaXMsIFBpeGVsU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgUmFkYXJTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3JhZGFyLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAyLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXJhZGFyLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0tcmFkYXItc3Bpbm5lcl9fZHVyYXRpb24sICR7dGhpcy5wcm9wcy5kdXJhdGlvbn1zKWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1yYWRhci1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5yYWRhci1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgIGFuaW1hdGlvbjogcmFkYXItc3Bpbm5lci1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBpbmZpbml0ZTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKCR7dGhpcy5kdXJhdGlvbn0gLyA2LjY3KTtcbiAgICAgICAgcGFkZGluZzogY2FsYygke3RoaXMuc2l6ZX0gKiA1ICogMiAqIDAgLyAxMTApO1xuICAgICAgfVxuXG4gICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgyKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259IC8gNi42Nyk7XG4gICAgICAgIHBhZGRpbmc6IGNhbGMoJHt0aGlzLnNpemV9ICogNSAqIDIgKiAxIC8gMTEwKTtcbiAgICAgIH1cblxuICAgICAgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAvIDYuNjcpO1xuICAgICAgICBwYWRkaW5nOiBjYWxjKCR7dGhpcy5zaXplfSAqIDUgKiAyICogMiAvIDExMCk7XG4gICAgICB9XG5cbiAgICAgIC5yYWRhci1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwbXM7XG4gICAgICAgIHBhZGRpbmc6IGNhbGMoJHt0aGlzLnNpemV9ICogNSAqIDIgKiAzIC8gMTEwKTtcbiAgICAgIH1cblxuICAgICAgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZS1pbm5lciwgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZS1pbm5lci1jb250YWluZXIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJvcmRlcjogY2FsYygke3RoaXMuc2l6ZX0gKiA1IC8gMTEwKSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZS1pbm5lciB7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgcmFkYXItc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJyYWRhci1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lclwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lclwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFJhZGFyU3Bpbm5lci5pcywgUmFkYXJTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTY2FsaW5nU3F1YXJlc1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc2NhbGluZy1zcXVhcmVzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLjI1LFxuICAgICAgc2l6ZTogNjUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGFuaW1hdGlvbjogc2NhbGluZy1zcXVhcmVzLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGluZmluaXRlO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlIHtcbiAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAke3RoaXMuZHVyYXRpb259O1xuICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMDQgLyAxLjMpIHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjI1IC8gMS4zKTtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjI1IC8gMS4zKTtcbiAgICAgIH1cblxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0xO1xuICAgICAgfVxuXG4gICAgICAuc2NhbGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICB9XG5cbiAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgzKSB7XG4gICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMztcbiAgICAgIH1cblxuICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDQpIHtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC00O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNjYWxpbmctc3F1YXJlcy1hbmltYXRpb24ge1xuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTEge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMyB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLC0xNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTQge1xuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxNTAlLC0xNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2NhbGluZy1zcXVhcmVzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2NhbGluZ1NxdWFyZXNTcGlubmVyLmlzLCBTY2FsaW5nU3F1YXJlc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNlbGZCdWlsZGluZ1NxdWFyZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDYsXG4gICAgICBzaXplOiAxMCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBkdXJhdGlvbigpIHsgcmV0dXJuIGB2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9ICogNCk7XG4gICAgICAgIHRvcDogY2FsYygke3RoaXMuc2l6ZX0gKiAyIC8gMyk7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAqIDQpO1xuICAgICAgfVxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZSB7XG4gICAgICAgIGFuaW1hdGlvbjogc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAke3RoaXMuZHVyYXRpb259IGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIG1hcmdpbi1yaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyAzKTtcbiAgICAgICAgbWFyZ2luLXRvcDogY2FsYygke3RoaXMuc2l6ZX0gLyAzKTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgcG9zaXRpb246cmVsYXRpdmU7XG4gICAgICAgIHRvcDogY2FsYygke3RoaXMuc2l6ZX0gKiAtMiAvIDMpO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgxKSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259IC8gMjAgKiA2KTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAvIDIwICogNyk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKCR7dGhpcy5kdXJhdGlvbn0gLyAyMCAqIDgpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259IC8gMjAgKiAzKTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoNSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAvIDIwICogNCk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDYpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKCR7dGhpcy5kdXJhdGlvbn0gLyAyMCAqIDUpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg3KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygke3RoaXMuZHVyYXRpb259IC8gMjAgKiAwKTtcbiAgICAgIH1cblxuICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoOCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAvIDIwICogMSk7XG4gICAgICB9XG5cbiAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDkpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKCR7dGhpcy5kdXJhdGlvbn0gLyAyMCAqIDIpO1xuICAgICAgfVxuXG4gICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuY2xlYXIge1xuICAgICAgICBjbGVhcjogYm90aDtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIH1cblxuICAgICAgICA1JSB7XG4gICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICB0b3A6IDA7XG4gICAgICAgIH1cblxuICAgICAgICA1MC45JSB7XG4gICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICB0b3A6IDA7XG4gICAgICAgIH1cblxuICAgICAgICA1NS45JSB7XG4gICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICB0b3A6IGluaGVyaXQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmUgY2xlYXJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmUgY2xlYXJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTZWxmQnVpbGRpbmdTcXVhcmVTcGlubmVyLmlzLCBTZWxmQnVpbGRpbmdTcXVhcmVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTZW1pcG9sYXJTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3NlbWlwb2xhci1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMixcbiAgICAgIHNpemU6IDY1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBkdXJhdGlvbigpIHsgcmV0dXJuIGB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fZHVyYXRpb24sICR7dGhpcy5wcm9wcy5kdXJhdGlvbn1zKWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuc2VtaXBvbGFyLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuc2VtaXBvbGFyLXNwaW5uZXIgLnJpbmcge1xuICAgICAgICBhbmltYXRpb246IHNlbWlwb2xhci1zcGlubmVyLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGluZmluaXRlO1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMDUpO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAqIDAuMSAqIDQpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC0gJHt0aGlzLnNpemV9ICogMC4yICogMCk7XG4gICAgICAgIGxlZnQ6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4xICogMCk7XG4gICAgICAgIHRvcDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjEgKiAwKTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC0gJHt0aGlzLnNpemV9ICogMC4yICogMCk7XG4gICAgICAgIHotaW5kZXg6IDU7XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAqIDAuMSAqIDMpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC0gJHt0aGlzLnNpemV9ICogMC4yICogMSk7XG4gICAgICAgIGxlZnQ6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4xICogMSk7XG4gICAgICAgIHRvcDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjEgKiAxKTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC0gJHt0aGlzLnNpemV9ICogMC4yICogMSk7XG4gICAgICAgIHotaW5kZXg6IDQ7XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAqIDAuMSAqIDIpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC0gJHt0aGlzLnNpemV9ICogMC4yICogMik7XG4gICAgICAgIGxlZnQ6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4xICogMik7XG4gICAgICAgIHRvcDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjEgKiAyKTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC0gJHt0aGlzLnNpemV9ICogMC4yICogMik7XG4gICAgICAgIHotaW5kZXg6IDM7XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoNCkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAqIDAuMSAqIDEpO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC0gJHt0aGlzLnNpemV9ICogMC4yICogMyk7XG4gICAgICAgIGxlZnQ6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4xICogMyk7XG4gICAgICAgIHRvcDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjEgKiAzKTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC0gJHt0aGlzLnNpemV9ICogMC4yICogMyk7XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgICB9XG5cbiAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoNSkge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAqIDAuMSAqIDApO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC0gJHt0aGlzLnNpemV9ICogMC4yICogNCk7XG4gICAgICAgIGxlZnQ6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4xICogNCk7XG4gICAgICAgIHRvcDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjEgKiA0KTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC0gJHt0aGlzLnNpemV9ICogMC4yICogNCk7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2VtaXBvbGFyLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKSBzY2FsZSgwLjcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic2VtaXBvbGFyLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJpbmdcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFNlbWlwb2xhclNwaW5uZXIuaXMsIFNlbWlwb2xhclNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFNwcmluZ1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc3ByaW5nLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAzLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXNwcmluZy1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLXNwcmluZy1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXNwcmluZy1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zcHJpbmctc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuc3ByaW5nLXNwaW5uZXIgLnNwcmluZy1zcGlubmVyLXBhcnQge1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gMik7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5zcHJpbmctc3Bpbm5lciAgLnNwcmluZy1zcGlubmVyLXBhcnQuYm90dG9tIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpIHNjYWxlKC0xLCAxKTtcbiAgICAgIH1cblxuICAgICAgLnNwcmluZy1zcGlubmVyIC5zcHJpbmctc3Bpbm5lci1yb3RhdG9yIHtcbiAgICAgICAgYW5pbWF0aW9uOiBzcHJpbmctc3Bpbm5lci1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBlYXNlLWluLW91dCBpbmZpbml0ZTtcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgIGJvcmRlci10b3AtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci13aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyA3KTtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0yMDBkZWcpO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHNwcmluZy1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gNyk7XG4gICAgICAgIH1cblxuICAgICAgICAyNSUge1xuICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gLyAyMy4zMyk7XG4gICAgICAgIH1cblxuICAgICAgICA1MCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDExNWRlZyk7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAvIDcpO1xuICAgICAgICB9XG5cbiAgICAgICAgNzUlIHtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gMjMuMzMpO1xuICAgICAgICB9XG5cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAvIDcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic3ByaW5nLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXBhcnQgdG9wXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXJvdGF0b3JcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXBhcnQgYm90dG9tXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwcmluZy1zcGlubmVyLXJvdGF0b3JcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTcHJpbmdTcGlubmVyLmlzLCBTcHJpbmdTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTd2FwcGluZ1NxdWFyZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3N3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGR1cmF0aW9uKCkgeyByZXR1cm4gYHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lcl9fZHVyYXRpb24sICR7dGhpcy5wcm9wcy5kdXJhdGlvbn1zKWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lciB7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmUge1xuICAgICAgICBhbmltYXRpb24tZHVyYXRpb246ICR7dGhpcy5kdXJhdGlvbn07XG4gICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgICBib3JkZXI6IGNhbGMoJHt0aGlzLnNpemV9ICogMC4wNCAvIDEuMykgc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMjUgLyAxLjMpO1xuICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuMjUgLyAxLjMpO1xuICAgICAgfVxuXG4gICAgICAuc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKCR7dGhpcy5kdXJhdGlvbn0gLyAyKTtcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTE7XG4gICAgICB9XG5cbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMikge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IDBtcztcbiAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICB9XG5cbiAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMykge1xuICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHt0aGlzLmR1cmF0aW9ufSAvIDIpO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtMztcbiAgICAgIH1cblxuICAgICAgLnN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgIGFuaW1hdGlvbi1kZWxheTogMG1zO1xuICAgICAgICBhbmltYXRpb24tbmFtZTogc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtNDtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0xIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTUwJSwxNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLDE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0zIHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MCUsLTE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC00IHtcbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTUwJSwtMTUwJSkgc2NhbGUoMiwyKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lclwiIDpzdHlsZT1cInNwaW5uZXJTdHlsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTd2FwcGluZ1NxdWFyZXNTcGlubmVyLmlzLCBTd2FwcGluZ1NxdWFyZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBUcmluaXR5UmluZ3NTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3RyaW5pdHktcmluZ3Mtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuNSxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgZHVyYXRpb24oKSB7IHJldHVybiBgdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyX19kdXJhdGlvbiwgJHt0aGlzLnByb3BzLmR1cmF0aW9ufXMpYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXRyaW5pdHktcmluZ3Mtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAudHJpbml0eS1yaW5ncy1zcGlubmVyIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSAqIDIpO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgcGFkZGluZzogM3B4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAqIDIpO1xuICAgICAgfVxuXG4gICAgICAudHJpbml0eS1yaW5ncy1zcGlubmVyIC5jaXJjbGUge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJvcmRlcjogM3B4IHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB9XG5cbiAgICAgIC50cmluaXR5LXJpbmdzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMSkge1xuICAgICAgICBhbmltYXRpb246IHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUxLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAzcHg7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAudHJpbml0eS1yaW5ncy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uOiB0cmluaXR5LXJpbmdzLXNwaW5uZXItY2lyY2xlMi1hbmltYXRpb24gJHt0aGlzLmR1cmF0aW9ufSBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJvcmRlci13aWR0aDogMnB4O1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9ICogMC42NSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAqIDAuNjUpO1xuICAgICAgfVxuXG4gICAgICAudHJpbml0eS1yaW5ncy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgYW5pbWF0aW9uOnRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUzLWFuaW1hdGlvbiAke3RoaXMuZHVyYXRpb259IGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjEpO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gKiAwLjEpO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUxLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigyMGRlZykgIHJvdGF0ZVkoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpIHJvdGF0ZVkoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUyLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpIHJvdGF0ZVgoMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWigwZGVnKSAgIHJvdGF0ZVgoMzYwZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUzLWFuaW1hdGlvbntcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpICByb3RhdGVYKC0zNjBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVooLTM2MGRlZykgcm90YXRlWCgzNjBkZWcpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwidHJpbml0eS1yaW5ncy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShUcmluaXR5UmluZ3NTcGlubmVyLmlzLCBUcmluaXR5UmluZ3NTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCYXJTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Jhci1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBoZWlnaHQ6IDQsXG4gICAgICB3aWR0aDogMTAwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3dpZHRoJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWJhci1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGhlaWdodCgpIHsgcmV0dXJuIGB2YXIoLS1iYXItc3Bpbm5lcl9faGVpZ2h0LCAke3RoaXMucHJvcHMuaGVpZ2h0fXB4KWA7IH1cblxuICBnZXQgd2lkdGgoKSB7IHJldHVybiBgdmFyKC0tYmFyLXNwaW5uZXJfX3dpZHRoLCAke3RoaXMucHJvcHMud2lkdGh9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuYmFyLXNwaW5uZXIge1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5oZWlnaHR9O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAke3RoaXMud2lkdGh9O1xuICAgICAgfVxuXG4gICAgICAuYmFja2dyb3VuZCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGhlaWdodDogJHt0aGlzLmhlaWdodH07XG4gICAgICAgIG9wYWNpdHk6IDAuMjtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogJHt0aGlzLndpZHRofTtcbiAgICAgIH1cblxuICAgICAgLmxvbmcge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBsb25nIDIuMXMgY3ViaWMtYmV6aWVyKDAuNjUsIDAuODE1LCAwLjczNSwgMC4zOTUpIGluZmluaXRlO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLmhlaWdodH07XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lsbC1jaGFuZ2U6IGxlZnQsIHJpZ2h0O1xuICAgICAgfVxuXG4gICAgICAuc2hvcnQge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBzaG9ydCAyLjFzIDEuMTVzIGN1YmljLWJlemllcigwLjE2NSwgMC44NCwgMC40NCwgMSkgaW5maW5pdGU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuaGVpZ2h0fTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWxsLWNoYW5nZTogbGVmdCwgcmlnaHQ7XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgbG9uZyB7XG4gICAgICAgIDAlICAgeyBsZWZ0OiAtMzUlOyByaWdodDogMTAwJSB9XG4gICAgICAgIDYwJSAgeyBsZWZ0OiAxMDAlOyByaWdodDogLTkwJSB9XG4gICAgICAgIDEwMCUgeyBsZWZ0OiAxMDAlOyByaWdodDogLTkwJSB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2hvcnQge1xuICAgICAgICAwJSAgIHsgbGVmdDogLTIwMCU7IHJpZ2h0OiAxMDAlIH1cbiAgICAgICAgNjAlICB7IGxlZnQ6IDEwNyU7IHJpZ2h0OiAtOCUgfVxuICAgICAgICAxMDAlIHsgbGVmdDogMTA3JTsgcmlnaHQ6IC04JSB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYmFyLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhY2tncm91bmRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxvbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNob3J0XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShCYXJTcGlubmVyLmlzLCBCYXJTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCZWF0U3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdiZWF0LXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIG1hcmdpbjogMixcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tYmVhdC1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1hcmdpbigpIHsgcmV0dXJuIGB2YXIoLS1iZWF0LXNwaW5uZXJfX21hcmdpbiwgJHt0aGlzLnByb3BzLm1hcmdpbn1weClgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tYmVhdC1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5iZWF0IHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBiZWF0IDAuN3MgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBtYXJnaW46ICR7dGhpcy5tYXJnaW59O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYmVhdDpudGgtY2hpbGQob2RkKSAgeyBhbmltYXRpb24tZGVsYXk6IDBzOyB9XG4gICAgICAuYmVhdDpudGgtY2hpbGQoZXZlbikgeyBhbmltYXRpb24tZGVsYXk6IDAuMzVzOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYmVhdCB7XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpOyBvcGFjaXR5OiAwLjIgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgICAgb3BhY2l0eTogMSB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiYmVhdC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiZWF0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiZWF0XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJiZWF0XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShCZWF0U3Bpbm5lci5pcywgQmVhdFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEJvdW5jZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnYm91bmNlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWJvdW5jZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tYm91bmNlLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmJvdW5jZS1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLmJvdW5jZSB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogYm91bmNlIDIuMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBvcGFjaXR5OiAwLjY7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYm91bmNlOm50aC1jaGlsZCgxKSB7IGFuaW1hdGlvbi1kZWxheTogMXM7IH1cbiAgICAgIC5ib3VuY2U6bnRoLWNoaWxkKDIpIHsgYW5pbWF0aW9uLWRlbGF5OiAwczsgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJvdW5jZSB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHNjYWxlKDApOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMCk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJib3VuY2Utc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm91bmNlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJib3VuY2VcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEJvdW5jZVNwaW5uZXIuaXMsIEJvdW5jZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIENpcmNsZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnY2lyY2xlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLWNpcmNsZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tY2lyY2xlLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBjYWxjdWxhdGVDaXJjbGUoaSkge1xuICAgIHJldHVybiBgXG4gICAgICBhbmltYXRpb24tZGVsYXk6ICR7aSAqIC0wLjJ9cztcbiAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gKiAkezEgLSBpIC8gMTB9KTtcbiAgICAgIGxlZnQ6ICR7aSAqIDAuNyAqIDIuNX0lO1xuICAgICAgdG9wOiAke2kgKiAwLjM1ICogMi41fSU7XG4gICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gKiAkezEgLSBpIC8gMTB9KTtcbiAgICBgO1xuICB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5jaXJjbGUtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5jaXJjbGUge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBcIlwiO1xuICAgICAgICBhbmltYXRpb246IGNpcmNsZSAxcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJvcmRlci10b3AtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkIG5vbmUgbm9uZSBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHggMXB4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAycyBlYXNlIDBzO1xuICAgICAgfVxuXG4gICAgICAuY2lyY2xlOm50aC1jaGlsZCgxKSB7ICR7dGhpcy5jYWxjdWxhdGVDaXJjbGUoMCl9IH1cbiAgICAgIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHsgJHt0aGlzLmNhbGN1bGF0ZUNpcmNsZSgxKX0gfVxuICAgICAgLmNpcmNsZTpudGgtY2hpbGQoMykgeyAke3RoaXMuY2FsY3VsYXRlQ2lyY2xlKDIpfSB9XG4gICAgICAuY2lyY2xlOm50aC1jaGlsZCg0KSB7ICR7dGhpcy5jYWxjdWxhdGVDaXJjbGUoMyl9IH1cbiAgICAgIC5jaXJjbGU6bnRoLWNoaWxkKDUpIHsgJHt0aGlzLmNhbGN1bGF0ZUNpcmNsZSg0KX0gfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNpcmNsZSB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ2lyY2xlU3Bpbm5lci5pcywgQ2lyY2xlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgQ2xpbWJpbmdCb3hTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2NsaW1iaW5nLWJveC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1jbGltYmluZy1ib3gtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWNsaW1iaW5nLWJveC1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5jbGltYmluZy1ib3gtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogNy4xZW07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IDcuMWVtO1xuICAgICAgfVxuXG4gICAgICAuYm94IHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBjbGltYmluZ0JveCAyLjVzIGluZmluaXRlIGN1YmljLWJlemllcigwLjc5LCAwLCAwLjQ3LCAwLjk3KTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE1JTtcbiAgICAgICAgYm9yZGVyOiAwLjI1ZW0gc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm90dG9tOiAtMC4xZW07XG4gICAgICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgICAgICBoZWlnaHQ6IDFlbTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMWVtKSByb3RhdGUoLTQ1ZGVnKTtcbiAgICAgICAgd2lkdGg6IDFlbTtcbiAgICAgIH1cblxuICAgICAgLmhpbGwge1xuICAgICAgICBib3JkZXItbGVmdDogMC4yNWVtIHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGhlaWdodDogNy4xZW07XG4gICAgICAgIGxlZnQ6IDEuN2VtO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMS43ZW07XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcbiAgICAgICAgd2lkdGg6IDcuMWVtO1xuICAgICAgfVxuXG4gICAgICAud3JhcHBlciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgbWFyZ2luLXRvcDogLTIuN2VtO1xuICAgICAgICBtYXJnaW4tbGVmdDogLTIuN2VtO1xuICAgICAgICB3aWR0aDogNS40ZW07XG4gICAgICAgIGhlaWdodDogNS40ZW07XG4gICAgICAgIGZvbnQtc2l6ZTogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNsaW1iaW5nQm94IHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0xZW0pICAgcm90YXRlKC00NWRlZykgfVxuICAgICAgICA1JSAgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTFlbSkgICByb3RhdGUoLTUwZGVnKSB9XG4gICAgICAgIDIwJSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxZW0sIC0yZW0pIHJvdGF0ZSg0N2RlZykgfVxuICAgICAgICAyNSUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMWVtLCAtMmVtKSByb3RhdGUoNDVkZWcpIH1cbiAgICAgICAgMzAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDFlbSwgLTJlbSkgcm90YXRlKDQwZGVnKSB9XG4gICAgICAgIDQ1JSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgyZW0sIC0zZW0pIHJvdGF0ZSgxMzdkZWcpIH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDJlbSwgLTNlbSkgcm90YXRlKDEzNWRlZykgfVxuICAgICAgICA1NSUgIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMmVtLCAtM2VtKSByb3RhdGUoMTMwZGVnKSB9XG4gICAgICAgIDcwJSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzZW0sIC00ZW0pIHJvdGF0ZSgyMTdkZWcpIH1cbiAgICAgICAgNzUlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDNlbSwgLTRlbSkgcm90YXRlKDIyMGRlZykgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTFlbSkgICByb3RhdGUoLTIyNWRlZykgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImNsaW1iaW5nLWJveC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJveFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaWxsXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ2xpbWJpbmdCb3hTcGlubmVyLmlzLCBDbGltYmluZ0JveFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIENsaXBTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2NsaXAtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogMzUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tY2xpcC1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tY2xpcC1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5jbGlwLXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IGNsaXAgMC43NXMgMHMgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGNsaXAge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZykgICBzY2FsZSgxKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKSBzY2FsZSgwLjgpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpIHNjYWxlKDEpOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2xpcC1zcGlubmVyXCI+PC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ2xpcFNwaW5uZXIuaXMsIENsaXBTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBEb3RTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2RvdC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1kb3Qtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWRvdC1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5kb3Qtc3Bpbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb246IHJvdGF0ZSAycyAwcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5kb3Qge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBib3VuY2UgMnMgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IGNhbGMoJHt0aGlzLnNpemV9IC8gMik7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gMik7XG4gICAgICB9XG5cbiAgICAgIC5kb3Q6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwcztcbiAgICAgICAgYm90dG9tOiBhdXRvO1xuICAgICAgICB0b3A6IDA7XG4gICAgICB9XG5cbiAgICAgIC5kb3Q6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMXM7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgdG9wOiBhdXRvO1xuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJvdW5jZSB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHNjYWxlKDApOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMCk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyByb3RhdGUge1xuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImRvdC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkb3RcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRG90U3Bpbm5lci5pcywgRG90U3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgRmFkZVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnZmFkZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBoZWlnaHQ6IDE1LFxuICAgICAgcmFkaXVzOiAxMCxcbiAgICAgIHdpZHRoOiA1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdoZWlnaHQnLFxuICAgICAgJ3JhZGl1cycsXG4gICAgICAnd2lkdGgnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tZmFkZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGhlaWdodCgpIHsgcmV0dXJuIGB2YXIoLS1mYWRlLXNwaW5uZXJfX2hlaWdodCwgJHt0aGlzLnByb3BzLmhlaWdodH1weClgOyB9XG5cbiAgZ2V0IHJhZGl1cygpIHsgcmV0dXJuIGB2YXIoLS1mYWRlLXNwaW5uZXJfX3JhZGl1cywgJHt0aGlzLnByb3BzLnJhZGl1c31weClgOyB9XG5cbiAgZ2V0IHdpZHRoKCkgeyByZXR1cm4gYHZhcigtLWZhZGUtc3Bpbm5lcl9fd2lkdGgsICR7dGhpcy5wcm9wcy53aWR0aH1weClgOyB9XG5cbiAgZ2V0IGNlbnRlcigpIHsgcmV0dXJuIGBjYWxjKCR7dGhpcy5yYWRpdXN9ICsgJHt0aGlzLmhlaWdodH0pYDsgfVxuXG4gIGJ1aWxkTGluZShpKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5jb250YWluZXI6bnRoLWNoaWxkKCR7aX0pIHsgdHJhbnNmb3JtOiByb3RhdGUoJHsoaSAtIDEpICogNDV9ZGVnKTsgfVxuICAgICAgLmNvbnRhaW5lcjpudGgtY2hpbGQoJHtpfSkgLmxpbmUgeyBhbmltYXRpb24tZGVsYXk6IGNhbGMoJHtpIC0gMX0gKiAuMTJzKTsgfVxuICAgIGA7XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmZhZGUtc3Bpbm5lciB7XG4gICAgICAgIGZvbnQtc2l6ZTogMDtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5jZW50ZXJ9ICogMik7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5jZW50ZXJ9ICogMik7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLmNvbnRhaW5lciB7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuY2VudGVyfSAqIDIpO1xuICAgICAgICB3aWR0aDogJHt0aGlzLndpZHRofTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IGNhbGMoJHt0aGlzLmNlbnRlcn0gLSAke3RoaXMud2lkdGh9IC8gMik7XG4gICAgICB9XG5cbiAgICAgIC5saW5lIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBmYWRlIDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuaGVpZ2h0fTtcbiAgICAgICAgdHJhbnNpdGlvbjogMnM7XG4gICAgICAgIHdpZHRoOiAke3RoaXMud2lkdGh9O1xuICAgICAgfVxuXG4gICAgICAke3RoaXMuYnVpbGRMaW5lKDEpfVxuICAgICAgJHt0aGlzLmJ1aWxkTGluZSgyKX1cbiAgICAgICR7dGhpcy5idWlsZExpbmUoMyl9XG4gICAgICAke3RoaXMuYnVpbGRMaW5lKDQpfVxuICAgICAgJHt0aGlzLmJ1aWxkTGluZSg1KX1cbiAgICAgICR7dGhpcy5idWlsZExpbmUoNil9XG4gICAgICAke3RoaXMuYnVpbGRMaW5lKDcpfVxuICAgICAgJHt0aGlzLmJ1aWxkTGluZSg4KX1cblxuICAgICAgQGtleWZyYW1lcyBmYWRlIHtcbiAgICAgICAgNTAlICB7IG9wYWNpdHk6IDAuMzsgfVxuICAgICAgICAxMDAlIHsgb3BhY2l0eTogMTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImZhZGUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRmFkZVNwaW5uZXIuaXMsIEZhZGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBHcmlkU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdncmlkLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIG1hcmdpbjogMixcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tZ3JpZC1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1hcmdpbigpIHsgcmV0dXJuIGB2YXIoLS1ncmlkLXNwaW5uZXJfX21hcmdpbiwgJHt0aGlzLnByb3BzLm1hcmdpbn1weClgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tZ3JpZC1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCkge1xuICAgIGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tKCk7XG5cbiAgICByZXR1cm4gYFxuICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAke3JhbmRvbSArIDAuNn1zO1xuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAke3JhbmRvbSAtIDAuMn1zO1xuICAgIGA7XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmdyaWQtc3Bpbm5lciB7XG4gICAgICAgIGZvbnQtc2l6ZTogMDtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9ICogMyArICR7dGhpcy5tYXJnaW59ICogNik7XG4gICAgICB9XG5cbiAgICAgIC5jZWxsIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBncmlkIGluZmluaXRlIGVhc2U7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIG1hcmdpbjogJHt0aGlzLm1hcmdpbn07XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5jZWxsOm50aC1jaGlsZCgxKSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDIpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG4gICAgICAuY2VsbDpudGgtY2hpbGQoMykgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cbiAgICAgIC5jZWxsOm50aC1jaGlsZCg0KSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDUpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG4gICAgICAuY2VsbDpudGgtY2hpbGQoNikgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cbiAgICAgIC5jZWxsOm50aC1jaGlsZCg3KSB7ICR7dGhpcy5nZW5lcmF0ZUNlbGxBbmltYXRpb24oKX0gfVxuICAgICAgLmNlbGw6bnRoLWNoaWxkKDgpIHsgJHt0aGlzLmdlbmVyYXRlQ2VsbEFuaW1hdGlvbigpfSB9XG4gICAgICAuY2VsbDpudGgtY2hpbGQoOSkgeyAke3RoaXMuZ2VuZXJhdGVDZWxsQW5pbWF0aW9uKCl9IH1cblxuICAgICAgQGtleWZyYW1lcyBncmlkIHtcbiAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogc2NhbGUoMSk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogc2NhbGUoMC41KTsgb3BhY2l0eTogMC43OyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHNjYWxlKDEpOyBvcGFjaXR5OiAxOyB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZ3JpZC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZWxsXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShHcmlkU3Bpbm5lci5pcywgR3JpZFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEhhc2hTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2hhc2gtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogNTAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0taGFzaC1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IGxhdCgpIHsgcmV0dXJuIGBjYWxjKGNhbGMoJHt0aGlzLnNpemV9IC0gJHt0aGlzLnRoaWNrbmVzc30pIC8gMilgOyB9XG5cbiAgZ2V0IG9mZnNldCgpIHsgcmV0dXJuIGBjYWxjKCR7dGhpcy5sYXR9IC0gJHt0aGlzLnRoaWNrbmVzc30pYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLWhhc2gtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIGdldCB0aGlja25lc3MoKSB7IHJldHVybiBgY2FsYygke3RoaXMuc2l6ZX0gLyA1KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLmhhc2gtc3Bpbm5lciB7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDE2NWRlZyk7XG4gICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICB9XG5cbiAgICAgIC5oYXNoIHtcbiAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAycztcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogbm9uZTtcbiAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IGNhbGMoJHt0aGlzLnNpemV9IC8gMTApO1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgaGVpZ2h0OiBjYWxjKCR7dGhpcy5zaXplfSAvIDUpO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIG9wYWNpdHk6IC45O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9IC8gNSk7XG4gICAgICB9XG5cbiAgICAgIC5oYXNoOm50aC1jaGlsZCgxKSB7IGFuaW1hdGlvbi1uYW1lOiBiZWZvcmU7IH1cbiAgICAgIC5oYXNoOm50aC1jaGlsZCgyKSB7IGFuaW1hdGlvbi1uYW1lOiBhZnRlcjsgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJlZm9yZSB7XG4gICAgICAgIDAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMubGF0fSBjYWxjKCR7dGhpcy5vZmZzZXR9ICogLTEpICR7dGhpcy5jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke3RoaXMubGF0fSAqIC0xKSAke3RoaXMub2Zmc2V0fSAke3RoaXMuY29sb3J9O1xuICAgICAgICAgIHdpZHRoOiAke3RoaXMudGhpY2tuZXNzfTtcbiAgICAgICAgfVxuXG4gICAgICAgIDM1JSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCBjYWxjKCR7dGhpcy5vZmZzZXR9ICogLTEpICR7dGhpcy5jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgMCAke3RoaXMub2Zmc2V0fSAke3RoaXMuY29sb3J9O1xuICAgICAgICAgIHdpZHRoOiAke3RoaXMuc2l6ZX07XG4gICAgICAgIH1cblxuICAgICAgICA3MCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6IGNhbGMoJHt0aGlzLmxhdH0gKiAtMSkgY2FsYygke3RoaXMub2Zmc2V0fSAqIC0xKSAke3RoaXMuY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5sYXR9ICR7dGhpcy5vZmZzZXR9ICR7dGhpcy5jb2xvcn07XG4gICAgICAgICAgd2lkdGg6ICR7dGhpcy50aGlja25lc3N9O1xuICAgICAgICB9XG5cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogJHt0aGlzLmxhdH0gY2FsYygke3RoaXMub2Zmc2V0fSAqIC0xKSAke3RoaXMuY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGMoJHt0aGlzLmxhdH0gKiAtMSkgJHt0aGlzLm9mZnNldH0gJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGFmdGVyIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIGJveC1zaGFkb3c6ICR7dGhpcy5vZmZzZXR9ICR7dGhpcy5sYXR9ICR7dGhpcy5jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke3RoaXMub2Zmc2V0fSAqIC0xKSBjYWxjKCR7dGhpcy5sYXR9ICogLTEpICR7dGhpcy5jb2xvcn07XG4gICAgICAgICAgaGVpZ2h0OiAke3RoaXMudGhpY2tuZXNzfTtcbiAgICAgICAgfVxuXG4gICAgICAgIDM1JSB7XG4gICAgICAgICAgYm94LXNoYWRvdzogJHt0aGlzLm9mZnNldH0gMCAke3RoaXMuY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGMoJHt0aGlzLm9mZnNldH0gKiAtMSkgMCAke3RoaXMuY29sb3J9O1xuICAgICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICB9XG5cbiAgICAgICAgNzAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMub2Zmc2V0fSBjYWxjKCR7dGhpcy5sYXR9ICogLTEpICR7dGhpcy5jb2xvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgY2FsYygke3RoaXMub2Zmc2V0fSAqIC0xKSAke3RoaXMubGF0fSAke3RoaXMuY29sb3J9O1xuICAgICAgICAgIGhlaWdodDogJHt0aGlzLnRoaWNrbmVzc307XG4gICAgICAgIH1cblxuICAgICAgICAxMDAlIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAke3RoaXMub2Zmc2V0fSAke3RoaXMubGF0fSAke3RoaXMuY29sb3J9LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGMoJHt0aGlzLm9mZnNldH0gKiAtMSkgY2FsYygke3RoaXMubGF0fSAqIC0xKSAke3RoaXMuY29sb3J9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYDtcbiAgfVxuXG4gIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwiaGFzaC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoYXNoXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoYXNoXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShIYXNoU3Bpbm5lci5pcywgSGFzaFNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIE1vb25TcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ21vb24tc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tbW9vbi1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1vb25TaXplKCkgeyByZXR1cm4gYGNhbGMoJHt0aGlzLnNpemV9IC8gNylgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tbW9vbi1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgYmFsbFN0eWxlKHNpemUpIHtcbiAgICByZXR1cm4gYFxuICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgIGhlaWdodDogJHtzaXplfTtcbiAgICAgIHdpZHRoOiAke3NpemV9O1xuICAgIGA7XG4gIH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLm1vb24tc3Bpbm5lciB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb246IG1vb24gMC42cyAwcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gKyAke3RoaXMubW9vblNpemV9ICogMik7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6IGNhbGMoJHt0aGlzLnNpemV9ICsgJHt0aGlzLm1vb25TaXplfSAqIDIpO1xuICAgICAgfVxuXG4gICAgICAuYmFsbCB7XG4gICAgICAgICR7dGhpcy5iYWxsU3R5bGUodGhpcy5tb29uU2l6ZSl9O1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiBtb29uIDAuNnMgMHMgaW5maW5pdGUgbGluZWFyO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBvcGFjaXR5OiAwLjg7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiBjYWxjKCR7dGhpcy5zaXplfSAvIDIgLSAke3RoaXMubW9vblNpemV9IC8gMik7XG4gICAgICB9XG5cbiAgICAgIC5jaXJjbGUge1xuICAgICAgICAke3RoaXMuYmFsbFN0eWxlKHRoaXMuc2l6ZSl9O1xuICAgICAgICBib3JkZXI6ICR7dGhpcy5tb29uU2l6ZX0gc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gICAgICAgIG9wYWNpdHk6IDAuMTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBtb29uIHtcbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJtb29uLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoTW9vblNwaW5uZXIuaXMsIE1vb25TcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBQYWNtYW5TcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3BhY21hbi1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBtYXJnaW46IDIsXG4gICAgICBzaXplOiAyNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnbWFyZ2luJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXBhY21hbi1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1hcmdpbigpIHsgcmV0dXJuIGB2YXIoLS1wYWNtYW4tc3Bpbm5lcl9fbWFyZ2luLCAke3RoaXMucHJvcHMubWFyZ2lufXB4KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1wYWNtYW4tc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIGJhbGxEZWxheShmYWN0b3IpIHtcbiAgICByZXR1cm4gYGFuaW1hdGlvbi1kZWxheTogJHtmYWN0b3IgKiAwLjI1fXM7YDtcbiAgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAucGFjbWFuLXNwaW5uZXIge1xuICAgICAgICBmb250LXNpemU6IDA7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gKiAyKTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogY2FsYygke3RoaXMuc2l6ZX0gKiAyKTtcbiAgICAgIH1cblxuICAgICAgLnBhY21hbi10b3Age1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHBhY21hbjEgMC44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogJHt0aGlzLnNpemV9IHNvbGlkICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1sZWZ0OiAke3RoaXMuc2l6ZX0gc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogJHt0aGlzLnNpemV9O1xuICAgICAgICBib3JkZXItcmlnaHQ6ICR7dGhpcy5zaXplfSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXRvcDogJHt0aGlzLnNpemV9IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICB9XG5cbiAgICAgIC5wYWNtYW4tYm90dG9tIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBwYWNtYW4yIDAuOHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XG4gICAgICAgIGJvcmRlci1ib3R0b206ICR7dGhpcy5zaXplfSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLWxlZnQ6ICR7dGhpcy5zaXplfSBzb2xpZCAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAke3RoaXMuc2l6ZX07XG4gICAgICAgIGJvcmRlci1yaWdodDogJHt0aGlzLnNpemV9IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICBib3JkZXItdG9wOiAke3RoaXMuc2l6ZX0gc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgaGVpZ2h0OiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAwO1xuICAgICAgfVxuXG4gICAgICAuYmFsbCB7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgICAgIGFuaW1hdGlvbjogYmFsbCAxcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogY2FsYygke3RoaXMuc2l6ZX0gLyAyLjUpO1xuICAgICAgICBsZWZ0OiBjYWxjKCR7dGhpcy5zaXplfSAqIDQpO1xuICAgICAgICBtYXJnaW46ICR7dGhpcy5tYXJnaW59O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogJHt0aGlzLnNpemV9O1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCBjYWxjKCR7dGhpcy5zaXplfSAvIC00KSk7XG4gICAgICAgIHdpZHRoOiBjYWxjKCR7dGhpcy5zaXplfSAvIDIuNSk7XG4gICAgICB9XG5cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgzKSB7ICR7dGhpcy5iYWxsRGVsYXkoLTMpfSB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoNCkgeyAke3RoaXMuYmFsbERlbGF5KC0yKX0gfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDUpIHsgJHt0aGlzLmJhbGxEZWxheSgtMSl9IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCg2KSB7ICR7dGhpcy5iYWxsRGVsYXkoMCl9IH1cblxuICAgICAgQGtleWZyYW1lcyBiYWxsIHtcbiAgICAgICAgNzUlICB7IG9wYWNpdHk6IDAuNzsgfVxuXG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKGNhbGMoJHt0aGlzLnNpemV9ICogLTQpLCBjYWxjKCR7dGhpcy5zaXplfSAvIC00KSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBwYWNtYW4xIHtcbiAgICAgICAgMCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiByb3RhdGUoLTQ0ZGVnKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHBhY21hbjIge1xuICAgICAgICAwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSg0NGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJwYWNtYW4tc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFjbWFuLXRvcFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFjbWFuLWJvdHRvbVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUGFjbWFuU3Bpbm5lci5pcywgUGFjbWFuU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgUHJvcGFnYXRlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdwcm9wYWdhdGUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tcHJvcGFnYXRlLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1wcm9wYWdhdGUtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIGNvbnN0IGRpc3RhbmNlID0gWzEsIDMsIDVdO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIC5wcm9wYWdhdGUtc3Bpbm5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLmJhbGwge1xuICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDEuNXM7XG4gICAgICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xuICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgYmFja2dyb3VuZDogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICBmb250LXNpemU6IGNhbGMoJHt0aGlzLnNpemV9IC8gMyk7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBsZWZ0OiBjYWxjKCR7dGhpcy5zaXplfSAvIC0yKTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IGNhbGMoJHt0aGlzLnNpemV9IC8gLTIpO1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYmFsbDpudGgtY2hpbGQoMSkgeyBhbmltYXRpb24tbmFtZTogYmFsbDE7IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgyKSB7IGFuaW1hdGlvbi1uYW1lOiBiYWxsMjsgfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDMpIHsgYW5pbWF0aW9uLW5hbWU6IGJhbGwzOyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoNCkgeyBhbmltYXRpb24tbmFtZTogYmFsbDQ7IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCg1KSB7IGFuaW1hdGlvbi1uYW1lOiBiYWxsNTsgfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKDYpIHsgYW5pbWF0aW9uLW5hbWU6IGJhbGw2OyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYmFsbDEge1xuICAgICAgICAyNSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZGlzdGFuY2VbMF19cmVtKSBzY2FsZSgwLjc1KTsgfVxuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLSR7ZGlzdGFuY2VbMV19cmVtKSBzY2FsZSgwLjYpOyB9XG4gICAgICAgIDc1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtkaXN0YW5jZVsyXX1yZW0pIHNjYWxlKDAuNSk7IH1cbiAgICAgICAgOTUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDByZW0pICAgICAgICAgICAgICAgc2NhbGUoMSk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBiYWxsMiB7XG4gICAgICAgIDI1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtkaXN0YW5jZVswXX1yZW0pIHNjYWxlKDAuNzUpOyB9XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtJHtkaXN0YW5jZVsxXX1yZW0pIHNjYWxlKDAuNik7IH1cbiAgICAgICAgNzUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2Rpc3RhbmNlWzFdfXJlbSkgc2NhbGUoMC42KTsgfVxuICAgICAgICA5NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHJlbSkgICAgICAgICAgICAgICBzY2FsZSgxKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJhbGwzIHtcbiAgICAgICAgMjUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2Rpc3RhbmNlWzBdfXJlbSkgc2NhbGUoMC43NSk7IH1cbiAgICAgICAgNzUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0ke2Rpc3RhbmNlWzBdfXJlbSkgc2NhbGUoMC43NSk7IH1cbiAgICAgICAgOTUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDByZW0pICAgICAgICAgICAgICAgc2NhbGUoMSk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBiYWxsNCB7XG4gICAgICAgIDI1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgke2Rpc3RhbmNlWzBdfXJlbSkgc2NhbGUoMC43NSk7IH1cbiAgICAgICAgNzUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7ZGlzdGFuY2VbMF19cmVtKSBzY2FsZSgwLjc1KTsgfVxuICAgICAgICA5NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHJlbSkgICAgICAgICAgICAgIHNjYWxlKDEpOyB9XG4gICAgICB9XG5cbiAgICAgIEBrZXlmcmFtZXMgYmFsbDUge1xuICAgICAgICAyNSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoJHtkaXN0YW5jZVswXX1yZW0pIHNjYWxlKDAuNzUpOyB9XG4gICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgke2Rpc3RhbmNlWzFdfXJlbSkgc2NhbGUoMC42KTsgfVxuICAgICAgICA3NSUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoJHtkaXN0YW5jZVsxXX1yZW0pIHNjYWxlKDAuNik7IH1cbiAgICAgICAgOTUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDByZW0pICAgICAgICAgICAgICBzY2FsZSgxKTsgfVxuICAgICAgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGJhbGw2IHtcbiAgICAgICAgMjUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7ZGlzdGFuY2VbMF19cmVtKSBzY2FsZSgwLjc1KTsgfVxuICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoJHtkaXN0YW5jZVsxXX1yZW0pIHNjYWxlKDAuNik7IH1cbiAgICAgICAgNzUlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKCR7ZGlzdGFuY2VbMl19cmVtKSBzY2FsZSgwLjUpOyB9XG4gICAgICAgIDk1JSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcmVtKSAgICAgICAgICAgICAgc2NhbGUoMSk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJwcm9wYWdhdGUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUHJvcGFnYXRlU3Bpbm5lci5pcywgUHJvcGFnYXRlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgUHVsc2VTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3B1bHNlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIG1hcmdpbjogMixcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tcHVsc2Utc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBtYXJnaW4oKSB7IHJldHVybiBgdmFyKC0tcHVsc2Utc3Bpbm5lcl9fbWFyZ2luLCAke3RoaXMucHJvcHMubWFyZ2lufXB4KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1wdWxzZS1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5wdWxzZS1zcGlubmVyIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIH1cblxuICAgICAgLmJhbGwge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHB1bHNlIDAuNzVzIGluZmluaXRlIGN1YmljLWJlemllcigwLjIsIDAuNjgsIDAuMTgsIDEuMDgpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBtYXJnaW46ICR7dGhpcy5tYXJnaW59O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYmFsbDpudGgtY2hpbGQoMSkgeyBhbmltYXRpb24tZGVsYXk6IDBzOyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tZGVsYXk6IC4xMnM7IH1cbiAgICAgIC5iYWxsOm50aC1jaGlsZCgzKSB7IGFuaW1hdGlvbi1kZWxheTogLjI0czsgfVxuXG4gICAgICBAa2V5ZnJhbWVzIHB1bHNlIHtcbiAgICAgICAgMCUgIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgICBvcGFjaXR5OiAxOyB9XG4gICAgICAgIDQ1JSB7IHRyYW5zZm9ybTogc2NhbGUoMC4xKTsgb3BhY2l0eTogMC43OyB9XG4gICAgICAgIDgwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSk7ICAgb3BhY2l0eTogMTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInB1bHNlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJhbGxcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFB1bHNlU3Bpbm5lci5pcywgUHVsc2VTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBSaW5nU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdyaW5nLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXJpbmctc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXJpbmctc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAucmluZy1zcGlubmVyIHtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLnJpbmcge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICAgICAgYW5pbWF0aW9uOiAycyAwcyBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGJvcmRlcjogY2FsYygke3RoaXMuc2l6ZX0gLyAxMCkgc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuc2l6ZX07XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIG9wYWNpdHk6IDAuNDtcbiAgICAgICAgcGVyc3BlY3RpdmU6IDgwMHB4O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgLnJpbmc6bnRoLWNoaWxkKDEpIHsgYW5pbWF0aW9uLW5hbWU6IHJpZ2h0OyB9XG4gICAgICAucmluZzpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tbmFtZTogbGVmdDsgfVxuXG4gICAgICBAa2V5ZnJhbWVzIGxlZnQge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDBkZWcpICAgcm90YXRlWSgwZGVnKSAgIHJvdGF0ZVooMGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWCgzNjBkZWcpIHJvdGF0ZVkoMTgwZGVnKSByb3RhdGVaKDM2MGRlZyk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyByaWdodCB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMGRlZykgICByb3RhdGVZKDBkZWcpICAgcm90YXRlWigwZGVnKTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgzNjBkZWcpIHJvdGF0ZVooMzYwZGVnKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInJpbmctc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUmluZ1NwaW5uZXIuaXMsIFJpbmdTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBSaXNlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdyaXNlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIG1hcmdpbjogMixcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tcmlzZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1hcmdpbigpIHsgcmV0dXJuIGB2YXIoLS1yaXNlLXNwaW5uZXJfX21hcmdpbiwgJHt0aGlzLnByb3BzLm1hcmdpbn1weClgOyB9XG5cbiAgZ2V0IHNpemUoKSB7IHJldHVybiBgdmFyKC0tcmlzZS1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5iYWxsIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiAxcyAwcyBpbmZpbml0ZSBjdWJpYy1iZXppZXIoMC4xNSwgMC40NiwgMC45LCAwLjYpO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBtYXJnaW46ICR7dGhpcy5tYXJnaW59O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYmFsbDpudGgtY2hpbGQoZXZlbikgeyBhbmltYXRpb24tbmFtZTogZXZlbjsgfVxuICAgICAgLmJhbGw6bnRoLWNoaWxkKG9kZCkgeyBhbmltYXRpb24tbmFtZTogb2RkOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgZXZlbiB7XG4gICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7IH1cbiAgICAgICAgMjUlICB7IHRyYW5zbGF0ZVkoLTMwcHgpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDAuNCk7IH1cbiAgICAgICAgNzUlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzMHB4KTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApIHNjYWxlKDEuMCk7IH1cbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBvZGQge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiBzY2FsZSgwLjQpOyB9XG4gICAgICAgIDI1JSAgeyB0cmFuc2xhdGVZKDMwcHgpOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7IH1cbiAgICAgICAgNzUlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzBweCk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSBzY2FsZSgwLjc1KTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInJpc2Utc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUmlzZVNwaW5uZXIuaXMsIFJpc2VTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBSb3RhdGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3JvdGF0ZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnIzM2ZDdiNycsXG4gICAgICBtYXJnaW46IDUsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnbWFyZ2luJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXJvdGF0ZS1zcGlubmVyX19jb2xvciwgJHt0aGlzLnByb3BzLmNvbG9yfSlgOyB9XG5cbiAgZ2V0IG1hcmdpbigpIHsgcmV0dXJuIGB2YXIoLS1yb3RhdGUtc3Bpbm5lcl9fbWFyZ2luLCAke3RoaXMucHJvcHMubWFyZ2lufXB4KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1yb3RhdGUtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAucm90YXRlLXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHJvdGF0ZSAxcyAwcyBpbmZpbml0ZSBjdWJpYy1iZXppZXIoMC43LCAtMC4xMywgMC4yMiwgMC44Nik7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLmJhbGwge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoaXMuY29sb3J9O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgbWFyZ2luOiAke3RoaXMubWFyZ2lufTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyByb3RhdGUge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgNTAlICB7IHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3RhdGUtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoUm90YXRlU3Bpbm5lci5pcywgUm90YXRlU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgU2NhbGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3NjYWxlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIGhlaWdodDogMzUsXG4gICAgICBtYXJnaW46IDIsXG4gICAgICByYWRpdXM6IDIsXG4gICAgICB3aWR0aDogNCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnaGVpZ2h0JyxcbiAgICAgICdtYXJnaW4nLFxuICAgICAgJ3JhZGl1cycsXG4gICAgICAnd2lkdGgnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tc2NhbGUtc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBoZWlnaHQoKSB7IHJldHVybiBgdmFyKC0tc2NhbGUtc3Bpbm5lcl9faGVpZ2h0LCAke3RoaXMucHJvcHMuaGVpZ2h0fXB4KWA7IH1cblxuICBnZXQgbWFyZ2luKCkgeyByZXR1cm4gYHZhcigtLXNjYWxlLXNwaW5uZXJfX21hcmdpbiwgJHt0aGlzLnByb3BzLm1hcmdpbn1weClgOyB9XG5cbiAgZ2V0IHJhZGl1cygpIHsgcmV0dXJuIGB2YXIoLS1zY2FsZS1zcGlubmVyX19yYWRpdXMsICR7dGhpcy5wcm9wcy5yYWRpdXN9cHgpYDsgfVxuXG4gIGdldCB3aWR0aCgpIHsgcmV0dXJuIGB2YXIoLS1zY2FsZS1zcGlubmVyX193aWR0aCwgJHt0aGlzLnByb3BzLndpZHRofXB4KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1zY2FsZS1zcGlubmVyX19zaXplLCAke3RoaXMucHJvcHMuc2l6ZX1weClgOyB9XG5cbiAgc3R5bGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIC5zY2FsZS1zcGlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiByb3RhdGUgMXMgMHMgaW5maW5pdGUgY3ViaWMtYmV6aWVyKDAuNywgLTAuMTMsIDAuMjIsIDAuODYpO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgIC5saW5lIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBzY2FsZSAxcyBpbmZpbml0ZSBjdWJpYy1iZXppZXIoMC4yLCAwLjY4LCAwLjE4LCAxLjA4KTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogJHt0aGlzLnJhZGl1c307XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgaGVpZ2h0OiAke3RoaXMuaGVpZ2h0fTtcbiAgICAgICAgbWFyZ2luOiAke3RoaXMubWFyZ2lufTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy53aWR0aH07XG4gICAgICB9XG5cbiAgICAgIC5saW5lOm50aC1jaGlsZCgxKSB7IGFuaW1hdGlvbi1kZWxheTogMC4xczsgfVxuICAgICAgLmxpbmU6bnRoLWNoaWxkKDIpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjJzOyB9XG4gICAgICAubGluZTpudGgtY2hpbGQoMykgeyBhbmltYXRpb24tZGVsYXk6IDAuM3M7IH1cbiAgICAgIC5saW5lOm50aC1jaGlsZCg0KSB7IGFuaW1hdGlvbi1kZWxheTogMC40czsgfVxuICAgICAgLmxpbmU6bnRoLWNoaWxkKDUpIHsgYW5pbWF0aW9uLWRlbGF5OiAwLjVzOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc2NhbGUge1xuICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiBzY2FsZXkoMS4wKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiBzY2FsZXkoMC40KTsgfVxuICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiBzY2FsZXkoMS4wKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInNjYWxlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFNjYWxlU3Bpbm5lci5pcywgU2NhbGVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi8uLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTa2V3U3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdza2V3LXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjMzZkN2I3JyxcbiAgICAgIHNpemU6IDIwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgZ2V0IGNvbG9yKCkgeyByZXR1cm4gYHZhcigtLXNrZXctc3Bpbm5lcl9fY29sb3IsICR7dGhpcy5wcm9wcy5jb2xvcn0pYDsgfVxuXG4gIGdldCBzaXplKCkgeyByZXR1cm4gYHZhcigtLXNrZXctc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuc2tldy1zcGlubmVyIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBza2V3IDNzIDBzIGluZmluaXRlIGN1YmljLWJlemllcigwLjA5LCAwLjU3LCAwLjQ5LCAwLjkpO1xuICAgICAgICBib3JkZXItYm90dG9tOiAke3RoaXMuc2l6ZX0gc29saWQgJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgYm9yZGVyLWxlZnQ6ICR7dGhpcy5zaXplfSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAke3RoaXMuc2l6ZX0gc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgaGVpZ2h0OiAwO1xuICAgICAgICB3aWR0aDogMDtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBza2V3IHtcbiAgICAgICAgMjUlICB7IHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTAwcHgpIHJvdGF0ZVgoMTgwZGVnKSByb3RhdGVZKDApOyB9XG4gICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgxODBkZWcpOyB9XG4gICAgICAgIDc1JSAgeyB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDApICAgICAgcm90YXRlWSgxODBkZWcpOyB9XG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEwMHB4KSByb3RhdGVYKDApICAgICAgcm90YXRlWSgwKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInNrZXctc3Bpbm5lclwiPjwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFNrZXdTcGlubmVyLmlzLCBTa2V3U3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgU3F1YXJlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzcXVhcmUtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgc2l6ZTogNTAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICBnZXQgY29sb3IoKSB7IHJldHVybiBgdmFyKC0tc3F1YXJlLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1zcXVhcmUtc3Bpbm5lcl9fc2l6ZSwgJHt0aGlzLnByb3BzLnNpemV9cHgpYDsgfVxuXG4gIHN0eWxlKCkge1xuICAgIHJldHVybiBgXG4gICAgICAuc3F1YXJlLXNwaW5uZXIge1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBib3RoO1xuICAgICAgICBhbmltYXRpb246IHNxdWFyZSAzcyAwcyBpbmZpbml0ZSBjdWJpYy1iZXppZXIoMC4wOSwgMC41NywgMC40OSwgMC45KTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHt0aGlzLmNvbG9yfTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBoZWlnaHQ6ICR7dGhpcy5zaXplfTtcbiAgICAgICAgd2lkdGg6ICR7dGhpcy5zaXplfTtcbiAgICAgIH1cblxuICAgICAgQGtleWZyYW1lcyBzcXVhcmUge1xuICAgICAgICAyNSUgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgwKTsgfVxuICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGVYKDE4MGRlZykgcm90YXRlWSgxODBkZWcpOyB9XG4gICAgICAgIDc1JSAgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMCkgICAgICByb3RhdGVZKDE4MGRlZyk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWCgwKSAgICAgIHJvdGF0ZVkoMCk7IH1cbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmUtc3Bpbm5lclwiPjwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFNxdWFyZVNwaW5uZXIuaXMsIFNxdWFyZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uLy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFN5bmNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3N5bmMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyMzNmQ3YjcnLFxuICAgICAgbWFyZ2luOiAyLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ21hcmdpbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIGdldCBjb2xvcigpIHsgcmV0dXJuIGB2YXIoLS1zeW5jLXNwaW5uZXJfX2NvbG9yLCAke3RoaXMucHJvcHMuY29sb3J9KWA7IH1cblxuICBnZXQgbWFyZ2luKCkgeyByZXR1cm4gYHZhcigtLXN5bmMtc3Bpbm5lcl9fbWFyZ2luLCAke3RoaXMucHJvcHMubWFyZ2lufXB4KWA7IH1cblxuICBnZXQgc2l6ZSgpIHsgcmV0dXJuIGB2YXIoLS1zeW5jLXNwaW5uZXJfX3NpemUsICR7dGhpcy5wcm9wcy5zaXplfXB4KWA7IH1cblxuICBzdHlsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgLnN5bmMtc3Bpbm5lciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICB9XG5cbiAgICAgIC5iYWxsIHtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbiAgICAgICAgYW5pbWF0aW9uOiBzeW5jIDAuNnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7dGhpcy5jb2xvcn07XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIGhlaWdodDogJHt0aGlzLnNpemV9O1xuICAgICAgICBtYXJnaW46ICR7dGhpcy5tYXJnaW59O1xuICAgICAgICB3aWR0aDogJHt0aGlzLnNpemV9O1xuICAgICAgfVxuXG4gICAgICAuYmFsbDpudGgtY2hpbGQoMSkgeyBhbmltYXRpb24tZGVsYXk6IDBzOyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tZGVsYXk6IDAuMDdzOyB9XG4gICAgICAuYmFsbDpudGgtY2hpbGQoMykgeyBhbmltYXRpb24tZGVsYXk6IDAuMTRzOyB9XG5cbiAgICAgIEBrZXlmcmFtZXMgc3luYyB7XG4gICAgICAgIDMzJSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTBweCk7IH1cbiAgICAgICAgNjYlICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTBweCk7IH1cbiAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfVxuICAgICAgfVxuICAgIGA7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInN5bmMtc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmFsbFwiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU3luY1NwaW5uZXIuaXMsIFN5bmNTcGlubmVyKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQUFBLE1BQU0sY0FBYyxTQUFTLFdBQVcsQ0FBQztFQUN6QyxFQUFFLFdBQVcsR0FBRztFQUNoQixJQUFJLEtBQUssRUFBRSxDQUFDOztFQUVaLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztFQUMzQyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0VBQ3BELEdBQUc7O0VBRUgsRUFBRSxpQkFBaUIsR0FBRztFQUN0QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztFQUNsQixHQUFHOztFQUVILEVBQUUsd0JBQXdCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7RUFDckQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7RUFFbkUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7RUFDbEIsR0FBRzs7RUFFSCxFQUFFLEtBQUssR0FBRztFQUNWLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0VBQ3hELEdBQUc7O0VBRUgsRUFBRSxRQUFRLEdBQUc7RUFDYixJQUFJLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztFQUMzRCxHQUFHOztFQUVILEVBQUUsTUFBTSxHQUFHO0VBQ1gsSUFBSSxNQUFNLE1BQU0sR0FBRyxDQUFDOzs7Ozs7O1FBT1osRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7SUFFN0IsQ0FBQyxDQUFDOztFQUVOLElB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RUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O2lEQUlzQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7OzswQkFNdkMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDOzs7Ozs7Ozs7Ozs7cUJBWWxCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDcEMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztxQkFLbEMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNwQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O3FCQUtsQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3BDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7cUJBS2xDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDcEMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztxQkFLbEMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNwQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O3FCQUtsQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQ3BDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7cUJBS2xDLEVBQUUsSUFBSSxDQUFDLElB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Q0FBQzs7Ozs7O3NCQU1iLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7Ozs7c0JBSWIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQzs7Ozs7O3NCQU1iLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7OztzQkFHYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO3NCQUNiLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztzQkFDYixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7c0JBQ2IsRUFBRSxJ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
