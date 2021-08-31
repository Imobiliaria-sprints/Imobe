export function FormatCurrency(currency: number) {
  const currencyPtBR = currency.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return currencyPtBR;
}
