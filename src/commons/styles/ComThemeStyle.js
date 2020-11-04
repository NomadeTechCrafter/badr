import * as Buttons from './ComButtonsStyle';
import * as Inputs from './ComTextInputsStyle';
import * as Texts from './ComTextsStyle';
import * as Images from './ComImagesStyle';
import * as Messages from './ComMessagesStyle';
import * as Login from './ComLoginStyle';
import * as Containers from './ComContainersStyle';
import * as Cards from './ComCardsStyle';
import * as Pickers from './ComPickerStyle';
import * as Rows from './ComRowsStyle';

import * as Colors from './ComColorsStyle';
import * as Size from './ComSizeStyle';
import * as Spacing from './ComSpacingStyle';
import * as Alignment from './ComAlignmentStyle';

import {StyleSheet} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

export const primaryColor = '#009ab2';
export const primaryColorRgba = '0, 154, 178';
export const accentColor = '#FFFFFF';
export const warnColor = '#ffcc00';
export const errorColor = 'red';

export const blueLabelColor = '#006acd';
export const lightWhiteColor = '#f0f5f9';
export const darkGrayColor = '#444444';
export const atShadowColor = 'rgba(59,59,59,0.04)';
export const darkGris = '#5E5E5E';
export const lightGris = '#ececec';
export const lightBlue = '#f3f6ff';

export const PaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    accent: accentColor,
  },
};
export const dataTableStyles = StyleSheet.create({
  dataTableItemStyle: {
    flex: 1,
    paddingTop: 12,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: 15,
    flexShrink: 1,
  },
  dataTableHeaderStyle: {
    fontWeight: 'bold',
    color: primaryColor,
    fontSize: 12,
  },
});

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
  badrButtonDisabled: {
    ...Buttons.badrButtonDisabled,
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
  Input: {
    ...Inputs.Input,
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
    ...Alignment.fullContainer,
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
