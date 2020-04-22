import SpinnerElement from '../SpinnerElement.js';

export class HeartSpinner extends SpinnerElement {
  static get is() { return 'heart-spinner'; }

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

  get color() { return `var(--heart-spinner__color, ${this.props.color})`; }

  get size() { return `var(--heart-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .lds-heart {
        display: inline-block;
        height: ${this.size};
        position: relative;
        transform-origin: calc(${this.size} / 2) calc(${this.size} / 2);
        transform: rotate(45deg);
        width: ${this.size};
      }

      .lds-heart > div {
        animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
        background: ${this.color};
        height: calc(${this.size} * .4);
        left: calc(${this.size} * .3);
        position: absolute;
        top: calc(${this.size} * .3);
        width: calc(${this.size} * .4);
      }

      .lds-heart .div-after,
      .lds-heart .div-before {
        background: ${this.color};
        content: " ";
        display: block;
        height: calc(${this.size} * .4);
        position: absolute;
        width: calc(${this.size} * .4);
      }

      .lds-heart .div-before {
        border-radius: 50% 0 0 50%;
        left: calc(${this.size} * -0.3);
      }

      .lds-heart .div-after {
        border-radius: 50% 50% 0 0;
        top: calc(${this.size} * -0.3);
      }

      @keyframes lds-heart {
        0%   { transform: scale(0.95); }
        5%   { transform: scale(1.1); }
        39%  { transform: scale(0.85); }
        45%  { transform: scale(1); }
        60%  { transform: scale(0.95); }
        100% { transform: scale(0.9); }
      }
    `;
  }

  template() {
    return `
      <div class="lds-heart">
        <div>
            <div class="div-before"></div>
            <div class="div-after"></div>
        </div>
      </div>
    `;
  }
}

customElements.define(HeartSpinner.is, HeartSpinner);
