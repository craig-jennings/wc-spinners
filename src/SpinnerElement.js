class SpinnerElement extends HTMLElement {
  constructor() {
    super();

    this.props = this.constructor.defaults;
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.props[name] = newValue || this.constructor.defaults[name];

    this.update();
  }

  template() {
    throw new Error('template(props) must be implemented');
  }

  update() {
    const template = this.template(this.props);

    const styles = `
      <style>
        * { box-sizing: border-box; }

        :host           { display: block; }
        :host([hidden]) { display: none; }

        ${this.style(this.props)}
      </style>
    `;

    this.root.innerHTML = `${styles}${template}`;
  }
}

export default SpinnerElement;
