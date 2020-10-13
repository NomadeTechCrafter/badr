import {StyleSheet} from 'react-native';
import {
  darkGrayColor,
  lightBlue,
  lightGris,
  lightWhiteColor,
  primaryColor,
} from '../../../../commons/styles/theme';

const styles = {
  row: {flexDirection: 'row', padding: 10, margin: 10},
  zRow: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: lightGris,
  },
  container: {
    flex: 1,
    margin: 15,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: lightGris,
  },
  subContainer: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: lightGris,
  },
  headingText: {color: primaryColor, fontSize: 15},
  versionInitialStyle: {paddingLeft: 50, marginLeft: 10},
  versionEnCoursStyle: {paddingLeft: 50, marginLeft: 10},
  touchableButtonStyle: {width: 120, height: 50, margin: 5},
  rtlCheckboxLabelStyle: {fontSize: 17, color: darkGrayColor, marginLeft: -40},
};

export default StyleSheet.create(styles);
