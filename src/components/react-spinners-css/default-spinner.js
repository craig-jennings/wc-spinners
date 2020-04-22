import SpinnerElement from '../SpinnerElement.js';

export class DefaultSpinner extends SpinnerElement {
  static get is() { return 'default-spinner'; }

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

  get color() { return `var(--default-spinner__color, ${this.props.color})`; }

  get size() { return `var(--default-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .lds-default {
        display: inline-block;
        height: 80px;
        position: relative;
        width: 80px;
      }

      .lds-default div {
        animation: lds-default 1.2s linear infinite;
        background: #fff;
        background: ${this.color};
        border-radius: 50%;
        height: 6px;
        height: calc(${this.size} * 0.075);
        position: absolute;
        width: 6px;
        width: calc(${this.size} * 0.075);
      }

      .lds-default div:nth-child(1) {
        animation-delay: 0s;
        left: 82.5%;
        top: 46.25%;
      }

      .lds-default div:nth-child(2) {
        animation-delay: -0.1s;
        left: 77.5%;
        top: 27.5%;
      }

      .lds-default div:nth-child(3) {
        animation-delay: -0.2s;
        left: 65%;
        top: 13.75%;
      }

      .lds-default div:nth-child(4) {
        animation-delay: -0.3s;
        left: 46.25%;
        top: 8.75%;
      }

      .lds-default div:nth-child(5) {
        animation-delay: -0.4s;
        left: 27.5%;
        top: 13.75%;
      }

      .lds-default div:nth-child(6) {
        animation-delay: -0.5s;
        left: 13.75%;
        top: 27.5%;
      }

      .lds-default div:nth-child(7) {
        animation-delay: -0.6s;
        left: 8.75%;
        top: 46.25%;
      }

      .lds-default div:nth-child(8) {
        animation-delay: -0.7s;
        left: 13.75%;
        top: 65%;
      }

      .lds-default div:nth-child(9) {
        animation-delay: -0.8s;
        left: 27.5%;
        top: 77.5%;
      }

      .lds-default div:nth-child(10) {
        animation-delay: -0.9s;
        left: 46.25%;
        top: 82.5%;
      }

      .lds-default div:nth-child(11) {
        animation-delay: -1s;
        left: 65%;
        top: 77.5%;
      }

      .lds-default div:nth-child(12) {
        animation-delay: -1.1s;
        left: 77.5%;
        top: 65%;
      }

      @keyframes lds-default {
        0%, 20%, 80%, 100% { transform: scale(1); }
        50% { transform: scale(1.5); }
      }
    `;
  }

  template() {
    return `
      <div class="lds-default"}>
        <div></div>
        <div></div>
        <div></div>
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

customElements.define(DefaultSpinner.is, DefaultSpinner);
