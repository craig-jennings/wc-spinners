import SpinnerElement from '../SpinnerElement.js';

export class OrbitalsSpinner extends SpinnerElement {
  static get is() { return 'orbitals-spinner'; }

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

  get color() { return `var(--orbitals-spinner__color, ${this.props.color})`; }

  style() {
    return `
      .lds-orbitals {
        display: inline-block;
        height: 80px;
        position: relative;
        width: 80px;
      }

      .lds-orbitals * {
        --center: translate(-50%, -50%);
        box-sizing: content-box;
      }

      .center {
        background: ${this.color};
        border-radius: 50%;
        height: 15px;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: var(--center);
        width: 15px;
      }

      .inner-spin,
      .outer-spin {
        left: 50%;
        position: absolute;
        top: 50%;
      }

      .inner-arc {
        position: absolute;
        width: 31px;
        height: 31px;
        border-radius: 50%;
        border: 3px solid;
      }

      .inner-arc_start-a {
        border-color: ${this.color};
        transform: var(--center) rotate(45deg);
      }

      .inner-arc_end-a {
        border-color: ${this.color};
        transform: var(--center) rotate(25deg);
      }

      .inner-moon-a,
      .inner-moon-b {
        background: ${this.color};
        border-radius: 50%;
        height: 8px;
        left: 50%;
        position: absolute;
        top: 50%;
        width: 8px;
      }

      .inner-moon-a {
        transform: var(--center) translate(17px, 0);
      }

      .inner-moon-b {
        transform: var(--center) translate(-17px, 0);
      }

      .inner-arc_start-b {
        border-color: ${this.color};
        transform: var(--center) rotate(65deg) scale(-1, -1);
      }

      .inner-arc_end-b {
        border-color: ${this.color};
        transform: var(--center) rotate(45deg) scale(-1, -1);
      }

      .outer-arc {
        border-radius: 50%;
        border: 3px solid;
        height: 60px;
        position: absolute;
        width: 60px;
      }

      .outer-arc_start-a {
        border-color: ${this.color};
        transform: var(--center) rotate(65deg);
      }

      .outer-arc_end-a {
        border-color: ${this.color};
        transform: var(--center) rotate(45deg);
      }

      .outer-moon-a,
      .outer-moon-b {
        background: ${this.color};
        border-radius: 50%;
        height: 9px;
        left: 50%;
        position: absolute;
        top: 50%;
        width: 9px;
      }

      .outer-moon-a {
        transform: var(--center) translate(32px, 0);
      }

      .outer-moon-b {
        transform: var(--center) translate(-32px, 0);
      }

      .outer-arc_start-b {
        border-color: ${this.color};
        transform: var(--center) rotate(65deg) scale(-1, -1);
      }

      .outer-arc_end-b {
        border-color: ${this.color};
        transform: var(--center) rotate(45deg) scale(-1, -1);
      }

      .outer-spin {
        animation: spin 4s linear infinite;
      }

      .inner-spin {
        animation: spin 3s linear infinite;
      }

      @keyframes spin {
        100% { transform: rotate(360deg); }
      }
    `;
  }

  template() {
    return `
      <div class="lds-orbitals">
        <div class="center"></div>

        <div class="inner-spin">
          <div class="inner-arc inner-arc_start-a"></div>
          <div class="inner-arc inner-arc_end-a"></div>
          <div class="inner-arc inner-arc_start-b"></div>
          <div class="inner-arc inner-arc_end-b"></div>
          <div class="inner-moon-a"></div>
          <div class="inner-moon-b"></div>
        </div>

        <div class="outer-spin">
          <div class="outer-arc outer-arc_start-a"></div>
          <div class="outer-arc outer-arc_end-a"></div>
          <div class="outer-arc outer-arc_start-b"></div>
          <div class="outer-arc outer-arc_end-b"></div>
          <div class="outer-moon-a"></div>
          <div class="outer-moon-b"></div>
        </div>
      </div>
    `;
  }
}

customElements.define(OrbitalsSpinner.is, OrbitalsSpinner);
