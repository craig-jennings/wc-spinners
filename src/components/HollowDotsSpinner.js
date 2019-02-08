import SpinnerElement from '../SpinnerElement.js';

export class HollowDotsSpinner extends SpinnerElement {
  static get is() { return 'hollow-dots-spinner'; }

  static get defaults() {
    return {
      color: '#ff1d5e',
      count: 3,
      duration: 1,
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

  template({ color, duration, count, size }) { // eslint-disable-line
    const dotStyles = [];
    const dots = [];

    for (let i = 1; i <= count; i++) {
      dotStyles.push(`
        .hollow-dots-spinner .dot:nth-child(${i}) {
          animation-delay: calc(var(--hollow-dots-spinner-duration, ${duration}s) / ${count} * ${i});
        }
      `);

      dots.push('<div class="dot"></div>');
    }

    return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

       .hollow-dots-spinner {
          height: var(--hollow-dots-spinner-size, ${size}px);
          width: calc(var(--hollow-dots-spinner-size, ${size}px) * 2 * ${count});
        }

        .hollow-dots-spinner .dot {
          animation: hollow-dots-spinner-animation var(--hollow-dots-spinner-duration, ${duration}s) ease infinite 0ms;
          border-radius: 50%;
          border: calc(var(--hollow-dots-spinner-size, ${size}px) / 5) solid var(--hollow-dots-spinner-color, ${color});
          float: left;
          height: var(--hollow-dots-spinner-size, ${size}px);
          margin: 0 calc(var(--hollow-dots-spinner-size, ${size}px) / 2);
          transform: scale(0);
          width: var(--hollow-dots-spinner-size, ${size}px);
        }

        ${dotStyles.join('')}

        @keyframes hollow-dots-spinner-animation {
          50% {
            transform: scale(1);
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }
      </style>

      <div class="hollow-dots-spinner">
        ${dots.join('')}
      </div>
    `;
  }
}

customElements.define(HollowDotsSpinner.is, HollowDotsSpinner);
