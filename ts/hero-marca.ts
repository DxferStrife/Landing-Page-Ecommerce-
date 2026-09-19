(() => {
  const hero = document.querySelector<HTMLElement>(".hero-brand");
  if (!hero) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Grid de fondo: las líneas se engrosan cerca del cursor ----------
  const canvas = hero.querySelector<HTMLCanvasElement>(".hero-brand-grid");
  const ctx = canvas?.getContext("2d") ?? null;

  if (canvas && ctx) {
    const CELL = 60;
    const RADIUS = 190;
    const BASE_WIDTH = 1;
    const MAX_WIDTH = 3.4;
    const BASE_ALPHA = 0.06;
    const MAX_ALPHA = 0.42;
    const STEP = 6;

    let width = 0;
    let height = 0;
    let targetX = -9999;
    let targetY = -9999;
    let curX = -9999;
    let curY = -9999;
    let intensity = 0;
    let targetIntensity = 0;
    let rafId = 0;
    // El color de las líneas invierte con el tema (--hero-grid-rgb en variables.css).
    let lineRGB = "242,242,240";

    const readLineColor = () => {
      const valor = getComputedStyle(hero).getPropertyValue("--hero-grid-rgb").trim();
      if (valor) lineRGB = valor;
    };

    const resize = () => {
      readLineColor();
      const rect = hero.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = BASE_WIDTH;
      ctx.strokeStyle = `rgba(${lineRGB},${BASE_ALPHA})`;
      ctx.beginPath();
      for (let x = 0; x <= width; x += CELL) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      for (let y = 0; y <= height; y += CELL) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();

      if (intensity < 0.01) return;

      const strokeSegment = (x1: number, y1: number, x2: number, y2: number) => {
        const dist = Math.hypot((x1 + x2) / 2 - curX, (y1 + y2) / 2 - curY);
        if (dist >= RADIUS) return;
        const falloff = (1 - dist / RADIUS) ** 2 * intensity;
        ctx.lineWidth = BASE_WIDTH + (MAX_WIDTH - BASE_WIDTH) * falloff;
        ctx.strokeStyle = `rgba(${lineRGB},${BASE_ALPHA + (MAX_ALPHA - BASE_ALPHA) * falloff})`;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      };

      const firstCol = Math.max(0, Math.ceil((curX - RADIUS) / CELL));
      const lastCol = Math.floor((curX + RADIUS) / CELL);
      for (let col = firstCol; col <= lastCol; col++) {
        const x = col * CELL + 0.5;
        for (let y = Math.max(0, curY - RADIUS); y < Math.min(height, curY + RADIUS); y += STEP) {
          strokeSegment(x, y, x, y + STEP);
        }
      }
      const firstRow = Math.max(0, Math.ceil((curY - RADIUS) / CELL));
      const lastRow = Math.floor((curY + RADIUS) / CELL);
      for (let row = firstRow; row <= lastRow; row++) {
        const y = row * CELL + 0.5;
        for (let x = Math.max(0, curX - RADIUS); x < Math.min(width, curX + RADIUS); x += STEP) {
          strokeSegment(x, y, x + STEP, y);
        }
      }
    };

    const tick = () => {
      curX += (targetX - curX) * 0.2;
      curY += (targetY - curY) * 0.2;
      intensity += (targetIntensity - intensity) * 0.12;
      draw();
      const settled =
        Math.abs(targetX - curX) < 0.5 &&
        Math.abs(targetY - curY) < 0.5 &&
        Math.abs(targetIntensity - intensity) < 0.01;
      rafId = settled ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    if (!reducedMotion) {
      hero.addEventListener("pointermove", (event) => {
        const rect = hero.getBoundingClientRect();
        targetX = event.clientX - rect.left;
        targetY = event.clientY - rect.top;
        if (targetIntensity === 0) {
          curX = targetX;
          curY = targetY;
        }
        targetIntensity = 1;
        wake();
      });
      hero.addEventListener("pointerleave", () => {
        targetIntensity = 0;
        wake();
      });
    }

    new ResizeObserver(resize).observe(hero);
    new MutationObserver(() => {
      readLineColor();
      draw();
    }).observe(document.documentElement, { attributeFilter: ["data-theme"] });
    resize();
  }

  // ---------- Texto que se "escribe" en la zona superior ----------
  const typed = hero.querySelector<HTMLElement>(".hero-brand-typed");
  const typedText = hero.querySelector<HTMLElement>(".hero-brand-typed-text");
  const palabras = (typed?.dataset.palabras ?? "")
    .split("|")
    .map((p) => p.trim())
    .filter(Boolean);

  if (typed && typedText && palabras.length > 1 && !reducedMotion) {
    const TYPE_MS = 85;
    const DELETE_MS = 40;
    const HOLD_MS = 1700;
    const GAP_MS = 350;

    let indice = 0;
    let escritas = 0;
    let borrando = false;
    typedText.textContent = "";

    const paso = () => {
      const palabra = palabras[indice];
      if (!borrando) {
        escritas++;
        typedText.textContent = palabra.slice(0, escritas);
        if (escritas >= palabra.length) {
          borrando = true;
          window.setTimeout(paso, HOLD_MS);
          return;
        }
        window.setTimeout(paso, TYPE_MS);
      } else {
        escritas--;
        typedText.textContent = palabra.slice(0, escritas);
        if (escritas <= 0) {
          borrando = false;
          indice = (indice + 1) % palabras.length;
          window.setTimeout(paso, GAP_MS);
          return;
        }
        window.setTimeout(paso, DELETE_MS);
      }
    };

    window.setTimeout(paso, 900);
  }
})();
