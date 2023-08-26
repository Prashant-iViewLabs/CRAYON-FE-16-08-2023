import currencyFormatter from "currency-formatter";

export const formatCurrency = (value, currencyCode = "USD") => {
  return currencyFormatter.format(value, { code: currencyCode });
};

export const formatCurrencyWithCommas = (value, currencyCode) => {
  const formattedValue = currencyFormatter.format(value, { thousand: "," });
  return formattedValue.replace(".00", "");
};
