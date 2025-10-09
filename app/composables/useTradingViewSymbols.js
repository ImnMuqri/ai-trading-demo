// composables/useSymbols.js
import { ref } from "vue";

export function useTradingViewSymbols() {
  const symbols = ref([
    // Crypto
    { label: "BTC/USDT", value: "BINANCE:BTCUSDT" },
    { label: "ETH/USDT", value: "BINANCE:ETHUSDT" },
    { label: "ADA/USDT", value: "BINANCE:ADAUSDT" },
    { label: "SOL/USDT", value: "BINANCE:SOLUSDT" },
    { label: "BNB/USDT", value: "BINANCE:BNBUSDT" },
    { label: "XRP/USDT", value: "BINANCE:XRPUSDT" },
    { label: "DOGE/USDT", value: "BINANCE:DOGEUSDT" },
    { label: "LTC/USDT", value: "BINANCE:LTCUSDT" },
    { label: "DOT/USDT", value: "BINANCE:DOTUSDT" },
    { label: "AVAX/USDT", value: "BINANCE:AVAXUSDT" },

    // Forex
    { label: "EUR/USD", value: "FX:EURUSD" },
    { label: "USD/JPY", value: "FX:USDJPY" },
    { label: "GBP/USD", value: "FX:GBPUSD" },
    { label: "USD/CHF", value: "FX:USDCHF" },
    { label: "AUD/USD", value: "FX:AUDUSD" },
    { label: "USD/CAD", value: "FX:USDCAD" },
    { label: "NZD/USD", value: "FX:NZDUSD" },
    { label: "EUR/JPY", value: "FX:EURJPY" },
    { label: "GBP/JPY", value: "FX:GBPJPY" },
    { label: "EUR/GBP", value: "FX:EURGBP" },

    // Metals
    { label: "Gold (XAU/USD)", value: "OANDA:XAUUSD" },
    { label: "Silver (XAG/USD)", value: "OANDA:XAGUSD" },
    { label: "Platinum (XPT/USD)", value: "OANDA:XPTUSD" },
    { label: "Palladium (XPD/USD)", value: "OANDA:XPDUSD" },

    // Indices
    { label: "S&P 500", value: "INDEX:SPX" },
    { label: "Dow Jones", value: "INDEX:DJI" },
    { label: "NASDAQ 100", value: "INDEX:NDX" },
    { label: "Russell 2000", value: "INDEX:RUT" },
    { label: "FTSE 100", value: "INDEX:UKX" },
    { label: "DAX", value: "INDEX:DAX" },
    { label: "Nikkei 225", value: "INDEX:N225" },
    { label: "Hang Seng", value: "INDEX:HSI" },
    { label: "CAC 40", value: "INDEX:PX1" },

    // Commodities
    { label: "Crude Oil (WTI)", value: "NYMEX:CL1!" },
    { label: "Brent Oil", value: "ICE:BRN1!" },
    { label: "Natural Gas", value: "NYMEX:NG1!" },
    { label: "Corn", value: "CBOT:C1!" },
    { label: "Wheat", value: "CBOT:W1!" },
    { label: "Soybeans", value: "CBOT:S1!" },
    { label: "Coffee", value: "ICE:KC1!" },
    { label: "Sugar", value: "ICE:SB1!" },
    { label: "Cotton", value: "ICE:CT1!" },

    // Bonds
    { label: "US 10Y Treasury", value: "CME:US10Y" },
    { label: "US 30Y Treasury", value: "CME:US30Y" },
    { label: "German 10Y Bund", value: "EUREX:DE10Y" },
    { label: "Japan 10Y Bond", value: "OSE:JGB10Y" },
  ]);

  return { symbols };
}
