import {badrPicker as badrPickerSpacing} from './spacing';
import {badrPickerTitle as badrPickerTitleSpacing} from './spacing';
import {badrPicker as badrPickerShape} from './shape';
import {badrPicker as badrPickerCalligraphy} from './calligraphy';
import {badrPickerTitle as badrPickerTitleCalligraphy} from './calligraphy';
import {badrPicker as badrPickerColors} from './colors';
import {badrPickerTitle as badrPickerTitleColors} from './colors';
import {badrPicker as badrPickerSize} from './size';
import {badrPickerTitle as badrPickerTitleSize} from './size';

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
