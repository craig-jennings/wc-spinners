import SpinnerElement from '../../SpinnerElement.js';

export class SquareSpinner extends SpinnerElement {
  static get is() { return 'square-spinner'; }

  static get defaults() {
    return {
      color: '#36d7b7',
      size: 50,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'size',
    ];
  }

  get color() { return `var(--square-spinner__color, ${this.props.color})`; }

  get size() { return `var(--square-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .square-spinner {
        animation-fill-mode: both;
        animation: square 3s 0s infinite cubic-bezier(0.09, 0.57, 0.49, 0.9);
        background-color: ${this.color};
        display: inline-block;
        height: ${this.size};
        width: ${this.size};
      }

      @keyframes square {
        25%  { transform: rotateX(180deg) rotateY(0); }
        50%  { transform: rotateX(180deg) rotateY(180deg); }
        75%  { transform: rotateX(0)      rotateY(180deg); }
        100% { transform: rotateX(0)      rotateY(0); }
      }
    `;
  }

  template() {
    return `
      <div class="square-spinner"></div>
    `;
  }
}

customElements.define(SquareSpinner.is, SquareSpinner);
