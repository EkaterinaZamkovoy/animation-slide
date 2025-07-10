function scaleSlide() {
  const slide = document.querySelector('.slide-wrapper');
  const slideWidth = 1024;
  const slideHeight = 768;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const scaleX = windowWidth / slideWidth;
  const scaleY = windowHeight / slideHeight;

  const scale = Math.min(scaleX, scaleY);

  slide.style.transform = `scale(${scale})`;
  slide.style.transformOrigin = 'top left';

  // Центрирование
  slide.style.position = 'absolute';
  slide.style.left = `${(windowWidth - slideWidth * scale) / 2}px`;
  slide.style.top = `${(windowHeight - slideHeight * scale) / 2}px`;
}

window.addEventListener('load', scaleSlide);
window.addEventListener('resize', scaleSlide);
