import SpinnerElement from '../SpinnerElement.js';

export class RollerSpinner extends SpinnerElement {
  static get is() { return 'roller-spinner'; }

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

  get color() { return `var(--roller-spinner__color, ${this.props.color})`; }

  style() {
    return `
      .lds-roller {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }

      .lds-roller > div {
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
      }

      .lds-roller div .div-after {
        background: ${this.color};
        border-radius: 50%;
        content: " ";
        display: block;
        height: 7px;
        margin: -4px 0 0 -4px;
        position: absolute;
        width: 7px;
      }

      .lds-roller div:nth-child(1) {
        animation-delay: -0.036s;
      }

      .lds-roller div:nth-child(1) .div-after {
        left: 63px;
        top: 63px;
      }

      .lds-roller div:nth-child(2) {
        animation-delay: -0.072s;
      }

      .lds-roller div:nth-child(2) .div-after {
        left: 56px;
        top: 68px;
      }

      .lds-roller div:nth-child(3) {
        animation-delay: -0.108s;
      }

      .lds-roller div:nth-child(3) .div-after {
        left: 48px;
        top: 71px;
      }

      .lds-roller div:nth-child(4) {
        animation-delay: -0.144s;
      }

      .lds-roller div:nth-child(4) .div-after {
        left: 40px;
        top: 72px;
      }

      .lds-roller div:nth-child(5) {
        animation-delay: -0.18s;
      }

      .lds-roller div:nth-child(5) .div-after {
        left: 32px;
        top: 71px;
      }

      .lds-roller div:nth-child(6) {
        animation-delay: -0.216s;
      }

      .lds-roller div:nth-child(6) .div-after {
        left: 24px;
        top: 68px;
      }

      .lds-roller div:nth-child(7) {
        animation-delay: -0.252s;
      }

      .lds-roller div:nth-child(7) .div-after {
        left: 17px;
        top: 63px;
      }

      .lds-roller div:nth-child(8) {
        animation-delay: -0.288s;
      }

      .lds-roller div:nth-child(8) .div-after {
        left: 12px;
        top: 56px;
      }

      @keyframes lds-roller {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
  }

  template() {
    return `
      <div class="lds-roller">
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

customElements.define(RollerSpinner.is, RollerSpinner);
