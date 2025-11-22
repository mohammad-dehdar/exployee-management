export const DEFAULT_ADMIN_EMAIL = "admin@company.com";
export const DEFAULT_ADMIN_PASSWORD = "admin123";

export const LOGIN_TITLES: Record<'user' | 'admin' | 'resume', string> = {
    user: 'ورود',
    admin: 'ورود',
    resume: 'ارسال رزومه',
};

export const LOGIN_DESCRIPTIONS: Record<'user' | 'admin' | 'resume', string> = {
    user: 'ایمیل و رمز عبور خود را وارد کنید',
    admin: 'ایمیل و رمز عبور خود را وارد کنید',
    resume: 'این بخش به زودی فعال می‌شود',
};

export const SELECT_LOGIN_TYPE_TITLE = 'انتخاب نوع ورود';
export const SELECT_LOGIN_TYPE_DESCRIPTION = 'لطفاً نوع ورود خود را انتخاب کنید';

export const HERO_TITLE = "مدیریت پرسنل با حساب‌های امن";
export const HERO_SUBTITLE = "ورود به سامانه";
export const HERO_DESCRIPTION = "نوع ورود خود را انتخاب کنید و با ایمیل و رمز عبور وارد شوید.";

export const ADMIN_HINT_TEXT = `ادمین پیش‌فرض: ${DEFAULT_ADMIN_EMAIL} / ${DEFAULT_ADMIN_PASSWORD}`;
export const USER_HINT_TEXT = "ایمیل و رمز عبور خود را وارد کنید";

export const RESUME_SECTION_MESSAGE = "این بخش در حال توسعه است و به زودی فعال می‌شود.";

export const EMAIL_PLACEHOLDER = "you@example.com";
export const PASSWORD_PLACEHOLDER = "••••••••";

export const ERROR_MESSAGES = {
    LOGIN_FAILED: "ورود ناموفق بود",
    NOT_ADMIN: "این حساب کاربری ادمین نیست",
    NOT_USER: "این حساب کاربری عضو اتمیتا نیست",
} as const;

export const SUCCESS_MESSAGES = {
    WELCOME: "خوش آمدید!",
} as const;

export const ROUTES = {
    ADMIN_DASHBOARD: "/admin-dashboard",
    USER_DASHBOARD: "/user-dashboard",
} as const;

