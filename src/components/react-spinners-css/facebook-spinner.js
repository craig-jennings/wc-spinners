import SpinnerElement from '../SpinnerElement.js';

export class FacebookSpinner extends SpinnerElement {
  static get is() { return 'facebook-spinner'; }

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

  get color() { return `var(--facebook-spinner__color, ${this.props.color})`; }

  get size() { return `var(--facebook-spinner__size, ${this.props.size}px)`; }

  style() {
    return `
      .lds-facebook {
        display: inline-block;
        height: ${this.size};
        position: relative;
        width: ${this.size};
      }

      .lds-facebook div {
        animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        background: ${this.color};
        display: inline-block;
        left: 10%;
        position: absolute;
        width: 20%;
      }

      .lds-facebook div:nth-child(1) {
        animation-delay: -0.24s;
        left: 10%;
      }

      .lds-facebook div:nth-child(2) {
        animation-delay: -0.12s;
        left: 40%;
      }

      .lds-facebook div:nth-child(3) {
        animation-delay: 0;
        left: 70%;
      }

      @keyframes lds-facebook {
        0% {
          height: 80%;
          top: 10%;
        }

        50%, 100% {
          height: 40%;
          top: 30%;
        }
      }
    `;
  }

  template() {
    return `
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }
}

customElements.define(FacebookSpinner.is, FacebookSpinner);
