import {loginInput as loginInputSize} from './size';
import {inputsBackgroundColor} from './colors';
import {loginInput as loginInputShape} from './shape';
import {loginInput as loginInputAlignment} from './alignment';
import {loginInput as loginInputSpacing} from './spacing';

export const loginInput = {
  ...inputsBackgroundColor,
  ...loginInputSize,
  ...loginInputShape,
  ...loginInputAlignment,
  ...loginInputSpacing,
};
