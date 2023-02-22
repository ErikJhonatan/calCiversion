function calculatePorcentageUtility(total, money) {
  if (!Number.isFinite(total) || total <= 0 || !Number.isFinite(money) || money <= 0 || money > total) throw new Error('Aportes inválidos');
  const rta = (money * 100) / total;
  return parseFloat(rta.toFixed(2));
}
function moneyPlusInvestment(percentage, money, utility) {
  if (![percentage, money, utility].every(Number.isFinite) || money <= 0 || percentage <= 0 || percentage > 100) throw new Error('Datos inválidos');
  const rta = utility * percentage/100 + money;
  return parseFloat(rta.toFixed(2));
}
function calculateRevenue(utility, percentage) {
if (![utility, percentage].every(Number.isFinite) || percentage <= 0 || percentage > 100) throw new Error('Datos inválidos');
const rta = utility*percentage/100;
return parseFloat(rta.toFixed(2));
}

function totalMoneyInversion(array) {
  if (!Array.isArray(array) || !array.length || array.some(item => !Number.isFinite(item.investmentAmount) || item.investmentAmount <= 0)) throw new Error('Aportes inválidos');
  const total = array.reduce((sum, item) => sum + Math.round(item.investmentAmount * 100), 0);
  if (!Number.isSafeInteger(total) || total <= 0) throw new Error('Capital inválido');
  return total / 100;
}

function distributeRevenue(investors, finalCapital) {
  const total = Math.round(totalMoneyInversion(investors) * 100);
  const final = Math.round(finalCapital * 100);
  if (!Number.isFinite(finalCapital) || finalCapital < 0 || !Number.isSafeInteger(final)) throw new Error('Capital final inválido');
  const profit = final - total;
  const sign = profit < 0 ? -1 : 1;
  const shares = investors.map((investor, index) => {
    const invested = Math.round(investor.investmentAmount * 100);
    if (!Number.isSafeInteger(invested) || invested <= 0) throw new Error('Aporte inválido');
    const weighted = BigInt(Math.abs(profit)) * BigInt(invested);
    return {index, invested, cents: Number(weighted / BigInt(total)), remainder: weighted % BigInt(total)};
  });
  let remaining = Math.abs(profit) - shares.reduce((sum, share) => sum + share.cents, 0);
  const ranked = [...shares].sort((a, b) => a.remainder === b.remainder ? a.index - b.index : a.remainder > b.remainder ? -1 : 1);
  for (const share of ranked) {
    if (remaining-- <= 0) break;
    share.cents += 1;
  }
  return shares.map(share => {
    const revenue = sign * share.cents;
    const capital = share.invested + revenue;
    if (!Number.isSafeInteger(capital)) throw new Error('Resultado fuera de rango');
    return {percentage: calculatePorcentageUtility(total / 100, share.invested / 100), revenue: revenue / 100, capital: capital / 100};
  });
}
