import SpinnerElement from '../../SpinnerElement.js';

// TODO: Fix positioning (not centered)
export class FadeSpinner extends SpinnerElement {
  static get is() { return 'fade-spinner'; }

  static get defaults() {
    return {
      color: '#36d7b7',
      height: 15,
      margin: 2,
      radius: 20,
      width: 5,
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

  style() {
    const { color, height, margin, radius, width } = this.props; // eslint-disable-line object-curly-newline

    const _radius = `var(--fade-spinner__radius, ${radius}px)`;
    const quarter = `calc(${_radius} / 2 + ${_radius} / 5.5)`;

    return `
      .fade-spinner {
        font-size: 0;
        height: calc(${_radius} * 3);
        left: ${_radius};
        position: relative;
        top: ${_radius};
        width: calc(${_radius} * 3);
      }

      .line {
        animation-fill-mode: both;
        animation: fade 1.2s infinite ease-in-out;
        background-color: var(--fade-spinner__color, ${color});
        border-radius: ${_radius};
        height: var(--fade-spinner__height, ${height}px);
        margin: var(--fade-spinner__margin, ${margin}px);
        position: absolute;
        transition: 2s;
        width: var(--fade-spinner__width, ${width}px);
      }

      .line:nth-child(1) {
        animation-delay: 0s;
        left: 0;
        top: ${_radius};
      }

      .line:nth-child(2) {
        animation-delay: calc(.12s * 1);
        left: ${quarter};
        top: ${quarter};
        transform: rotate(-45deg);
      }

      .line:nth-child(3) {
        animation-delay: calc(.12s * 2);
        left: ${_radius};
        top: 0;
        transform: rotate(90deg);
      }

      .line:nth-child(4) {
        animation-delay: calc(.12s * 3);
        left: ${quarter};
        top: calc(${quarter} * -1);
        transform: rotate(45deg);
      }

      .line:nth-child(5) {
        animation-delay: calc(.12s * 4);
        left: 0;
        top: calc(${_radius} * -1);
      }

      .line:nth-child(6) {
        animation-delay: calc(.12s * 5);
        left: calc(${quarter} * -1);
        top: calc(${quarter} * -1);
        transform: rotate(-45deg);
      }

      .line:nth-child(7) {
        animation-delay: calc(.12s * 6);
        left: calc(${_radius} * -1);
        top: 0;
        transform: rotate(90deg);
      }

      .line:nth-child(8) {
        animation-delay: calc(.12s * 7);
        left: calc(${quarter} * -1);
        top: ${quarter};
        transform: rotate(45deg);
      }

      @keyframes fade {
        50%  { opacity: 0.3; }
        100% { opacity: 1; }
      }
    `;
  }

  template() {
    return `
      <div class="fade-spinner">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    `;
  }
}

customElements.define(FadeSpinner.is, FadeSpinner);
