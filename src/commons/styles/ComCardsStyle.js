import {card as cardSize} from './ComSizeStyle';
import {card as cardShape} from './ComShapeStyle';
import {card as cardAlignment} from './ComAlignmentStyle';
import {card as cardSpacing} from './ComSpacingStyle';
import {card as cardColors} from './ComColorsStyle';
import {card as cardCalligraphy} from './ComCalligraphyStyle';

export const badrCard = {
  ...cardAlignment,
  ...cardSpacing,
  ...cardShape,
  ...cardSize,
  ...cardColors,
  ...cardCalligraphy,
};
