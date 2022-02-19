import {StyleSheet,Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const style = {
  btnSmsCode: {
    marginTop: SCREEN_HEIGHT/2-25,
     width: '35%',
     fontSize: 8,
     height:30
  },
};

export default StyleSheet.create(style);
