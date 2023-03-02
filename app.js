const titleTextKor = '유미와 닉의 결혼식',
      titleTextEn = 'Youme and Nick\'s Wedding',
      sakura = new Sakura('body'),
      msPerDay = 86400000,
      timeRemaining = Math.round((new Date('04-23-2023') - new Date()) / msPerDay),
      timeRemainingEl = document.getElementById('timeRemaining');

let currentLanguage = 'kor';

timeRemainingEl.dataset.en = `(${timeRemaining} days left!)`;
timeRemainingEl.dataset.kor = `(${timeRemaining}일 남았습니다!)`;
timeRemainingEl.innerText = `(${timeRemaining}일 남았습니다!)`;

changeLanguage = () => {
    if (currentLanguage == 'en') {
        currentLanguage = 'kor';
        document.title = titleTextKor;
        document.querySelectorAll('.text-element').forEach(element => {
            element.innerText = element.dataset.kor;
        });
    } else {
        currentLanguage = 'en';
        document.title = titleTextEn;
        document.querySelectorAll('.text-element').forEach(element => {
            element.innerText = element.dataset.en;
        });
    }
}

mapSelect = mapType => {
    const googleButton = document.getElementById('googleMapSelect'),
          naverButton = document.getElementById('naverMapSelect'),
          googleMap = document.getElementById('googleMap'),
          naverMap = document.getElementById('naverMap');

    if (mapType == 'google') {
        naverMap.classList.add('d-none');
        googleMap.classList.remove('d-none');
        googleButton.classList.add('selected');
        naverButton.classList.remove('selected');
    } else {
        naverMap.classList.remove('d-none');
        googleMap.classList.add('d-none');
        googleButton.classList.remove('selected');
        naverButton.classList.add('selected');
    }
}
