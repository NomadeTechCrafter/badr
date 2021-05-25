import {
  buttonLoginTextColor,
  centeredText as centeredTextColor,
} from './ComColorsStyle';
import {
  buttonLoginText as buttonLoginTextAlignment,
  centeredText as centeredTextAlignment,
  cardText as cardTextAlignment,
} from './ComAlignmentStyle';

import {centeredText as centeredTextSize} from './ComSizeStyle';

import {centeredText as centeredTextSipacing} from './ComSpacingStyle';

import {cardText as cardTextCalligraphy} from './ComCalligraphyStyle';

import {ms} from 'react-native-size-matters';

export const loginText = {
  height: 50,
  color: '#000000',
};

export const buttonLoginText = {
  ...buttonLoginTextColor,
  ...buttonLoginTextAlignment,
};

export const centeredText = {
  ...centeredTextAlignment,
  ...centeredTextColor,
  ...centeredTextSize,
  ...centeredTextSipacing,
};

export const cardText = {
  ...cardTextCalligraphy,
  ...cardTextAlignment,
};

export const progressbarText = {
  padding: 10,
  textAlign: 'center',
  color: '#009ab2',
};

export const menuHeaderTitle = {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
};

export const menuHeaderSubTitle = {
  color: 'white',
  fontSize: 14,
};

export const badrLibelle = {
  fontSize: ms(10),
};
