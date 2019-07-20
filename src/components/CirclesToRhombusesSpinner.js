import SpinnerElement from '../SpinnerElement.js';

export class CirclesToRhombusesSpinner extends SpinnerElement {
  static get is() { return 'circles-to-rhombuses-spinner'; }

  static get defaults() {
    return {
      color: '#ff1d5e',
      count: 3,
      duration: 1.2,
      size: 15,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'count',
      'duration',
      'size',
    ];
  }

  style({ color, count, duration, size }) { // eslint-disable-line object-curly-newline
    const circleStyles = [];

    for (let i = 2; i <= count; i++) {
      circleStyles.push(`
        .circles-to-rhombuses-spinner .circle:nth-child(${i}) {
          animation-delay: calc(var(--circles-to-rhombuses-spinner__duration, ${duration}s) / 8 * ${i});
        }
      `);
    }

    return `
      .circles-to-rhombuses-spinner, .circles-to-rhombuses-spinner * {
        box-sizing: border-box;
      }

      .circles-to-rhombuses-spinner {
        align-items: center;
        display: flex;
        height: var(--circles-to-rhombuses-spinner__size, ${size}px);
        justify-content: center
        width: calc((var(--circles-to-rhombuses-spinner__size, ${size}px) + var(--circles-to-rhombuses-spinner__size, ${size}px) * 1.125) * ${count});
      }

      .circles-to-rhombuses-spinner .circle {
        animation: circles-to-rhombuses-animation var(--circles-to-rhombuses-spinner__duration, ${duration}s) linear infinite;
        background: transparent;
        border-radius: 10%;
        border: 3px solid var(--circles-to-rhombuses-spinner__color, ${color});
        height: var(--circles-to-rhombuses-spinner__size, ${size}px);
        margin-left: calc(var(--circles-to-rhombuses-spinner__size, ${size}px) * 1.125);
        overflow: hidden;
        transform: rotate(45deg);
        width: var(--circles-to-rhombuses-spinner__size, ${size}px);
      }

      .circles-to-rhombuses-spinner .circle:nth-child(1) {
        animation-delay: calc(var(--circles-to-rhombuses-spinner__duration, ${duration}s) / 8 * 1);
        margin-left: 0;
      }

      ${circleStyles.join('')}

      @keyframes circles-to-rhombuses-animation {
        0% {
          border-radius: 10%;
        }
        17.5% {
          border-radius: 10%;
        }
        50% {
          border-radius: 100%;
        }
        93.5% {
          border-radius: 10%;
        }
        100% {
          border-radius: 10%;
        }
      }

      @keyframes circles-to-rhombuses-background-animation {
        50% {
          opacity: 0.4;
        }
      }
    `;
  }

  template({ count }) {
    const circles = [];

    for (let i = 2; i <= count; i++) {
      circles.push('<div class="circle"></div>');
    }

    return `
      <div class="circles-to-rhombuses-spinner">
        <div class="circle"></div>
        ${circles.join('')}
      </div>
    `;
  }
}

customElements.define(CirclesToRhombusesSpinner.is, CirclesToRhombusesSpinner);
