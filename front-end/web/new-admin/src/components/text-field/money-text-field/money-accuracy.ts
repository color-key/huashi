export const getAccuracy = (currency: string) => {
  switch (currency) {
    case 'BTC':
      return 8;
    case 'ETH':
      return 8;
    case 'LTC':
      return 8;
    case 'BCH':
      return 8;
    case 'USDT(OMNI)':
      return 8;
    case 'USDT(ERC20)':
      return 6;
    case 'BNB':
      return 8;
    case 'USD':
      return 2;
    default:
      return 2;
  }
};