import React from 'react';
import { APP_CONFIG } from '@/shared/config';
import { tokenApi } from '@/shared/lib/token';

export const TokenProvider = () => {
  React.useEffect(() => {
    const token =
      localStorage.getItem(APP_CONFIG.ACCESS_TOKEN_NAME_IN_STORAGE) ?? null;
    if (token) {
      tokenApi.setToken(token);
    }
  }, []);
  return null;
};
