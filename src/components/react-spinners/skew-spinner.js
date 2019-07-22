import SpinnerElement from '../../SpinnerElement.js';

export class SkewSpinner extends SpinnerElement {
  static get is() { return 'skew-spinner'; }

  static get defaults() {
    return {
      color: '#36d7b7',
      size: 20,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'size',
    ];
  }

  get color() { return `var(--skew-spinner__color, ${this.props.color})`; }

  get size() { return `var(--skew-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .skew-spinner {
        animation-fill-mode: both;
        animation: skew 3s 0s infinite cubic-bezier(0.09, 0.57, 0.49, 0.9);
        border-bottom: ${this.size} solid ${this.color};
        border-left: ${this.size} solid transparent;
        border-right: ${this.size} solid transparent;
        display: inline-block;
        height: 0;
        width: 0;
      }

      @keyframes skew {
        25%  { transform: perspective(100px) rotateX(180deg) rotateY(0); }
        50%  { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
        75%  { transform: perspective(100px) rotateX(0)      rotateY(180deg); }
        100% { transform: perspective(100px) rotateX(0)      rotateY(0); }
      }
    `;
  }

  template() {
    return `
      <div class="skew-spinner"></div>
    `;
  }
}

customElements.define(SkewSpinner.is, SkewSpinner);
