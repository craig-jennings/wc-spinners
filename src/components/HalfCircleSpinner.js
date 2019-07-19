import SpinnerElement from '../SpinnerElement.js';

export class HalfCircleSpinner extends SpinnerElement {
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
