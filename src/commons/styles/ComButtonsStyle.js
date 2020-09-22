import {loginButton as loginButtonSize} from './ComSizeStyle';
import {
  primaryBackgroundColor,
  buttonBackgroundColorDisabled,
} from './ComColorsStyle';

import {loginButton as loginButtonShape} from './ComShapeStyle';
import {loginButton as loginButtonAlignment} from './ComAlignmentStyle';
import {loginButton as loginButtonSpacing} from './ComSpacingStyle';

import {badrButtonIcon as badrButtonIconSpacing} from './ComSpacingStyle';
import {badrButtonIcon as badrButtonIconSize} from './ComSizeStyle';

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
