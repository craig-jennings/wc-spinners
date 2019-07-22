import SpinnerElement from '../../SpinnerElement.js';

export class ScaleSpinner extends SpinnerElement {
  static get is() { return 'scale-spinner'; }

  static get defaults() {
    return {
      color: '#36d7b7',
      height: 35,
      margin: 2,
      radius: 2,
      width: 4,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'height',
      'margin',
      'radius',
      'width',
    ];
  }

  get color() { return `var(--scale-spinner__color, ${this.props.color})`; }

  get height() { return `var(--scale-spinner__height, ${this.props.height}px)`; }

  get margin() { return `var(--scale-spinner__margin, ${this.props.margin}px)`; }

  get radius() { return `var(--scale-spinner__radius, ${this.props.radius}px)`; }

  get width() { return `var(--scale-spinner__width, ${this.props.width}px)`; }

  get size() { return `var(--scale-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .scale-spinner {
        animation-fill-mode: both;
        animation: rotate 1s 0s infinite cubic-bezier(0.7, -0.13, 0.22, 0.86);
        display: flex;
        position: relative;
      }

      .line {
        animation-fill-mode: both;
        animation: scale 1s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
        background-color: ${this.color};
        border-radius: ${this.radius};
        display: inline-block;
        height: ${this.height};
        margin: ${this.margin};
        width: ${this.width};
      }

      .line:nth-child(1) { animation-delay: 0.1s; }
      .line:nth-child(2) { animation-delay: 0.2s; }
      .line:nth-child(3) { animation-delay: 0.3s; }
      .line:nth-child(4) { animation-delay: 0.4s; }
      .line:nth-child(5) { animation-delay: 0.5s; }

      @keyframes scale {
        0%   { transform: scaley(1.0); }
        50%  { transform: scaley(0.4); }
        100% { transform: scaley(1.0); }
      }
    `;
  }

  template() {
    return `
      <div class="scale-spinner">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    `;
  }
}

customElements.define(ScaleSpinner.is, ScaleSpinner);
