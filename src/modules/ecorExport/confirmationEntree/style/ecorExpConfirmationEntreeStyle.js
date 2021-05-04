import {StyleSheet} from 'react-native';

const style = {
  container: {width: '100%', height: '100%'},
  buttonIcon: {margin: 10, marginTop: 40},
  dateInputStyle: {
    padding: 10,
  },
  boxContainer: {
    backgroundColor: '#ebecf3',
    borderRadius: 4,
  },
  boxSafeArea: {
    margin: '5%',
    height: 200,
    borderRadius: 4,
    flex: 1,
  },
  boxItem: {
    backgroundColor: '#ffffff',
    marginVertical: 2,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
  },
  boxItemText: {
    paddingLeft: '4%',
    color: '#000000',
  },
  selectedBoxItem: {
    backgroundColor: '#009ab2',
    marginVertical: 2,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
  },
  selectedBoxItemText: {
    paddingLeft: '4%',
    color: '#ffffff',
  },
  rowListNumScelle: {
    height: 170,
  },
};

export default StyleSheet.create(style);
