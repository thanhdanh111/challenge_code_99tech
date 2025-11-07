import React, { useMemo } from "react";

// Fix: Add proper type definitions
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Fix: Add missing blockchain property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface WalletPageProps {
  children?: React.ReactNode;
  className?: string;
}

// Fix: Use Map for O(1) lookup instead of switch statement
const BLOCKCHAIN_PRIORITIES = new Map<string, number>([
  ["Osmosis", 100],
  ["Ethereum", 50],
  ["Arbitrum", 30],
  ["Zilliqa", 20],
  ["Neo", 20],
]);

// Mock hooks
const useWalletBalances = (): WalletBalance[] => {
  return [];
};

const usePrices = (): Record<string, number> => {
  return {};
};

const WalletRow: React.FC<{
  currency: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
  className?: string;
}> = ({ currency, formattedAmount, usdValue, className }) => (
  <div className={className}>
    <span>{currency}</span>
    <span>{formattedAmount}</span>
    <span>${usdValue.toFixed(2)}</span>
  </div>
);

export const WalletPage: React.FC<WalletPageProps> = ({
  children,
  className,
  ...rest
}) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  // Fix: Combine filter, sort, and format into single memoized operation
  const processedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const priority = BLOCKCHAIN_PRIORITIES.get(balance.blockchain) ?? -99;
        // Fix: Correct logic - keep positive amounts with valid priority
        return balance.amount > 0 && priority > -99;
      })
      .sort((lhs, rhs) => {
        const leftPriority = BLOCKCHAIN_PRIORITIES.get(lhs.blockchain) ?? -99;
        const rightPriority = BLOCKCHAIN_PRIORITIES.get(rhs.blockchain) ?? -99;

        // Fix: Complete sort function with return for all cases
        if (leftPriority !== rightPriority) {
          return rightPriority - leftPriority;
        }
        return rhs.amount - lhs.amount;
      })
      .map(
        (balance): FormattedWalletBalance => ({
          ...balance,
          formatted: balance.amount.toFixed(2),
        })
      );
  }, [balances, prices]);

  // Fix: Memoize rows and use stable keys
  const walletRows = useMemo(() => {
    return processedBalances.map((balance) => {
      // Fix: Add null check for prices
      const price = prices[balance.currency] ?? 0;
      const usdValue = price * balance.amount;

      return (
        <WalletRow
          key={`${balance.blockchain}-${balance.currency}`} // Fix: Use stable unique key
          currency={balance.currency}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
          className="wallet-row"
        />
      );
    });
  }, [processedBalances, prices]);

  return (
    <div className={className} {...rest}>
      {children}
      {walletRows}
    </div>
  );
};

export default WalletPage;
