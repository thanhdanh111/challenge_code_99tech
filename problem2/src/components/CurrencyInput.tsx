import { useState } from "react";
import type { CurrencyPrice } from "../utils/currencyConverter";
import { SearchCurrencyModal } from "./SearchCurrencyModal";
import "./CurrencyInput.css";

interface CurrencyInputProps {
  label: string;
  amount: string;
  currency: string;
  currencies: string[];
  currencyPrices: Map<string, CurrencyPrice>;
  onAmountChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  priceInfo?: CurrencyPrice;
  readOnly?: boolean;
  placeholder?: string;
}

export function CurrencyInput({
  label,
  amount,
  currency,
  currencies,
  currencyPrices,
  onAmountChange,
  onCurrencyChange,
  priceInfo,
  readOnly = false,
  placeholder = "0.00",
}: CurrencyInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCurrencyClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="currency-input-wrapper">
        <div className="currency-input-label-container">
          <label className="currency-input-label">{label}</label>
          <span className="currency-input-label">
            Available Balance -- {currency}
          </span>
        </div>
        <div className="currency-input-container">
          <div
            className="currency-input-currency-container clickable"
            onClick={handleCurrencyClick}
          >
            <img
              src={`https://raw.githubusercontent.com/Switcheo/token-icons/c884d9c223e70c70efae3ece3dc9eaffba28ca56/tokens/${currency}.svg`}
              alt={currency}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="currency-input-currency-text">{currency}</span>
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "20px", width: "20px" }}
            >
              <path
                d="M15.698 12.568a.9.9 0 00-.061-1.205l-6-6-.069-.061a.9.9 0 00-1.266 1.266l.061.069L13.727 12l-5.364 5.363a.9.9 0 001.274 1.274l6-6 .061-.069z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        <input
          type={readOnly ? "text" : "number"}
          className="currency-input-amount"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder={placeholder}
          min="0"
          step="0.00000001"
        />
        </div>
        {priceInfo && (
          <div className="currency-input-price-info">
            1 {currency} = ${priceInfo.price.toFixed(6)} USD
          </div>
        )}
      </div>

      <SearchCurrencyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currencies={currencies}
        currencyPrices={currencyPrices}
        onSelectCurrency={onCurrencyChange}
        currentCurrency={currency}
      />
    </>
  );
}
