import './App.css'
import { useGetCurrenciesData } from './api/currency'
import { CurrencyConverter } from './components/CurrencyConverter'

function App() {
  const { currencies, isLoading, error } = useGetCurrenciesData();

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error instanceof Error ? error.message : 'Failed to load data'}</div>;

  return (
    <div className="app-container">
      {currencies && <CurrencyConverter currencies={currencies} />}
    </div>
  )
}

export default App
