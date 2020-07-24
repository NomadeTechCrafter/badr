import {StyleSheet} from 'react-native';

const style = {
  container: {flex: 1},
  loginBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  textInputContainer: {
    borderRadius: 10,
    width: '50%',
    paddingBottom: 30,
  },
  textInput: {
    backgroundColor: '#dddddd',
    color: '#000000',
    borderRadius: 10,
    textAlign: 'left',
    padding: 15,
    alignItems: 'center',
  },
  loginButton: {width: '50%', borderRadius: 10, padding: 5},
};

export default StyleSheet.create(style);
