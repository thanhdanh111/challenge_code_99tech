import type { PriceData } from "../types";

export interface CurrencyPrice {
  currency: string;
  price: number;
  date: string;
}


export function getUniqueCurrenciesWithLatestPrice(data: PriceData[]): Map<string, CurrencyPrice> {
  const currencyMap = new Map<string, CurrencyPrice>();

  data.forEach((item) => {
    const existing = currencyMap.get(item.currency);
    if (!existing || new Date(item.date) > new Date(existing.date)) {
      currencyMap.set(item.currency, {
        currency: item.currency,
        price: item.price,
        date: item.date,
      });
    }
  });

  return currencyMap;
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  currencyPrices: Map<string, CurrencyPrice>
): number | null {
  if (amount <= 0) return null;

  const fromPrice = currencyPrices.get(fromCurrency);
  const toPrice = currencyPrices.get(toCurrency);

  if (!fromPrice || !toPrice) return null;

  // Convert to USD first, then to target currency
  // If fromCurrency is USD, price is 1
  const fromPriceInUSD = fromCurrency === 'USD' ? 1 : fromPrice.price;
  const toPriceInUSD = toCurrency === 'USD' ? 1 : toPrice.price;

  // Convert: amount * (fromPriceInUSD / toPriceInUSD)
  const result = (amount * fromPriceInUSD) / toPriceInUSD;

  return result;
}

