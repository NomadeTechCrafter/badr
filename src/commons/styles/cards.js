import {card as cardSize} from './size';
import {card as cardShape} from './shape';
import {card as cardAlignment} from './alignment';
import {card as cardSpacing} from './spacing';
import {card as cardColors} from './colors';
import {card as cardCalligraphy} from './calligraphy';

export const badrCard = {
  ...cardAlignment,
  ...cardSpacing,
  ...cardShape,
  ...cardSize,
  ...cardColors,
  ...cardCalligraphy,
};
