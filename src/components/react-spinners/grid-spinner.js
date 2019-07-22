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

  get color() { return `var(--grid-spinner__color, ${this.props.color})`; }

  get margin() { return `var(--grid-spinner__margin, ${this.props.margin}px)`; }

  get size() { return `var(--grid-spinner__size, ${this.props.size}px)`; }

  generateCellAnimation() {
    const random = Math.random();

    return `
      animation-duration: ${random + 0.6}s;
      animation-delay: ${random - 0.2}s;
    `;
  }

  style() {
    return `
      .grid-spinner {
        font-size: 0;
        width: calc(${this.size} * 3 + ${this.margin} * 6);
      }

      .cell {
        animation-fill-mode: both;
        animation: grid infinite ease;
        background-color: ${this.color};
        border-radius: 100%;
        display: inline-block;
        height: ${this.size};
        margin: ${this.margin};
        width: ${this.size};
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
