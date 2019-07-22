import SpinnerElement from '../../SpinnerElement.js';

export class FadeSpinner extends SpinnerElement {
  static get is() { return 'fade-spinner'; }

  static get defaults() {
    return {
      color: '#36d7b7',
      height: 15,
      radius: 10,
      width: 5,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'height',
      'radius',
      'width',
    ];
  }

  get color() { return `var(--fade-spinner__color, ${this.props.color})`; }

  get height() { return `var(--fade-spinner__height, ${this.props.height}px)`; }

  get radius() { return `var(--fade-spinner__radius, ${this.props.radius}px)`; }

  get width() { return `var(--fade-spinner__width, ${this.props.width}px)`; }

  get center() { return `calc(${this.radius} + ${this.height})`; }

  buildLine(i) {
    return `
      .container:nth-child(${i}) { transform: rotate(${(i - 1) * 45}deg); }
      .container:nth-child(${i}) .line { animation-delay: calc(${i - 1} * .12s); }
    `;
  }

  style() {
    return `
      .fade-spinner {
        font-size: 0;
        height: calc(${this.center} * 2);
        width: calc(${this.center} * 2);
        position: relative;
      }

      .container {
        height: calc(${this.center} * 2);
        width: ${this.width};
        position: absolute;
        top: 0;
        left: calc(${this.center} - ${this.width} / 2);
      }

      .line {
        animation-fill-mode: both;
        animation: fade 1.2s infinite ease-in-out;
        background-color: ${this.color};
        border-radius: 4px;
        height: ${this.height};
        transition: 2s;
        width: ${this.width};
      }

      ${this.buildLine(1)}
      ${this.buildLine(2)}
      ${this.buildLine(3)}
      ${this.buildLine(4)}
      ${this.buildLine(5)}
      ${this.buildLine(6)}
      ${this.buildLine(7)}
      ${this.buildLine(8)}

      @keyframes fade {
        50%  { opacity: 0.3; }
        100% { opacity: 1; }
      }
    `;
  }

  template() {
    return `
      <div class="fade-spinner">
        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>

        <div class="container">
          <div class="line"></div>
        </div>
      </div>
    `;
  }
}

customElements.define(FadeSpinner.is, FadeSpinner);
