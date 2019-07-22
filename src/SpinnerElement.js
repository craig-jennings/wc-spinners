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

  style() {
    throw new Error('style method must be implemented');
  }

  template() {
    throw new Error('template method must be implemented');
  }

  update() {
    const styles = `
      <style>
        * { box-sizing: border-box; }

        :host           { display: block; }
        :host([hidden]) { display: none; }

        ${this.style(this.props)}
      </style>
    `;

    const template = this.template(this.props);

    this.root.innerHTML = `${styles}${template}`;
  }
}

export default SpinnerElement;
