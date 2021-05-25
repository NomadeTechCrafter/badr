import {
  loginComponent as loginComponentAlignment,
  loadingIndicator as loadingIndicatorAlignment,
} from './ComAlignmentStyle';
import {
  loginComponent as loginComponentSpacing,
  loadingIndicator as loadingIndicatorSpacing,
} from './ComSpacingStyle';

import {loadingIndicator as loadingIndicatorSize} from './ComSizeStyle';

export const loginContainer = {
  ...loginComponentAlignment,
  ...loginComponentSpacing,
};

export const loadingIndicator = {
  ...loadingIndicatorAlignment,
  ...loadingIndicatorSpacing,
  ...loadingIndicatorSize,
};
