import { Icon } from '@/shared/ui';
import { router } from '@/app/router';
import { APP_CONFIG, ICON_CONFIG } from '@/shared/config';
import { tokenApi } from '@/shared/lib/token';

export const LogoutButton = () => {
  const onClick = () => {
    localStorage.removeItem(APP_CONFIG.ACCESS_TOKEN_NAME_IN_STORAGE);
    tokenApi.clearToken();
    router.navigate('/login');
  };
  return (
    <Icon
      filename='logout'
      className='cursor-pointer'
      height='auto'
      width={ICON_CONFIG.ICON_WIDTH_IN_CTRL}
      onClick={onClick}
    />
  );
};
