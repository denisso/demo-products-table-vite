const icons = [
  'close',
  'eye-off',
  'eye',
  'login',
  'logo',
  'password',
  'search',
] as const;

type Dict = Record<(typeof icons)[number], string>;
export const ICON_PATH = icons.reduce<Dict>((a, icon) => {
  a[icon] = `/icons/${icon}.svg`;
  return a;
}, {} as Dict);

export const ICON_CONFIG = {
  ICON_WIDTH_IN_CTRL: '24px',
};
