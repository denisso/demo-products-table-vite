import { useMutation } from '@tanstack/react-query';
import { router } from '@/app/router';
import { tokenApi } from '@/shared/lib/token';
import { userApi } from '@/entities/user';
import { login, type LoginResponse } from '../api';
import type { FetchError } from '@/shared/api';
import { APP_CONFIG } from '@/shared/config';
import { toastApi } from '@/shared/lib/toast';

interface LoginVariables {
  username: string;
  password: string;
  remember: boolean;
}

export const useLogin = () => {
  const mutation = useMutation<LoginResponse, FetchError, LoginVariables>({
    mutationFn: ({ username, password }) => {
      return login(username, password);
    },
    scope: {
      id: 'login-scope',
    },
    onSuccess: (response, variables) => {
      tokenApi.setToken(response.accessToken);
      userApi.setUser({ id: response.id, username: response.username });
      if (variables.remember) {
        localStorage.setItem(
          APP_CONFIG.ACCESS_TOKEN_NAME_IN_STORAGE,
          response.accessToken,
        );
      } else {
        localStorage.removeItem(APP_CONFIG.ACCESS_TOKEN_NAME_IN_STORAGE);
      }
      router.navigate('/');
    },
    onError: (error) => {
      let message = 'Сетевая ошибка. Попробуйте позже.';
      if (error.status == 400) {
        message = 'Ошибка авторизации. Неправильный логин или пароль';
      }
      toastApi.addToast({
        message,
        color: 'error',
      });
      return error;
    },
  });

  return mutation;
};
