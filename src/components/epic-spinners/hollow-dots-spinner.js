import SpinnerElement from '../../SpinnerElement.js';

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

  get color() { return `var(--hollow-dots-spinner__color, ${this.props.color})`; }

  get duration() { return `var(--hollow-dots-spinner__duration, ${this.props.duration}s)`; }

  get size() { return `var(--hollow-dots-spinner__size, ${this.props.size}px)`; }

  style({ count }) {
    const dotStyles = [];

    for (let i = 1; i <= count; i++) {
      dotStyles.push(`
        .hollow-dots-spinner .dot:nth-child(${i}) {
          animation-delay: calc(${this.duration} / ${count} * ${i});
        }
      `);
    }

    return `
      * {
        box-sizing: border-box;
      }

      :host {
        display: block;
      }

      .hollow-dots-spinner {
        height: ${this.size};
        width: calc(${this.size} * 2 * ${count});
      }

      .hollow-dots-spinner .dot {
        animation: hollow-dots-spinner-animation ${this.duration} ease infinite 0ms;
        border-radius: 50%;
        border: calc(${this.size} / 5) solid ${this.color};
        float: left;
        height: ${this.size};
        margin: 0 calc(${this.size} / 2);
        transform: scale(0);
        width: ${this.size};
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
    `;
  }

  template({ count }) {
    const dots = [];

    for (let i = 1; i <= count; i++) {
      dots.push('<div class="dot"></div>');
    }

    return `
      <div class="hollow-dots-spinner">
        ${dots.join('')}
      </div>
    `;
  }
}

customElements.define(HollowDotsSpinner.is, HollowDotsSpinner);
