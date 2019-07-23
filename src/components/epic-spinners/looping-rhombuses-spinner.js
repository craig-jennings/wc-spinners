import SpinnerElement from '../SpinnerElement.js';

export class LoopingRhombusesSpinner extends SpinnerElement {
  static get is() { return 'looping-rhombuses-spinner'; }

  static get defaults() {
    return {
      color: '#ff1d5e',
      duration: 2.5,
      size: 15,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'duration',
      'size',
    ];
  }

  get color() { return `var(--looping-rhombuses-spinner__color, ${this.props.color})`; }

  get duration() { return `var(--looping-rhombuses-spinner__duration, ${this.props.duration}s)`; }

  get size() { return `var(--looping-rhombuses-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .looping-rhombuses-spinner {
        height: ${this.size};
        position: relative;
        width: calc(${this.size} * 4);
      }

      .looping-rhombuses-spinner .rhombus {
        animation: looping-rhombuses-spinner-animation ${this.duration} linear infinite;
        background-color: ${this.color};
        border-radius: 2px;
        height: ${this.size};
        left: calc(${this.size} * 4);
        margin: 0 auto;
        position: absolute;
        transform: translateY(0) rotate(45deg) scale(0);
        width: ${this.size};
      }

      .looping-rhombuses-spinner .rhombus:nth-child(1) {
        animation-delay: calc(${this.duration} * 1 / -1.5);
      }

      .looping-rhombuses-spinner .rhombus:nth-child(2) {
        animation-delay: calc(${this.duration} * 2 / -1.5);
      }

      .looping-rhombuses-spinner .rhombus:nth-child(3) {
        animation-delay: calc(${this.duration} * 3 / -1.5);
      }

      @keyframes looping-rhombuses-spinner-animation {
        0%   { transform: translateX(0)     rotate(45deg) scale(0); }
        50%  { transform: translateX(-233%) rotate(45deg) scale(1); }
        100% { transform: translateX(-466%) rotate(45deg) scale(0); }
      }
    `;
  }

  template() {
    return `
      <div class="looping-rhombuses-spinner">
        <div class="rhombus"></div>
        <div class="rhombus"></div>
        <div class="rhombus"></div>
      </div>
    `;
  }
}

customElements.define(LoopingRhombusesSpinner.is, LoopingRhombusesSpinner);
