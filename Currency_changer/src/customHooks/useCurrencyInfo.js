import { useEffect, useState } from 'react'

// Custom hook to get exchange rates for the given currency
const useCurrencyInfo = (currency) => {
  const [data, setData] = useState({})

  useEffect(() => {
    // API returns { "usd": { ...rates... }, "date": "..." }
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
      .then((res) => res.json())
      .then((res) => {
        setData(res[currency] || {}) // Only set rates object, never undefined
      })
      .catch(() => setData({})) // On error, set data to empty object
  }, [currency]) // Whenever 'currency' changes, refetch rates

  // Return the exchange rates for the currency
  return data
}

export default useCurrencyInfo

/*
=============================
PROBLEMS FIXED & NOTES:
-----------------------------
- [You] Was returning array instead of rates (fixed: setData(res[currency]))
- [Me] Added || {} so never get undefined at startup or if API fails.
- Function is small, focused, and commented.
=============================
*/


/*
============================
PROBLEMS FIXED:
----------------------------
1. Added || {} so setData never gets undefined
2. Added comments for clarity
============================
*/
