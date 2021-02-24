import React from 'react';

function CurrencyConv(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;
  return (
    <div className=" d-flex align-items-center">
      <input
        className="form-control order-md-1 m-2"
        type="number"
        value={amount}
        onChange={onChangeAmount}
      />
      <select
        value={selectedCurrency}
        onChange={onChangeCurrency}
        className="custom-select"
      >
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyConv;
