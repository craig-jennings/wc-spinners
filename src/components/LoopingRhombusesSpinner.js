import SpinnerElement from '../SpinnerElement.js';

export class LoopingRhombusesSpinner extends SpinnerElement {
  static get is() { return 'looping-rhombuses-spinner'; }

  static get defaults() {
    return {
      color: '#ff1d5e',
      duration: 2.5,
      size: 15,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'duration',
      'size',
    ];
  }

  template({ color, duration, size }) {
    return `
      <style>
        * {
          box-sizing: border-box;
        }

        :host {
          display: block;
        }

       .looping-rhombuses-spinner {
          height: var(--looping-rhombuses-spinner-size, ${size}px);
          position: relative;
          width: calc(var(--looping-rhombuses-spinner-size, ${size}px) * 4);
        }

        .looping-rhombuses-spinner .rhombus {
          animation: looping-rhombuses-spinner-animation var(--looping-rhombuses-spinner-duration, ${duration}s) linear infinite;
          background-color: var(--looping-rhombuses-spinner-color, ${color});
          border-radius: 2px;
          height: var(--looping-rhombuses-spinner-size, ${size}px);
          left: calc(var(--looping-rhombuses-spinner-size, ${size}px) * 4);
          margin: 0 auto;
          position: absolute;
          transform: translateY(0) rotate(45deg) scale(0);
          width: var(--looping-rhombuses-spinner-size, ${size}px);
        }

        .looping-rhombuses-spinner .rhombus:nth-child(1) {
          animation-delay: calc(var(--looping-rhombuses-spinner-duration, ${duration}s) * 1 / -1.5);
        }

        .looping-rhombuses-spinner .rhombus:nth-child(2) {
          animation-delay: calc(var(--looping-rhombuses-spinner-duration, ${duration}s) * 2 / -1.5);
        }

        .looping-rhombuses-spinner .rhombus:nth-child(3) {
          animation-delay: calc(var(--looping-rhombuses-spinner-duration, ${duration}s) * 3 / -1.5);
        }

        @keyframes looping-rhombuses-spinner-animation {
          0%   { transform: translateX(0)     rotate(45deg) scale(0); }
          50%  { transform: translateX(-233%) rotate(45deg) scale(1); }
          100% { transform: translateX(-466%) rotate(45deg) scale(0); }
        }
      </style>

      <div class="looping-rhombuses-spinner">
        <div class="rhombus"></div>
        <div class="rhombus"></div>
        <div class="rhombus"></div>
      </div>
    `;
  }
}

customElements.define(LoopingRhombusesSpinner.is, LoopingRhombusesSpinner);
