import SpinnerElement from '../../SpinnerElement.js';

export class HashSpinner extends SpinnerElement {
  static get is() { return 'hash-spinner'; }

  static get defaults() {
    return {
      color: '#36d7b7',
      size: 50,
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

    const _color = `var(--hash-spinner__color, ${color})`;
    const _size = `var(--hash-spinner__size, ${size}px)`;

    const _thickness = `calc(${_size} / 5)`;

    const _lat = `calc(calc(${_size} - ${_thickness}) / 2)`;

    const _offset = `calc(${_lat} - ${_thickness})`;

    return `
      .hash-spinner {
        height: ${_size};
        position: relative;
        transform: rotate(165deg);
        width: ${_size};
      }

      .hash {
        animation-duration: 2s;
        animation-fill-mode: none;
        animation-iteration-count: infinite;
        border-radius: calc(${_size} / 10);
        content: "";
        display: block;
        height: calc(${_size} / 5);
        left: 50%;
        opacity: .9;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: calc(${_size} / 5);
      }

      .hash:nth-child(1) { animation-name: before; }
      .hash:nth-child(2) { animation-name: after; }

      @keyframes before {
        0% {
          box-shadow: ${_lat} calc(${_offset} * -1) ${_color},
                      calc(${_lat} * -1) ${_offset} ${_color};
          width: ${_thickness};
        }

        35% {
          box-shadow: 0 calc(${_offset} * -1) ${_color},
                      0 ${_offset} ${_color};
          width: ${_size};
        }

        70% {
          box-shadow: calc(${_lat} * -1) calc(${_offset} * -1) ${_color},
                      ${_lat} ${_offset} ${_color};
          width: ${_thickness};
        }

        100% {
          box-shadow: ${_lat} calc(${_offset} * -1) ${_color},
                      calc(${_lat} * -1) ${_offset} ${_color};
        }
      }

      @keyframes after {
        0% {
          box-shadow: ${_offset} ${_lat} ${_color},
                      calc(${_offset} * -1) calc(${_lat} * -1) ${_color};
          height: ${_thickness};
        }

        35% {
          box-shadow: ${_offset} 0 ${_color},
                      calc(${_offset} * -1) 0 ${_color};
          height: ${_size};
        }

        70% {
          box-shadow: ${_offset} calc(${_lat} * -1) ${_color},
                      calc(${_offset} * -1) ${_lat} ${_color};
          height: ${_thickness};
        }

        100% {
          box-shadow: ${_offset} ${_lat} ${_color},
                      calc(${_offset} * -1) calc(${_lat} * -1) ${_color};
        }
      }
    `;
  }

  template() {
    return `
      <div class="hash-spinner">
        <div class="hash"></div>
        <div class="hash"></div>
      </div>
    `;
  }
}

customElements.define(HashSpinner.is, HashSpinner);
