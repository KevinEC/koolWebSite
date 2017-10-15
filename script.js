let price = 0;
let yesterdayPrice = 0;
let priceChange = 0;

const timeYesterday = parseInt(Date.now()/1000) - (60*60*24);

const priceDiv = document.querySelector('#price');
const priceChangeDiv = document.querySelector('#priceChange');

const p1 = fetch('https://api.etherscan.io/api?module=stats&action=ethprice');
const p2 = fetch(`https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=USD&limit=1&e=Coinbase&toTs=${timeYesterday}`);

Promise
  .all([p1, p2])
  .then(responses => {
    return Promise.all(responses.map(res => res.json()));
  })
  .then(responses => {
    updatePrice(responses[0].result.ethusd);
    updatePriceChange(responses[1].Data[0].close);
  });

function updatePrice(priceInput) {
  price = parseFloat(priceInput);
  priceDiv.innerHTML = `\$${price}`;
}

function updatePriceChange(yesterdayPriceInput) {
  priceChange = calculatePercentageChange(yesterdayPriceInput, price);
  priceChangeDiv.innerHTML = `${priceChange.toFixed(2)} %`;
}

function calculatePercentageChange(first, second) {
  return (second - first)/second*100;
}
