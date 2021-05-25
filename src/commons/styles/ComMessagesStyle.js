import {
  errorsBorderColor,
  errorsBackgroundColor,
  infoBorderColor,
  infoBackgroundColor,
} from './ComColorsStyle';
import {errorsBox as errorsBoxSpacing} from './ComSpacingStyle';
import {errorsBox as errorsBoxShape} from './ComShapeStyle';
import {errorsBox as errorsBoxAlignment} from './ComAlignmentStyle';

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
