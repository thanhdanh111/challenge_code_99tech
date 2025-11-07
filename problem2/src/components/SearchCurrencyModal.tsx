import { useState, useMemo } from "react";
import type { CurrencyPrice } from "../utils/currencyConverter";
import "./SearchCurrencyModal.css";

interface SearchCurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currencies: string[];
  currencyPrices: Map<string, CurrencyPrice>;
  onSelectCurrency: (currency: string) => void;
  currentCurrency: string;
}

export function SearchCurrencyModal({
  isOpen,
  onClose,
  currencies,
  currencyPrices,
  onSelectCurrency,
  currentCurrency,
}: SearchCurrencyModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery.trim()) {
      return currencies;
    }
    const query = searchQuery.toLowerCase();
    return currencies.filter((currency) =>
      currency.toLowerCase().includes(query)
    );
  }, [currencies, searchQuery]);

  const handleSelectCurrency = (currency: string) => {
    onSelectCurrency(currency);
    onClose();
    setSearchQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="search-currency-modal-overlay" onClick={onClose}>
      <div
        className="search-currency-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-currency-modal-header">
          <h3 className="search-currency-modal-title">Select Currency</h3>
          <button
            className="search-currency-modal-close"
            onClick={onClose}
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="search-currency-modal-search">
          <input
            type="text"
            className="search-currency-modal-input"
            placeholder="Search currency..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className="search-currency-modal-list">
          {filteredCurrencies.length === 0 ? (
            <div className="search-currency-modal-empty">
              <svg
                viewBox="0 0 96 96"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "96px", height: "96px", margin: "0px auto" }}
              >
                <path
                  d="M68 64a1 1 0 010 2H36a1 1 0 110-2h32zM34 49.75a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM34 34.25a1.5 1.5 0 011.5 1.5v10a1.5 1.5 0 01-3 0v-10a1.5 1.5 0 011.5-1.5z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M76.206 8.005A4 4 0 0180 12v4h4l.206.005A4 4 0 0188 20v64l-.005.206a4.001 4.001 0 01-3.789 3.79L84 88H36a4 4 0 01-3.995-3.794L32 84v-4h-4a4 4 0 01-3.995-3.794L24 76V58.968a18.095 18.095 0 01-2.002-1.554L9.713 69.7A1 1 0 018.3 68.286L20.584 56A17.932 17.932 0 0116 44c0-6.264 3.2-11.78 8.055-15.005l-.055.036V12a4 4 0 014-4h48l.206.005zM26 27.87a17.927 17.927 0 019.543-1.805l-.043-.003V23h33v24H51.75l.007-.047a17.868 17.868 0 01-1.632 5.052l.003-.005H68a1 1 0 010 2H48.968a18.101 18.101 0 01-3.655 4H68a1 1 0 010 2H42.253A17.921 17.921 0 0134 62c-2.883 0-5.607-.679-8.022-1.884l.022.012V76a2 2 0 002 2h48a2 2 0 002-2V12a2 2 0 00-2-2H28a2 2 0 00-2 2v15.871zM34 28c-8.836 0-16 7.163-16 16s7.164 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zm3.5-1.66c-.046-.01-.093-.017-.14-.026C45.697 27.89 52 35.209 52 44c0 .336-.01.669-.028 1H66.5V25h-29v1.34zM34 84a2 2 0 002 2h48a2 2 0 002-2V20a2 2 0 00-2-2h-4v58l-.005.206a4.001 4.001 0 01-3.789 3.79L76 80H34v4z"
                  fill="currentColor"
                ></path>
              </svg>
              No currencies found
            </div>
          ) : (
            filteredCurrencies.map((currency) => {
              const price = currencyPrices.get(currency);
              const isSelected = currency === currentCurrency;

              return (
                <button
                  key={currency}
                  className={`search-currency-modal-item ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => handleSelectCurrency(currency)}
                  type="button"
                >
                  <div className="search-currency-modal-item-icon">
                    <img
                      src={`https://raw.githubusercontent.com/Switcheo/token-icons/c884d9c223e70c70efae3ece3dc9eaffba28ca56/tokens/${currency}.svg`}
                      alt={currency}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="search-currency-modal-item-info">
                    <div className="search-currency-modal-item-name">
                      {currency}
                    </div>
                    {price && (
                      <div className="search-currency-modal-item-price">
                        ${price.price.toFixed(6)} USD
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <div className="search-currency-modal-item-check">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
