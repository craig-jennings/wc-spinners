import SpinnerElement from '../../SpinnerElement.js';

export class PixelSpinner extends SpinnerElement {
  static get is() { return 'pixel-spinner'; }

  static get defaults() {
    return {
      color: '#ff1d5e',
      duration: 2,
      size: 70,
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
      .pixel-spinner {
        align-items: center;
        display: flex;
        flex-direction: row;
        height: var(--pixel-spinner__size, ${size}px);
        justify-content: center;
        width: var(--pixel-spinner__size, ${size}px);
      }

      .pixel-spinner .pixel-spinner-inner {
        animation: pixel-spinner-animation var(--pixel-spinner__duration, ${duration}s) linear infinite;
        background-color: var(--pixel-spinner__color, ${color});
        box-shadow: 15px 15px  0 0,
                    -15px -15px  0 0,
                    15px -15px  0 0,
                    -15px 15px  0 0,
                    0 15px  0 0,
                    15px 0  0 0,
                    -15px 0  0 0,
                    0 -15px 0 0;
        color: var(--pixel-spinner__color, ${color});
        height: calc(var(--pixel-spinner__size, ${size}px) / 7);
        width: calc(var(--pixel-spinner__size, ${size}px) / 7);
      }

      @keyframes pixel-spinner-animation {
        50% {
          box-shadow: 20px 20px 0px 0px,
                      -20px -20px 0px 0px,
                      20px -20px 0px 0px,
                      -20px 20px 0px 0px,
                      0px 10px 0px 0px,
                      10px 0px 0px 0px,
                      -10px 0px 0px 0px,
                      0px -10px 0px 0px;
        }

        75% {
          box-shadow: 20px 20px 0px 0px,
                      -20px -20px 0px 0px,
                      20px -20px 0px 0px,
                      -20px 20px 0px 0px,
                      0px 10px 0px 0px,
                      10px 0px 0px 0px,
                      -10px 0px 0px 0px,
                      0px -10px 0px 0px;
        }

        100% {
          transform: rotate(360deg);
        }
      }
    `;
  }

  template() {
    return `
      <div class="pixel-spinner">
        <div class="pixel-spinner-inner"></div>
      </div>
    `;
  }
}

customElements.define(PixelSpinner.is, PixelSpinner);
