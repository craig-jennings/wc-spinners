import SpinnerElement from '../SpinnerElement.js';

export class MoonSpinner extends SpinnerElement {
  static get is() { return 'moon-spinner'; }

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

  ballStyle(size) {
    return `
      border-radius: 100%;
      height: ${size};
      width: ${size};
    `;
  }

  style() {
    const { color, size } = this.props;

    const _color = `var(--moon-spinner__color, ${color})`;
    const _size = `var(--moon-spinner__size, ${size}px)`;

    const moonSize = `calc(${_size} / 7)`;

    return `
      .moon-spinner {
        animation-fill-mode: forwards;
        animation: moon 0.6s 0s infinite linear;
        height: calc(${_size} + ${moonSize} * 2);
        position: relative;
        width: calc(${_size} + ${moonSize} * 2);
      }

      .ball {
        ${this.ballStyle(moonSize)};
        animation-fill-mode: forwards;
        animation: moon 0.6s 0s infinite linear;
        background-color: ${_color};
        opacity: 0.8;
        position: absolute;
        top: calc(${_size} / 2 - ${moonSize} / 2);
      }

      .circle {
        ${this.ballStyle(_size)};
        border: ${moonSize} solid ${_color};
        box-sizing: content-box;
        opacity: 0.1;
      }

      @keyframes moon {
        100% { transform: rotate(360deg); }
      }
    `;
  }

  template() {
    return `
      <div class="moon-spinner">
        <div class="ball"></div>
        <div class="circle"></div>
      </div>
    `;
  }
}

customElements.define(MoonSpinner.is, MoonSpinner);
