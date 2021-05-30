import { StyleSheet } from 'react-native';
import {
  accentColor,
  atShadowColor,
  blueLabelColor,
  darkGrayColor,
  lightWhiteColor
} from '../../../../../commons/styles/ComThemeStyle';


const referenceContainer = {
  flexDirection: 'row',
  padding: 10,
  borderRadius: 4,
  shadowColor: atShadowColor,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0,
  shadowRadius: 1,
  elevation: 2,
};

const style = {
  container: { width: '100%', height: '100%' },
  innerContainer: {
    margin: '2%',
  },
  searchInputContainer: {
    alignItems: 'center',
  },
  searchInput: {
    width: 300,
  },
  referenceCardInfo: {
    flexDirection: 'column',
    borderRadius: 4,
    padding: 10,
  },
  referenceTitles: {
    ...referenceContainer,
    margin: 4,
    backgroundColor: accentColor,
  },
  referenceValues: {
    ...referenceContainer,
    margin: 4,
    backgroundColor: lightWhiteColor,
  },
  referenceTitleLabel: {
    fontSize: 14,
    color: blueLabelColor,
  },
  referenceValueLabel: {
    fontSize: 14,
    color: darkGrayColor,
  },
  topMarginStyle: {
    marginTop: '1%',
  },
  labelContainer: {
    justifyContent: 'center',
  },
  labelTextStyle: {
    color: '#009ab2',
  },
  labelRequiredStyle: {
    color: '#ff0000',
  },
  buttonAction: {
    margin: '4%',
    backgroundColor: '#009ab2',
  },
  boxContainer: {
    backgroundColor: '#ebecf3',
    borderRadius: 4,
  },
  boxSafeArea: {
    margin: '5%',
    height: 200,
    borderRadius: 4,
    flex: 1
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
  pictureStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
  modalContainer: {
    flex: 0,
    backgroundColor: '#fff',
    top: '30%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 200,
    marginRight: 200,
  },
  modalMessage: {
    margin: '4%',
  },
  modalAction: {
    margin: '1%',
    backgroundColor: '#009ab2',
  },
};

export default StyleSheet.create(style);
