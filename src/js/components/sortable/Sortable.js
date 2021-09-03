/* eslint-disable class-methods-use-this */
export default class Sortable {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    this.element = element;
    this.sortableItems = [...this.element.children];

    this.activeDragElement = undefined;

    this.onStartDrag = this.onStartDrag.bind(this);
    this.onEndDrag = this.onEndDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);

    this.element.addEventListener('mousedown', this.onStartDrag);
  }

  onStartDrag(e) {
    console.log(e);

    const { target } = e;

    this.activeDragElement = target;

    this.activeDragElement.classList.add('dragged');

    document.documentElement.addEventListener('mouseup', this.onEndDrag);
    document.documentElement.addEventListener('mousemove', this.onDrag);

    this.onDrag(e);
  }

  onEndDrag(e) {
    if (this.activeDragElement) {
      const element = document.elementFromPoint(e.clientX, e.clientY);

      this.activeDragElement.classList.remove('dragged');

      this.element.insertBefore(this.activeDragElement, element);

      this.activeDragElement = undefined;
    }

    document.documentElement.removeEventListener('mouseup', this.onEndDrag);
    document.documentElement.removeEventListener('mousemove', this.onDrag);
  }

  onDrag(e) {
    e.preventDefault();

    if (!this.activeDragElement) {
      return;
    }

    this.activeDragElement.style.left = `${e.clientX + window.scrollX}px`;
    this.activeDragElement.style.top = `${e.clientY + window.scrollY}px`;
  }
}
