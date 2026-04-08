export const APP_CONFIG = {
  // тосты
  TOAST_DEFAULT_DURATION: 3000,
  MAX_TOASTS_ON_SCREEN: 5,
  // поисковые запросы
  DEBOUNCE_SEARCH: 300,
  // время ожидания любого запроса данных с сервера в мс
  REQUEST_TIMEOUT: 10000,

  ACCESS_TOKEN_NAME_IN_STORAGE: 'access-token',
} as const;
