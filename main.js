import './style.css'
const list = document.getElementById('list')
const searchField = document.querySelector('.js-search')
const countField = document.querySelector('.js-count')
const calculateBtn = document.querySelector('.js-calculate')
const resultBlock = document.querySelector('.js-result')
let symbols = []
let coinPrice = 0

const setupInputValue = (val) => {
  searchField.value = val
} 

const setupList = (arr) => {
  arr.map(el => list.innerHTML += `<li>${el}</li>`)
}

async function getBinanceCoinPrices(symbol) {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        const json = await response.json()
        coinPrice = json.price;
      
    } catch (error) {
        console.error('Error fetching coin price from Binance:', error.message);
    }
}

getBinanceSymbols();
async function getBinanceSymbols() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
        const json = await response.json()
        symbols = json.symbols.slice(0, 20).map(symbolInfo => symbolInfo.symbol);
        setupList(symbols)
    } catch (error) {
        console.error('Error fetching Binance symbols:', error.message);
    }
}

calculateBtn.addEventListener('click', async () => {
  if(!countField.value || !searchField.value) {
    resultBlock.innerText = 'values ​​not selected'
  } else {
    await getBinanceCoinPrices(searchField.value);
    resultBlock.innerText = `${(+countField.value * +coinPrice).toFixed(2)}  $`
  }
  
})

list.addEventListener('click', (e) => {
  if(e.target.tagName === 'LI') {
    setupInputValue(e.target.innerText)
  }
})
