import {centerContainer as centerContainerAlignment} from './alignment';
import {centerContainer as centerContainerSpacing} from './spacing';
import {centerContainer as centerContainerSize} from './size';
import {centerContainer as centerContainerColors} from './colors';
import {menuContainer as menuContainerAlignment} from './alignment';

import {menuHeader as menuHeaderSpacing} from './spacing';
import {menuHeader as menuHeaderColors} from './colors';
import {menuHeader as menuHeaderAlignment} from './alignment';

import {verticalActionContainer as verticalActionContainerAlignment} from './alignment';
import {verticalActionContainer as verticalActionContainerSpacing} from './spacing';

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
