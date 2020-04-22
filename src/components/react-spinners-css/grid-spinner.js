import SpinnerElement from '../SpinnerElement.js';

export class GridSpinner extends SpinnerElement {
  static get is() { return 'rsc-grid-spinner'; }

  static get defaults() {
    return {
      color: '#7f58af',
      size: 80,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'size',
    ];
  }

  get color() { return `var(--rsc-grid-spinner__color, ${this.props.color})`; }

  get size() { return `var(--rsc-grid-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .lds-grid {
        display: inline-block;
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .lds-grid div {
        animation: lds-grid 1.2s linear infinite;
        background: ${this.color};
        border-radius: 50%;
        height: 20%;
        position: absolute;
        width: 20%;
      }

      .lds-grid div:nth-child(1) {
        animation-delay: 0s;
        left: 10%;
        top: 10%;
      }

      .lds-grid div:nth-child(2) {
        animation-delay: -0.4s;
        left: 40%;
        top: 10%;
      }

      .lds-grid div:nth-child(3) {
        animation-delay: -0.8s;
        left: 70%;
        top: 10%;
      }

      .lds-grid div:nth-child(4) {
        animation-delay: -0.4s;
        left: 10%;
        top: 40%;
      }

      .lds-grid div:nth-child(5) {
        animation-delay: -0.8s;
        left: 40%;
        top: 40%;
      }

      .lds-grid div:nth-child(6) {
        animation-delay: -1.2s;
        left: 70%;
        top: 40%;
      }

      .lds-grid div:nth-child(7) {
        animation-delay: -0.8s;
        left: 10%;
        top: 70%;
      }

      .lds-grid div:nth-child(8) {
        animation-delay: -1.2s;
        left: 40%;
        top: 70%;
      }

      .lds-grid div:nth-child(9) {
        animation-delay: -1.6s;
        left: 70%;
        top: 70%;
      }

      @keyframes lds-grid {
        0%, 100% { opacity: 1; }
        50%      { opacity: 0.5; }
      }
    `;
  }

  template() {
    return `
      <div class="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }
}

customElements.define(GridSpinner.is, GridSpinner);
