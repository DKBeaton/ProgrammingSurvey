// HTML elements

const nextBtn = document.querySelector('.learn-more');
const indicatorCurrent = document.querySelectorAll('.indicator-current');
const indicatorTextActive = document.querySelectorAll('.indicators-text');

let currentIndex = 0;
const INDICATOR_PIXEL_GAP = 61;

// Next

const next = () => {
  ++currentIndex;
  animate();
};

const animate = () => {
  const step = INDICATOR_PIXEL_GAP * currentIndex;
  indicatorTextActive[currentIndex - 1].classList.remove('active');
  indicatorTextActive[currentIndex].classList.add('active');

  indicatorCurrent[0].style.transform = `translateY(${step}px)`;
};

// Events

nextBtn.addEventListener('click', () => next());
