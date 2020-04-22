import SpinnerElement from '../SpinnerElement.js';

export class DualRingSpinner extends SpinnerElement {
  static get is() { return 'dual-ring-spinner'; }

  static get defaults() {
    return {
      color: '#7f58af',
      size: 80,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'size',
    ];
  }

  get color() { return `var(--dual-ring-spinner__color, ${this.props.color})`; }

  get size() { return `var(--dual-ring-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .lds-dual-ring {
        display: inline-block;
        height: ${this.size};
        width: ${this.size};
      }

      .lds-dual-ring-after {
        box-sizing: content-box;
        animation: lds-dual-ring 1.2s linear infinite;
        border-color: ${this.color} transparent;
        border-radius: 50%;
        border-style: solid;
        border-width: calc(${this.size} * 0.1);
        content: " ";
        display: block;
        height: calc(calc(${this.size} * 0.7) - 6px);
        margin: 8px;
        width: calc(calc(${this.size} * 0.7) - 6px);
      }

      @keyframes lds-dual-ring {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
  }

  template() {
    return `
      <div class="lds-dual-ring">
        <div class="lds-dual-ring-after"></div>
      </div>
    `;
  }
}

customElements.define(DualRingSpinner.is, DualRingSpinner);
