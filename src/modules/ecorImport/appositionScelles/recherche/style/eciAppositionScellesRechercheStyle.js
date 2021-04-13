import {StyleSheet} from 'react-native';

export const styles = {
  ComContainerComp: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  ComContainerCompInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  cleHelperMsg: { width: 150 },
  ComContainerCompBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnConfirmer: {
    color: '#FFF',
    padding: 5,
    marginRight: 15,
  },
  btnRetablir: {
    color: '#FFF',
    padding: 5,
  },
  ComContainerCompCheckbox: {
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
  maxRedevanceInput: { height: 45 },
};

export default StyleSheet.create(styles);
