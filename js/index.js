import '../sass/index.scss';

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

// Анимация молекул
const molecules = document.querySelectorAll(
  '.microelements, .probiotics, .protein'
);
const orbit = document.getElementById('orbit');
const centerX = orbit.offsetWidth / 2 + 90;
const centerY = orbit.offsetHeight / 2 + 50;

// радиусы окружностей вращения
const rx = 300;
const ry = 120;
const rz = 220;

let angle = 0;

function animate() {
  molecules.forEach((molecule, index) => {
    const offsets = [
      (5 * Math.PI) / 3, // probiotics
      Math.PI, // microelements
      Math.PI / 6, // protein
    ];

    const currentAngle = angle + offsets[index];
    const x = centerX + rx * Math.cos(currentAngle);
    const z = rz * Math.sin(currentAngle); // глубина
    const y = centerY + ry * Math.sin(currentAngle) + z * 0.1;

    // ✨ Наклон оси вращения: слева выше, справа ниже
    const tiltFactor = 0.2;
    const yTilt = tiltFactor * (x - centerX);
    const yWithTilt = y + yTilt;

    const depth = (z + rz) / (2 * rz);
    const scale = 0.6 + depth * 1.3;

    // Угол в диапазоне [0, 2π]
    const normalizedAngle =
      ((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    const angleDeg = (normalizedAngle * 180) / Math.PI;

    let zIndex = 1;

    if (angleDeg >= 190 && angleDeg <= 330) {
      zIndex = 0;
    } else if (angleDeg >= 80 && angleDeg <= 100) {
      zIndex = 1;
    } else if (angleDeg >= 20 && angleDeg <= 160) {
      zIndex = 2;
    }

    molecule.style.position = 'absolute';
    molecule.style.left = `${x}px`;
    molecule.style.top = `${yWithTilt}px`;
    molecule.style.transform = `scale(${scale})`;
    molecule.style.zIndex = zIndex;
  });

  angle += 0.02; // скорость вращения
  //   requestAnimationFrame(animate);
}

animate();

// свайп (мышь и тач)
let isDragging = false;
let startX = 0;

orbit.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
});
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - startX;
  angle -= deltaX * 0.005;
  startX = e.clientX;
  animate();
});
document.addEventListener('mouseup', () => {
  isDragging = false;
});

orbit.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});
orbit.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const deltaX = e.touches[0].clientX - startX;
  angle -= deltaX * 0.005;
  startX = e.touches[0].clientX;
  animate();
});
orbit.addEventListener('touchend', () => {
  isDragging = false;
});
