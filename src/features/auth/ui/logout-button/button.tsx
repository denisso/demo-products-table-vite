import { Icon } from '@/shared/ui';
import { router } from '@/app/router';
import { APP_CONFIG } from '@/shared/config';
import { tokenApi } from '@/shared/lib/token';

export const LogoutButton = () => {
  const onClick = () => {
    localStorage.removeItem(APP_CONFIG.ACCESS_TOKEN_NAME_IN_STORAGE);
    tokenApi.clearToken();
    router.navigate('/login');
  };
  return (
    <div className='h-(--width-ctrl-icon) w-(--width-ctrl-icon)'>
      <Icon filename='logout' className='cursor-pointer' onClick={onClick} />
    </div>
  );
};
