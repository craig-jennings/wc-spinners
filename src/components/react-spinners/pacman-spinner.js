import SpinnerElement from '../../SpinnerElement.js';

export class PacmanSpinner extends SpinnerElement {
  static get is() { return 'pacman-spinner'; }

  static get defaults() {
    return {
      color: '#36d7b7',
      margin: 2,
      size: 25,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'margin',
      'size',
    ];
  }

  ballDelay(factor) {
    return `animation-delay: ${factor * 0.25}s;`;
  }

  style() {
    const { color, margin, size } = this.props;

    const _color = `var(--pacman-spinner__color, ${color})`;
    const _size = `var(--pacman-spinner__size, ${size}px)`;
    const _margin = `var(--pacman-spinner__margin, ${margin}px)`;

    return `
      .pacman-spinner {
        font-size: 0;
        height: calc(${_size} * 2);
        position: relative;
        width: calc(${_size} * 2);
      }

      .pacman-top {
        animation-fill-mode: both;
        animation: pacman1 0.8s infinite ease-in-out;
        border-bottom: ${_size} solid ${_color};
        border-left: ${_size} solid ${_color};
        border-radius: ${_size};
        border-right: ${_size} solid transparent;
        border-top: ${_size} solid transparent;
        height: 0;
        position: absolute;
        width: 0;
      }

      .pacman-bottom {
        animation-fill-mode: both;
        animation: pacman2 0.8s infinite ease-in-out;
        border-bottom: ${_size} solid transparent;
        border-left: ${_size} solid ${color};
        border-radius: ${_size};
        border-right: ${_size} solid transparent;
        border-top: ${_size} solid ${color};
        height: 0;
        position: absolute;
        width: 0;
      }

      .ball {
        animation-fill-mode: both;
        animation: ball 1s infinite linear;
        background-color: ${color};
        border-radius: 100%;
        height: calc(${_size} / 2.5);
        left: calc(${_size} * 4);
        margin: ${_margin};
        position: absolute;
        top: ${_size};
        transform: translate(0, calc(${_size} / -4));
        width: calc(${_size} / 2.5);
      }

      .ball:nth-child(3) { ${this.ballDelay(-3)} }
      .ball:nth-child(4) { ${this.ballDelay(-2)} }
      .ball:nth-child(5) { ${this.ballDelay(-1)} }
      .ball:nth-child(6) { ${this.ballDelay(0)} }

      @keyframes ball {
        75%  { opacity: 0.7; }

        100% {
          transform: translate(calc(${_size} * -4), calc(${_size} / -4));
        }
      }

      @keyframes pacman1 {
        0%  { transform: rotate(0deg); }
        50% { transform: rotate(-44deg); }
      }

      @keyframes pacman2 {
        0%  { transform: rotate(0deg); }
        50% { transform: rotate(44deg); }
      }
    `;
  }

  template() {
    return `
      <div class="pacman-spinner">
        <div class="pacman-top"></div>
        <div class="pacman-bottom"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
        <div class="ball"></div>
      </div>
    `;
  }
}

customElements.define(PacmanSpinner.is, PacmanSpinner);
