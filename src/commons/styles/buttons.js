import {loginButton as loginButtonSize} from './size';
import {primaryBackgroundColor, buttonBackgroundColorDisabled} from './colors';

import {loginButton as loginButtonShape} from './shape';
import {loginButton as loginButtonAlignment} from './alignment';
import {loginButton as loginButtonSpacing} from './spacing';

import {badrButtonIcon as badrButtonIconSpacing} from './spacing';
import {badrButtonIcon as badrButtonIconSize} from './size';

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

export const badrButtonDisabled = {
  ...buttonBackgroundColorDisabled,
  ...loginButtonAlignment,
  ...loginButtonShape,
  ...loginButtonSize,
};

export const badrButtonIcon = {
  ...primaryBackgroundColor,
  ...loginButtonShape,
  ...badrButtonIconSize,
  ...badrButtonIconSpacing,
};
