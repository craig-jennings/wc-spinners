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

  style() {
    const { color, height, width } = this.props;

    return `
      .bar-spinner {
        height: var(--bar-spinner__height, ${height}px);
        overflow: hidden;
        position: relative;
        width: var(--bar-spinner__width, ${width}px);
      }

      .background {
        background-color: var(--bar-spinner__color, ${color});
        height: var(--bar-spinner__height, ${height}px);
        opacity: 0.2;
        position: absolute;
        width: var(--bar-spinner__width, ${width}px);
      }

      .long {
        animation-fill-mode: forwards;
        animation: long 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
        background-color: var(--bar-spinner__color, ${color});
        border-radius: 2px;
        height: var(--bar-spinner__height, ${height}px);
        position: absolute;
        will-change: left, right;
      }

      .short {
        animation-fill-mode: forwards;
        animation: short 2.1s 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        background-color: var(--bar-spinner__color, ${color});
        border-radius: 2px;
        height: var(--bar-spinner__height, ${height}px);
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
