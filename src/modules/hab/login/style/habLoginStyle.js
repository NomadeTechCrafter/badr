import {StyleSheet} from 'react-native';
import {
  accentColor,
  lightGris,
  primaryColor,
} from '../../../../commons/styles/ComThemeStyle';
const style = {
  container: {flex: 1, backgroundColor: accentColor},
  loginBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  textInputContainer: {
    borderRadius: 10,
    width: '50%',
    paddingBottom: 30,
  },
  textInput: {
    backgroundColor: lightGris,
    color: 'black',
    borderRadius: 10,
    textAlign: 'left',
    padding: 15,
    alignItems: 'center',
  },
  loginButton: {width: '50%', borderRadius: 10, padding: 5},
  containerModal: {
    backgroundColor: primaryColor,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  iconModal: {
    marginBottom: 10,
  },
  textModal: {
    color: accentColor,
  },
};

export default StyleSheet.create(style);
