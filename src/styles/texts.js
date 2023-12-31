import {
  inputsBackgroundColor,
  buttonLoginTextColor,
  centeredText as centeredTextColor,
  libelle as libelleColor
} from './colors';
import {
  buttonLoginText as buttonLoginTextAlignment,
  centeredText as centeredTextAlignment,
  cardText as cardTextAlignment,
} from './alignment';

import {centeredText as centeredTextSize} from './size';

import {centeredText as centeredTextSipacing} from './spacing';

import {cardText as cardTextCalligraphy} from './calligraphy';

import { s, vs, ms } from 'react-native-size-matters';

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