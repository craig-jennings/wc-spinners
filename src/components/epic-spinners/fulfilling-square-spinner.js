import SpinnerElement from '../SpinnerElement.js';

export class FulfillingSquareSpinner extends SpinnerElement {
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
