import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as 'fa' | 'en' | 'de')) {
    locale = routing.defaultLocale;
  }

  // Load all split message files and merge them
  const [
    common,
    home,
    userDashboard,
    options,
    validation,
    userForm,
    adminDashboard,
    auth,
    api,
  ] = await Promise.all([
    import(`../../messages/${locale}/common.json`),
    import(`../../messages/${locale}/home.json`),
    import(`../../messages/${locale}/userDashboard.json`),
    import(`../../messages/${locale}/options.json`),
    import(`../../messages/${locale}/validation.json`),
    import(`../../messages/${locale}/userForm.json`),
    import(`../../messages/${locale}/adminDashboard.json`),
    import(`../../messages/${locale}/auth.json`),
    import(`../../messages/${locale}/api.json`),
  ]);

  const messages = {
    common: common.default,
    home: home.default,
    userDashboard: userDashboard.default,
    options: options.default,
    validation: validation.default,
    userForm: userForm.default,
    adminDashboard: adminDashboard.default,
    auth: auth.default,
    api: api.default,
  };

  return {
    locale,
    messages,
  };
});

