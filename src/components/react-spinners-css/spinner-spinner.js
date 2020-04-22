import SpinnerElement from '../SpinnerElement.js';

export class SpinnerSpinner extends SpinnerElement {
  static get is() { return 'spinner-spinner'; }

  static get defaults() {
    return {
      color: '#7f58af',
    };
  }

  static get observedAttributes() {
    return [
      'color',
    ];
  }

  get color() { return `var(--spinner-spinner__color, ${this.props.color})`; }

  style() {
    return `
      .lds-spinner {
        color: official;
        display: inline-block;
        height: 80px;
        position: relative;
        width: 80px;
      }

      .lds-spinner div {
        animation: lds-spinner 1.2s linear infinite;
        transform-origin: 40px 40px;
      }

      .lds-spinner div .div-after {
        background: ${this.color};
        border-radius: 20%;
        content: " ";
        display: block;
        height: 18px;
        left: 37px;
        position: absolute;
        top: 3px;
        width: 6px;
      }

      .lds-spinner div:nth-child(1) {
        animation-delay: -1.1s;
        transform: rotate(0deg);
      }

      .lds-spinner div:nth-child(2) {
        animation-delay: -1s;
        transform: rotate(30deg);
      }

      .lds-spinner div:nth-child(3) {
        animation-delay: -0.9s;
        transform: rotate(60deg);
      }

      .lds-spinner div:nth-child(4) {
        animation-delay: -0.8s;
        transform: rotate(90deg);
      }

      .lds-spinner div:nth-child(5) {
        animation-delay: -0.7s;
        transform: rotate(120deg);
      }

      .lds-spinner div:nth-child(6) {
        animation-delay: -0.6s;
        transform: rotate(150deg);
      }

      .lds-spinner div:nth-child(7) {
        animation-delay: -0.5s;
        transform: rotate(180deg);
      }

      .lds-spinner div:nth-child(8) {
        animation-delay: -0.4s;
        transform: rotate(210deg);
      }

      .lds-spinner div:nth-child(9) {
        animation-delay: -0.3s;
        transform: rotate(240deg);
      }

      .lds-spinner div:nth-child(10) {
        animation-delay: -0.2s;
        transform: rotate(270deg);
      }

      .lds-spinner div:nth-child(11) {
        animation-delay: -0.1s;
        transform: rotate(300deg);
      }

      .lds-spinner div:nth-child(12) {
        animation-delay: 0s;
        transform: rotate(330deg);
      }

      @keyframes lds-spinner {
        0%   { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
  }

  template() {
    return `
      <div class="lds-spinner">
        <div>
          <div class="div-after"></div>
        </div>

        <div>
          <div class="div-after"></div>
        </div>

        <div>
          <div class="div-after"></div>
        </div>

        <div>
          <div class="div-after"></div>
        </div>

        <div>
          <div class="div-after"></div>
        </div>

        <div>
          <div class="div-after"></div>
        </div>

        <div>
          <div class="div-after"></div>
        </div>

        <div>
          <div class="div-after"></div>
        </div>

        <div>
          <div class="div-after"></div>
        </div>

        <div>
          <div class="div-after"></div>
        </div>

        <div>
          <div class="div-after"></div>
        </div>

        <div>
          <div class="div-after"></div>
        </div>
      </div>
    `;
  }
}

customElements.define(SpinnerSpinner.is, SpinnerSpinner);
