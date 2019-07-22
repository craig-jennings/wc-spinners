import SpinnerElement from '../SpinnerElement.js';

export class BounceSpinner extends SpinnerElement {
  static get is() { return 'bounce-spinner'; }

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

  style({ color, size }) {
    return `
      .bounce-spinner {
        height: var(--bounce-loader__size, ${size}px);
        position: relative;
        width: var(--bounce-loader__size, ${size}px);
      }

      .bounce {
        animation-fill-mode: both;
        animation: bounce 2.1s infinite ease-in-out;
        background-color: var(--bounce-loader__color, ${color});
        border-radius: 100%;
        height: var(--bounce-loader__size, ${size}px);
        left: 0;
        opacity: 0.6;
        position: absolute;
        top: 0;
        width: var(--bounce-loader__size, ${size}px);
      }

      .bounce:nth-child(1) { animation-delay: 1s; }
      .bounce:nth-child(2) { animation-delay: 0s; }

      @keyframes bounce {
        0%   { transform: scale(0); }
        50%  { transform: scale(1.0); }
        100% { transform: scale(0); }
      }
    `;
  }

  template() {
    return `
      <div class="bounce-spinner">
        <div class="bounce"></div>
        <div class="bounce"></div>
      </div>
    `;
  }
}

customElements.define(BounceSpinner.is, BounceSpinner);
