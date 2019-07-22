import SpinnerElement from '../../SpinnerElement.js';

export class RotateSpinner extends SpinnerElement {
  static get is() { return 'rotate-spinner'; }

  static get defaults() {
    return {
      color: '#36d7b7',
      margin: 5,
      size: 15,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'margin',
      'size',
    ];
  }

  get color() { return `var(--rotate-spinner__color, ${this.props.color})`; }

  get margin() { return `var(--rotate-spinner__margin, ${this.props.margin}px)`; }

  get size() { return `var(--rotate-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .rotate-spinner {
        animation-fill-mode: both;
        animation: rotate 1s 0s infinite cubic-bezier(0.7, -0.13, 0.22, 0.86);
        display: flex;
        position: relative;
      }

      .ball {
        background-color: ${this.color};
        border-radius: 100%;
        height: ${this.size};
        margin: ${this.margin};
        width: ${this.size};
      }

      @keyframes rotate {
        0%   { transform: rotate(0deg); }
        50%  { transform: rotate(180deg); }
        100% { transform: rotate(360deg); }
      }
    `;
  }

  template() {
    return `
      <div class="rotate-spinner">
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
      </div>
    `;
  }
}

customElements.define(RotateSpinner.is, RotateSpinner);
