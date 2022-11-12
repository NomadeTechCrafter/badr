import {StyleSheet} from 'react-native';

const libelle = {
  fontSize: 14,
  color: '#006acd',
  fontWeight: 'bold',
};
const value = {
  fontSize: 14,
  fontWeight: 'bold',
};

const style = {
  container: {width: '100%', height: '100%'},
  buttonIcon: {margin: 10, marginTop: 40},
  textInputsStyle: {
    padding: 10,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  centerErrorMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
    margin: 15,
  },
  margin15: {
    margin: 15,
  },
  btnAction: {
    padding: 5,
  },
  containerInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  nombreResult: {margin: 20, marginVertical: 10, ...value},
  libelle: {...libelle},
};

export default StyleSheet.create(style);
