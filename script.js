const i18n = {
    es: {
      countdownEyebrow: 'cuenta atrás',
      countdownTitle: 'Algo se está preparando para ti',
      cdDaysLabel: 'días',
      cdHoursLabel: 'horas',
      cdMinutesLabel: 'min',
      cdSecondsLabel: 'seg',
      quizQuestion: '¿Eres muy guapa?',
      quizSub: 'pequeño cuestionario obligatorio antes de continuar',
      yes: 'Sí',
      no: 'No',
      hint: 'toca el sobre',
      stamp: 'cumple',
      eyebrow: 'feliz cumpleaños',
      headline: 'Para Kotku,<br>la guapa oficial',
      body1: 'Sé que tener exámenes justo ese día no es el plan más épico del mundo, pero espero que aun así encuentres ratitos para disfrutarlo, que te salga todo bien y que el día tenga más cosas buenas que apuntes.',
      body2: 'De momento yo solo puedo darte estas flores digitales, hechas por un casi ingeniero informático con más cariño que medios. No es un ramo de verdad, pero oye, algo es algo.',
      body3: 'Pásalo genial hoy, guapa.',
      signoff: 'Feliz cumpleaños, kotku.<br>Que lo disfrutes muchísimo.',
      counter: '22 cumpleaños celebrados',
      giftLabel: 'y todavía hay algo más',
      voucherEyebrow: 'vale de regalo',
      voucherTitle: 'Una cita sorpresa',
      voucherSub: 'Organizada por tu novio. Fecha, lugar y plan: secretos hasta el día. Solo prepárate para pasarlo bien.',
      voucherStampTop: 'VÁLIDO',
      voucherStampBottom: 'SIN CADUCIDAD'
    },
    pl: {
      countdownEyebrow: 'odliczanie',
      countdownTitle: 'Coś się dla ciebie szykuje',
      cdDaysLabel: 'dni',
      cdHoursLabel: 'godz',
      cdMinutesLabel: 'min',
      cdSecondsLabel: 'sek',
      quizQuestion: 'Jesteś bardzo piękna?',
      quizSub: 'mała obowiązkowa ankieta przed dalszym ciągiem',
      yes: 'Tak',
      no: 'Nie',
      hint: 'dotknij koperty',
      stamp: 'urodziny',
      eyebrow: 'wszystkiego najlepszego',
      headline: 'Dla Kotku,<br>oficjalnie najpiękniejszej',
      body1: 'Wiem, że mieć egzaminy akurat tego dnia to nie jest najbardziej epicki plan na świecie, ale mam nadzieję, że i tak znajdziesz chwile, żeby to celebrować, że wszystko ci dobrze pójdzie i że dzień przyniesie więcej dobrych rzeczy niż punktów do nauki.',
      body2: 'Na razie mogę dać ci tylko te cyfrowe kwiaty, zrobione przez prawie informatyka, z większą ilością serca niż środków. To nie jest prawdziwy bukiet, ale hej, coś za coś.',
      body3: 'Spędź dziś świetny dzień, piękna.',
      signoff: 'Wszystkiego najlepszego, kotku.<br>Ciesz się tym dniem najbardziej jak możesz.',
      counter: '22 wspólnie świętowane urodziny',
      giftLabel: 'i to jeszcze nie wszystko',
      voucherEyebrow: 'bon podarunkowy',
      voucherTitle: 'Niespodziankowa randka',
      voucherSub: 'Organizuje twój chłopak. Data, miejsce i plan: tajemnica do samego dnia. Po prostu przygotuj się na dobry czas.',
      voucherStampTop: 'WAŻNY',
      voucherStampBottom: 'BEZ TERMINU'
    }
  };
 
  const quiz = document.getElementById('quiz');
  const envelopeScreen = document.getElementById('envelopeScreen');
  const envelope = document.getElementById('envelope');
  const card = document.getElementById('card');
  const hint = document.getElementById('hint');
  const btnNo = document.getElementById('btnNo');
  const btnYes = document.getElementById('btnYes');
  const quizButtons = document.getElementById('quizButtons');
  const langEs = document.getElementById('langEs');
  const langPl = document.getElementById('langPl');
  const langEsQuiz = document.getElementById('langEsQuiz');
  const langPlQuiz = document.getElementById('langPlQuiz');
  const langEsGate = document.getElementById('langEsGate');
  const langPlGate = document.getElementById('langPlGate');
  const giftBox = document.getElementById('giftBox');
  const voucher = document.getElementById('voucher');
  const countdownGate = document.getElementById('countdownGate');
 
  function applyLang(lang) {
    const dict = i18n[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });
    langEs.classList.toggle('active', lang === 'es');
    langPl.classList.toggle('active', lang === 'pl');
    langEsQuiz.classList.toggle('active', lang === 'es');
    langPlQuiz.classList.toggle('active', lang === 'pl');
    langEsGate.classList.toggle('active', lang === 'es');
    langPlGate.classList.toggle('active', lang === 'pl');
  }
 
  langEs.addEventListener('click', () => applyLang('es'));
  langEsGate.addEventListener('click', () => applyLang('es'));
  langPlGate.addEventListener('click', () => applyLang('pl'));
  langPl.addEventListener('click', () => applyLang('pl'));
  langEsQuiz.addEventListener('click', () => applyLang('es'));
  langPlQuiz.addEventListener('click', () => applyLang('pl'));
 
  // --- "No" button: guarantees a minimum jump distance from the cursor ---
  const MIN_JUMP = 90; // px, minimum distance the button must move away
 
  function randomPointFar(fromX, fromY, bounds, btnW, btnH) {
    const maxX = Math.max(bounds.width - btnW, 0);
    const maxY = Math.max(bounds.height - btnH, 0);
    let best = { x: Math.random() * maxX, y: Math.random() * maxY, dist: -1 };
    for (let i = 0; i < 12; i++) {
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      const cx = x + btnW / 2;
      const cy = y + btnH / 2;
      const dist = Math.hypot(cx - fromX, cy - fromY);
      if (dist > best.dist) best = { x, y, dist };
      if (dist >= MIN_JUMP) return { x, y };
    }
    return best;
  }
 
  function dodge(clientX, clientY) {
    const wrapRect = quizButtons.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    const relX = clientX - wrapRect.left;
    const relY = clientY - wrapRect.top;
    const { x, y } = randomPointFar(relX, relY, wrapRect, btnRect.width, btnRect.height);
    btnNo.style.left = x + 'px';
    btnNo.style.top = y + 'px';
    btnNo.style.transform = 'none';
  }
 
  let lastDodge = 0;
  quizButtons.addEventListener('mousemove', (e) => {
    const btnRect = btnNo.getBoundingClientRect();
    const cx = btnRect.left + btnRect.width / 2;
    const cy = btnRect.top + btnRect.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    const now = Date.now();
    if (dist < MIN_JUMP && now - lastDodge > 60) {
      lastDodge = now;
      dodge(e.clientX, e.clientY);
    }
  });
 
  btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const t = e.touches[0];
    dodge(t.clientX, t.clientY);
  }, { passive: false });
 
  btnYes.addEventListener('click', () => {
    quiz.classList.add('hidden');
    envelopeScreen.classList.remove('hidden');
  });
 
  envelope.addEventListener('click', () => {
    if (envelope.classList.contains('opened')) return;
    envelope.classList.add('opened');
    hint.classList.add('hidden');
 
    setTimeout(() => {
      envelope.classList.add('faded');
    }, 750);
 
    setTimeout(() => {
      card.classList.add('show');
      spawnPetals();
    }, 950);
  });
 
  // --- falling petals, triggered once the card finishes appearing ---
  const petalLayer = document.getElementById('petalLayer');
  const petalPalette = ['#E08FA0', '#F0C9A8', '#EAC8D6', '#D98C56', '#C76B4A'];
 
  function makePetalShape(color) {
    const span = document.createElement('span');
    span.style.display = 'block';
    span.style.width = '12px';
    span.style.height = '16px';
    span.style.background = color;
    span.style.borderRadius = '60% 10% 60% 10%';
    return span;
  }
 
  function spawnPetals() {
    const count = 18;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      const left = Math.random() * 100;
      const delay = Math.random() * 0.6;
      const duration = 2.6 + Math.random() * 1.6;
      const drift = (Math.random() * 80 - 40) + 'px';
      const spin = (Math.random() * 360 + 180) + 'deg';
      petal.style.left = left + 'vw';
      petal.style.animationDelay = delay + 's';
      petal.style.animationDuration = duration + 's';
      petal.style.setProperty('--drift', drift);
      petal.style.setProperty('--spin', spin);
      const color = petalPalette[Math.floor(Math.random() * petalPalette.length)];
      petal.appendChild(makePetalShape(color));
      petalLayer.appendChild(petal);
      setTimeout(() => petal.remove(), (delay + duration + 0.3) * 1000);
    }
  }
 
  // --- gift box: click to open, reveal the voucher ---
  giftBox.addEventListener('click', () => {
    if (giftBox.classList.contains('opened')) return;
    giftBox.classList.add('opened');
 
    setTimeout(() => {
      giftBox.classList.add('faded');
    }, 600);
 
    setTimeout(() => {
      voucher.classList.add('show');
    }, 500);
  });
 
  // --- countdown gate: locked until June 22, 00:00 Poland time (Europe/Warsaw) ---
  const TARGET_MONTH = 6;  // June
  const TARGET_DAY = 22;
  const TARGET_YEAR = 2026;
 
  function getPolandOffsetMinutes(date) {
    // Reads the actual UTC offset Europe/Warsaw has at the given instant,
    // so it automatically handles CET (winter) vs CEST (summer).
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Warsaw',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZoneName: 'shortOffset'
    }).formatToParts(date);
    const tzPart = parts.find((p) => p.type === 'timeZoneName');
    if (!tzPart) return 120; // fallback: CEST
    const match = tzPart.value.match(/GMT([+-]\d+)(?::(\d+))?/);
    if (!match) return 120;
    const hours = parseInt(match[1], 10);
    const mins = match[2] ? parseInt(match[2], 10) : 0;
    return hours * 60 + (hours < 0 ? -mins : mins);
  }
 
  function getTargetUTC() {
    // Build a UTC timestamp for "TARGET_DAY TARGET_MONTH TARGET_YEAR, 00:00" in Poland time.
    const approx = new Date(Date.UTC(TARGET_YEAR, TARGET_MONTH - 1, TARGET_DAY, 0, 0, 0));
    const offsetMin = getPolandOffsetMinutes(approx);
    return new Date(approx.getTime() - offsetMin * 60000);
  }
 
  function pad(n) { return String(n).padStart(2, '0'); }
 
  let unlocked = false;
 
  function unlock() {
    if (unlocked) return;
    unlocked = true;
    countdownGate.classList.add('hidden');
    quiz.classList.remove('hidden');
  }
 
  function tickCountdown() {
    if (unlocked) return;
    const target = getTargetUTC();
    const now = new Date();
    const diff = target.getTime() - now.getTime();
 
    if (diff <= 0) {
      unlock();
      return;
    }
 
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
 
    document.getElementById('cdDays').textContent = pad(days);
    document.getElementById('cdHours').textContent = pad(hours);
    document.getElementById('cdMinutes').textContent = pad(minutes);
    document.getElementById('cdSeconds').textContent = pad(seconds);
  }
 
  tickCountdown();
  setInterval(tickCountdown, 1000);
 
  // TEMP: remove this block before sending the real link
  const testSkipBtn = document.getElementById('testSkipBtn');
  if (testSkipBtn) {
    testSkipBtn.addEventListener('click', unlock);
  }
 
  applyLang('es');
