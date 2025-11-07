import { useState, useMemo } from "react";
import {
  getUniqueCurrenciesWithLatestPrice,
  convertCurrency,
} from "../utils/currencyConverter";
import { CurrencyInput } from "./CurrencyInput";
import "./CurrencyConverter.css";
import type { PriceData } from "../types";

interface CurrencyConverterProps {
  currencies: PriceData[];
}

export function CurrencyConverter({ currencies }: CurrencyConverterProps) {
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("ETH");
  const [amount, setAmount] = useState<string>("1");

  const currencyMap = useMemo(
    () => getUniqueCurrenciesWithLatestPrice(currencies),
    [currencies]
  );

  const uniqueCurrencies = useMemo(
    () => Array.from(currencyMap.keys()).sort(),
    [currencyMap]
  );

  const convertedAmount = useMemo(() => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return null;

    return convertCurrency(numAmount, fromCurrency, toCurrency, currencyMap);
  }, [amount, fromCurrency, toCurrency, currencyMap]);

  const fromPrice = currencyMap.get(fromCurrency);
  const toPrice = currencyMap.get(toCurrency);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="converter-container">
      <h2 className="converter-title">Currency Converter</h2>
      <div className="converter-form">
        <div className="converter-input-group">
          <CurrencyInput
            label="From"
            amount={amount}
            currency={fromCurrency}
            currencies={uniqueCurrencies}
            currencyPrices={currencyMap}
            onAmountChange={setAmount}
            onCurrencyChange={setFromCurrency}
            priceInfo={fromPrice}
          />

          <button
            className="converter-swap-button"
            onClick={handleSwap}
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "20px", width: "20px" }}
            >
              <path
                d="M10.4 20.009c0 .89-1.075 1.337-1.706.709l-4.829-4.81a.9.9 0 011.27-1.276L8.6 18.083V3.75a.9.9 0 011.8 0v16.259zM13.6 3.991c0-.89 1.075-1.337 1.706-.709l4.829 4.81a.9.9 0 01-1.27 1.276L15.4 5.917V20.25a.9.9 0 01-1.8 0V3.991z"
                fill="currentColor"
              ></path>
            </svg>
          </button>

          <CurrencyInput
            label="To"
            amount={convertedAmount !== null ? convertedAmount.toFixed(8) : ""}
            currency={toCurrency}
            currencies={uniqueCurrencies}
            currencyPrices={currencyMap}
            onAmountChange={() => {}}
            onCurrencyChange={setToCurrency}
            priceInfo={toPrice}
            readOnly
          />
        </div>

        <button
          className="converter-convert-button"
          type="button"
          disabled={!fromCurrency || !toCurrency || !amount}
        >
          Convert
        </button>
      </div>
    </div>
  );
}
