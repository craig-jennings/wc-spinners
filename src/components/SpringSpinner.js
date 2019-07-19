import SpinnerElement from '../SpinnerElement.js';

export class SpringSpinner extends SpinnerElement {
  static get is() { return 'spring-spinner'; }

  static get defaults() {
    return {
      color: '#ff1d5e',
      duration: 3,
      size: 60,
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
      .spring-spinner {
        height: var(--spring-spinner-size, ${size}px);
        width: var(--spring-spinner-size, ${size}px);
      }

      .spring-spinner .spring-spinner-part {
        height: calc(var(--spring-spinner-size, ${size}px) / 2);
        overflow: hidden;
        width: var(--spring-spinner-size, ${size}px);
      }

      .spring-spinner  .spring-spinner-part.bottom {
          transform: rotate(180deg) scale(-1, 1);
      }

      .spring-spinner .spring-spinner-rotator {
        animation: spring-spinner-animation var(--spring-spinner-duration, ${duration}s) ease-in-out infinite;
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-radius: 50%;
        border-right-color: var(--spring-spinner-color, ${color});
        border-style: solid;
        border-top-color: var(--spring-spinner-color, ${color});
        border-width: calc(var(--spring-spinner-size, ${size}px) / 7);
        height: var(--spring-spinner-size, ${size}px);
        transform: rotate(-200deg);
        width: var(--spring-spinner-size, ${size}px);
      }

      @keyframes spring-spinner-animation {
        0% {
          border-width: calc(var(--spring-spinner-size, ${size}px) / 7);
        }

        25% {
          border-width: calc(var(--spring-spinner-size, ${size}px) / 23.33);
        }

        50% {
          transform: rotate(115deg);
          border-width: calc(var(--spring-spinner-size, ${size}px) / 7);
        }

        75% {
          border-width: calc(var(--spring-spinner-size, ${size}px) / 23.33);
        }

        100% {
          border-width: calc(var(--spring-spinner-size, ${size}px) / 7);
        }
      }
    `;
  }

  template() {
    return `
      <div class="spring-spinner">
        <div class="spring-spinner-part top">
          <div class="spring-spinner-rotator"></div>
        </div>

        <div class="spring-spinner-part bottom">
          <div class="spring-spinner-rotator"></div>
        </div>
      </div>
    `;
  }
}

customElements.define(SpringSpinner.is, SpringSpinner);
