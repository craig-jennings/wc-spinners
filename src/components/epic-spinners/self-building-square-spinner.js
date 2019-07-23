import SpinnerElement from '../SpinnerElement.js';

export class SelfBuildingSquareSpinner extends SpinnerElement {
  static get is() { return 'self-building-square-spinner'; }

  static get defaults() {
    return {
      color: '#ff1d5e',
      duration: 6,
      size: 10,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'duration',
      'size',
    ];
  }

  get color() { return `var(--self-building-square-spinner__color, ${this.props.color})`; }

  get duration() { return `var(--self-building-square-spinner__duration, ${this.props.duration}s)`; }

  get size() { return `var(--self-building-square-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .self-building-square-spinner {
        height: calc(${this.size} * 4);
        top: calc(${this.size} * 2 / 3);
        width: calc(${this.size} * 4);
      }
      .self-building-square-spinner .square {
        animation: self-building-square-spinner ${this.duration} infinite;
        background: ${this.color};
        float: left;
        height: ${this.size};
        margin-right: calc(${this.size} / 3);
        margin-top: calc(${this.size} / 3);
        opacity: 0;
        position:relative;
        top: calc(${this.size} * -2 / 3);
        width: ${this.size};
      }

      .self-building-square-spinner .square:nth-child(1) {
        animation-delay: calc(${this.duration} / 20 * 6);
      }

      .self-building-square-spinner .square:nth-child(2) {
        animation-delay: calc(${this.duration} / 20 * 7);
      }

      .self-building-square-spinner .square:nth-child(3) {
        animation-delay: calc(${this.duration} / 20 * 8);
      }

      .self-building-square-spinner .square:nth-child(4) {
        animation-delay: calc(${this.duration} / 20 * 3);
      }

      .self-building-square-spinner .square:nth-child(5) {
        animation-delay: calc(${this.duration} / 20 * 4);
      }

      .self-building-square-spinner .square:nth-child(6) {
        animation-delay: calc(${this.duration} / 20 * 5);
      }

      .self-building-square-spinner .square:nth-child(7) {
        animation-delay: calc(${this.duration} / 20 * 0);
      }

      .self-building-square-spinner .square:nth-child(8) {
        animation-delay: calc(${this.duration} / 20 * 1);
      }

      .self-building-square-spinner .square:nth-child(9) {
        animation-delay: calc(${this.duration} / 20 * 2);
      }

      .self-building-square-spinner .clear {
        clear: both;
      }

      @keyframes self-building-square-spinner {
        0% {
          opacity: 0;
        }

        5% {
          opacity: 1;
          top: 0;
        }

        50.9% {
          opacity: 1;
          top: 0;
        }

        55.9% {
          opacity: 0;
          top: inherit;
        }
      }
    `;
  }

  template() {
    return `
      <div class="self-building-square-spinner">
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square clear"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square clear"></div>
        <div class="square"></div>
        <div class="square"></div>
      </div>
    `;
  }
}

customElements.define(SelfBuildingSquareSpinner.is, SelfBuildingSquareSpinner);
