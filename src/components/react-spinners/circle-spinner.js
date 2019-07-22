import SpinnerElement from '../../SpinnerElement.js';

export class CircleSpinner extends SpinnerElement {
  static get is() { return 'circle-spinner'; }

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

  calculateCircle(i) {
    const { size } = this.props;

    return `
      animation-delay: ${i * 0.2}s;
      height: calc(var(--circle-loader__size, ${size}px) * ${1 - i / 10});
      left: ${i * 0.7 * 2.5}%;
      top: ${i * 0.35 * 2.5}%;
      width: calc(var(--circle-loader__size, ${size}px) * ${1 - i / 10});
    `;
  }

  style({ color, size }) {
    return `
      .circle-spinner {
        height: var(--circle-loader__size, ${size}px);
        position: relative;
        width: var(--circle-loader__size, ${size}px);
      }

      .circle {
        animation-fill-mode: "";
        animation: circle 1s infinite linear;
        border-top-color: var(--circle-spinner__color, ${color});
        border-left-color: var(--circle-spinner__color, ${color});
        border-radius: 100%;
        border-style: solid none none solid;
        border-width: 1px 1px;
        position: absolute;
        transition: all 2s ease 0s;
      }

      .circle:nth-child(1) { ${this.calculateCircle(0)} }
      .circle:nth-child(2) { ${this.calculateCircle(1)} }
      .circle:nth-child(3) { ${this.calculateCircle(2)} }
      .circle:nth-child(4) { ${this.calculateCircle(3)} }
      .circle:nth-child(5) { ${this.calculateCircle(4)} }

      @keyframes circle {
        0%   { transform: rotate(0deg); }
        50%  { transform: rotate(180deg); }
        100% { transform: rotate(360deg); }
      }
    `;
  }

  template() {
    return `
      <div class="circle-spinner">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    `;
  }
}

customElements.define(CircleSpinner.is, CircleSpinner);
