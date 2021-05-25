import {StyleSheet} from 'react-native';
import { accentColor } from '../../../../../commons/styles/ComThemeStyle';

const style = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInputs: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cleHelperMsg: { width: 150 },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnConfirmer: {
    color: accentColor,
    padding: 5,
    marginRight: 15,
  },
  btnRetablir: {
    color: accentColor,
    padding: 5,
  },
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
  },
  alignStart: {
    alignItems: 'flex-start',
    flex: 1,
  },
  alignEnd: {
    alignItems: 'flex-end',
    flex: 1,
  },
  BtnWidth: { width: 100 },
  enregistreeStyle: { padding: 20 },
};

export default StyleSheet.create(style);
