const titleTextKor = '유미와 닉의 결혼식',
      titleTextEn = 'Youme and Nick\'s Wedding'; 

let currentLanguage = 'kor';

const sakura = new Sakura('body', { delay: 100 });

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
