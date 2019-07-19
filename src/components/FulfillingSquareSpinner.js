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

  style({ color, duration, size }) {
    return `
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
