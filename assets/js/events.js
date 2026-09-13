/* Events calendar + filtered list for the events page.
   Data comes from #events-data, rendered by layouts/partials/func/events.html. */
(function () {
  'use strict';

  var root = document.getElementById('events-app');
  var dataEl = document.getElementById('events-data');
  if (!root || !dataEl) return;

  var EVENTS = [];
  try { EVENTS = JSON.parse(dataEl.textContent) || []; } catch (e) { return; }

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
  var PER_PAGE = 6;
  var FAMILY = { All: null, Meetups: 'meetup', Workshops: 'workshop', News: 'news' };

  function iso(y, m, d) {
    return y + '-' + String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0');
  }

  var now = new Date();
  var TODAY = iso(now.getFullYear(), now.getMonth() + 1, now.getDate());

  var byDate = EVENTS.slice().sort(function (a, b) { return a.iso < b.iso ? -1 : a.iso > b.iso ? 1 : 0; });
  var upcoming = byDate.filter(function (e) { return e.iso >= TODAY; });
  var anchor = upcoming.length ? upcoming[0].iso
             : (byDate.length ? byDate[byDate.length - 1].iso : TODAY);

  var state = {
    year: Number(anchor.slice(0, 4)),
    month: Number(anchor.slice(5, 7)),
    selected: null,
    scope: upcoming.length ? 'upcoming' : 'past',
    filter: 'All',
    page: 1
  };

  var el = {
    month: document.getElementById('cal-month'),
    grid: document.getElementById('cal-grid'),
    selected: document.getElementById('cal-selected'),
    prev: document.getElementById('cal-prev'),
    next: document.getElementById('cal-next'),
    scopes: document.getElementById('ev-scopes'),
    filters: document.getElementById('ev-filters'),
    list: document.getElementById('ev-list'),
    pager: document.getElementById('ev-pager')
  };

  function eventsOn(day) {
    return EVENTS.filter(function (e) { return e.iso === day; });
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------- calendar ---------- */

  function renderCalendar() {
    var y = state.year, m = state.month;
    el.month.textContent = MONTHS[m - 1] + ' ' + y;
    el.grid.innerHTML = '';

    var first = new Date(y, m - 1, 1);
    var lead = (first.getDay() + 6) % 7;          // Monday-first
    var daysIn = new Date(y, m, 0).getDate();
    var prevDays = new Date(y, m - 1, 0).getDate();
    var frag = document.createDocumentFragment();

    for (var i = 0; i < lead; i++) {
      frag.appendChild(outCell(prevDays - lead + i + 1));
    }
    for (var d = 1; d <= daysIn; d++) {
      frag.appendChild(dayCell(y, m, d));
    }
    var tail = 1;
    while ((lead + daysIn + tail - 1) % 7 !== 0) {
      frag.appendChild(outCell(tail++));
    }
    el.grid.appendChild(frag);
  }

  function outCell(num) {
    var div = document.createElement('div');
    div.className = 'cal-cell cal-cell--out';
    div.innerHTML = '<span class="cal-cell__num">' + num + '</span>';
    return div;
  }

  function dayCell(y, m, d) {
    var day = iso(y, m, d);
    var evs = eventsOn(day);
    var node, num;

    if (!evs.length) {
      node = document.createElement('div');
      node.className = 'cal-cell';
      num = '<span class="cal-cell__num">' + d + '</span>';
      node.innerHTML = num;
      return node;
    }

    var e = evs[0];
    var extra = evs.length > 1 ? ' +' + (evs.length - 1) : '';
    node = document.createElement('button');
    node.type = 'button';
    node.className = 'cal-cell cal-cell--event' + (state.selected === day ? ' cal-cell--selected' : '');
    node.style.background = e.bg;
    node.style.borderColor = e.border;
    node.setAttribute('aria-pressed', state.selected === day ? 'true' : 'false');
    node.setAttribute('aria-label', e.full + ' — ' + e.title + (extra ? extra + ' more' : ''));
    node.innerHTML =
      '<span class="cal-cell__num" style="color:' + e.fg + '">' + d + '</span>' +
      '<span class="cal-cell__label" style="color:' + e.fg + '">' + esc(e.short) + esc(extra) + '</span>' +
      '<span class="cal-cell__dot" style="background:' + e.fg + '"></span>';
    node.addEventListener('click', function () {
      state.selected = state.selected === day ? null : day;
      renderCalendar();
      renderSelected();
    });
    return node;
  }

  function renderSelected() {
    if (!state.selected) { el.selected.innerHTML = ''; return; }
    var evs = eventsOn(state.selected);
    if (!evs.length) { el.selected.innerHTML = ''; return; }

    el.selected.innerHTML = evs.map(function (e) {
      return '<div class="cal-selected">' +
        '<div class="cal-selected__head">' +
          '<span class="tag" style="color:' + e.fg + '">' + esc(e.label) + '</span>' +
          '<span class="event-card__date">' + esc(e.full) + '</span>' +
        '</div>' +
        '<h3>' + (e.hasBody ? '<a href="' + esc(e.url) + '">' + esc(e.display) + '</a>' : esc(e.display)) + '</h3>' +
        (e.meta ? '<div class="cal-selected__meta">' + esc(e.meta) + '</div>' : '') +
        (e.register
          ? '<a class="btn btn-primary btn-sm" style="margin-top:14px" href="' + esc(e.register) + '" target="_blank" rel="noopener">' + esc(e.cta) + '</a>'
          : (e.hasBody ? '<a class="btn btn-secondary btn-sm" style="margin-top:14px" href="' + esc(e.url) + '">Read more</a>' : '')) +
      '</div>';
    }).join('');
  }

  /* ---------- list ---------- */

  function pool() {
    var fam = FAMILY[state.filter];
    return byDate
      .filter(function (e) { return state.scope === 'upcoming' ? e.iso >= TODAY : e.iso < TODAY; })
      .filter(function (e) { return !fam || e.family === fam; })
      .sort(function (a, b) {
        return state.scope === 'upcoming'
          ? (a.iso < b.iso ? -1 : 1)
          : (a.iso < b.iso ? 1 : -1);
      });
  }

  function renderList() {
    var items = pool();
    var pageCount = Math.max(1, Math.ceil(items.length / PER_PAGE));
    if (state.page > pageCount) state.page = pageCount;
    var slice = items.slice((state.page - 1) * PER_PAGE, state.page * PER_PAGE);

    el.list.innerHTML = slice.length
      ? slice.map(card).join('')
      : '<div class="empty-note">' +
          (state.scope === 'upcoming'
            ? 'No dates announced yet — subscribe below, or browse past events.'
            : 'Nothing here yet — try another filter.') +
        '</div>';

    renderPager(pageCount, items.length);
  }

  function card(e) {
    return '<article class="event-card">' +
      '<div class="event-card__head">' +
        '<span class="tag" style="color:' + e.fg + '">' + esc(e.label) + '</span>' +
        '<span class="event-card__date">' + esc(e.full) + '</span>' +
      '</div>' +
      '<h3>' + (e.hasBody ? '<a href="' + esc(e.url) + '">' + esc(e.display) + '</a>' : esc(e.display)) + '</h3>' +
      (e.meta ? '<div class="event-card__meta">' + esc(e.meta) + '</div>' : '') +
      (e.register
        ? '<a class="btn btn-primary btn-sm" style="margin-top:14px" href="' + esc(e.register) + '" target="_blank" rel="noopener">' + esc(e.cta) + '</a>'
        : '') +
    '</article>';
  }

  /* First page, last page, and a window around the current one; null = ellipsis. */
  function pageWindow(pageCount) {
    if (pageCount <= 7) {
      return Array.from({ length: pageCount }, function (_, i) { return i + 1; });
    }
    var want = [1, pageCount, state.page, state.page - 1, state.page + 1];
    var keep = want.filter(function (n) { return n >= 1 && n <= pageCount; })
                   .sort(function (a, b) { return a - b; })
                   .filter(function (n, i, a) { return a.indexOf(n) === i; });
    var out = [];
    keep.forEach(function (n, i) {
      if (i && n - keep[i - 1] > 1) out.push(null);
      out.push(n);
    });
    return out;
  }

  function renderPager(pageCount, total) {
    if (pageCount <= 1) {
      el.pager.innerHTML = total
        ? '<div class="pager"><span class="pager__info">' + total + (total === 1 ? ' event' : ' events') + '</span></div>'
        : '';
      return;
    }
    var html = '<div class="pager">';
    html += '<button type="button" data-page="' + (state.page - 1) + '"' +
            (state.page === 1 ? ' disabled' : '') + ' aria-label="Previous page">←</button>';
    pageWindow(pageCount).forEach(function (n) {
      if (n === null) {
        html += '<span class="pager__gap" aria-hidden="true">…</span>';
        return;
      }
      html += '<button type="button" data-page="' + n + '"' +
              (n === state.page ? ' class="is-active" aria-current="page"' : '') + '>' + n + '</button>';
    });
    html += '<button type="button" data-page="' + (state.page + 1) + '"' +
            (state.page === pageCount ? ' disabled' : '') + ' aria-label="Next page">→</button>';
    html += '<span class="pager__info">' + total + (total === 1 ? ' event' : ' events') + '</span>';
    html += '</div>';
    el.pager.innerHTML = html;
  }

  /* ---------- controls ---------- */

  function syncButtons(container, attr, value) {
    Array.prototype.forEach.call(container.querySelectorAll('button'), function (b) {
      var on = b.getAttribute(attr) === value;
      b.classList.toggle('is-active', on);
      if (b.hasAttribute('role')) b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  el.prev.addEventListener('click', function () { shift(-1); });
  el.next.addEventListener('click', function () { shift(1); });

  function shift(delta) {
    var d = new Date(state.year, state.month - 1 + delta, 1);
    state.year = d.getFullYear();
    state.month = d.getMonth() + 1;
    renderCalendar();
  }

  el.scopes.addEventListener('click', function (ev) {
    var b = ev.target.closest('button[data-scope]');
    if (!b) return;
    state.scope = b.getAttribute('data-scope');
    state.page = 1;
    syncButtons(el.scopes, 'data-scope', state.scope);
    renderList();
  });

  el.filters.addEventListener('click', function (ev) {
    var b = ev.target.closest('button[data-filter]');
    if (!b) return;
    state.filter = b.getAttribute('data-filter');
    state.page = 1;
    syncButtons(el.filters, 'data-filter', state.filter);
    renderList();
  });

  el.pager.addEventListener('click', function (ev) {
    var b = ev.target.closest('button[data-page]');
    if (!b || b.disabled) return;
    state.page = Number(b.getAttribute('data-page'));
    renderList();
    el.list.scrollIntoView({ block: 'nearest' });
  });

  syncButtons(el.scopes, 'data-scope', state.scope);
  syncButtons(el.filters, 'data-filter', state.filter);
  renderCalendar();
  renderSelected();
  renderList();
})();
