import SpinnerElement from '../SpinnerElement.js';

export class SemipolarSpinner extends SpinnerElement {
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
