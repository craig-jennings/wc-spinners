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
    this.root.innerHTML = this.template(this.props);
  }
}

export default SpinnerElement;
