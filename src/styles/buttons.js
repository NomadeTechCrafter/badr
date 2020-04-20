import {loginButton as loginButtonSize} from './size';
import {primaryBackgroundColor} from './colors';
import {loginButton as loginButtonShape} from './shape';
import {loginButton as loginButtonAlignment} from './alignment';
import {loginButton as loginButtonSpacing} from './spacing';

export const loginButton = {
  ...primaryBackgroundColor,
  ...loginButtonAlignment,
  ...loginButtonSpacing,
  ...loginButtonShape,
  ...loginButtonSize,
};

export const badrButton = {
  ...primaryBackgroundColor,
  ...loginButtonAlignment,
  ...loginButtonShape,
  ...loginButtonSize,
};
