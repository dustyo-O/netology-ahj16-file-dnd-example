// import { mdConvert } from 'md-converter'

import Upload from './components/upload/Upload';

console.log('app.js bundled');

// window.upload = new Upload('.upload', (result) => {
//   document.querySelector('.text-preview').textContent = result;
// });

// window.upload = new Upload('.upload', (result) => {
//   const mdHtml = mdConvert(result);

//   document.querySelector('.md-preview').innerHTML = mdHtml;
// });

// window.upload = new Upload('.upload', (result) => {
//   document.querySelector('.image-preview').src = result;
// }, 'image');

// window.upload = new Upload('.upload', (result) => {
//   console.log(result);

//   document.querySelector('.image-preview').src = result;

//   URL.revokeObjectURL(result);
// }, 'file');

window.upload = new Upload('.upload', (result) => {
  console.log(result);

  const video = document.querySelector('.video-preview');

  video.src = result;

  video.addEventListener('canplay', () => {
    URL.revokeObjectURL(result);
  });
}, 'file');

// window.upload = new Upload('.upload', (result) => {
//   const video = document.querySelector('.video-preview');

//   video.src = result;
// }, 'image');

// window.upload = new Upload('.upload', (result, file) => {
//   console.log(result);

//   const link = document.createElement('a');

//   link.href = result;
//   link.download = file.name;
//   link.rel = 'noopener';

//   link.click();

//   URL.revokeObjectURL(result);
// }, 'file');
