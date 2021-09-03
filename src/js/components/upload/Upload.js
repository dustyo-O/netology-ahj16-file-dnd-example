/* eslint-disable class-methods-use-this */
export default class Upload {
  constructor(element, handler, contentType = 'text') {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    this.handler = handler;
    this.contentType = contentType;

    this.onClick = this.onClick.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragDrop = this.onDragDrop.bind(this);

    this.element = element;
    this.input = this.element.querySelector('.upload__input');

    this.element.addEventListener('click', this.onClick);
    this.element.addEventListener('dragover', this.onDragOver);
    this.element.addEventListener('drop', this.onDragDrop);
    this.input.addEventListener('input', this.onUpload);
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDragDrop(e) {
    e.preventDefault();

    this.onUpload({ target: e.dataTransfer });
  }

  onClick(e) {
    console.log('onclick');
    e.preventDefault();

    this.input.dispatchEvent(new MouseEvent('click'));
  }

  onUpload(e) {
    console.log('upload');
    console.log(e);

    const { target } = e;

    const file = target.files && target.files[0];

    console.log(file);

    if (this.contentType !== 'file') {
      const reader = new FileReader();

      reader.addEventListener('load', (event) => {
        this.handler(event.target.result, file);
      });

      if (this.contentType === 'text') reader.readAsText(file);
      if (this.contentType === 'image') reader.readAsDataURL(file);
    } else {
      const url = URL.createObjectURL(file);

      this.handler(url, file);
    }
  }
}
