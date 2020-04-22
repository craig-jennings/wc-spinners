import SpinnerElement from '../SpinnerElement.js';

export class OuroboroSpinner extends SpinnerElement {
  static get is() { return 'ouroboro-spinner'; }

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

  get color() { return `var(--ouroboro-spinner__color, ${this.props.color})`; }

  style() {
    return `
      .lds-ouroboro {
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0,0,0,.1) inset, 0 0 25px rgba(0,0,255,0.075);
        display: inline-block;
        height: 64px;
        margin: 0.5em;
        overflow: hidden;
        position: relative;
        width: 64px;
      }

      .lds-ouroboro:after {
        background: none repeat scroll 0 0 #f2f2f2;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0,0,0,.1);
        content: "";
        display: block;
        height: 70%; width:70%;
        position: relative;
        top: 15%; left: 15%;
      }

      .lds-ouroboro > span {
        height: 100%; width: 50%;
        overflow: hidden;
        position: absolute;
      }

      .lds-ouroboro > .left  { left:0 }
      .lds-ouroboro > .right { left:50% }

      .lds-ouroboro > .left > .anim,
      .lds-ouroboro > .right > .anim {
        animation: lds-ouroboro-rotate 3s infinite;
        background: none repeat scroll 0 0;
        background-color: ${this.color};
        border-radius: 999px;
        height: 100%; width: 100%;
        left: 100%; top: 0;
        opacity: 0.8;
        position: absolute;
        transform-origin: 0 50% 0;
      }

      .lds-ouroboro > .left > .anim {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }

      .lds-ouroboro > .right > .anim {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        left: -100%;
        transform-origin: 100% 50% 0;
      }

      @keyframes lds-ouroboro-rotate{
        0%   { transform:rotate(0deg) }
        25%  { transform:rotate(0deg) }
        50%  { transform:rotate(180deg) }
        75%  { transform:rotate(180deg) }
        100% { transform:rotate(360deg) }
      }
    `;
  }

  template() {
    return `
      <div class="lds-ouroboro">
        <span class="left">
          <span class="anim" style={{ background: color }}></span>
        </span>

        <span class="right">
          <span class="anim" style={{ background: color }}></span>
        </span>
      </div>
    `;
  }
}

customElements.define(OuroboroSpinner.is, OuroboroSpinner);
