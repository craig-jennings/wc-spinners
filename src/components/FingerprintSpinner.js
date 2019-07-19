import SpinnerElement from '../SpinnerElement.js';

export class FingerprintSpinner extends SpinnerElement {
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
