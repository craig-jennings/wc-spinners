import SpinnerElement from '../../SpinnerElement.js';

export class ClipSpinner extends SpinnerElement {
  static get is() { return 'clip-spinner'; }

  static get defaults() {
    return {
      color: '#36d7b7',
      size: 35,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'size',
    ];
  }

  get color() { return `var(--clip-spinner__color, ${this.props.color})`; }

  get size() { return `var(--clip-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .clip-spinner {
        animation-fill-mode: both;
        animation: clip 0.75s 0s infinite linear;
        background: transparent !important;
        border-bottom-color: transparent;
        border-left-color: ${this.color};
        border-radius: 100%;
        border-right-color: ${this.color};
        border-style: solid;
        border-top-color: ${this.color};
        border-width: 2px;
        height: ${this.size};
        width: ${this.size};
      }

      @keyframes clip {
        0%   { transform: rotate(0deg)   scale(1); }
        50%  { transform: rotate(180deg) scale(0.8); }
        100% { transform: rotate(360deg) scale(1); }
      }
    `;
  }

  template() {
    return `
      <div class="clip-spinner"></div>
    `;
  }
}

customElements.define(ClipSpinner.is, ClipSpinner);
