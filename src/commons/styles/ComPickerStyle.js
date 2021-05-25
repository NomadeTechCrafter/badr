import {badrPicker as badrPickerSpacing} from './ComSpacingStyle';
import {badrPickerTitle as badrPickerTitleSpacing} from './ComSpacingStyle';
import {badrPicker as badrPickerShape} from './ComShapeStyle';
import {badrPicker as badrPickerCalligraphy} from './ComCalligraphyStyle';
import {badrPickerTitle as badrPickerTitleCalligraphy} from './ComCalligraphyStyle';
import {badrPicker as badrPickerColors} from './ComColorsStyle';
import {badrPickerTitle as badrPickerTitleColors} from './ComColorsStyle';
import {badrPicker as badrPickerSize} from './ComSizeStyle';
import {badrPickerTitle as badrPickerTitleSize} from './ComSizeStyle';

export const badrPicker = {
  ...badrPickerSpacing,
  ...badrPickerShape,
  ...badrPickerCalligraphy,
  ...badrPickerColors,
  ...badrPickerSize,
};

export const badrPickerTitle = {
  ...badrPickerTitleCalligraphy,
  ...badrPickerTitleColors,
  ...badrPickerTitleSize,
  ...badrPickerTitleSpacing,
};
