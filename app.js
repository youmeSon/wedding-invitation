const titleTextKor = "유미와 닉의 결혼식",
  titleTextEn = "Youme and Nick's Wedding",
  sakura = new Sakura("body"),
  msPerDay = 86400000,
  timeRemaining = Math.round((new Date("04-23-2023") - new Date()) / msPerDay),
  timeRemainingEl = document.getElementById("timeRemaining");

let currentLanguage = "kor";
let bankAccount = document.querySelector("#bank-account");

timeRemainingEl.dataset.en = `(${timeRemaining} days left!)`;
timeRemainingEl.dataset.kor = `(${timeRemaining}일 남았습니다!)`;
timeRemainingEl.innerText = `( ${timeRemaining}일 남았습니다! )`;

changeLanguage = () => {
  if (currentLanguage == "en") {
    currentLanguage = "kor";
    document.title = titleTextKor;
    document.querySelectorAll(".text-element").forEach((element) => {
      element.innerText = element.dataset.kor;
    });
  } else {
    currentLanguage = "en";
    document.title = titleTextEn;
    document.querySelectorAll(".text-element").forEach((element) => {
      element.innerText = element.dataset.en;
      bankAccount.classList.add("hide");
    });
  }
};

function myFunction() {
  // Get the text field
  var copyText = document.getElementById("copy-father");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}
