import { CURRENCY_NAMES } from '@variables/constant';

export const prefixToValue = (currency: string, target: number | string) => {
  let prefix = '₩';
  switch (currency) {
    case CURRENCY_NAMES.KRW:
      prefix = '₩';
      break;
    case CURRENCY_NAMES.USD:
      prefix = '$';
      break;
    case CURRENCY_NAMES.JPY:
      prefix = '¥';
      break;
  }

  return `${prefix}${target.toLocaleString()}`;
};
