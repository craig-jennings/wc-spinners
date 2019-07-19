import SpinnerElement from '../SpinnerElement.js';

export class TrinityRingsSpinner extends SpinnerElement {
  static get is() { return 'trinity-rings-spinner'; }

  static get defaults() {
    return {
      color: '#ff1d5e',
      duration: 1.5,
      size: 60,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'duration',
      'size',
    ];
  }

  style({ color, duration, size }) {
    return `
      .trinity-rings-spinner {
        align-items: center;
        display: flex;
        flex-direction: row;
        height: calc(var(--trinity-rings-spinner-size, ${size}px) * 2);
        justify-content: center;
        overflow: hidden;
        padding: 3px;
        position: relative;
        width: calc(var(--trinity-rings-spinner-size, ${size}px) * 2);
      }

      .trinity-rings-spinner .circle {
        border-radius: 50%;
        border: 3px solid var(--trinity-rings-spinner-color, ${color});
        display: block;
        opacity: 1;
        position: absolute;
      }

      .trinity-rings-spinner .circle:nth-child(1) {
        animation: trinity-rings-spinner-circle1-animation var(--trinity-rings-spinner-duration, ${duration}s) infinite linear;
        border-width: 3px;
        height: var(--trinity-rings-spinner-size, ${size}px);
        width: var(--trinity-rings-spinner-size, ${size}px);
      }

      .trinity-rings-spinner .circle:nth-child(2) {
        animation: trinity-rings-spinner-circle2-animation var(--trinity-rings-spinner-duration, ${duration}s) infinite linear;
        border-width: 2px;
        height: calc(var(--trinity-rings-spinner-size, ${size}px) * 0.65);
        width: calc(var(--trinity-rings-spinner-size, ${size}px) * 0.65);
      }

      .trinity-rings-spinner .circle:nth-child(3) {
        animation:trinity-rings-spinner-circle3-animation var(--trinity-rings-spinner-duration, ${duration}s) infinite linear;
        border-width: 1px;
        height: calc(var(--trinity-rings-spinner-size, ${size}px) * 0.1);
        width: calc(var(--trinity-rings-spinner-size, ${size}px) * 0.1);
      }

      @keyframes trinity-rings-spinner-circle1-animation{
        0%   { transform: rotateZ(20deg)  rotateY(0deg); }
        100% { transform: rotateZ(100deg) rotateY(360deg); }
      }

      @keyframes trinity-rings-spinner-circle2-animation{
        0%   { transform: rotateZ(100deg) rotateX(0deg); }
        100% { transform: rotateZ(0deg)   rotateX(360deg); }
      }

      @keyframes trinity-rings-spinner-circle3-animation{
        0%   { transform: rotateZ(100deg)  rotateX(-360deg); }
        100% { transform: rotateZ(-360deg) rotateX(360deg); }
      }
    `;
  }

  template() {
    return `
      <div class="trinity-rings-spinner">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    `;
  }
}

customElements.define(TrinityRingsSpinner.is, TrinityRingsSpinner);
