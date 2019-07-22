import SpinnerElement from '../../SpinnerElement.js';

export class ScalingSquaresSpinner extends SpinnerElement {
  static get is() { return 'scaling-squares-spinner'; }

  static get defaults() {
    return {
      color: '#ff1d5e',
      duration: 1.25,
      size: 65,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'duration',
      'size',
    ];
  }

  style({ color, duration, size }) {
    return `
      .scaling-squares-spinner {
        align-items: center;
        animation: scaling-squares-animation var(--scaling-squares-spinner__duration, ${duration}s) infinite;
        display: flex;
        flex-direction: row;
        height: var(--scaling-squares-spinner__size, ${size}px);
        justify-content: center;
        position: relative;
        transform: rotate(0deg);
        width: var(--scaling-squares-spinner__size, ${size}px);
      }

      .scaling-squares-spinner .square {
        animation-duration: var(--scaling-squares-spinner__duration, ${duration}s);
        animation-iteration-count: infinite;
        border: calc(var(--scaling-squares-spinner__size, ${size}px) * 0.04 / 1.3) solid var(--scaling-squares-spinner__color, ${color});
        height: calc(var(--scaling-squares-spinner__size, ${size}px) * 0.25 / 1.3);
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        width: calc(var(--scaling-squares-spinner__size, ${size}px) * 0.25 / 1.3);
      }

      .scaling-squares-spinner .square:nth-child(1) {
        animation-name: scaling-squares-spinner-animation-child-1;
      }

      .scaling-squares-spinner .square:nth-child(2) {
        animation-name: scaling-squares-spinner-animation-child-2;
      }

      .scaling-squares-spinner .square:nth-child(3) {
        animation-name: scaling-squares-spinner-animation-child-3;
      }

      .scaling-squares-spinner .square:nth-child(4) {
        animation-name: scaling-squares-spinner-animation-child-4;
      }

      @keyframes scaling-squares-animation {
        50%  { transform: rotate(90deg); }
        100% { transform: rotate(180deg); }
      }

      @keyframes scaling-squares-spinner-animation-child-1 {
        50% { transform: translate(150%,150%) scale(2,2); }
      }

      @keyframes scaling-squares-spinner-animation-child-2 {
        50% { transform: translate(-150%,150%) scale(2,2); }
      }

      @keyframes scaling-squares-spinner-animation-child-3 {
        50% { transform: translate(-150%,-150%) scale(2,2); }
      }

      @keyframes scaling-squares-spinner-animation-child-4 {
        50% { transform: translate(150%,-150%) scale(2,2); }
      }
    `;
  }

  template() {
    return `
      <div class="scaling-squares-spinner">
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
      </div>
    `;
  }
}

customElements.define(ScalingSquaresSpinner.is, ScalingSquaresSpinner);
