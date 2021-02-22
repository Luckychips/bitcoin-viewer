export type CoinData = {
  id: string;
  name: string;
  symbol: string;
  image?: string;
  current_price: number;
  market_cap_rank?: string;
  price_change_24h?: number;
  price_change_percentage_24h?: number;
};
