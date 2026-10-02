var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, t) { n++; if (!(Math.abs(a - b) <= (t == null ? 1e-9 : t))) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// Published aptitude-test answers: successive discounts 10% and 20% = single 28% (prepp.in, testbook.com, adda247.com)
eq(E.stack(100, [10, 20]).effective, 28, '10+20 = 28'); eq(E.stack(100, [20, 10]).effective, 28, 'order does not matter'); eq(E.stack(100, [10, 20]).final, 72, 'final 72');
// 30% then 20% = 44% off, not 50%
eq(E.stack(100, [30, 20]).effective, 44, '30+20 = 44'); eq(E.stack(100, [30, 20]).final, 56, '56'); eq(E.stack(100, [30, 20]).naive, 50, 'naive 50');
// 50% off then 50% off = 75%, not 100%
eq(E.stack(80, [50, 50]).effective, 75, '50+50 = 75'); eq(E.stack(80, [50, 50]).final, 20, '80 -> 20');
// single discount equals itself; no discounts
eq(E.stack(200, [25]).final, 150, 'single'); eq(E.stack(200, []).final, 200, 'none'); eq(E.stack(200, []).effective, 0, 'none eff');
// 100% then anything is free
eq(E.stack(50, [100, 20]).final, 0, 'free');
// step detail
var s = E.stack(100, [30, 20]).steps; eq(s[0].after, 70, 'step1'); eq(s[1].before, 70, 'step2 before'); eq(s[1].after, 56, 'step2 after'); eq(s[1].saved, 14, 'step2 saved 14, not 20');
// three stacked: 10, 10, 10 = 27.1%
eq(E.stack(1000, [10, 10, 10]).effective, 27.1, '3x10', 1e-9); eq(E.stack(1000, [10, 10, 10]).final, 729, '729', 1e-9);
// undo: after +25% need -20%; after -50% need +100%; after -20% need +25%; after +100% need -50%
eq(E.undo(25), -20, 'undo +25'); eq(E.undo(-50), 100, 'undo -50'); eq(E.undo(-20), 25, 'undo -20'); eq(E.undo(100), -50, 'undo +100'); eq(E.undo(0), 0, 'undo 0');
// better offer: 40% off vs 30%+15% (= 40.5%): second wins; 50% vs 30+30 (=51%)
is(E.better(100, [40], [30, 15]), 'B', '30+15 beats 40'); is(E.better(100, [50], [30, 20]), 'A', '50 beats 30+20'); is(E.better(100, [20, 10], [10, 20]), 'tie', 'tie');
// target
eq(E.pctFor(80, 60), 25, 'to hit 60'); eq(E.pctFor(100, 100), 0, 'no discount');
// formatting
is(E.money(1234.5), '$1,234.50', 'money'); is(E.pct(28), '28%', 'pct28'); is(E.pct(27.1), '27.1%', 'pct27.1'); is(E.pct(44), '44%', 'pct44');
console.log((n - bad) + '/' + n + ' passed'); process.exit(bad ? 1 : 0);
