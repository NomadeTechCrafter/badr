import {loginInput as loginInputSize} from './ComSizeStyle';
import {Input as InputSize} from './ComSizeStyle';
import {inputsBackgroundColor} from './ComColorsStyle';
import {loginInput as loginInputShape} from './ComShapeStyle';
import {loginInput as loginInputAlignment} from './ComAlignmentStyle';
import {loginInput as loginInputSpacing} from './ComSpacingStyle';
import {Input as InputShape} from './ComShapeStyle';
import {Input as InputAlignment} from './ComAlignmentStyle';
import {Input as InputSpacing} from './ComSpacingStyle';
export const loginInput = {
  ...inputsBackgroundColor,
  ...loginInputSize,
  ...loginInputShape,
  ...loginInputAlignment,
  ...loginInputSpacing,
};

export const Input = {
  ...inputsBackgroundColor,
  ...InputSize,
  ...InputShape,
  ...InputAlignment,
  ...InputSpacing,
};
