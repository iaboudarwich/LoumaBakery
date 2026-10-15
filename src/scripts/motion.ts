/**
 * Louma motion engine. Target feel: a printed menu.
 *
 * The COMPLETE effect list (everything else was removed on purpose):
 *  - scrollDraw: the 404 page's face traces its outline once
 *  - doodleDraw: doodles reveal left to right (filled) or draw their stroke
 *  - reveal: fade + settle 16px DOWNWARD (or fade in place), staggered children
 *  - toast: transient notices (functional UI)
 * Photos never animate (no zoom, wipe, parallax or tilt).
 *
 * Every effect: flag-gated (features.ts, overridable on /review), one-shot at
 * ~30% in view, suppressed under reduced-motion (final state shown at once).
 */
import { animate, inView } from 'motion';
import { features } from '../config/features';

type Cleanup = () => void;
const cleanups = new Map<string, Cleanup[]>();
const add = (name: string, fn: Cleanup) => {
  if (!cleanups.has(name)) cleanups.set(name, []);
  cleanups.get(name)!.push(fn);
};
const stopEffect = (name: string) => {
  const list = cleanups.get(name);
  if (!list) return;
  list.forEach((fn) => { try { fn(); } catch { /* ignore */ } });
  cleanups.set(name, []);
};

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

declare global {
  interface Window {
    __FX?: Record<string, boolean>;
    LoumaFX?: {
      names: string[];
      meta: Record<string, string>;
      isOn: (n: string) => boolean;
      isAvailable: (n: string) => boolean;
      setEnabled: (n: string, on: boolean) => void;
      toast: (msg: string, opts?: { tone?: 'default' | 'good' }) => void;
    };
  }
}

const flagOn = (name: string): boolean => {
  const ov = window.__FX;
  if (ov && name in ov) return !!ov[name];
  return !!(features as Record<string, boolean>)[name];
};
const available = (): boolean => !reduced();
const enabled = (name: string) => flagOn(name) && available();

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

const EASE = [0.22, 1, 0.36, 1] as const;

/* ============================================================ EFFECTS === */

const builders: Record<string, () => void> = {
  // --- Sketch draw when seen (one-shot; never left invisible) ---
  scrollDraw() {
    $('[data-anim="scroll-draw"]').forEach((svg) => {
      const strokes = Array.from(svg.querySelectorAll<SVGPathElement>('path'))
        .filter((p) => getComputedStyle(p).fill === 'none' || svg.getAttribute('fill') === 'none');
      if (strokes.length) drawOnScroll(svg, strokes);
    });
    // Face marks: draw the stroked outline on scroll-in, settle back to filled.
    $('[data-face-draw]').forEach((svg) => {
      const strokes = Array.from(svg.querySelectorAll<SVGPathElement>('.ff-strokes path'));
      if (strokes.length) drawOnScroll(svg, strokes, svg);
    });
  },

  // --- Reveal: fade + settle DOWNWARD (start above, come to rest), or fade
  //     in place with data-reveal="fade". data-reveal-children staggers.
  //     ONE shared IntersectionObserver for every reveal element. ---
  reveal() {
    const els = $('[data-anim="reveal"]');
    if (!els.length) return;
    const prep = new Map<Element, HTMLElement[]>();
    els.forEach((el) => {
      const staggered = el.hasAttribute('data-reveal-children');
      const inPlace = el.getAttribute('data-reveal') === 'fade';
      const targets = (staggered ? Array.from(el.children) : [el]) as HTMLElement[];
      if (staggered) (el as HTMLElement).style.opacity = '1';
      targets.forEach((t) => { t.style.opacity = '0'; if (!inPlace) t.style.transform = 'translateY(-16px)'; });
      prep.set(el, targets);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        // ~30% in view: 30% of the element, OR 30% of the viewport for
        // sections taller than the screen (a long menu category can't show
        // 30% of itself on a phone until the user has already scrolled past).
        const rootH = e.rootBounds?.height ?? window.innerHeight;
        if (!e.isIntersecting || (e.intersectionRatio < 0.3 && e.intersectionRect.height < rootH * 0.3)) return;
        io.unobserve(e.target); // one-shot
        const el = e.target;
        const inPlace = el.getAttribute('data-reveal') === 'fade';
        const targets = prep.get(el) ?? [];
        // Stagger: 80ms by default; data-reveal-stagger (ms) and
        // data-reveal-cap (items) tune it, e.g. the menu's 40ms capped at 8.
        const step = Number(el.getAttribute('data-reveal-stagger') ?? 80) / 1000;
        const cap = Number(el.getAttribute('data-reveal-cap') ?? Infinity);
        targets.forEach((t, i) => {
          animate(
            t,
            { opacity: 1, ...(inPlace ? {} : { transform: 'translateY(0px)' }) },
            { duration: 0.5, delay: targets.length > 1 ? Math.min(i, cap) * step : 0, ease: EASE },
          );
        });
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: [0, 0.1, 0.2, 0.3] });
    els.forEach((el) => io.observe(el));
    add('reveal', () => {
      io.disconnect();
      prep.forEach((targets) => targets.forEach((t) => { t.style.opacity = ''; t.style.transform = ''; }));
    });
  },

  // --- Doodles (Doodle.astro): one-shot when 30% of the drawing is in view,
  //     900ms. Filled outlines reveal left to right with a clip-path; stroked
  //     art draws via pathLength. inView watches the unclipped wrapper
  //     (Chromium factors clip-path into intersection geometry). A watchdog
  //     shows any doodle that is on screen but never reported in view. ---
  doodleDraw() {
    $<SVGSVGElement>('[data-doodle]').forEach((svg) => {
      const mode = svg.getAttribute('data-doodle');
      const wrap = svg.parentElement ?? svg;
      const strokes = mode === 'stroke'
        ? $<SVGGeometryElement>('path, line, polyline, circle, ellipse, rect', svg)
        : [];
      let done = false;
      const finish = () => {
        svg.style.clipPath = 'inset(0 0% 0 0)';
        strokes.forEach((p) => { p.style.strokeDashoffset = '0'; });
      };
      const play = () => {
        if (done) return;
        done = true;
        stop();
        clearTimeout(safety);
        if (mode === 'stroke') {
          strokes.forEach((p) => {
            animate(p, { strokeDashoffset: [1, 0] }, { duration: 0.9, ease: EASE }).finished.then(() => { p.style.strokeDashoffset = '0'; });
          });
        } else {
          animate(svg, { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] }, { duration: 0.9, ease: EASE })
            .finished.then(finish);
        }
      };
      const stop = inView(wrap, () => { play(); }, { amount: 0.3 });
      let safety = 0;
      const watchdog = () => {
        if (done) return;
        const r = wrap.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight && r.width > 0) play();
        else safety = window.setTimeout(watchdog, 2500);
      };
      safety = window.setTimeout(watchdog, 2500);
      add('doodleDraw', () => { stop(); clearTimeout(safety); finish(); });
    });
  },

  // --- Toast: registers the API; toasts fired by forms etc. ---
  toast() {
    add('toast', () => {});
  },
};

// Simultaneous-draw cap: at most 2 sketches animate at once.
let activeDraws = 0;
const drawQueue: Array<() => void> = [];
function runDraw(fn: () => void) {
  if (activeDraws < 2) { activeDraws++; fn(); }
  else drawQueue.push(fn);
}
function drawDone() {
  activeDraws--;
  const next = drawQueue.shift();
  if (next) { activeDraws++; next(); }
}

// One-shot stroke draw when an element scrolls into view (IO + WAAPI).
// Never left invisible: reduced-motion shows the final state, and a watchdog
// rescues a mark that is on screen but whose IO never fired.
function drawOnScroll(svg: Element, strokes: SVGPathElement[], face?: Element) {
  const lens = strokes.map((p) => p.getTotalLength());
  strokes.forEach((p, i) => { p.style.strokeDasharray = String(lens[i]); p.style.strokeDashoffset = String(lens[i]); });

  const settleFilled = () => { if (face) face.classList.remove('is-drawing'); };
  const showFinal = () => {
    if (!face) strokes.forEach((p) => { p.style.strokeDashoffset = '0'; });
    settleFilled();
  };
  if (reduced()) { showFinal(); return; }

  const step = Math.min(80, Math.floor(700 / strokes.length));
  let done = false;
  const draw = () => {
    if (done) return;
    done = true;
    io.disconnect();
    clearTimeout(safety);
    // Cap simultaneous draws (iPhone GPUs): at most 2 run at once; extra marks
    // queue and start as slots free up.
    runDraw(() => {
      if (face) face.classList.add('is-drawing');
      strokes.forEach((p) => { p.style.willChange = 'stroke-dashoffset'; });
      let maxEnd = 0;
      strokes.forEach((p, i) => {
        const delay = i * step;
        p.animate(
          [{ strokeDashoffset: lens[i] }, { strokeDashoffset: 0 }],
          { duration: 1100, delay, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' },
        );
        p.style.strokeDashoffset = '0';
        maxEnd = Math.max(maxEnd, delay + 1100);
      });
      window.setTimeout(() => {
        strokes.forEach((p) => { p.style.willChange = ''; });
        settleFilled();
        drawDone();
      }, maxEnd + 150);
    });
  };

  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) draw();
  }, { threshold: 0.35 });
  io.observe(svg);
  let safety = 0;
  const watchdog = () => {
    if (done) return;
    const r = svg.getBoundingClientRect();
    if (r.bottom > 0 && r.top < window.innerHeight && r.width > 0) draw();
    else safety = window.setTimeout(watchdog, 2500);
  };
  safety = window.setTimeout(watchdog, 2500);

  add('scrollDraw', () => {
    io.disconnect();
    clearTimeout(safety);
    strokes.forEach((p) => { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; });
    settleFilled();
  });
}

/* ============================================================ TOAST ===== */
function ensureToastRegion(): HTMLElement {
  let r = document.getElementById('toast-region');
  if (!r) {
    r = document.createElement('div');
    r.id = 'toast-region';
    r.setAttribute('role', 'status');
    r.setAttribute('aria-live', 'polite');
    document.body.appendChild(r);
  }
  return r;
}
function toast(msg: string, opts: { tone?: 'default' | 'good' } = {}) {
  if (!flagOn('toast')) return;
  const region = ensureToastRegion();
  const t = document.createElement('div');
  t.className = `toast ${opts.tone === 'good' ? 'toast--good' : ''}`;
  t.textContent = msg;
  region.appendChild(t);
  if (reduced()) {
    setTimeout(() => t.remove(), 2600);
    return;
  }
  animate(t, { opacity: [0, 1], transform: ['translateY(-10px)', 'translateY(0px)'] }, { duration: 0.3, ease: EASE });
  setTimeout(() => {
    animate(t, { opacity: [1, 0] }, { duration: 0.3 }).finished.then(() => t.remove());
  }, 2600);
}

/* ============================================================ DRIVER ==== */
const NAMES = Object.keys(builders);
const META: Record<string, string> = {
  scrollDraw: 'The 404 page face traces its outline once.',
  doodleDraw: 'Doodles reveal left to right once when seen.',
  reveal: 'Sections fade in and settle downward, children staggered.',
  toast: 'Transient corner notices.',
};

function setEnabled(name: string, on: boolean) {
  if (!window.__FX) window.__FX = {};
  window.__FX[name] = on;
  stopEffect(name);
  if (enabled(name) && builders[name]) {
    try { builders[name](); } catch { /* ignore */ }
  }
}

function initAll() {
  NAMES.forEach((name) => {
    stopEffect(name);
    if (enabled(name) && builders[name]) {
      try { builders[name](); } catch { /* ignore */ }
    }
  });
}

window.LoumaFX = {
  names: NAMES,
  meta: META,
  isOn: (n) => flagOn(n),
  isAvailable: () => available(),
  setEnabled,
  toast,
};

// Full page loads only (no view-transition router).
if (document.readyState !== 'loading') initAll();
else document.addEventListener('DOMContentLoaded', initAll, { once: true });
// Kept for compatibility if a router is ever reintroduced.
document.addEventListener('astro:page-load', initAll);
