import SpinnerElement from '../SpinnerElement.js';

export class BeatSpinner extends SpinnerElement {
  static get is() { return 'beat-spinner'; }

  static get defaults() {
    return {
      color: '#36d7b7',
      margin: 2,
      size: 15,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'margin',
      'size',
    ];
  }

  get color() { return `var(--beat-spinner__color, ${this.props.color})`; }

  get margin() { return `var(--beat-spinner__margin, ${this.props.margin}px)`; }

  get size() { return `var(--beat-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .beat {
        animation-fill-mode: both;
        animation: beat 0.7s infinite linear;
        background-color: ${this.color};
        border-radius: 100%;
        display: inline-block;
        height: ${this.size};
        margin: ${this.margin};
        width: ${this.size};
      }

      .beat:nth-child(odd)  { animation-delay: 0s; }
      .beat:nth-child(even) { animation-delay: 0.35s; }

      @keyframes beat {
        50%  { transform: scale(0.75); opacity: 0.2 }
        100% { transform: scale(1);    opacity: 1 }
      }
    `;
  }

  template() {
    return `
      <div class="beat-spinner">
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
      </div>
    `;
  }
}

customElements.define(BeatSpinner.is, BeatSpinner);
