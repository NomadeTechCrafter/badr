import * as Buttons from './buttons';
import * as Inputs from './textInputs';
import * as Texts from './texts';
import * as Images from './images';
import * as Messages from './messages';
import * as Login from './login';
import * as Containers from './containers';
import * as Cards from './cards';
import * as Pickers from './picker';

import {StyleSheet} from 'react-native';

const CustomStyleSheet = StyleSheet.create({
  badrCardText: {
    ...Texts.cardText,
  },
  badrCard: {
    ...Cards.badrCard,
  },
  badrButton: {
    ...Buttons.badrButton,
  },
  loginButton: {
    ...Buttons.loginButton,
  },
  badrButtonText: {
    ...Texts.buttonLoginText,
  },
  badrInput: {
    ...Inputs.loginInput,
  },
  badrText: {
    ...Texts.loginText,
  },
  centeredText: {
    ...Texts.centeredText,
  },
  loginHeaderImage: {
    ...Images.loginHeaderImage,
  },
  loginContainer: {
    ...Login.loginContainer,
    ...Login.loadingIndicator,
  },
  errorMessages: {
    ...Messages.errors,
  },
  infoMessages: {
    ...Messages.info,
  },
  centerContainer: {
    ...Containers.centerContainer,
  },
  whiteContainer: {
    ...Containers.whiteContainer,
  },
  menuContainer: {
    ...Containers.menuContainer,
  },
  badrPicker: {
    ...Pickers.badrPicker,
  },
  badrPickerTitle : {
    ...Pickers.badrPickerTitle
  }
});

export {CustomStyleSheet};
