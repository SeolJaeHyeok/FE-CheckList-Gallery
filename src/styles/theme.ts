import { DefaultTheme } from 'styled-components';

const size = {
  desktop: '767px',
  mobile: '768px',
};

export const theme:DefaultTheme = {
  palette: {
    triconblack: '#2D2D2D',
    africanviolet: '#6C4F85',
    daydream: '#BFC1CE',
    lobelia: '#7D95C1',
    extrawhite: '#EFF0EB',
  },
  devices: {
    desktop: `(max-width: ${size.mobile})`,
    mobile: `(min-width: ${size.desktop})`,
  },
};
