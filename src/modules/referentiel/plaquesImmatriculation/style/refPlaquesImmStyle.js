import {StyleSheet} from 'react-native';

const style = {
  datatableTitle: {width: 300},
  datatablePagination: {alignSelf: 'flex-start'},
  container: {width: '100%', height: '100%'},
  buttonIcon: {margin: 10, marginTop: 40},
  columnOne: {
    width: '100%',
    margin: 10,
  },
  column: {
    width: '45%',
    margin: 10,
  },
  columnThree: {
    width: '30%',
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'space-around',
    margin: 10,
  },
  itemPickerContainer: {flexDirection: 'row', margin: 10},
};

export default StyleSheet.create(style);
