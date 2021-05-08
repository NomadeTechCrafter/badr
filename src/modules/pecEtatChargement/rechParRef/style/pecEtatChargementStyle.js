import { StyleSheet } from 'react-native';
import { accentColor, atShadowColor, blueLabelColor, darkGrayColor, lightWhiteColor } from '../../../../commons/styles/ComThemeStyle';

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
  container: { width: '100%', height: '100%' },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
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
  containerInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  flexRow: {
    flexDirection: 'row',
  },
  cleHelperMsg: { width: 150 },
  width90: { width: '90%', height: '70%'},
  centre: {
    alignSelf: 'center',
  },
  buttonIcon: { margin: 10, marginTop: 40 },
  margtt: { margin: 10, marginTop: 60 },
  marginTop8: { marginTop: 8},
  marginTop15: { marginTop: 15},
  margtr: {marginRight: 10 , marginTop: 0, marginBottom: 0},

  referenceCardInfo: {
    flexDirection: 'column',
    borderRadius: 4,
    padding: 10,
  },
  referenceValues: {
    ...referenceContainer,
    margin: 4,
    backgroundColor: lightWhiteColor,
  },
  referenceValueLabel: {
    fontSize: 14,
    margin: 4,
    color: darkGrayColor,
  },
  referenceTitleLabel: {
    fontSize: 14,
    margin: 4,
    color: blueLabelColor,
  },
  referenceTitles: {
    ...referenceContainer,
    backgroundColor: accentColor,
  },
  referenceValues: {
    ...referenceContainer,
    backgroundColor: lightWhiteColor,
  },
  libelleS: {
    ...libelle,
    flex: 1,
  },
  libelleM: {
    ...libelle,
    flex: 2,
  },
  libelleL: {
    ...libelle,
    flex: 3,
    width: 70,
  },
  valueS: {
    ...value,
    flex: 1,
  },
  valueM: {
    ...value,
    flex: 2,
  },
  valueL: {
    ...value,
    flex: 3,
  },
  valueXL: {
    ...value,
    flex: 5,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flexDirectionCol: {
    flexDirection: 'column',
  },
  margtb: {
      marginBottom: 10,
  },
  cardBoxInfoDum: {
      flexDirection: 'column',
      margin: 10,
  },
  cardBoxInfoDum1: {
    flexDirection: 'column',
    marginRight: 100
  },
  fabContainer: {
    height: '100%',
    flex: 1,
  },
  cardBox: {
    padding: 0,
    margin: 10,
  },
  nombreResult: { margin: 20, marginVertical: 10, ...value },
  libelle: { ...libelle },
};


const styles = StyleSheet.create({
  messages: {},
  fabContainer: {
      height: '100%',
      flex: 1,
  },
  centerErrorMsg: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
  },
  centerInfoMsg: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
  },

  cardBox: {
      padding: 0,
      margin: 10,
  },
  containerActionBtn: {
      flexDirection: 'row',
      justifyContent: 'space-around',
  },
  libelle: { ...libelle },
  libelleS: {
      ...libelle,
      flex: 1,
  },
  libelleM: {
      ...libelle,
      flex: 2,
  },
  libelleL: {
      ...libelle,
      flex: 3,
  },
  valueS: {
      ...value,
      flex: 1,
  },
  valueM: {
      ...value,
      flex: 2,
  },
  valueL: {
      ...value,
      flex: 3,
  },
  decisionContainerRB: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#009ab2',
      padding: 8,
      width: 300,
  },
  textRadio: {
      color: '#FFF',
  },
  flexColumn: { flexDirection: 'column' },
  margLeft: {
      marginLeft: 20,
  },
  marg: {
      margin: 10,
  },
  margtb: {
      marginBottom: 10,
  },
  textarea: {
      height: 50,
      marginRight: 50,
  },
  date: {
      fontWeight: 'bold',
      borderColor: 'red',
  },
  table: {
      marginBottom: 20,
  },
  tableHeader: {
      backgroundColor: '#ecf0f1',
  },
  centre: {
      alignSelf: 'center',
  },
  nombreResult: { margin: 20, marginVertical: 10, ...value },
  cardBoxInfoDum: {
      flexDirection: 'column',
      margin: 10,
  },
});
export default StyleSheet.create(style);
