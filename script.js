const tableBody = document.getElementById("table-body");
const countdown = document.getElementById("countdown");

// Countdown
function updateCountdown() {
  const now = new Date();
  const target = new Date("2025-07-30T00:00:00");
  const diff = target - now;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  countdown.innerText = `Countdown to 30 July 2025: ${d}d ${h}h ${m}m ${s}s`;
}
setInterval(updateCountdown, 1000);

// Load ETH data
async function renderTable() {
  const response = await fetch('eth-prices.json');
  const prices = await response.json();

  const live = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
  const livePrice = (await live.json()).ethereum.usd;

  for (const year in prices) {
    const price = prices[year];
    const ethAmount = 1000 / price;
    const valueToday = ethAmount * livePrice;

    const row = `
      <tr>
        <td>${year}</td>
        <td>$${price.toFixed(2)}</td>
        <td>${ethAmount.toFixed(2)}</td>
        <td style="color: #fff">$${valueToday.toFixed(2)}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  }
}

renderTable();
