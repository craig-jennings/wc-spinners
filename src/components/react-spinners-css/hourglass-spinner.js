import SpinnerElement from '../SpinnerElement.js';

export class HourglassSpinner extends SpinnerElement {
  static get is() { return 'hourglass-spinner'; }

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

  get color() { return `var(--hourglass-spinner__color, ${this.props.color})`; }

  get size() { return `var(--hourglass-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .lds-hourglass {
        display: inline-block;
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .lds-hourglass-after {
        animation: lds-hourglass 1.2s infinite;
        border-color: ${this.color} transparent ${this.color} transparent;
        border-radius: 50%;
        border-style: solid;
        border-width: calc(${this.size} * 0.4);
        box-sizing: border-box;
        content: " ";
        display: block;
        height: 0;
        margin: 8px;
        width: 0;
      }

      @keyframes lds-hourglass {
        0% {
          animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
          transform: rotate(0);
        }

        50% {
          animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          transform: rotate(900deg);
        }

        100% {
          transform: rotate(1800deg);
        }
      }
    `;
  }

  template() {
    return `
      <div class="lds-hourglass">
        <div class="lds-hourglass-after"></div>
      </div>
    `;
  }
}

customElements.define(HourglassSpinner.is, HourglassSpinner);
