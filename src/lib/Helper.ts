
export const formattedBalance = (balance: string, decimals: number) => {
  if (!balance || balance === '0') return '0';
  const balanceInEth = parseFloat(balance) / Math.pow(10, decimals); 
  const formattedBalance = balanceInEth.toFixed(4);
  return `${formattedBalance}`;
};