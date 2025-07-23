import React from "react"
//import { useEffect, useState } from "react" // Not needed here!

/*
InputBox is a reusable, styled input group for entering and displaying amounts,
with a dropdown for currencies. 
PROBLEMS FIXED:
- [You] Text in inputs not visible (added bg and text color)
- [You] Strong contrast, rounded corners, and drop shadows for vibrancy
- [Me] Uppercase currency in dropdown for clarity, and focus rings for usability.
*/

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  return (
    <div className={`bg-white bg-opacity-90 p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:space-x-4 ${className}`}>
      {/* Label inline or above for small screens */}
      <label className="text-gray-700 font-semibold mb-2 sm:mb-0 w-full sm:w-1/3">
        {label}
      </label>

      {/* Amount input is always visible/contrasted */}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        disabled={amountDisable} // disables input when passed from App (your logic)
        onChange={e => onAmountChange && onAmountChange(Number(e.target.value))} // safe, no handler if undefined
        className="w-full sm:w-2/3 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white"
      />

      {/* Currency dropdown, disabled if user sets so */}
      <select
        value={selectCurrency}
        onChange={e => onCurrencyChange(e.target.value)}
        disabled={currencyDisable}
        className="mt-3 sm:mt-0 w-full sm:w-1/3 px-3 py-2 rounded-md border border-gray-300 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
      >
        {currencyOptions.map(currency => (
          <option key={currency} value={currency}>
            {currency.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}
export default InputBox

/*
==============
KEY COMMENTS:
- All problems you wrote/found are mapped and solved above.
- Reused your original comments for context clarity.
==============
*/


/*
============================
PROBLEMS FIXED:
----------------------------
1. Use default props and correct prop names
2. Only import React (not useEffect/useState which weren't needed)
3. Comments included as per your request
============================
*/
