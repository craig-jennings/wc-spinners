import SpinnerElement from '../SpinnerElement.js';

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

  get color() { return `var(--scaling-squares-spinner__color, ${this.props.color})`; }

  get duration() { return `var(--scaling-squares-spinner__duration, ${this.props.duration}s)`; }

  get size() { return `var(--scaling-squares-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .scaling-squares-spinner {
        align-items: center;
        animation: scaling-squares-animation ${this.duration} infinite;
        display: flex;
        flex-direction: row;
        height: ${this.size};
        justify-content: center;
        position: relative;
        transform: rotate(0deg);
        width: ${this.size};
      }

      .scaling-squares-spinner .square {
        animation-duration: ${this.duration};
        animation-iteration-count: infinite;
        border: calc(${this.size} * 0.04 / 1.3) solid ${this.color};
        height: calc(${this.size} * 0.25 / 1.3);
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        width: calc(${this.size} * 0.25 / 1.3);
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
