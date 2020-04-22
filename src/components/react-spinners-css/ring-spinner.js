import SpinnerElement from '../SpinnerElement.js';

export class RingSpinner extends SpinnerElement {
  static get is() { return 'rsc-ring-spinner'; }

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

  get color() { return `var(--rsc-ring-spinner__color, ${this.props.color})`; }

  get size() { return `var(--rsc-ring-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .lds-ring {
        display: inline-block;
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .lds-ring div {
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${this.color} transparent transparent transparent;
        border-radius: 50%;
        border-style: solid;
        border-width: calc(${this.size} * 0.1);
        box-sizing: border-box;
        display: block;
        height: calc(${this.size} * 0.8);
        margin: calc(${this.size} * 0.1);
        position: absolute;
        width: calc(${this.size} * 0.8);
      }

      .lds-ring div:nth-child(1) { animation-delay: -0.45s; }
      .lds-ring div:nth-child(2) { animation-delay: -0.3s; }
      .lds-ring div:nth-child(3) { animation-delay: -0.15s; }

      @keyframes lds-ring {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
  }

  template() {
    return `
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }
}

customElements.define(RingSpinner.is, RingSpinner);
