import { DEFAULT_CURRENCY_CODE, DEFAULT_LOCALE } from '../../constants';

export function formatPrice(price: number) {
  return (price / 100).toLocaleString(DEFAULT_LOCALE, {
    style: 'currency',
    currency: DEFAULT_CURRENCY_CODE,
  });
}
