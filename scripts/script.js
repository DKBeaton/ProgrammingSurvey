// HTML elements
const beginBtn = document.querySelector('.btn-begin');
const nextBtn = document.querySelector('.btn-next');
const backBtn = document.querySelector('.btn-back');
const indicatorCurrent = document.querySelectorAll('.indicator-current');
const indicatorTextActive = document.querySelectorAll('.indicators-text');
const panels = document.querySelectorAll('.panel-screen');

// Age element
const ageInput = document.querySelector('input[class="age"]');
const ageBtnUp = document.querySelector('.quantity-up');
const ageBtnDown = document.querySelector('.quantity-down');
const ageMin = ageInput.getAttribute('min');
const ageMax = ageInput.getAttribute('max');

// Experience element
const experienceInput = document.querySelector('input[id="experience"]');
const experienceBtnUp = document.querySelector('.quantity-up-exp');
const experienceBtnDown = document.querySelector('.quantity-down-exp');
const experienceMin = experienceInput.getAttribute('min');
const experienceMax = experienceInput.getAttribute('max');

let currentIndex = 0;
const INDICATOR_PIXEL_GAP = 61;

// Next
const next = () => {
  // Prevent the index from going above 3
  if (currentIndex != 3 && validateForm()) {
    ++currentIndex;

    // Update screen
    updateScreen();
  }

  // Check Confirm
  if (currentIndex == 3) {
    validateForm();
  }
};

// Back
const back = () => {
  --currentIndex;
  updateScreen();
};

// Functions
const validateForm = () => {
  // Get current inputs in active form
  const x = panels[currentIndex].getElementsByTagName('input');

  // Loop through the select elements
  if (currentIndex == 2) {
    const y = panels[currentIndex].getElementsByTagName('select');
    for (i = 0; i < y.length; i++) {
      if (!y[i].checkValidity()) {
        document.querySelector('[id="submit2"]').click();
        return false;
      }
    }
  }

  // Loop through the select elements
  if (currentIndex == 3) {
    const u = panels[currentIndex].getElementsByTagName('input');
    for (i = 0; i < u.length; i++) {
      if (!u[i].checkValidity()) {
        document.querySelector('[id="submit3"]').click();
        return false;
      }
    }
  }

  // Loop through the inputs
  for (i = 0; i < x.length; i++) {
    if (!x[i].checkValidity()) {
      document.querySelector('[id="submit"]').click();
      return false;
    }
  }

  return true;
};

const updateScreen = () => {
  // Calculate the pixel amount for the circle indicator
  const step = INDICATOR_PIXEL_GAP * currentIndex;

  // Update the active indicator text
  indicatorTextActive[currentIndex - 1].classList.remove('active');
  indicatorTextActive[currentIndex].classList.add('active');
  indicatorCurrent[0].style.transform = `translateY(${step}px)`;

  // Remove active from the previous panel and add it to the next panel
  panels[currentIndex - 1].classList.remove('active');
  panels[currentIndex].classList.add('active');

  // Add fade transition to the begin button
  beginBtn.classList.add('fade');
  beginBtn.disabled = 'disabled';

  // Show next and back buttons
  nextBtn.classList.remove('hidden');
  backBtn.classList.remove('hidden');

  // disable back button if on user info page
  if (currentIndex == 1) {
    backBtn.classList.add('btn-disable');
  } else {
    backBtn.classList.remove('btn-disable');
  }

  // Change next button into confirm button
  if (currentIndex == 3) {
    nextBtn.innerHTML = 'CONFIRM';
  } else {
    nextBtn.innerHTML = 'NEXT';
  }
};

const ageUpdateValueBtnUp = () => {
  var oldValue = parseFloat(ageInput.value);
  if (oldValue >= ageMax) {
    var newVal = oldValue;
  } else {
    var newVal = oldValue + 1;
  }
  ageInput.value = newVal;
};

const ageUpdateValueBtnDown = () => {
  var oldValue = parseFloat(ageInput.value);
  if (oldValue <= ageMin) {
    var newVal = oldValue;
  } else {
    var newVal = oldValue - 1;
  }
  ageInput.value = newVal;
};

const experienceUpdateValueBtnUp = () => {
  var oldValue = parseFloat(experienceInput.value);
  if (oldValue >= experienceMax) {
    var newVal = oldValue;
  } else {
    var newVal = oldValue + 1;
  }
  experienceInput.value = newVal;
};

const experienceUpdateValueBtnDown = () => {
  var oldValue = parseFloat(experienceInput.value);
  if (oldValue <= experienceMin) {
    var newVal = oldValue;
  } else {
    var newVal = oldValue - 1;
  }
  experienceInput.value = newVal;
};

// Events
beginBtn.addEventListener('click', () => next());
nextBtn.addEventListener('click', () => next());
backBtn.addEventListener('click', () => back());
ageBtnUp.addEventListener('click', () => ageUpdateValueBtnUp());
ageBtnDown.addEventListener('click', () => ageUpdateValueBtnDown());

experienceBtnUp.addEventListener('click', () => experienceUpdateValueBtnUp());
experienceBtnDown.addEventListener('click', () => experienceUpdateValueBtnDown());
