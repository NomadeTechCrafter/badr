import * as Buttons from './buttons';
import * as Inputs from './textInputs';
import * as Texts from './texts';
import * as Images from './images';
import * as Messages from './messages';
import * as Login from './login';
import * as Containers from './containers';
import * as Cards from './cards';
import * as Pickers from './picker';
import * as Rows from './rows';

import * as Colors from './colors';
import * as Size from './size';
import * as Spacing from './spacing';
import * as Alignment from './alignment';

import {StyleSheet} from 'react-native';

export const primaryColor = '#009ab2';
export const accentColor = '#FFFFFF';
export const warnColor = '#ffcc00';
export const errorColor = 'red';

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
  badrButtonIcon: {
    ...Buttons.badrButtonIcon,
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
  progressbarText: {
    ...Texts.progressbarText,
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
  badrPickerTitle: {
    ...Pickers.badrPickerTitle,
  },
  menuHeader: {
    ...Containers.menuHeader,
  },
  menuHeaderSubTitle: {
    ...Texts.menuHeaderSubTitle,
  },
  menuHeaderTitle: {
    ...Texts.menuHeaderTitle,
  },
  menuUserImage: {
    ...Images.menuUserImage,
  },

  smallInput: {
    ...Size.smallInput,
    ...Spacing.inputRechercheDum,
  },
  mediumInput: {
    ...Size.mediumInput,
    ...Spacing.inputRechercheDum,
  },
  largeInput: {
    ...Size.largeInput,
  },
  verticalActionsContainer: {
    ...Containers.verticalActionsContainer,
  },
  fullContainer: {
    ...Alignment.fullContiner,
  },
  badrLibelleBleu: {
    ...Colors.libelleBleu,
    ...Texts.badrLibelle,
  },
  badrLibelleNoir: {
    ...Colors.libelleNoir,
    ...Texts.badrLibelle,
  },
  whiteRow: {
    ...Rows.gridWhiteRow,
  },
  lightBlueRow: {
    ...Rows.gridLightBlueRow,
  },
  verticalContainer20: {
    ...Containers.verticalContainer20,
  },
  row: {
    ...Containers.row,
  },
  column: {
    ...Containers.column,
  },
  badrInputHeight: {
    ...Size.badrInputHeight,
  },
});

export {CustomStyleSheet};
