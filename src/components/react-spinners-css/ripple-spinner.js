import SpinnerElement from '../SpinnerElement.js';

export class RippleSpinner extends SpinnerElement {
  static get is() { return 'ripple-spinner'; }

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

  get color() { return `var(--ripple-spinner__color, ${this.props.color})`; }

  get size() { return `var(--ripple-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .lds-ripple {
        display: inline-block;
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .lds-ripple div {
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        border-color: ${this.color};
        border-radius: 50%;
        border-style: solid;
        border-width: calc(${this.size} * 0.05),
        opacity: 1;
        position: absolute;
      }

      .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
      }

      @keyframes lds-ripple {
        0% {
          height: 0;
          left: 45%;
          opacity: 1;
          top: 45%;
          width: 0;
        }

        100% {
          height: 90%;
          left: 0px;
          opacity: 0;
          top: 0px;
          width: 90%;
        }
      }
    `;
  }

  template() {
    return `
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    `;
  }
}

customElements.define(RippleSpinner.is, RippleSpinner);
