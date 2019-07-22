import SpinnerElement from '../SpinnerElement.js';

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

  style() {
    const { color, size } = this.props;

    return `
      .clip-spinner {
        animation-fill-mode: both;
        animation: clip 0.75s 0s infinite linear;
        background: transparent !important;
        border-bottom-color: transparent;
        border-left-color: var(--clip-spinner__color, ${color});
        border-radius: 100%;
        border-right-color: var(--clip-spinner__color, ${color});
        border-style: solid;
        border-top-color: var(--clip-spinner__color, ${color});
        border-width: 2px;
        height: var(--clip-spinner__size, ${size}px);
        width: var(--clip-spinner__size, ${size}px);
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
