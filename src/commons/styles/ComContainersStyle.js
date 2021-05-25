import {centerContainer as centerContainerAlignment} from './ComAlignmentStyle';
import {centerContainer as centerContainerSpacing} from './ComSpacingStyle';
import {centerContainer as centerContainerSize} from './ComSizeStyle';
import {centerContainer as centerContainerColors} from './ComColorsStyle';
import {menuContainer as menuContainerAlignment} from './ComAlignmentStyle';

import {menuHeader as menuHeaderSpacing} from './ComSpacingStyle';
import {menuHeader as menuHeaderColors} from './ComColorsStyle';
import {menuHeader as menuHeaderAlignment} from './ComAlignmentStyle';

import {verticalActionContainer as verticalActionContainerAlignment} from './ComAlignmentStyle';
import {verticalActionContainer as verticalActionContainerSpacing} from './ComSpacingStyle';

import {verticalContainer20 as verticalContainer20Spacing} from './ComSpacingStyle';

export const centerContainer = {
  ...centerContainerAlignment,
  ...centerContainerSpacing,
  ...centerContainerSize,
  ...centerContainerColors,
};

export const whiteContainer = {
  ...centerContainerColors,
};

export const menuContainer = {
  ...menuContainerAlignment,
};

export const menuHeader = {
  ...menuHeaderSpacing,
  ...menuHeaderAlignment,
  ...menuHeaderColors,
};

export const verticalActionsContainer = {
  ...verticalActionContainerAlignment,
  ...verticalActionContainerSpacing,
};

export const verticalContainer20 = {
  ...verticalContainer20Spacing,
};

export const column = {
  width: '45%',
  margin: 10,
};

export const row = {
  flexDirection: 'row',
  alignContent: 'space-around',
  margin: 10,
};
