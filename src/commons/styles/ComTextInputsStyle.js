import {loginInput as loginInputSize} from './ComSizeStyle';
import {inputsBackgroundColor} from './ComColorsStyle';
import {loginInput as loginInputShape} from './ComShapeStyle';
import {loginInput as loginInputAlignment} from './ComAlignmentStyle';
import {loginInput as loginInputSpacing} from './ComSpacingStyle';

export const loginInput = {
  ...inputsBackgroundColor,
  ...loginInputSize,
  ...loginInputShape,
  ...loginInputAlignment,
  ...loginInputSpacing,
};
