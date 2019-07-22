import SpinnerElement from '../../SpinnerElement.js';

export class FulfillingBouncingCircleSpinner extends SpinnerElement {
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
