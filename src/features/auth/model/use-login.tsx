import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { tokenApi } from '@/shared/lib/token';
import { userApi } from '@/entities/user';
import { loginRequest, FetchError, type LoginResponse } from '@/shared/api';
import { APP_CONFIG } from '@/shared/config';

interface LoginVariables {
  username: string;
  password: string;
  remember: boolean;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const mutation = useMutation<LoginResponse, FetchError, LoginVariables>({
    mutationFn: ({ username, password }) => {
      return loginRequest(username, password);
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
      navigate('/');
    },
  });

  return mutation;
};
