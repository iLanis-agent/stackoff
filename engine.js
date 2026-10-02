(function (root) {
  'use strict';
  function r2(v) { return Math.round(v * 100) / 100; }
  // Successive discounts multiply the remaining fractions: final = P * prod(1 - d_i/100)
  function stack(price, discounts) {
    var f = 1, steps = [], p = price, i;
    for (i = 0; i < discounts.length; i++) { var before = p; f *= 1 - discounts[i] / 100; p = price * f; steps.push({ pct: discounts[i], before: before, after: p, saved: before - p }); }
    return { final: p, effective: (1 - f) * 100, naive: discounts.reduce(function (a, b) { return a + b; }, 0), steps: steps, saved: price - p };
  }
  // Percent change needed to undo a percent change: after x% change, need (1/(1+x/100) - 1)*100
  function undo(pct) { return (1 / (1 + pct / 100) - 1) * 100; }
  // Compare two offers by final price
  function better(price, a, b) { var fa = stack(price, a).final, fb = stack(price, b).final; return Math.abs(fa - fb) < 0.005 ? 'tie' : fa < fb ? 'A' : 'B'; }
  // Discount needed to hit a target price
  function pctFor(price, target) { return (1 - target / price) * 100; }
  function money(v) { return '$' + r2(v).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function pct(v) { var s = (Math.round(v * 100) / 100).toFixed(2).replace(/\.?0+$/, ''); return s + '%'; }
  var api = { stack: stack, undo: undo, better: better, pctFor: pctFor, money: money, pct: pct, r2: r2 };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Off = api;
})(typeof window !== 'undefined' ? window : this);
