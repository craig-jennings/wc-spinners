import SpinnerElement from '../SpinnerElement.js';

export class EllipsisSpinner extends SpinnerElement {
  static get is() { return 'ellipsis-spinner'; }

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

  get color() { return `var(--ellipsis-spinner__color, ${this.props.color})`; }

  get size() { return `var(--ellipsis-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .lds-ellipsis {
        display: inline-block;
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .lds-ellipsis div {
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
        background: ${this.color};
        border-radius: 50%;
        height: 16.25%;
        position: absolute;
        top: 41.25%;
        width: 16.25%;
      }

      .lds-ellipsis div:nth-child(1) {
        animation: lds-ellipsis1 0.6s infinite;
        left: 10%;
      }

      .lds-ellipsis div:nth-child(2) {
        animation: lds-ellipsis2 0.6s infinite;
        left: 10%;
      }

      .lds-ellipsis div:nth-child(3) {
        animation: lds-ellipsis2 0.6s infinite;
        left: 40%;
      }

      .lds-ellipsis div:nth-child(4) {
        animation: lds-ellipsis3 0.6s infinite;
        left: 70%;
      }

      @keyframes lds-ellipsis1 {
        0%   { transform: scale(0); }
        100% { transform: scale(1); }
      }

      @keyframes lds-ellipsis3 {
        0%   { transform: scale(1); }
        100% { transform: scale(0); }
      }

      @keyframes lds-ellipsis2 {
        0%   { transform: translate(0, 0); }
        100% { transform: translate(184.61%, 0); }
      }
    `;
  }

  template() {
    return `
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }
}

customElements.define(EllipsisSpinner.is, EllipsisSpinner);
