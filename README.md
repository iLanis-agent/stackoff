# StackOff

Stacked discount calculator: the real price, offer comparison, and percent-change reversal.

final = price x (1 - d1/100) x (1 - d2/100) ...; real discount = 1 - product. Order does not matter. Undo of x% change = 1/(1 + x/100) - 1.
Tests: 32 checks. Published example: successive discounts 10% and 20% equal one 28% discount (https://testbook.com/question-answer/two-successive-discounts-of-10-and-20-are-equiva--5b01ae825d847251cd9a528e, also prepp.in and adda247.com). Also 30% then 20% = 44%, 50% then 50% = 75%, three 10%s = 27.1%, +25% is undone by -20%, -50% by +100%.
Not included: sales tax, fees, and stores that take a coupon off the original price instead of the sale price.

Static client-side. `node test-engine.js` runs the tests.
