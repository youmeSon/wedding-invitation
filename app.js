const titleTextKor = "유미와 닉의 결혼식",
  titleTextEn = "Youme and Nick's Wedding",
  msPerDay = 86400000,
  timeRemaining = Math.round((new Date("04-23-2023") - new Date()) / msPerDay),
  timeRemainingEl = document.getElementById("timeRemaining"),
  copyMessageTimeoutLength = 1500,
  scrollIntoViewThreshold = 0.9; //Element scrolls into view when 10% of it is above the bottom of the viewport

  let sliderStarted = false;

// Sakura 
let sakura = new Sakura('body', {
  colors: [
      {
          gradientColorStart: 'rgba(255, 183, 197, 0.9)',
          gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
          gradientColorDegree: 120,
      },
      {
          gradientColorStart: 'rgba(255,189,189)',
          gradientColorEnd: 'rgba(227,170,181)',
          gradientColorDegree: 120,
      },
      {
          gradientColorStart: 'rgba(212,152,163)',
          gradientColorEnd: 'rgba(242,185,196)',
          gradientColorDegree: 120,
      },
  ],
  delay: 100,
  fallSpeed: 1,

});
let currentLanguage = "kor",
    bankAccount = document.querySelector("#bank-account");

timeRemainingEl.dataset.en = `...left!`;
timeRemainingEl.dataset.kor = `👰${timeRemaining}일 남았습니다🤵`;
timeRemainingEl.innerText = `👰${timeRemaining}일 남았습니다🤵`;

//Scroll elements into view

document.addEventListener('scroll', fadeElementsIntoView);

function fadeElementsIntoView () {
  const scrollIntoViewElements = document.querySelectorAll('.scroll-into-view');
  if (scrollIntoViewElements.length == 0) document.removeEventListener('scroll', fadeElementsIntoView); //Unbind event once all elements are visible
  scrollIntoViewElements.forEach(element => {
    if (isInViewport(element)) {
      if (element.id == 'gallery' && !sliderStarted) {
        $('#journeyCarousel').slick({
          autoplay: true,
          fade: true,
          cssEase: 'linear',
        });
        sliderStarted = true;
      }
      setTimeout(() => {
        element.classList.remove('scroll-into-view');
      }, 500);
    }
  });
}

isInViewport = element => {
  return element.getBoundingClientRect().top < window.innerHeight * scrollIntoViewThreshold;
};

//UI controls

changeLanguage = () => {
  if (currentLanguage == "en") {
    currentLanguage = "kor";
    document.title = titleTextKor;
    document.querySelectorAll(".text-element").forEach((element) => {
      element.innerText = element.dataset.kor;
    });
    document.querySelectorAll('.en-hide').forEach(element => {
      element.classList.remove('hide');
    });
  } else {
    currentLanguage = "en";
    document.title = titleTextEn;
    document.querySelectorAll(".text-element").forEach((element) => {
      element.innerText = element.dataset.en;
    });
    document.querySelectorAll('.en-hide').forEach(element => {
      element.classList.add('hide');
    });
  }
};

copy = e => {
  const originalText = e.innerText,
        inputElement = $(e).siblings('input');
  inputElement[0].select();
  setTimeout(() => {
    document.execCommand('copy');
  }, 100);
  e.innerText = '복사 됐습니다!';
  setTimeout(() => {
    e.innerText = originalText;
  }, copyMessageTimeoutLength);
};

//Deep linking

const urlParams = new URLSearchParams(window.location.search),
      language = urlParams.get('lang');

if (language !== null) {
  currentLanguage = language == 'en' ? 'kor' : 'en';
  changeLanguage();
}

// time countdown 

  // Set the date we're counting down to
  const countDownDate = new Date("April 23, 2023 15:00:00").getTime();

  // Dom Elements to Update
  const saleStrip = document.getElementById('saleStrip');
  const saleStripTitle = document.getElementById('saleStripTitle');
  const saleDays = document.getElementById('saleDays');
  const saleHours = document.getElementById('saleHours');
  const saleMins = document.getElementById('salMins');
  const saleSecs = document.getElementById('saleSecs');

  // Update the count down every 1 second
  const x = setInterval(function () {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //   if (distance < 0) { clearInterval(x); saleStripTitle.textContent = "Sale Started"; }
    if (distance < 0) {
      clearInterval(x);
      saleStrip.classList.add('d-none');
    }

    saleDays.textContent = `${days} ${currentLanguage == 'kor' ? saleDays.dataset.kor : saleDays.dataset.en}`;
    saleHours.textContent = `${hours} ${currentLanguage == 'kor' ? saleHours.dataset.kor : saleHours.dataset.en}`;
    saleMins.textContent = `${minutes} ${currentLanguage == 'kor' ? saleMins.dataset.kor : saleMins.dataset.en}`;
    saleSecs.textContent = `${seconds} ${currentLanguage == 'kor' ? saleSecs.dataset.kor : saleSecs.dataset.en}`;

  }, 1000);

