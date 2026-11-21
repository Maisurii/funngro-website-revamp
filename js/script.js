/* ==========================================================================
   Funngro Website Revamp — shared interactions
   - Sticky header state
   - Accessible mobile menu (Esc to close, focus return, outside click)
   - FAQ accordion (aria-expanded / aria-controls, animated height)
   - Category explorer tabs (WAI-ARIA tabs pattern, arrow-key support)
   - Scroll-reveal via IntersectionObserver (respects reduced motion)
   - Active nav link on scroll
   - Current year in footer
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header scroll state ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      var first = nav.querySelector('a');
      if (first) first.focus();
    }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') === 'true' && !nav.contains(e.target) && !toggle.contains(e.target)) {
        setMenu(false);
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960 && toggle.getAttribute('aria-expanded') === 'true') setMenu(false);
    });
  }

  /* ---------- FAQ accordion ---------- */
  var faqButtons = document.querySelectorAll('.faq__btn');
  Array.prototype.forEach.call(faqButtons, function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    // Collapse all panels once JS is confirmed (content stays readable without JS).
    panel.hidden = true;
    panel.style.height = '0px';

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      clearTimeout(panel._faqTimer);
      if (open) {
        panel.style.height = panel.scrollHeight + 'px';
        void panel.offsetHeight; // commit the pixel height so the collapse animates
        panel.style.height = '0px';
        // Hide after the animation; a timer (not transitionend) so it always runs.
        panel._faqTimer = setTimeout(function () {
          if (btn.getAttribute('aria-expanded') === 'false') panel.hidden = true;
        }, reduceMotion ? 0 : 380);
      } else {
        panel.hidden = false;
        panel.style.height = panel.scrollHeight + 'px';
        panel._faqTimer = setTimeout(function () {
          if (btn.getAttribute('aria-expanded') === 'true') panel.style.height = 'auto';
        }, reduceMotion ? 0 : 380);
      }
    });
  });

  /* ---------- Tabs (category explorer) ---------- */
  var tablists = document.querySelectorAll('[role="tablist"]');
  Array.prototype.forEach.call(tablists, function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (!p) return;
        p.hidden = !selected;
        if (selected && !reduceMotion) {
          p.classList.remove('is-entering');
          void p.offsetWidth; // restart animation
          p.classList.add('is-entering');
        }
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') next = tabs[0];
        if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    Array.prototype.forEach.call(revealEls, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(revealEls, function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Active nav link while scrolling ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.primary-nav ul a[href^="#"]'));
  if (navLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    navLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if (sec) map[id] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = map[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'location');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { spy.observe(document.getElementById(id)); });
  }

  /* ---------- Footer year ---------- */
  var year = document.querySelectorAll('[data-year]');
  Array.prototype.forEach.call(year, function (el) { el.textContent = String(new Date().getFullYear()); });
})();
