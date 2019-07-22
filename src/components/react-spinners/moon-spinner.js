import SpinnerElement from '../../SpinnerElement.js';

export class MoonSpinner extends SpinnerElement {
  static get is() { return 'moon-spinner'; }

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

  get color() { return `var(--moon-spinner__color, ${this.props.color})`; }

  get moonSize() { return `calc(${this.size} / 7)`; }

  get size() { return `var(--moon-spinner__size, ${this.props.size}px)`; }

  ballStyle(size) {
    return `
      border-radius: 100%;
      height: ${size};
      width: ${size};
    `;
  }

  style() {
    return `
      .moon-spinner {
        animation-fill-mode: forwards;
        animation: moon 0.6s 0s infinite linear;
        height: calc(${this.size} + ${this.moonSize} * 2);
        position: relative;
        width: calc(${this.size} + ${this.moonSize} * 2);
      }

      .ball {
        ${this.ballStyle(this.moonSize)};
        animation-fill-mode: forwards;
        animation: moon 0.6s 0s infinite linear;
        background-color: ${this.color};
        opacity: 0.8;
        position: absolute;
        top: calc(${this.size} / 2 - ${this.moonSize} / 2);
      }

      .circle {
        ${this.ballStyle(this.size)};
        border: ${this.moonSize} solid ${this.color};
        box-sizing: content-box;
        opacity: 0.1;
      }

      @keyframes moon {
        100% { transform: rotate(360deg); }
      }
    `;
  }

  template() {
    return `
      <div class="moon-spinner">
        <div class="ball"></div>
        <div class="circle"></div>
      </div>
    `;
  }
}

customElements.define(MoonSpinner.is, MoonSpinner);
