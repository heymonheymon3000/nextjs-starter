import createMiddleware from 'next-intl/middleware';
import { getLocales } from './lib/utils';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: getLocales(),
 
  // Used when no locale matches
  defaultLocale: 'en',

  localePrefix: 'never'
});
 
export const config = {
  // Match only internationalized pathnames
  // example: en|de -> to add another locale
  matcher: ['/', '/(en)/:path*']
};