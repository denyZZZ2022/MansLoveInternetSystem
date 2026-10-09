const excuses = [
    "Bardzo chcę, ale muszę wyprowadzić rybki na spacer.",
    "Mój kot napisał kod i właśnie wywalił serwer.",
    "Mam bardzo ważne spotkanie z kanapą za 5 minut.",
    "Mój horoskop stanowczo zabrania mi dziś pracy.",
    "Trwa kompilacja moich myśli, to potrwa ze 2 godziny.",
    "Wi-Fi łapie tylko sygnały kosmiczne, nic nie poradzę.",
    "Sprawdzam wytrzymałość podłogi w moim pokoju."
  ];
  
  // Generator wymówek
  const excuseBtn = document.getElementById('excuse-btn');
  const excuseText = document.getElementById('excuse-text');
  
  if (excuseBtn && excuseText) {
    excuseBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * excuses.length);
      excuseText.textContent = excuses[randomIndex];
    });
  }
  
  // Uciekający przycisk
  const runawayBtn = document.getElementById('runaway-btn');
  
  if (runawayBtn) {
    runawayBtn.addEventListener('mouseover', () => {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 50 - 25;
      runawayBtn.style.transform = `translate(${x}px, ${y}px)`;
    });
  
    runawayBtn.addEventListener('click', () => {
      alert('Jak to zrobiłeś?! Jesteś mistrzem myszki!');
    });
  }
  
  // Licznik kliknięć
  const clickBtn = document.getElementById('click-btn');
  const counterText = document.getElementById('counter');
  let count = 0;
  
  if (clickBtn && counterText) {
    clickBtn.addEventListener('click', () => {
      count++;
      counterText.textContent = count.toString();
    });
  }