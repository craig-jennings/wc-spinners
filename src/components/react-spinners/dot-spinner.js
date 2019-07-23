import SpinnerElement from '../SpinnerElement.js';

export class DotSpinner extends SpinnerElement {
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
