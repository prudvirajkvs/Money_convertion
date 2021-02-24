import React, { useEffect, useState } from 'react';
import CurrencyConv from './CurrencyConv';
import Header from './Header';
import { useSelector } from 'react-redux';

function MoneyConvertion() {
  const RATES_URL = 'https://api.exchangeratesapi.io/latest';
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  const user = useSelector((state) => state.user);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(RATES_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  // useEffect(() => {
  //   if(fromCurrency != null && toCurrency != null){
  //     fetch(`$(RATES_URL)?base=${fromCurrency}&symbols=${toCurrency}`)
  //     .then(res => res.json())
  //     .then(data => setExchangeRate(data.rates[toCurrency]))
  //        }
  // }, [fromCurrency,toCurrency])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${RATES_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="container">
      <Header user={user.email} />
      <span className="text-primary">Sourse money</span>
      <CurrencyConv
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <span className="text-primary">to Target Money</span>
      <CurrencyConv
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
}

export default MoneyConvertion;
