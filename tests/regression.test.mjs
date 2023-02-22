import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const context = vm.createContext({});
vm.runInContext(await readFile(new URL('../script/calculations.js', import.meta.url), 'utf8'), context);
const investors = Array.from({length: 3}, () => ({investmentAmount: 1}));
test('distributes residual cents without creating money', () => {
  const shares = context.distributeRevenue(investors, 3.01);
  assert.deepEqual(Array.from(shares, share => share.revenue), [0.01, 0, 0]);
  assert.equal(shares.reduce((cents, share) => cents + Math.round(share.capital * 100), 0), 301);
});
test('accepts total loss and rejects invalid final capital', () => {
  assert.equal(context.distributeRevenue(investors, 0).every(share => share.capital === 0), true);
  for (const final of [-1, NaN, Infinity, Number.MAX_SAFE_INTEGER]) {
    assert.throws(() => context.distributeRevenue(investors, final));
  }
});
