const tableBody = document.getElementById("table-body");
const livePriceDisplay = document.getElementById("live-price");

// Countdown logic
function updateCountdown() {
  const now = new Date();
  const target = new Date("2025-07-30T00:00:00Z");
  const diff = target - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Start countdown updates
setInterval(updateCountdown, 1000);
updateCountdown(); // run once immediately

// ROI Table logic
async function renderTable() {
  try {
    const response = await fetch("eth-prices.json");
    const prices = await response.json();

    const liveRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
    const liveData = await liveRes.json();
    const livePrice = liveData.ethereum.usd;

    livePriceDisplay.textContent = `$${livePrice.toFixed(2)}`;

    for (const year in prices) {
      const historicalPrice = prices[year];
      const ethAmount = 1000 / historicalPrice;
      const valueToday = ethAmount * livePrice;

      const row = `
        <tr>
          <td>${year}</td>
          <td>$${historicalPrice.toFixed(2)}</td>
          <td>${ethAmount.toFixed(2)}</td>
          <td style="color:#fff">$${valueToday.toFixed(2)}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    }
  } catch (error) {
    console.error("Error loading data:", error);
    livePriceDisplay.textContent = "Failed to load live ETH price.";
  }
}

renderTable();