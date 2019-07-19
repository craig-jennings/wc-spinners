import SpinnerElement from '../SpinnerElement.js';

export class RadarSpinner extends SpinnerElement {
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
