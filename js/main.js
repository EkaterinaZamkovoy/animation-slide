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

// радиусы
const rx = 320;
const ry = 130;

const minSize = 145;
const midSize = 195;
const maxSize = 330;

let angle = 0;

function animate() {
  molecules.forEach((molecule, index) => {
    const offset = (index * (Math.PI * 2)) / molecules.length; // равномерно распределить
    const currentAngle = angle + offset;
    const x = centerX + rx * Math.cos(currentAngle);
    const y = centerY + ry * Math.sin(currentAngle);

    // Угол в диапазоне [0, 2π]
    const normalizedAngle =
      ((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    const angleDeg = (normalizedAngle * 180) / Math.PI;

    let size = midSize;
    let zIndex = 1;

    if (angleDeg >= 200 && angleDeg <= 340) {
      //   size = minSize;
      zIndex = 0;
    } else if (
      (angleDeg >= 80 && angleDeg <= 100) ||
      (angleDeg >= 260 && angleDeg <= 280)
    ) {
      //   size = midSize;
      zIndex = 1;
    } else if (angleDeg >= 20 && angleDeg <= 160) {
      //   size = maxSize;
      zIndex = 2;
    }

    molecule.style.position = 'absolute';
    molecule.style.left = `${x}px`;
    molecule.style.top = `${y}px`;
    molecule.style.maxWidth = `${size}px`;
    molecule.style.zIndex = zIndex;
  });

  angle += 0.01; // скорость вращения
  requestAnimationFrame(animate);
}

animate();
