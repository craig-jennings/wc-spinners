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
      this.root.innerHTML = this.template(this.props);
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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, count, size }) { // eslint-disable-line
      const circles = [];
      const circleStyles = [];

      for (let i = 2; i <= count; i++) {
        circles.push('<div class="circle"></div>');

        circleStyles.push(`
        .circles-to-rhombuses-spinner .circle:nth-child(${i}) {
          animation-delay: calc(var(--circles-to-rhombuses-spinner-duration, ${duration}s) / 8 * ${i});
        }
      `);
      }

      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>
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

    template({ color, duration, count, size }) { // eslint-disable-line
      const dotStyles = [];
      const dots = [];

      for (let i = 1; i <= count; i++) {
        dotStyles.push(`
        .hollow-dots-spinner .dot:nth-child(${i}) {
          animation-delay: calc(var(--hollow-dots-spinner-duration, ${duration}s) / ${count} * ${i});
        }
      `);

        dots.push('<div class="dot"></div>');
      }

      return `
      <style>
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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

      <div class="semipolar-spinner" :style="spinnerStyle">
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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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

    template({ color, duration, size }) {
      return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

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
      </style>

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9TcGlubmVyRWxlbWVudC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL0F0b21TcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvQnJlZWRpbmdSaG9tYnVzU3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL0NpcmNsZXNUb1Job21idXNlc1NwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9GaW5nZXJwcmludFNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9GbG93ZXJTcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvRnVsZmlsbGluZ0JvdW5jaW5nQ2lyY2xlU3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL0Z1bGZpbGxpbmdTcXVhcmVTcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvSGFsZkNpcmNsZVNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9Ib2xsb3dEb3RzU3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL0ludGVyc2VjdGluZ0NpcmNsZXNTcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvTG9vcGluZ1Job21idXNlc1NwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9PcmJpdFNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9QaXhlbFNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9SYWRhclNwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9TY2FsaW5nU3F1YXJlc1NwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9TZWxmQnVpbGRpbmdTcXVhcmVTcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvU2VtaXBvbGFyU3Bpbm5lci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL1NwcmluZ1NwaW5uZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9Td2FwcGluZ1NxdWFyZXNTcGlubmVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvVHJpbml0eVJpbmdzU3Bpbm5lci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTcGlubmVyRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucHJvcHMgPSB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRzO1xuICAgIHRoaXMucm9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICB0aGlzLnByb3BzW25hbWVdID0gbmV3VmFsdWUgfHwgdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0c1tuYW1lXTtcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB0ZW1wbGF0ZSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RlbXBsYXRlKHByb3BzKSBtdXN0IGJlIGltcGxlbWVudGVkJyk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5yb290LmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGUodGhpcy5wcm9wcyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3Bpbm5lckVsZW1lbnQ7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgQXRvbVNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnYXRvbS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMSxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHN0eWxlPlxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAgLmF0b20tc3Bpbm5lciB7XG4gICAgICAgICAgaGVpZ2h0OiB2YXIoLS1hdG9tLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgIHdpZHRoOiB2YXIoLS1hdG9tLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5hdG9tLXNwaW5uZXIgLnNwaW5uZXItaW5uZXIge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWNpcmNsZSB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWF0b20tc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYyh2YXIoLS1hdG9tLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMjQpO1xuICAgICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgICAgIH1cblxuICAgICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWxpbmUge1xuICAgICAgICAgIGJvcmRlci1sZWZ0OiBjYWxjKHZhcigtLWF0b20tc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gMjUpIHNvbGlkIHZhcigtLWF0b20tc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICBib3JkZXItdG9wOiBjYWxjKHZhcigtLWF0b20tc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gMjUpIHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWxpbmU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgICBhbmltYXRpb246IGF0b20tc3Bpbm5lci1hbmltYXRpb24tMSB2YXIoLS1hdG9tLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigxMjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMGRlZyk7XG4gICAgICAgIH1cblxuICAgICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWxpbmU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgICBhbmltYXRpb246IGF0b20tc3Bpbm5lci1hbmltYXRpb24tMiB2YXIoLS1hdG9tLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigyNDBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMGRlZyk7XG4gICAgICAgIH1cblxuICAgICAgICAuYXRvbS1zcGlubmVyIC5zcGlubmVyLWxpbmU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgICBhbmltYXRpb246IGF0b20tc3Bpbm5lci1hbmltYXRpb24tMyB2YXIoLS1hdG9tLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigzNjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMGRlZyk7XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIGF0b20tc3Bpbm5lci1hbmltYXRpb24tMSB7XG4gICAgICAgICAgMTAwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVooMTIwZGVnKSByb3RhdGVYKDY2ZGVnKSByb3RhdGVaKDM2MGRlZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgQGtleWZyYW1lcyBhdG9tLXNwaW5uZXItYW5pbWF0aW9uLTIge1xuICAgICAgICAgIDEwMCUge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVaKDI0MGRlZykgcm90YXRlWCg2NmRlZykgcm90YXRlWigzNjBkZWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgYXRvbS1zcGlubmVyLWFuaW1hdGlvbi0zIHtcbiAgICAgICAgICAxMDAlIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigzNjBkZWcpIHJvdGF0ZVgoNjZkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJhdG9tLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItaW5uZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1saW5lXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItbGluZVwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWxpbmVcIj48L2Rpdj5cblxuICAgICAgICAgIDwhLS1DaHJvbWUgcmVuZGVycyBsaXR0bGUgY2lyY2xlcyBtYWxmb3JtZWQgOigtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1jaXJjbGVcIj4mIzk2Nzk7PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQXRvbVNwaW5uZXIuaXMsIEF0b21TcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBCcmVlZGluZ1Job21idXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2JyZWVkaW5nLXJob21idXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA2NSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICB0ZW1wbGF0ZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgICAgKiB7XG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgfVxuXG4gICAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIge1xuICAgICAgICAgIGhlaWdodDogdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgICAgd2lkdGg6IHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgIH1cblxuICAgICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLCAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyICoge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cblxuICAgICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzIHtcbiAgICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKTtcbiAgICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXItY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA3LjUpO1xuICAgICAgICAgIGxlZnQ6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyAyLjMwNzcpO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICB0b3A6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyAyLjMwNzcpO1xuICAgICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gNy41KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5icmVlZGluZy1yaG9tYnVzLXNwaW5uZXIgLnJob21idXM6bnRoLWNoaWxkKDJuKzApIHtcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgICAgIH1cblxuICAgICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTEge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDEpO1xuICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTE7XG4gICAgICAgIH1cblxuICAgICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTIge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDIpO1xuICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICAgIH1cblxuICAgICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTMge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDMpO1xuICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTM7XG4gICAgICAgIH1cblxuICAgICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTQge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDQpO1xuICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTQ7XG4gICAgICAgIH1cblxuICAgICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTUge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDUpO1xuICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTU7XG4gICAgICAgIH1cblxuICAgICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTYge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDYpO1xuICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTY7XG4gICAgICAgIH1cblxuICAgICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTcge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDcpO1xuICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTc7XG4gICAgICAgIH1cblxuICAgICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmNoaWxkLTgge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYygxMDBtcyAqIDgpO1xuICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTg7XG4gICAgICAgIH1cblxuICAgICAgICAuYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyIC5yaG9tYnVzLmJpZyB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjVzO1xuICAgICAgICAgIGFuaW1hdGlvbjogYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC1iaWcgdmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDMpO1xuICAgICAgICAgIGxlZnQ6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyAzKTtcbiAgICAgICAgICB0b3A6IGNhbGModmFyKC0tYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyAzKTtcbiAgICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1icmVlZGluZy1yaG9tYnVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTEge1xuICAgICAgICAgIDUwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMzI1JSwgLTMyNSUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0yIHtcbiAgICAgICAgICA1MCUge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTMyNSUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0zIHtcbiAgICAgICAgICA1MCUge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMzI1JSwgLTMyNSUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC00IHtcbiAgICAgICAgICA1MCUge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMzI1JSwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgQGtleWZyYW1lcyBicmVlZGluZy1yaG9tYnVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTUge1xuICAgICAgICAgIDUwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzMjUlLCAzMjUlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIGJyZWVkaW5nLXJob21idXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtNiB7XG4gICAgICAgICAgNTAlIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDMyNSUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC03IHtcbiAgICAgICAgICA1MCUge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMyNSUsIDMyNSUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC04IHtcbiAgICAgICAgICA1MCUge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTMyNSUsIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC1iaWcge1xuICAgICAgICAgIDUwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICA8L3N0eWxlPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiYnJlZWRpbmctcmhvbWJ1cy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTFcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtMlwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC0zXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtNVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBjaGlsZC02XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzIGNoaWxkLTdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJob21idXMgY2hpbGQtOFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmhvbWJ1cyBiaWdcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEJyZWVkaW5nUmhvbWJ1c1NwaW5uZXIuaXMsIEJyZWVkaW5nUmhvbWJ1c1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIENpcmNsZXNUb1Job21idXNlc1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgY291bnQ6IDMsXG4gICAgICBkdXJhdGlvbjogMS4yLFxuICAgICAgc2l6ZTogMTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2NvdW50JyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY29sb3IsIGR1cmF0aW9uLCBjb3VudCwgc2l6ZSB9KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBjb25zdCBjaXJjbGVzID0gW107XG4gICAgY29uc3QgY2lyY2xlU3R5bGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMjsgaSA8PSBjb3VudDsgaSsrKSB7XG4gICAgICBjaXJjbGVzLnB1c2goJzxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj4nKTtcblxuICAgICAgY2lyY2xlU3R5bGVzLnB1c2goYFxuICAgICAgICAuY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgke2l9KSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyA4ICogJHtpfSk7XG4gICAgICAgIH1cbiAgICAgIGApO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICAgICoge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cblxuICAgICAgICAuY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lciwgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIgKiB7XG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyIHtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgaGVpZ2h0OiB2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXJcbiAgICAgICAgICB3aWR0aDogY2FsYygodmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICsgdmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMS4xMjUpICogJHtjb3VudH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgICAgYW5pbWF0aW9uOiBjaXJjbGVzLXRvLXJob21idXNlcy1hbmltYXRpb24gdmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAlO1xuICAgICAgICAgIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXItY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgICBoZWlnaHQ6IHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogY2FsYyh2YXIoLS1jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAxLjEyNSk7XG4gICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgICAgd2lkdGg6IHZhcigtLWNpcmNsZXMtdG8tcmhvbWJ1c2VzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tY2lyY2xlcy10by1yaG9tYnVzZXMtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDggKiAxKTtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgICR7Y2lyY2xlU3R5bGVzLmpvaW4oJycpfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgY2lyY2xlcy10by1yaG9tYnVzZXMtYW5pbWF0aW9uIHtcbiAgICAgICAgICAwJSB7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgICAgfVxuICAgICAgICAgIDE3LjUlIHtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgICAgICAgICB9XG4gICAgICAgICAgNTAlIHtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgICAgfVxuICAgICAgICAgIDkzLjUlIHtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwJTtcbiAgICAgICAgICB9XG4gICAgICAgICAgMTAwJSB7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMCU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgQGtleWZyYW1lcyBjaXJjbGVzLXRvLXJob21idXNlcy1iYWNrZ3JvdW5kLWFuaW1hdGlvbiB7XG4gICAgICAgICAgNTAlIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVzLXRvLXJob21idXNlcy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgJHtjaXJjbGVzLmpvaW4oJycpfVxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoQ2lyY2xlc1RvUmhvbWJ1c2VzU3Bpbm5lci5pcywgQ2lyY2xlc1RvUmhvbWJ1c2VzU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgRmluZ2VycHJpbnRTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2ZpbmdlcnByaW50LXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLjUsXG4gICAgICBzaXplOiA2NCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICB0ZW1wbGF0ZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgICAgKiB7XG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgfVxuXG4gICAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIHtcbiAgICAgICAgICBoZWlnaHQ6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgIHBhZGRpbmc6IDJweDtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgd2lkdGg6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIC5zcGlubmVyLXJpbmcge1xuICAgICAgICAgIGFuaW1hdGlvbjogZmluZ2VycHJpbnQtc3Bpbm5lci1hbmltYXRpb24gdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBjdWJpYy1iZXppZXIoMC42ODAsIC0wLjc1MCwgMC4yNjUsIDEuNzUwKSBpbmZpbml0ZSBmb3J3YXJkcztcbiAgICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICB0b3A6IDA7XG4gICAgICAgIH1cblxuICAgICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCgxKSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDUwbXMgKiAxKTtcbiAgICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gOSArIDAgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgMCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoMikge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogMik7XG4gICAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyAxICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gOSArIDEgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIC5zcGlubmVyLXJpbmc6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDMpO1xuICAgICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgMiAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyAyICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgIH1cblxuICAgICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg0KSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDUwbXMgKiA0KTtcbiAgICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gOSArIDMgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgMyAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoNSkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogNSk7XG4gICAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyA0ICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gOSArIDQgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIC5zcGlubmVyLXJpbmc6bnRoLWNoaWxkKDYpIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDYpO1xuICAgICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgNSAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyA1ICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgIH1cblxuICAgICAgICAuZmluZ2VycHJpbnQtc3Bpbm5lciAuc3Bpbm5lci1yaW5nOm50aC1jaGlsZCg3KSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKDUwbXMgKiA3KTtcbiAgICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gOSArIDYgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgNiAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmZpbmdlcnByaW50LXNwaW5uZXIgLnNwaW5uZXItcmluZzpudGgtY2hpbGQoOCkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyg1MG1zICogOCk7XG4gICAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyA3ICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gOSArIDcgKiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5maW5nZXJwcmludC1zcGlubmVyIC5zcGlubmVyLXJpbmc6bnRoLWNoaWxkKDkpIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGMoNTBtcyAqIDkpO1xuICAgICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA5ICsgOCAqIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkpO1xuICAgICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDkgKyA4ICogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gOSk7XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIGZpbmdlcnByaW50LXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgICAxMDAlIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKCAzNjBkZWcgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJmaW5nZXJwcmludC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJpbmdcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1yaW5nXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShGaW5nZXJwcmludFNwaW5uZXIuaXMsIEZpbmdlcnByaW50U3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgRmxvd2VyU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdmbG93ZXItc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIuNSxcbiAgICAgIHNpemU6IDcwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHN0eWxlPlxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAgLmZsb3dlci1zcGlubmVyIHtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICBoZWlnaHQ6IHZhcigtLWZsb3dlci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgd2lkdGg6IHZhcigtLWZsb3dlci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIH1cblxuICAgICAgICAuZmxvd2VyLXNwaW5uZXIgLmRvdHMtY29udGFpbmVyIHtcbiAgICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tZmxvd2VyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWZsb3dlci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5mbG93ZXItc3Bpbm5lciAuc21hbGxlci1kb3Qge1xuICAgICAgICAgIGFuaW1hdGlvbjogZmxvd2VyLXNwaW5uZXItc21hbGxlci1kb3QtYW5pbWF0aW9uIHZhcigtLWZsb3dlci1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIDBzIGluZmluaXRlIGJvdGg7XG4gICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICAuZmxvd2VyLXNwaW5uZXIgLmJpZ2dlci1kb3Qge1xuICAgICAgICAgIGFuaW1hdGlvbjogZmxvd2VyLXNwaW5uZXItYmlnZ2VyLWRvdC1hbmltYXRpb24gdmFyKC0tZmxvd2VyLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgMHMgaW5maW5pdGUgYm90aDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICBwYWRkaW5nOiAxMCU7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIGZsb3dlci1zcGlubmVyLWJpZ2dlci1kb3QtYW5pbWF0aW9uIHtcbiAgICAgICAgICAwJSwgMTAwJSB7XG4gICAgICAgICAgICBib3gtc2hhZG93OiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDBweCAwcHg7XG4gICAgICAgICAgfVxuICAgICAgICAgIDUwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAyNSUsIDc1JSB7XG4gICAgICAgICAgICBib3gtc2hhZG93OiB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMjZweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIC0yNnB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMHB4IDI2cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDBweCAtMjZweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMTlweCAtMTlweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgMTlweCAxOXB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAtMTlweCAtMTlweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgLTE5cHggMTlweCAwcHg7XG4gICAgICAgICAgfVxuICAgICAgICAgIDEwMCUge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgQGtleWZyYW1lcyBmbG93ZXItc3Bpbm5lci1zbWFsbGVyLWRvdC1hbmltYXRpb24ge1xuICAgICAgICAgIDAlLCAxMDAlIHtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweDtcbiAgICAgICAgICB9XG4gICAgICAgICAgMjUlLCA3NSUge1xuICAgICAgICAgICAgYm94LXNoYWRvdzogdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDE0cHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAtMTRweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDBweCAxNHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggLTE0cHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDEwcHggLTEwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIDEwcHggMTBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIoLS1maW5nZXJwcmludC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSkgLTEwcHggLTEwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyKC0tZmluZ2VycHJpbnQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pIC0xMHB4IDEwcHggMHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAxMDAlIHtcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcigtLWZpbmdlcnByaW50LXNwaW5uZXItY29sb3IsICR7Y29sb3J9KSAwcHggMHB4IDBweDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJmbG93ZXItc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG90cy1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmlnZ2VyLWRvdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNtYWxsZXItZG90XCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoRmxvd2VyU3Bpbm5lci5pcywgRmxvd2VyU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgRnVsZmlsbGluZ0JvdW5jaW5nQ2lyY2xlU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdmdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogNCxcbiAgICAgIHNpemU6IDUwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHN0eWxlPlxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAgLmZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXIge1xuICAgICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1hbmltYXRpb24gaW5maW5pdGUgdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBlYXNlO1xuICAgICAgICAgIGhlaWdodDogdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICB3aWR0aDogdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXIgLm9yYml0IHtcbiAgICAgICAgICBhbmltYXRpb246IGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItb3JiaXQtYW5pbWF0aW9uIGluZmluaXRlIHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgZWFzZTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMDMpIHNvbGlkIHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgICBoZWlnaHQ6IHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgd2lkdGg6IHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUge1xuICAgICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1jaXJjbGUtYW5pbWF0aW9uIGluZmluaXRlIHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgZWFzZTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLWZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSkgc29saWQgdmFyKC0tZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgaGVpZ2h0OiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpIHNjYWxlKDEpO1xuICAgICAgICAgIHdpZHRoOiB2YXIoLS1mdWxmaWxsaW5nLWJvdW5jaW5nLWNpcmNsZS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgICAwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgMTAwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgZnVsZmlsbGluZy1ib3VuY2luZy1jaXJjbGUtc3Bpbm5lci1vcmJpdC1hbmltYXRpb24ge1xuICAgICAgICAgIDAlIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIDUwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICA2Mi41JSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIDc1JSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICA4Ny41JSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIDEwMCUge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIGZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXItY2lyY2xlLWFuaW1hdGlvbiB7XG4gICAgICAgICAgMCUge1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgMTYuNyUge1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IGluaXRpYWw7XG4gICAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiBpbml0aWFsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIDMzLjQlIHtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIDUwJSB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIDYyLjUlIHtcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS40KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICA3NSUge1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgODcuNSUge1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIDEwMCUge1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgPC9zdHlsZT5cblxuICAgICAgPGRpdiBjbGFzcz1cImZ1bGZpbGxpbmctYm91bmNpbmctY2lyY2xlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3JiaXRcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEZ1bGZpbGxpbmdCb3VuY2luZ0NpcmNsZVNwaW5uZXIuaXMsIEZ1bGZpbGxpbmdCb3VuY2luZ0NpcmNsZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEZ1bGZpbGxpbmdTcXVhcmVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2Z1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiA0LFxuICAgICAgc2l6ZTogNTAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgdGVtcGxhdGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICAgICoge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cblxuICAgICAgICAuZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lciB7XG4gICAgICAgICAgaGVpZ2h0OiB2YXIoLS1mdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgICAgd2lkdGg6IHZhcigtLWZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgYm9yZGVyOiA0cHggc29saWQgdmFyKC0tZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1hbmltYXRpb24gdmFyKC0tZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZSBlYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXIgLnNwaW5uZXItaW5uZXIge1xuICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWZ1bGZpbGxpbmctc3F1YXJlLXNwaW5uZXItY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgIGFuaW1hdGlvbjogZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1pbm5lci1hbmltYXRpb24gdmFyKC0tZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZSBlYXNlLWluO1xuICAgICAgICB9XG5cbiAgICAgICAgQGtleWZyYW1lcyBmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgICAgMjUlICB7IHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7IH1cbiAgICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAgICAgICAgIDc1JSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XG4gICAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgZnVsZmlsbGluZy1zcXVhcmUtc3Bpbm5lci1pbm5lci1hbmltYXRpb24ge1xuICAgICAgICAgIDAlICAgeyBoZWlnaHQ6IDAlOyB9XG4gICAgICAgICAgMjUlICB7IGhlaWdodDogMCU7IH1cbiAgICAgICAgICA1MCUgIHsgaGVpZ2h0OiAxMDAlOyB9XG4gICAgICAgICAgNzUlICB7IGhlaWdodDogMTAwJTsgfVxuICAgICAgICAgIDEwMCUgeyBoZWlnaHQ6IDAlOyB9XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJmdWxmaWxsaW5nLXNxdWFyZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWlubmVyXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShGdWxmaWxsaW5nU3F1YXJlU3Bpbm5lci5pcywgRnVsZmlsbGluZ1NxdWFyZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEhhbGZDaXJjbGVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2hhbGYtY2lyY2xlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgc2l6ZTogNjAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgdGVtcGxhdGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICAgICoge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cblxuICAgICAgICAuaGFsZi1jaXJjbGUtc3Bpbm5lciB7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgd2lkdGg6IHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5oYWxmLWNpcmNsZS1zcGlubmVyIC5jaXJjbGUge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgICAgYm9yZGVyOiBjYWxjKHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDEwKSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICAuaGFsZi1jaXJjbGUtc3Bpbm5lciAuY2lyY2xlLmNpcmNsZS0xIHtcbiAgICAgICAgICBhbmltYXRpb246IGhhbGYtY2lyY2xlLXNwaW5uZXItYW5pbWF0aW9uIHZhcigtLWhhbGYtY2lyY2xlLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGU7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogdmFyKC0taGFsZi1jaXJjbGUtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLmhhbGYtY2lyY2xlLXNwaW5uZXIgLmNpcmNsZS5jaXJjbGUtMiB7XG4gICAgICAgICAgYW5pbWF0aW9uOiBoYWxmLWNpcmNsZS1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlIGFsdGVybmF0ZTtcbiAgICAgICAgICBib3JkZXItYm90dG9tLWNvbG9yOiB2YXIoLS1oYWxmLWNpcmNsZS1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIGhhbGYtY2lyY2xlLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxuICAgICAgICB9XG4gICAgICA8L3N0eWxlPlxuICAgICAgPGRpdiBjbGFzcz1cImhhbGYtY2lyY2xlLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZSBjaXJjbGUtMVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlIGNpcmNsZS0yXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShIYWxmQ2lyY2xlU3Bpbm5lci5pcywgSGFsZkNpcmNsZVNwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEhvbGxvd0RvdHNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2hvbGxvdy1kb3RzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGNvdW50OiAzLFxuICAgICAgZHVyYXRpb246IDEsXG4gICAgICBzaXplOiAxNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnY291bnQnLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgdGVtcGxhdGUoeyBjb2xvciwgZHVyYXRpb24sIGNvdW50LCBzaXplIH0pIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNvbnN0IGRvdFN0eWxlcyA9IFtdO1xuICAgIGNvbnN0IGRvdHMgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGNvdW50OyBpKyspIHtcbiAgICAgIGRvdFN0eWxlcy5wdXNoKGBcbiAgICAgICAgLmhvbGxvdy1kb3RzLXNwaW5uZXIgLmRvdDpudGgtY2hpbGQoJHtpfSkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gJHtjb3VudH0gKiAke2l9KTtcbiAgICAgICAgfVxuICAgICAgYCk7XG5cbiAgICAgIGRvdHMucHVzaCgnPGRpdiBjbGFzcz1cImRvdFwiPjwvZGl2PicpO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICAgICoge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cblxuICAgICAgIC5ob2xsb3ctZG90cy1zcGlubmVyIHtcbiAgICAgICAgICBoZWlnaHQ6IHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAyICogJHtjb3VudH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLmhvbGxvdy1kb3RzLXNwaW5uZXIgLmRvdCB7XG4gICAgICAgICAgYW5pbWF0aW9uOiBob2xsb3ctZG90cy1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1ob2xsb3ctZG90cy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGVhc2UgaW5maW5pdGUgMG1zO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICBib3JkZXI6IGNhbGModmFyKC0taG9sbG93LWRvdHMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gNSkgc29saWQgdmFyKC0taG9sbG93LWRvdHMtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICAgIGhlaWdodDogdmFyKC0taG9sbG93LWRvdHMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICAgIG1hcmdpbjogMCBjYWxjKHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDIpO1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gICAgICAgICAgd2lkdGg6IHZhcigtLWhvbGxvdy1kb3RzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgICR7ZG90U3R5bGVzLmpvaW4oJycpfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgaG9sbG93LWRvdHMtc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICAgIDUwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAxMDAlIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICA8L3N0eWxlPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiaG9sbG93LWRvdHMtc3Bpbm5lclwiPlxuICAgICAgICAke2RvdHMuam9pbignJyl9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShIb2xsb3dEb3RzU3Bpbm5lci5pcywgSG9sbG93RG90c1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIEludGVyc2VjdGluZ0NpcmNsZXNTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ2ludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLjIsXG4gICAgICBzaXplOiAzNSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICB0ZW1wbGF0ZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgICAgKiB7XG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgfVxuXG4gICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIge1xuICAgICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuc3Bpbm5lckJsb2NrIHtcbiAgICAgICAgICBhbmltYXRpb246IGludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJzLWFuaW1hdGlvbiB2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgaGVpZ2h0OiB2YXIoLS1pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgICAgd2lkdGg6IHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGUge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIC0wLjM2KTtcbiAgICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5pbnRlcnNlY3RpbmctY2lyY2xlcy1zcGlubmVyIC5jaXJjbGU6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIC0wLjM2KTtcbiAgICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogLTAuMik7XG4gICAgICAgIH1cblxuICAgICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogLTAuMzYpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoNSkge1xuICAgICAgICAgIGxlZnQ6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4zNik7XG4gICAgICAgICAgdG9wOiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIC0wLjIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoNikge1xuICAgICAgICAgIGxlZnQ6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4zNik7XG4gICAgICAgICAgdG9wOiBjYWxjKHZhcigtLWludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMik7XG4gICAgICAgIH1cblxuICAgICAgICAuaW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCg3KSB7XG4gICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICB0b3A6IGNhbGModmFyKC0taW50ZXJzZWN0aW5nLWNpcmNsZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4zNik7XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIGludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJzLWFuaW1hdGlvbiB7XG4gICAgICAgICAgZnJvbSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgICAgdG8gICB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbiAgICAgICAgfVxuICAgICAgPC9zdHlsZT5cblxuICAgICAgPGRpdiBjbGFzcz1cImludGVyc2VjdGluZy1jaXJjbGVzLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXJCbG9ja1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2lyY2xlXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKEludGVyc2VjdGluZ0NpcmNsZXNTcGlubmVyLmlzLCBJbnRlcnNlY3RpbmdDaXJjbGVzU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgTG9vcGluZ1Job21idXNlc1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIuNSxcbiAgICAgIHNpemU6IDE1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHN0eWxlPlxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAubG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lciB7XG4gICAgICAgICAgaGVpZ2h0OiB2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIgLnJob21idXMge1xuICAgICAgICAgIGFuaW1hdGlvbjogbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lci1hbmltYXRpb24gdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgICBoZWlnaHQ6IHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDQpO1xuICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCkgcm90YXRlKDQ1ZGVnKSBzY2FsZSgwKTtcbiAgICAgICAgICB3aWR0aDogdmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXIgLnJob21idXM6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tbG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAqIDEgLyAtMS41KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb29waW5nLXJob21idXNlcy1zcGlubmVyIC5yaG9tYnVzOm50aC1jaGlsZCgyKSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLWxvb3BpbmctcmhvbWJ1c2VzLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAyIC8gLTEuNSk7XG4gICAgICAgIH1cblxuICAgICAgICAubG9vcGluZy1yaG9tYnVzZXMtc3Bpbm5lciAucmhvbWJ1czpudGgtY2hpbGQoMykge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1sb29waW5nLXJob21idXNlcy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMyAvIC0xLjUpO1xuICAgICAgICB9XG5cbiAgICAgICAgQGtleWZyYW1lcyBsb29waW5nLXJob21idXNlcy1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKSAgICAgcm90YXRlKDQ1ZGVnKSBzY2FsZSgwKTsgfVxuICAgICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIzMyUpIHJvdGF0ZSg0NWRlZykgc2NhbGUoMSk7IH1cbiAgICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC00NjYlKSByb3RhdGUoNDVkZWcpIHNjYWxlKDApOyB9XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJsb29waW5nLXJob21idXNlcy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaG9tYnVzXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShMb29waW5nUmhvbWJ1c2VzU3Bpbm5lci5pcywgTG9vcGluZ1Job21idXNlc1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIE9yYml0U3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdvcmJpdC1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMS4yLFxuICAgICAgc2l6ZTogNTUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgdGVtcGxhdGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICAgICoge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cblxuICAgICAgIC5vcmJpdC1zcGlubmVyIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgaGVpZ2h0OiB2YXIoLS1vcmJpdC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgICAgcGVyc3BlY3RpdmU6IDgwMHB4O1xuICAgICAgICAgIHdpZHRoOiB2YXIoLS1vcmJpdC1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIH1cblxuICAgICAgICAub3JiaXQtc3Bpbm5lciAub3JiaXQge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICAub3JiaXQtc3Bpbm5lciAub3JiaXQ6bnRoLWNoaWxkKDEpIHtcbiAgICAgICAgICBhbmltYXRpb246IG9yYml0LXNwaW5uZXItb3JiaXQtb25lLWFuaW1hdGlvbiB2YXIoLS1vcmJpdC1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgdmFyKC0tb3JiaXQtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGxlZnQ6IDAlO1xuICAgICAgICAgIHRvcDogMCU7XG4gICAgICAgIH1cblxuICAgICAgICAub3JiaXQtc3Bpbm5lciAub3JiaXQ6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgICBhbmltYXRpb246IG9yYml0LXNwaW5uZXItb3JiaXQtdHdvLWFuaW1hdGlvbiB2YXIoLS1vcmJpdC1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGxpbmVhciBpbmZpbml0ZTtcbiAgICAgICAgICBib3JkZXItcmlnaHQ6IDNweCBzb2xpZCB2YXIoLS1vcmJpdC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgICAgcmlnaHQ6IDAlO1xuICAgICAgICAgIHRvcDogMCU7XG4gICAgICAgIH1cblxuICAgICAgICAub3JiaXQtc3Bpbm5lciAub3JiaXQ6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgICBhbmltYXRpb246IG9yYml0LXNwaW5uZXItb3JiaXQtdGhyZWUtYW5pbWF0aW9uIHZhcigtLW9yYml0LXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgbGluZWFyIGluZmluaXRlO1xuICAgICAgICAgIGJvcmRlci10b3A6IDNweCBzb2xpZCB2YXIoLS1vcmJpdC1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgICAgYm90dG9tOiAwJTtcbiAgICAgICAgICByaWdodDogMCU7XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIG9yYml0LXNwaW5uZXItb3JiaXQtb25lLWFuaW1hdGlvbiB7XG4gICAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWCgzNWRlZykgcm90YXRlWSgtNDVkZWcpIHJvdGF0ZVooMGRlZyk7IH1cbiAgICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGVYKDM1ZGVnKSByb3RhdGVZKC00NWRlZykgcm90YXRlWigzNjBkZWcpOyB9XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIG9yYml0LXNwaW5uZXItb3JiaXQtdHdvLWFuaW1hdGlvbiB7XG4gICAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWCg1MGRlZykgcm90YXRlWSgxMGRlZykgcm90YXRlWigwZGVnKTsgfVxuICAgICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoNTBkZWcpIHJvdGF0ZVkoMTBkZWcpIHJvdGF0ZVooMzYwZGVnKTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgQGtleWZyYW1lcyBvcmJpdC1zcGlubmVyLW9yYml0LXRocmVlLWFuaW1hdGlvbiB7XG4gICAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWCgzNWRlZykgcm90YXRlWSg1NWRlZykgcm90YXRlWigwZGVnKTsgfVxuICAgICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZVgoMzVkZWcpIHJvdGF0ZVkoNTVkZWcpIHJvdGF0ZVooMzYwZGVnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJvcmJpdC1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvcmJpdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3JiaXRcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9yYml0XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShPcmJpdFNwaW5uZXIuaXMsIE9yYml0U3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgUGl4ZWxTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3BpeGVsLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAyLFxuICAgICAgc2l6ZTogNzAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgdGVtcGxhdGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICAgICoge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cblxuICAgICAgIC5waXhlbC1zcGlubmVyIHtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICBoZWlnaHQ6IHZhcigtLXBpeGVsLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICB3aWR0aDogdmFyKC0tcGl4ZWwtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLnBpeGVsLXNwaW5uZXIgLnBpeGVsLXNwaW5uZXItaW5uZXIge1xuICAgICAgICAgIGFuaW1hdGlvbjogcGl4ZWwtc3Bpbm5lci1hbmltYXRpb24gdmFyKC0tcGl4ZWwtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBsaW5lYXIgaW5maW5pdGU7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGl4ZWwtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGJveC1zaGFkb3c6IDE1cHggMTVweCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAgIC0xNXB4IC0xNXB4ICAwIDAsXG4gICAgICAgICAgICAgICAgICAgICAgMTVweCAtMTVweCAgMCAwLFxuICAgICAgICAgICAgICAgICAgICAgIC0xNXB4IDE1cHggIDAgMCxcbiAgICAgICAgICAgICAgICAgICAgICAwIDE1cHggIDAgMCxcbiAgICAgICAgICAgICAgICAgICAgICAxNXB4IDAgIDAgMCxcbiAgICAgICAgICAgICAgICAgICAgICAtMTVweCAwICAwIDAsXG4gICAgICAgICAgICAgICAgICAgICAgMCAtMTVweCAwIDA7XG4gICAgICAgICAgY29sb3I6IHZhcigtLXBpeGVsLXNwaW5uZXItY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tcGl4ZWwtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tcGl4ZWwtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIHBpeGVsLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgICA1MCUge1xuICAgICAgICAgICAgYm94LXNoYWRvdzogMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICAtMjBweCAtMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgMjBweCAtMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgLTIwcHggMjBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgMHB4IDEwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIDEwcHggMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICAtMTBweCAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIDBweCAtMTBweCAwcHggMHB4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIDc1JSB7XG4gICAgICAgICAgICBib3gtc2hhZG93OiAyMHB4IDIwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC0yMHB4IC0yMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICAyMHB4IC0yMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICAtMjBweCAyMHB4IDBweCAwcHgsXG4gICAgICAgICAgICAgICAgICAgICAgICAwcHggMTBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgMTBweCAwcHggMHB4IDBweCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC0xMHB4IDBweCAwcHggMHB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgMHB4IC0xMHB4IDBweCAwcHg7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgMTAwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgPC9zdHlsZT5cblxuICAgICAgPGRpdiBjbGFzcz1cInBpeGVsLXNwaW5uZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBpeGVsLXNwaW5uZXItaW5uZXJcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFBpeGVsU3Bpbm5lci5pcywgUGl4ZWxTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBSYWRhclNwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAncmFkYXItc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDIsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICB0ZW1wbGF0ZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgICAgKiB7XG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgfVxuXG4gICAgICAgLnJhZGFyLXNwaW5uZXIge1xuICAgICAgICAgIGhlaWdodDogdmFyKC0tcmFkYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICB3aWR0aDogdmFyKC0tcmFkYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgICAgYW5pbWF0aW9uOiByYWRhci1zcGlubmVyLWFuaW1hdGlvbiB2YXIoLS1yYWRhci1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlO1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgxKSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyA2LjY3KTtcbiAgICAgICAgICBwYWRkaW5nOiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMCAvIDExMCk7XG4gICAgICAgIH1cblxuICAgICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgyKSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyA2LjY3KTtcbiAgICAgICAgICBwYWRkaW5nOiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMSAvIDExMCk7XG4gICAgICAgIH1cblxuICAgICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgzKSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyA2LjY3KTtcbiAgICAgICAgICBwYWRkaW5nOiBjYWxjKHZhcigtLXJhZGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDUgKiAyICogMiAvIDExMCk7XG4gICAgICAgIH1cblxuICAgICAgICAucmFkYXItc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwbXM7XG4gICAgICAgICAgcGFkZGluZzogY2FsYyh2YXIoLS1yYWRhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiA1ICogMiAqIDMgLyAxMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZS1pbm5lciwgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZS1pbm5lci1jb250YWluZXIge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICBib3JkZXI6IGNhbGModmFyKC0tcmFkYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogNSAvIDExMCkgc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG5cbiAgICAgICAgLnJhZGFyLXNwaW5uZXIgLmNpcmNsZS1pbm5lciB7XG4gICAgICAgICAgYm9yZGVyLWxlZnQtY29sb3I6IHZhcigtLXJhZGFyLXNwaW5uZXItY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHZhcigtLXJhZGFyLXNwaW5uZXItY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgcmFkYXItc3Bpbm5lci1hbmltYXRpb24ge1xuICAgICAgICAgIDUwJSAgeyB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XG4gICAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJyYWRhci1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lclwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXJcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUtaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlLWlubmVyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZS1pbm5lclwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFJhZGFyU3Bpbm5lci5pcywgUmFkYXJTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTY2FsaW5nU3F1YXJlc1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc2NhbGluZy1zcXVhcmVzLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiAxLjI1LFxuICAgICAgc2l6ZTogNjUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgdGVtcGxhdGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICAgICoge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cblxuICAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciB7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBhbmltYXRpb246IHNjYWxpbmctc3F1YXJlcy1hbmltYXRpb24gdmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgaW5maW5pdGU7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgIGhlaWdodDogdmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgICAgICAgd2lkdGg6IHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIH1cblxuICAgICAgICAuc2NhbGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKTtcbiAgICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgICBib3JkZXI6IGNhbGModmFyKC0tc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMDQgLyAxLjMpIHNvbGlkIHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjI1IC8gMS4zKTtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNjYWxpbmctc3F1YXJlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjI1IC8gMS4zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgxKSB7XG4gICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgLnNjYWxpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgICBhbmltYXRpb24tbmFtZTogc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTI7XG4gICAgICAgIH1cblxuICAgICAgICAuc2NhbGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMykge1xuICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMztcbiAgICAgICAgfVxuXG4gICAgICAgIC5zY2FsaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHNjYWxpbmctc3F1YXJlcy1zcGlubmVyLWFuaW1hdGlvbi1jaGlsZC00O1xuICAgICAgICB9XG5cbiAgICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtYW5pbWF0aW9uIHtcbiAgICAgICAgICA1MCUgIHsgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpOyB9XG4gICAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTEge1xuICAgICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDE1MCUsMTUwJSkgc2NhbGUoMiwyKTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMiB7XG4gICAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MCUsMTUwJSkgc2NhbGUoMiwyKTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgQGtleWZyYW1lcyBzY2FsaW5nLXNxdWFyZXMtc3Bpbm5lci1hbmltYXRpb24tY2hpbGQtMyB7XG4gICAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1MCUsLTE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgc2NhbGluZy1zcXVhcmVzLXNwaW5uZXItYW5pbWF0aW9uLWNoaWxkLTQge1xuICAgICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDE1MCUsLTE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgICAgfVxuICAgICAgPC9zdHlsZT5cblxuICAgICAgPGRpdiBjbGFzcz1cInNjYWxpbmctc3F1YXJlcy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFNjYWxpbmdTcXVhcmVzU3Bpbm5lci5pcywgU2NhbGluZ1NxdWFyZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTZWxmQnVpbGRpbmdTcXVhcmVTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3NlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXInOyB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6ICcjZmYxZDVlJyxcbiAgICAgIGR1cmF0aW9uOiA2LFxuICAgICAgc2l6ZTogMTAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnY29sb3InLFxuICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICdzaXplJyxcbiAgICBdO1xuICB9XG5cbiAgdGVtcGxhdGUoeyBjb2xvciwgZHVyYXRpb24sIHNpemUgfSkge1xuICAgIHJldHVybiBgXG4gICAgICA8c3R5bGU+XG4gICAgICAgICoge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cblxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cblxuICAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIHtcbiAgICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogNCk7XG4gICAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDIgLyAzKTtcbiAgICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiA0KTtcbiAgICAgICAgfVxuICAgICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlIHtcbiAgICAgICAgICBhbmltYXRpb246IHNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgdmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZTtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLWNvbG9yLCAke2NvbG9yfSk7XG4gICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgICAgaGVpZ2h0OiB2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDMpO1xuICAgICAgICAgIG1hcmdpbi10b3A6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gMyk7XG4gICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcbiAgICAgICAgICB0b3A6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogLTIgLyAzKTtcbiAgICAgICAgICB3aWR0aDogdmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMSkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiA2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogNyk7XG4gICAgICAgIH1cblxuICAgICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgzKSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoNCkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDUpIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogNCk7XG4gICAgICAgIH1cblxuICAgICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg2KSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoNykge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIC8gMjAgKiAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyIC5zcXVhcmU6bnRoLWNoaWxkKDgpIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIwICogMSk7XG4gICAgICAgIH1cblxuICAgICAgICAuc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg5KSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyMCAqIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLnNlbGYtYnVpbGRpbmctc3F1YXJlLXNwaW5uZXIgLmNsZWFyIHtcbiAgICAgICAgICBjbGVhcjogYm90aDtcbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgc2VsZi1idWlsZGluZy1zcXVhcmUtc3Bpbm5lciB7XG4gICAgICAgICAgMCUge1xuICAgICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICA1JSB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIDUwLjklIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgNTUuOSUge1xuICAgICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICAgIHRvcDogaW5oZXJpdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZWxmLWJ1aWxkaW5nLXNxdWFyZS1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmUgY2xlYXJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmUgY2xlYXJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTZWxmQnVpbGRpbmdTcXVhcmVTcGlubmVyLmlzLCBTZWxmQnVpbGRpbmdTcXVhcmVTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBTZW1pcG9sYXJTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3NlbWlwb2xhci1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMixcbiAgICAgIHNpemU6IDY1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHN0eWxlPlxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAuc2VtaXBvbGFyLXNwaW5uZXIge1xuICAgICAgICAgIGhlaWdodDogdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgd2lkdGg6IHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIH1cblxuICAgICAgICAuc2VtaXBvbGFyLXNwaW5uZXIgLnJpbmcge1xuICAgICAgICAgIGFuaW1hdGlvbjogc2VtaXBvbGFyLXNwaW5uZXItYW5pbWF0aW9uIHZhcigtLXNlbWlwb2xhci1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlO1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICBib3JkZXItcmlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMDUpO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoMSkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAqIDAuMSAqIDQpO1xuICAgICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDApO1xuICAgICAgICAgIGxlZnQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDApO1xuICAgICAgICAgIHRvcDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4xICogMCk7XG4gICAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAwKTtcbiAgICAgICAgICB6LWluZGV4OiA1O1xuICAgICAgICB9XG5cbiAgICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCgyKSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMC4xICogMyk7XG4gICAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4yICogMSk7XG4gICAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4xICogMSk7XG4gICAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjEgKiAxKTtcbiAgICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDEpO1xuICAgICAgICAgIHotaW5kZXg6IDQ7XG4gICAgICAgIH1cblxuICAgICAgICAuc2VtaXBvbGFyLXNwaW5uZXIgLnJpbmc6bnRoLWNoaWxkKDMpIHtcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgKiAwLjEgKiAyKTtcbiAgICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAyKTtcbiAgICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjEgKiAyKTtcbiAgICAgICAgICB0b3A6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDIpO1xuICAgICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4yICogMik7XG4gICAgICAgICAgei1pbmRleDogMztcbiAgICAgICAgfVxuXG4gICAgICAgIC5zZW1pcG9sYXItc3Bpbm5lciAucmluZzpudGgtY2hpbGQoNCkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAqIDAuMSAqIDEpO1xuICAgICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDMpO1xuICAgICAgICAgIGxlZnQ6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMSAqIDMpO1xuICAgICAgICAgIHRvcDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4xICogMyk7XG4gICAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAtIHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjIgKiAzKTtcbiAgICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgICB9XG5cbiAgICAgICAgLnNlbWlwb2xhci1zcGlubmVyIC5yaW5nOm50aC1jaGlsZCg1KSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpICogMC4xICogMCk7XG4gICAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLSB2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4yICogNCk7XG4gICAgICAgICAgbGVmdDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4xICogNCk7XG4gICAgICAgICAgdG9wOiBjYWxjKHZhcigtLXNlbWlwb2xhci1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjEgKiA0KTtcbiAgICAgICAgICB3aWR0aDogY2FsYyh2YXIoLS1zZW1pcG9sYXItc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC0gdmFyKC0tc2VtaXBvbGFyLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMiAqIDQpO1xuICAgICAgICAgIHotaW5kZXg6IDE7XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIHNlbWlwb2xhci1zcGlubmVyLWFuaW1hdGlvbiB7XG4gICAgICAgICAgNTAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKSBzY2FsZSgwLjcpOyB9XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZW1pcG9sYXItc3Bpbm5lclwiIDpzdHlsZT1cInNwaW5uZXJTdHlsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmluZ1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoU2VtaXBvbGFyU3Bpbm5lci5pcywgU2VtaXBvbGFyU3Bpbm5lcik7XG4iLCJpbXBvcnQgU3Bpbm5lckVsZW1lbnQgZnJvbSAnLi4vU3Bpbm5lckVsZW1lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgU3ByaW5nU3Bpbm5lciBleHRlbmRzIFNwaW5uZXJFbGVtZW50IHtcbiAgc3RhdGljIGdldCBpcygpIHsgcmV0dXJuICdzcHJpbmctc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDMsXG4gICAgICBzaXplOiA2MCxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdjb2xvcicsXG4gICAgICAnZHVyYXRpb24nLFxuICAgICAgJ3NpemUnLFxuICAgIF07XG4gIH1cblxuICB0ZW1wbGF0ZSh7IGNvbG9yLCBkdXJhdGlvbiwgc2l6ZSB9KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgICAgKiB7XG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgfVxuXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgfVxuXG4gICAgICAgLnNwcmluZy1zcGlubmVyIHtcbiAgICAgICAgICBoZWlnaHQ6IHZhcigtLXNwcmluZy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgICAgd2lkdGg6IHZhcigtLXNwcmluZy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIH1cblxuICAgICAgICAuc3ByaW5nLXNwaW5uZXIgLnNwcmluZy1zcGlubmVyLXBhcnQge1xuICAgICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1zcHJpbmctc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gMik7XG4gICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICB3aWR0aDogdmFyKC0tc3ByaW5nLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zcHJpbmctc3Bpbm5lciAgLnNwcmluZy1zcGlubmVyLXBhcnQuYm90dG9tIHtcbiAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKSBzY2FsZSgtMSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICAuc3ByaW5nLXNwaW5uZXIgLnNwcmluZy1zcGlubmVyLXJvdGF0b3Ige1xuICAgICAgICAgIGFuaW1hdGlvbjogc3ByaW5nLXNwaW5uZXItYW5pbWF0aW9uIHZhcigtLXNwcmluZy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGVhc2UtaW4tb3V0IGluZmluaXRlO1xuICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB2YXIoLS1zcHJpbmctc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogdmFyKC0tc3ByaW5nLXNwaW5uZXItY29sb3IsICR7Y29sb3J9KTtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IGNhbGModmFyKC0tc3ByaW5nLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgICAgIGhlaWdodDogdmFyKC0tc3ByaW5nLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMjAwZGVnKTtcbiAgICAgICAgICB3aWR0aDogdmFyKC0tc3ByaW5nLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgc3ByaW5nLXNwaW5uZXItYW5pbWF0aW9uIHtcbiAgICAgICAgICAwJSB7XG4gICAgICAgICAgICBib3JkZXItd2lkdGg6IGNhbGModmFyKC0tc3ByaW5nLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIDI1JSB7XG4gICAgICAgICAgICBib3JkZXItd2lkdGg6IGNhbGModmFyKC0tc3ByaW5nLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAvIDIzLjMzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICA1MCUge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTE1ZGVnKTtcbiAgICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zcHJpbmctc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gNyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgNzUlIHtcbiAgICAgICAgICAgIGJvcmRlci13aWR0aDogY2FsYyh2YXIoLS1zcHJpbmctc3Bpbm5lci1zaXplLCAke3NpemV9cHgpIC8gMjMuMzMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIDEwMCUge1xuICAgICAgICAgICAgYm9yZGVyLXdpZHRoOiBjYWxjKHZhcigtLXNwcmluZy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgLyA3KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcHJpbmctc3Bpbm5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3ByaW5nLXNwaW5uZXItcGFydCB0b3BcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ByaW5nLXNwaW5uZXItcm90YXRvclwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwic3ByaW5nLXNwaW5uZXItcGFydCBib3R0b21cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ByaW5nLXNwaW5uZXItcm90YXRvclwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFNwcmluZ1NwaW5uZXIuaXMsIFNwcmluZ1NwaW5uZXIpO1xuIiwiaW1wb3J0IFNwaW5uZXJFbGVtZW50IGZyb20gJy4uL1NwaW5uZXJFbGVtZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIFN3YXBwaW5nU3F1YXJlc1NwaW5uZXIgZXh0ZW5kcyBTcGlubmVyRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgaXMoKSB7IHJldHVybiAnc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyJzsgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiAnI2ZmMWQ1ZScsXG4gICAgICBkdXJhdGlvbjogMSxcbiAgICAgIHNpemU6IDY1LFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHN0eWxlPlxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAuc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyIHtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICBoZWlnaHQ6IHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICB3aWR0aDogdmFyKC0tc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCk7XG4gICAgICAgIH1cblxuICAgICAgICAuc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyIC5zcXVhcmUge1xuICAgICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogdmFyKC0tc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpO1xuICAgICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xuICAgICAgICAgIGJvcmRlcjogY2FsYyh2YXIoLS1zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMDQgLyAxLjMpIHNvbGlkIHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGhlaWdodDogY2FsYyh2YXIoLS1zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KSAqIDAuMjUgLyAxLjMpO1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tc3dhcHBpbmctc3F1YXJlcy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjI1IC8gMS4zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMSkge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS1zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXItZHVyYXRpb24sICR7ZHVyYXRpb259cykgLyAyKTtcbiAgICAgICAgICBhbmltYXRpb24tbmFtZTogc3dhcHBpbmctc3F1YXJlcy1hbmltYXRpb24tY2hpbGQtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zd2FwcGluZy1zcXVhcmVzLXNwaW5uZXIgLnNxdWFyZTpudGgtY2hpbGQoMikge1xuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMG1zO1xuICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0yO1xuICAgICAgICB9XG5cbiAgICAgICAgLnN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCgzKSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSAvIDIpO1xuICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0zO1xuICAgICAgICB9XG5cbiAgICAgICAgLnN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lciAuc3F1YXJlOm50aC1jaGlsZCg0KSB7XG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwbXM7XG4gICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTQ7XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTEge1xuICAgICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDE1MCUsMTUwJSkgc2NhbGUoMiwyKTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgQGtleWZyYW1lcyBzd2FwcGluZy1zcXVhcmVzLWFuaW1hdGlvbi1jaGlsZC0yIHtcbiAgICAgICAgICA1MCUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTUwJSwxNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTMge1xuICAgICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xNTAlLC0xNTAlKSBzY2FsZSgyLDIpOyB9XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIHN3YXBwaW5nLXNxdWFyZXMtYW5pbWF0aW9uLWNoaWxkLTQge1xuICAgICAgICAgIDUwJSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDE1MCUsLTE1MCUpIHNjYWxlKDIsMik7IH1cbiAgICAgICAgfVxuICAgICAgPC9zdHlsZT5cblxuICAgICAgPGRpdiBjbGFzcz1cInN3YXBwaW5nLXNxdWFyZXMtc3Bpbm5lclwiIDpzdHlsZT1cInNwaW5uZXJTdHlsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxdWFyZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3F1YXJlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShTd2FwcGluZ1NxdWFyZXNTcGlubmVyLmlzLCBTd2FwcGluZ1NxdWFyZXNTcGlubmVyKTtcbiIsImltcG9ydCBTcGlubmVyRWxlbWVudCBmcm9tICcuLi9TcGlubmVyRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBUcmluaXR5UmluZ3NTcGlubmVyIGV4dGVuZHMgU3Bpbm5lckVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IGlzKCkgeyByZXR1cm4gJ3RyaW5pdHktcmluZ3Mtc3Bpbm5lcic7IH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjogJyNmZjFkNWUnLFxuICAgICAgZHVyYXRpb246IDEuNSxcbiAgICAgIHNpemU6IDYwLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2NvbG9yJyxcbiAgICAgICdkdXJhdGlvbicsXG4gICAgICAnc2l6ZScsXG4gICAgXTtcbiAgfVxuXG4gIHRlbXBsYXRlKHsgY29sb3IsIGR1cmF0aW9uLCBzaXplIH0pIHtcbiAgICByZXR1cm4gYFxuICAgICAgPHN0eWxlPlxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG5cbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG5cbiAgICAgICAudHJpbml0eS1yaW5ncy1zcGlubmVyIHtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgIHBhZGRpbmc6IDNweDtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50cmluaXR5LXJpbmdzLXNwaW5uZXIgLmNpcmNsZSB7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICAgIGJvcmRlcjogM3B4IHNvbGlkIHZhcigtLXRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jb2xvciwgJHtjb2xvcn0pO1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRyaW5pdHktcmluZ3Mtc3Bpbm5lciAuY2lyY2xlOm50aC1jaGlsZCgxKSB7XG4gICAgICAgICAgYW5pbWF0aW9uOiB0cmluaXR5LXJpbmdzLXNwaW5uZXItY2lyY2xlMS1hbmltYXRpb24gdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IDNweDtcbiAgICAgICAgICBoZWlnaHQ6IHZhcigtLXRyaW5pdHktcmluZ3Mtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpO1xuICAgICAgICAgIHdpZHRoOiB2YXIoLS10cmluaXR5LXJpbmdzLXNwaW5uZXItc2l6ZSwgJHtzaXplfXB4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50cmluaXR5LXJpbmdzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMikge1xuICAgICAgICAgIGFuaW1hdGlvbjogdHJpbml0eS1yaW5ncy1zcGlubmVyLWNpcmNsZTItYW5pbWF0aW9uIHZhcigtLXRyaW5pdHktcmluZ3Mtc3Bpbm5lci1kdXJhdGlvbiwgJHtkdXJhdGlvbn1zKSBpbmZpbml0ZSBsaW5lYXI7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgICAgICAgaGVpZ2h0OiBjYWxjKHZhcigtLXRyaW5pdHktcmluZ3Mtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC42NSk7XG4gICAgICAgICAgd2lkdGg6IGNhbGModmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjY1KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50cmluaXR5LXJpbmdzLXNwaW5uZXIgLmNpcmNsZTpudGgtY2hpbGQoMykge1xuICAgICAgICAgIGFuaW1hdGlvbjp0cmluaXR5LXJpbmdzLXNwaW5uZXItY2lyY2xlMy1hbmltYXRpb24gdmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyLWR1cmF0aW9uLCAke2R1cmF0aW9ufXMpIGluZmluaXRlIGxpbmVhcjtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICAgICAgICBoZWlnaHQ6IGNhbGModmFyKC0tdHJpbml0eS1yaW5ncy1zcGlubmVyLXNpemUsICR7c2l6ZX1weCkgKiAwLjEpO1xuICAgICAgICAgIHdpZHRoOiBjYWxjKHZhcigtLXRyaW5pdHktcmluZ3Mtc3Bpbm5lci1zaXplLCAke3NpemV9cHgpICogMC4xKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEBrZXlmcmFtZXMgdHJpbml0eS1yaW5ncy1zcGlubmVyLWNpcmNsZTEtYW5pbWF0aW9ue1xuICAgICAgICAgIDAlICAgeyB0cmFuc2Zvcm06IHJvdGF0ZVooMjBkZWcpICByb3RhdGVZKDBkZWcpOyB9XG4gICAgICAgICAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpIHJvdGF0ZVkoMzYwZGVnKTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgQGtleWZyYW1lcyB0cmluaXR5LXJpbmdzLXNwaW5uZXItY2lyY2xlMi1hbmltYXRpb257XG4gICAgICAgICAgMCUgICB7IHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpIHJvdGF0ZVgoMGRlZyk7IH1cbiAgICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGVaKDBkZWcpICAgcm90YXRlWCgzNjBkZWcpOyB9XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIHRyaW5pdHktcmluZ3Mtc3Bpbm5lci1jaXJjbGUzLWFuaW1hdGlvbntcbiAgICAgICAgICAwJSAgIHsgdHJhbnNmb3JtOiByb3RhdGVaKDEwMGRlZykgIHJvdGF0ZVgoLTM2MGRlZyk7IH1cbiAgICAgICAgICAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGVaKC0zNjBkZWcpIHJvdGF0ZVgoMzYwZGVnKTsgfVxuICAgICAgICB9XG4gICAgICA8L3N0eWxlPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwidHJpbml0eS1yaW5ncy1zcGlubmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZShUcmluaXR5UmluZ3NTcGlubmVyLmlzLCBUcmluaXR5UmluZ3NTcGlubmVyKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7RUFBQSxNQUFNLGNBQWMsU0FBUyxXQUFXLENBQUM7RUFDekMsRUFBRSxXQUFXLEdBQUc7RUFDaEIsSUFBSSxLQUFLLEVBQUUsQ0FBQzs7RUFFWixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7RUFDM0MsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztFQUNwRCxHQUFHOztFQUVILEVBQUUsaUJBQWlCLEdBQUc7RUFDdEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7RUFDbEIsR0FBRzs7RUFFSCxFQUFFLHdCQUF3QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0VBQ3JELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7O0VBRW5FLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0VBQ2xCLEdBQUc7O0VBRUgs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Q04sR0FBRzs7RUFFSCxFQUFFLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUU7RUFDdEMsSUFBSSxPQUFPLENBQUM7Ozs7Ozs7Ozs7O2tEQVdzQyxFQUFFLElBQUksQ0FBQzs7OztpREFJUixFQUFFLElBQUksQ0FBQzs7Ozt1RkFJK0IsRUFBRSxRQUFRLENBQUM7Ozs7Ozs2REFNckMsRUFBRSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Ozt1REFZZCxFQUFFLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxJQUFJLENBQUM7c0RBQzdELEVBQUUsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLElBQUksQ0FBQzs7Ozs7dURBSzNELEVBQUUsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLElBQUksQ0FBQztzREFDN0QsRUFBRSxJQUFJLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDOzs7Ozt1REFLM0QsRUFBRSxJQUFJLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDO3NEQUM3RCxFQUFFLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxJQUFJLENBQUM7Ozs7O3VEQUszRCxFQUFFLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxJQUFJLENBQUM7c0RBQzdELEVBQUUsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLElBQUksQ0FBQzs7Ozs7dURBSzNELEVBQUUsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLElBQUksQ0FBQztzREFDN0QsRUFBRSxJQUFJLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDOzs7Ozt1REFLM0QsRUFBRSxJQUFJLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDO3NEQUM3RCxFQUFFLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxJQUFJLENBQUM7Ozs7O3VEQUszRCxFQUFFLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxJQUFJLENBQUM7c0RBQzdELEVBQUUsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLElBQUksQ0FBQzs7Ozs7dURBSzNELEVBQUUsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLElBQUksQ0FBQztzREFDN0QsRUFBRSxJQUFJLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDOzs7Ozt1REFLM0QsRUFBRSxJQUFJLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDO3NEQUM3RCxFQUFFLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXFCOUcsQ0FBQyxDQUFDO0VBQ04sR0FBRztFQUNILENBQUM7O0VBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzs7RUNuSTFELE1BQU0sYUFBYSxTQUFTLGNBQWMsQ0FBQztFQUNsRCxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsT0FBTyxnQkFBZ0IsQ0FBQyxFQUFFOztFQUU5QyxFQUFFLFdBQVcsUUFBUSxHQUFHO0VBQ3hCLElBQUksT0FBTztFQUNYLE1BQU0sS0FBSyxFQUFFLFNBQVM7RUFDdEIsTUFBTSxRQUFRLEVBQUUsR0FBRztFQUNuQixNQUFNLElBQUksRUFBRSxFQUFFO0VBQ2QsS0FBSyxDQUFDO0VBQ04sR0FBRzs7RUFFSCxFQUFFLFdBQVcsa0JBQWtCLEdBQUc7RUFDbEMsSUFBSSxPQUFPO0VBQ1gsTUFBTSxPQUFPO0VBQ2IsTUFBTSxVQUFVO0VBQ2hCLE1BQU0sTUFBTTtFQUNaLEtBQUssQ0FBQztFQUNOLEdBQUc7O0VBRUgsRUFBRSxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFO0VBQ3RDLElBQUksT0FBTyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs2Q0FjaUMsRUFBRSxJQUFJLENBQUM7OzRDQUVSLEVBQUUsSUFBSSxDQUFDOzs7O2tEQUlELEVBQUUsSUFBSSxDQUFDO2lEQUNSLEVBQUUsSUFBSSxDQUFDOzs7O3lGQUlpQyxFQUFFLFFBQVEsQ0FBQzt1REFDN0MsRUFBRSxLQUFLLENBQUM7Ozs7Ozs7d0ZBT3lCLEVBQUUsUUFBUSxDQUFDO3VEQUM1QyxFQUFFLEtBQUssQ0FBQzs7Ozs7Ozs7O3lEQVNOLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDOzs7Ozs7eURBTVIsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7Ozs7eURBSVIsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7Ozs7O3lEQUtSLEVBQUUsS0FBSyxDQUFDOzZDQUNwQixFQUFFLEtBQUssQ0FBQzs2Q0FDUixFQUFFLEtBQUssQ0FBQzs2Q0FDUixFQUFFLEtBQUssQ0FBQzs2Q0FDUixFQUFFLEtBQUssQ0FBQzs2Q0FDUixFQUFFLEtBQUssQ0FBQzs2Q0FDUixFQUFFLEtBQUssQ0FBQzs2Q0FDUixFQUFFLEtBQUssQ0FBQzs7O3lEQUdJLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDO3lEQUNSLEVBQUUsS0FBSyxDQUFDOzs7eURBR1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxLQUFLLENBQUM7eURBQ1IsRUFBRSxL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
