import SpinnerElement from '../../SpinnerElement.js';

export class GridSpinner extends SpinnerElement {
  static get is() { return 'grid-spinner'; }

  static get defaults() {
    return {
      color: '#36d7b7',
      margin: 2,
      size: 15,
    };
  }

  static get observedAttributes() {
    return [
      'color',
      'margin',
      'size',
    ];
  }

  generateCellAnimation() {
    const random = Math.random();

    return `
      animation-duration: ${random + 0.6}s;
      animation-delay: ${random - 0.2}s;
    `;
  }

  style() {
    const { color, margin, size } = this.props;

    return `
      .grid-spinner {
        font-size: 0;
        width: calc(var(--grid-spinner__size, ${size}px) * 3 + var(--grid-spinner__margin, ${margin}px) * 6);
      }

      .cell {
        animation-fill-mode: both;
        animation: grid infinite ease;
        background-color: var(--grid-spinner__color, ${color});
        border-radius: 100%;
        display: inline-block;
        height: var(--grid-spinner__size, ${size}px);
        margin: var(--grid-spinner__margin, ${margin}px);
        width: var(--grid-spinner__size, ${size}px);
      }

      .cell:nth-child(1) { ${this.generateCellAnimation()} }
      .cell:nth-child(2) { ${this.generateCellAnimation()} }
      .cell:nth-child(3) { ${this.generateCellAnimation()} }
      .cell:nth-child(4) { ${this.generateCellAnimation()} }
      .cell:nth-child(5) { ${this.generateCellAnimation()} }
      .cell:nth-child(6) { ${this.generateCellAnimation()} }
      .cell:nth-child(7) { ${this.generateCellAnimation()} }
      .cell:nth-child(8) { ${this.generateCellAnimation()} }
      .cell:nth-child(9) { ${this.generateCellAnimation()} }

      @keyframes grid {
        0%   { transform: scale(1); }
        50%  { transform: scale(0.5); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
  }

  template() {
    return `
      <div class="grid-spinner">
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
      </div>
    `;
  }
}

customElements.define(GridSpinner.is, GridSpinner);
