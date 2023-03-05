const titleTextKor = "유미와 닉의 결혼식",
  titleTextEn = "Youme and Nick's Wedding",
  sakura = new Sakura("body"),
  msPerDay = 86400000,
  timeRemaining = Math.round((new Date("04-23-2023") - new Date()) / msPerDay),
  timeRemainingEl = document.getElementById("timeRemaining"),
  copyMessageTimeoutLength = 1500,
  scrollIntoViewThreshold = 0.9; //Element scrolls into view when 10% of it is above the bottom of the viewport

let currentLanguage = "kor",
    bankAccount = document.querySelector("#bank-account");

timeRemainingEl.dataset.en = `(${timeRemaining} days left!)`;
timeRemainingEl.dataset.kor = `(${timeRemaining}일 남았습니다!)`;
timeRemainingEl.innerText = `( ${timeRemaining}일 남았습니다! )`;

//Slick slider

$('#journeyCarousel').slick({
  autoplay: true
});

//Scroll elements into view

document.addEventListener('scroll', fadeElementsIntoView);

function fadeElementsIntoView () {
  const scrollIntoViewElements = document.querySelectorAll('.scroll-into-view');
  if (scrollIntoViewElements.length == 0) document.removeEventListener('scroll', fadeElementsIntoView); //Unbind event once all elements are visible
  scrollIntoViewElements.forEach(element => {
    if (isInViewport(element)) {
      setTimeout(() => {
        element.classList.remove('scroll-into-view');
      }, 1000);
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
  const originalText = e.innerText;
  navigator.clipboard.writeText(e.dataset.accountno);
  e.innerText = '복사 됬습니다!';
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
