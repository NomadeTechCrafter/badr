import {
  loginComponent as loginComponentAlignment,
  loadingIndicator as loadingIndicatorAlignment,
} from './alignment';
import {
  loginComponent as loginComponentSpacing,
  loadingIndicator as loadingIndicatorSpacing,
} from './spacing';

import {loadingIndicator as loadingIndicatorSize} from './size';

export const loginContainer = {
  ...loginComponentAlignment,
  ...loginComponentSpacing,
};

export const loadingIndicator = {
  ...loadingIndicatorAlignment,
  ...loadingIndicatorSpacing,
  ...loadingIndicatorSize,
};
