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
