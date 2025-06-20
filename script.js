const tabs = document.getElementById("tabs");
const priceDisplay = document.getElementById("priceDisplay");
const countdown = document.getElementById("countdown");

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const currentYear = today.getFullYear();
const targetDate = new Date("2025-07-30T00:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  countdown.innerText = `Countdown to 30 July 2025: ${days}d ${hrs}h ${mins}m ${secs}s`;
}

setInterval(updateCountdown, 1000);

// Create tabs for each year
for (let year = 2015; year <= 2025; year++) {
  const tab = document.createElement("div");
  tab.innerText = year;
  tab.className = "tab";
  if (year === currentYear) tab.classList.add("active");
  tab.onclick = () => showPriceForYear(year);
  tabs.appendChild(tab);
}

function showPriceForYear(year) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove("active"));
  [...tabs.children].find(t => t.innerText == year).classList.add("active");

  if (year === 2025) {
    // Live price for current year
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
      .then(res => res.json())
      .then(data => {
        const price = data.ethereum.usd;
        priceDisplay.innerText = `ETH Price on ${day}-${month}-${year}: $${price}`;
      });
  } else {
    // Historical price
    fetch(`https://api.coingecko.com/api/v3/coins/ethereum/history?date=${day}-${month}-${year}`)
      .then(res => res.json())
      .then(data => {
        const price = data.market_data?.current_price?.usd;
        priceDisplay.innerText = price
          ? `ETH Price on ${day}-${month}-${year}: $${price}`
          : `No data for ${day}-${month}-${year}`;
      });
  }
}

// Show current year by default
showPriceForYear(currentYear);
