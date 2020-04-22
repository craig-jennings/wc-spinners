import SpinnerElement from '../SpinnerElement.js';

export class CircleSpinner extends SpinnerElement {
  static get is() { return 'rsc-circle-spinner'; }

  static get defaults() {
    return {
      color: '#7f58af',
      size: 64,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'size',
    ];
  }

  get color() { return `var(--rsc-circle-spinner__color, ${this.props.color})`; }

  get size() { return `var(--rsc-circle-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .lds-circle {
        animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        background: ${this.color};
        border-radius: 50%;
        display: inline-block;
        height: ${this.size};
        margin: 8px;
        width: ${this.size};
      }

      @keyframes lds-circle {
        0% {
          animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
          transform: rotateY(0deg);
        }

        50% {
          animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
          transform: rotateY(1800deg);
        }

        100% {
          animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
          transform: rotateY(3600deg);
        }
      }
    `;
  }

  template() {
    return '<div class="lds-circle"></div>';
  }
}

customElements.define(CircleSpinner.is, CircleSpinner);
