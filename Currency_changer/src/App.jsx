import { useState } from 'react'
import './App.css'
import InputBox from './components/Input'
import useCurrencyInfo from './customHooks/useCurrencyInfo'

function App() {
  // State Variables (think of these as memory slots for your form values)
  const [amount, setAmount] = useState(0)        // For the amount user enters
  const [From, setFrom] = useState("usd")        // Source currency (default: USD)
  const [To, setTo] = useState("inr")            // Target currency (default: INR)
  const [Converted, setConverted] = useState(0)  // For converted value

  //  USING THE HOOK (this is the key part for your question)
  // Here, you are calling your custom hook `useCurrencyInfo` with the base currency `From`
  // This gets you all exchange rates for that currency, as an OBJECT.
  // For example, if From = "usd", useCurrencyInfo will be an object: { inr: 83, eur: 0.91, ... }
  const CurrencyInfo = useCurrencyInfo(From)

  // This gets ALL the currency codes available
  // E.g., ["usd", "inr", "eur", ...]
  // SAFETY: Only if CurrencyInfo is not empty, so select isn't blank on load
  const options = CurrencyInfo && Object.keys(CurrencyInfo).length > 0
    ? Object.keys(CurrencyInfo)
    : []

  // Swap: exchange source/target currencies and clear converted value
  const Swap = () => {
    setFrom(To)
    setTo(From)
    setConverted(0)
  }

  // Conversion logic: multiply input by exchange rate if available, else clear
  const Convert = () => {
    if (CurrencyInfo && CurrencyInfo[To]) {
      setConverted(amount * CurrencyInfo[To])
    } else {
      setConverted(0)
    }
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat p-5"
      // Vibrant financial background from Unsplash for style
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80')`,
      }}
    >
      {/* Card container for the form with gradient and vibrant design */}
      <div className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-xl p-6 shadow-lg backdrop-blur-md bg-opacity-75">
        <h1 className="text-4xl font-extrabold text-white mb-6 text-center drop-shadow-lg">
          Currency Converter
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            Convert()
          }}
          className="space-y-4"
        >
          {/* FROM section: input value and starting currency */}
          <InputBox
            label="From"
            amount={amount}
            onAmountChange={setAmount}
            currencyOptions={options}
            onCurrencyChange={setFrom}
            selectCurrency={From}
          />

          {/* Swap: switches From/To, resets result */}
          <div className="flex justify-center">
            <button
              type="button"
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-md font-semibold text-gray-900 transition-shadow shadow-md"
              onClick={Swap}
            >
              swap
              {/* swap button switches From/To (your words!) */}
            </button>
          </div>

          {/* TO section: result display and target currency */}
          <InputBox
            label="To"
            amount={Converted}
            currencyOptions={options}
            onCurrencyChange={setTo}
            selectCurrency={To}
            amountDisable  // disables TO input for typing
          />

          {/* Convert button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold text-white transition-all drop-shadow-md"
          >
            Convert
          </button>
        </form>
        {/* API source info, small and styled */}
        <p className="mt-4 text-center text-white/75 italic text-sm">
          Rates sourced from a public API, updated daily.
        </p>
      </div>
    </div>
  )
}

export default App

/*
====================== ALL PROBLEMS FIXED: =======================
1. [You] Wrongly used Object.keys on the hook instead of the output (fixed: use Object.keys(CurrencyInfo))
2. [You] Inputs were invisible (fixed with strong bg and text colors in Input.js)
3. [You] Wanted visible, vibrant UI (fixed with gradients, better container, and lovely background img)
4. [You & Me] Safely handle empty rate data on load (prevents blank select and invisible inputs)
5. [You & Me] All swap, convert, and option logic works and is commented.
======================== EXPLANATORY COMMENTS INCLUDED! ========================
*/

/*
============================
PROBLEMS FIXED:
----------------------------
1. Use correct import (default import) for InputBox and useCurrencyInfo
2. Only call Object.keys on CurrencyInfo, not useCurrencyInfo (which is the HOOK!)
3. Check for CurrencyInfo data before using Object.keys (prevents empty dropdowns on load)
4. Swap now resets converted value to avoid stale results
5. Convert function now won't throw if CurrencyInfo[To] is not available yet
6. Comments included per your request
============================
*/
