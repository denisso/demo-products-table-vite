import { fetcher } from '@/shared/api/fetcher';

export type LoginResponse = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export const login = (username: string, password: string) => {
  return fetcher<LoginResponse>('/auth/login', {
    method: 'POST',
    body: { username, password },
  });
};
