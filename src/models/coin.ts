export type CoinData = {
  id: string;
  name: string;
  symbol: string;
  image?: string;
  current_price: number;
  market_cap: number;
  market_cap_rank?: string;
  price_change_24h?: number;
  price_change_percentage_24h?: number;
};

export type LocaleData = {
  jpy: number | string;
  krw: number | string;
  eur: number | string;
  usd: number | string;
};

export type MarketData = {
  ath: LocaleData;
  ath_change_percentage: LocaleData;
  ath_date: LocaleData;
  atl: LocaleData;
  atl_change_percentage: LocaleData;
  atl_date: LocaleData;
  current_price: LocaleData;
  fully_diluted_valuation: LocaleData;
  high_24h: LocaleData;
  low_24h: LocaleData;
  market_cap: LocaleData;
  market_cap_change_24h: number;
  market_cap_change_24h_in_currency: LocaleData;
  market_cap_change_percentage_24h: number;
  market_cap_change_percentage_24h_in_currency: LocaleData;
  market_cap_rank: number;
  price_change_24h_in_currency: LocaleData;
  price_change_percentage_1h_in_currency: LocaleData;
  price_change_percentage_1y: number;
  price_change_percentage_1y_in_currency: LocaleData;
  price_change_percentage_7d: number;
  price_change_percentage_7d_in_currency: LocaleData;
  price_change_percentage_14d: number;
  price_change_percentage_14d_in_currency: LocaleData;
  price_change_percentage_24h: number;
  price_change_percentage_24h_in_currency: LocaleData;
  price_change_percentage_30d: number;
  price_change_percentage_30d_in_currency: LocaleData;
  price_change_percentage_60d: number;
  price_change_percentage_60d_in_currency: LocaleData;
  price_change_percentage_200d: number;
  price_change_percentage_200d_in_currency: LocaleData;
  total_volume: LocaleData;
  last_updated: string;
};

export type LinkData = {
  announcement_url: string[];
  bitcointalk_thread_identifier: null;
  blockchain_site: string[];
  chat_url: string[];
  facebook_username: string;
  homepage: string[];
  official_forum_url: string[];
  repos_url: {
    github: string[];
    bitbucket: string[];
  };
  subreddit_url: string;
  telegram_channel_identifier: string;
  twitter_screen_name: string;
};

export type CoinDetailData = {
  market_cap_rank: number;
  coingecko_rank: number;
  market_data: MarketData;
  name: string;
  id: string;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  localization: {
    ko?: string;
    en?: string;
    ja?: string;
  };
  description: {
    ko?: string;
    en?: string;
    ja?: string;
  };
  links: LinkData;
  symbol: string;
};

export type LocationStateProps = {
  detailCoinItem: CoinData;
};
