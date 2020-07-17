import {
  errorsBorderColor,
  errorsBackgroundColor,
  infoBorderColor,
  infoBackgroundColor,
} from './colors';
import {errorsBox as errorsBoxSpacing} from './spacing';
import {errorsBox as errorsBoxShape} from './shape';
import {errorsBox as errorsBoxAlignment} from './alignment';

const custom = {
  width: '60%',
  borderWidth: 1,
};

export const errors = {
  ...custom,
  ...errorsBorderColor,
  ...errorsBackgroundColor,
  ...errorsBoxShape,
  ...errorsBoxSpacing,
  ...errorsBoxAlignment,
};

export const info = {
  ...custom,
  ...infoBorderColor,
  ...infoBackgroundColor,
  ...errorsBoxShape,
  ...errorsBoxSpacing,
  ...errorsBoxAlignment,
};
