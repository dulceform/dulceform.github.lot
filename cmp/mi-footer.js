class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `&copy; 2021
     Curiel Barrera Dulce María, IC-52M.`;
  }
}
customElements.define(
  "mi-footer", MiFooter);
