import SpinnerElement from '../../SpinnerElement.js';

export class BarSpinner extends SpinnerElement {
  static get is() { return 'bar-spinner'; }

  static get defaults() {
    return {
      color: '#36d7b7',
      height: 4,
      width: 100,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'height',
      'width',
    ];
  }

  get color() { return `var(--bar-spinner__color, ${this.props.color})`; }

  get height() { return `var(--bar-spinner__height, ${this.props.height}px)`; }

  get width() { return `var(--bar-spinner__width, ${this.props.width}px)`; }

  style() {
    return `
      .bar-spinner {
        height: ${this.height};
        overflow: hidden;
        position: relative;
        width: ${this.width};
      }

      .background {
        background-color: ${this.color};
        height: ${this.height};
        opacity: 0.2;
        position: absolute;
        width: ${this.width};
      }

      .long {
        animation-fill-mode: forwards;
        animation: long 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
        background-color: ${this.color};
        border-radius: 2px;
        height: ${this.height};
        position: absolute;
        will-change: left, right;
      }

      .short {
        animation-fill-mode: forwards;
        animation: short 2.1s 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        background-color: ${this.color};
        border-radius: 2px;
        height: ${this.height};
        position: absolute;
        will-change: left, right;
      }

      @keyframes long {
        0%   { left: -35%; right: 100% }
        60%  { left: 100%; right: -90% }
        100% { left: 100%; right: -90% }
      }

      @keyframes short {
        0%   { left: -200%; right: 100% }
        60%  { left: 107%; right: -8% }
        100% { left: 107%; right: -8% }
      }
    `;
  }

  template() {
    return `
      <div class="bar-spinner">
        <div class="background"></div>
        <div class="long"></div>
        <div class="short"></div>
      </div>
    `;
  }
}

customElements.define(BarSpinner.is, BarSpinner);
