import SpinnerElement from '../SpinnerElement.js';

export class OrbitSpinner extends SpinnerElement {
  static get is() { return 'orbit-spinner'; }

  static get defaults() {
    return {
      color: '#ff1d5e',
      duration: 1.2,
      size: 55,
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
      .orbit-spinner {
        border-radius: 50%;
        height: var(--orbit-spinner__size, ${size}px);
        perspective: 800px;
        width: var(--orbit-spinner__size, ${size}px);
      }

      .orbit-spinner .orbit {
        border-radius: 50%;
        box-sizing: border-box;
        height: 100%;
        position: absolute;
        width: 100%;
      }

      .orbit-spinner .orbit:nth-child(1) {
        animation: orbit-spinner-orbit-one-animation var(--orbit-spinner__duration, ${duration}s) linear infinite;
        border-bottom: 3px solid var(--orbit-spinner__color, ${color});
        left: 0%;
        top: 0%;
      }

      .orbit-spinner .orbit:nth-child(2) {
        animation: orbit-spinner-orbit-two-animation var(--orbit-spinner__duration, ${duration}s) linear infinite;
        border-right: 3px solid var(--orbit-spinner__color, ${color});
        right: 0%;
        top: 0%;
      }

      .orbit-spinner .orbit:nth-child(3) {
        animation: orbit-spinner-orbit-three-animation var(--orbit-spinner__duration, ${duration}s) linear infinite;
        border-top: 3px solid var(--orbit-spinner__color, ${color});
        bottom: 0%;
        right: 0%;
      }

      @keyframes orbit-spinner-orbit-one-animation {
        0%   { transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg); }
        100% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg); }
      }

      @keyframes orbit-spinner-orbit-two-animation {
        0%   { transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg); }
        100% { transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg); }
      }

      @keyframes orbit-spinner-orbit-three-animation {
        0%   { transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg); }
        100% { transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
        }
      }
    `;
  }

  template() {
    return `
      <div class="orbit-spinner">
        <div class="orbit"></div>
        <div class="orbit"></div>
        <div class="orbit"></div>
      </div>
    `;
  }
}

customElements.define(OrbitSpinner.is, OrbitSpinner);
