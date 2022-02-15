import {StyleSheet} from 'react-native';



const styles = {
   flexColumn: {flexDirection: 'column'},
     cardBoxInfoDum: {
       flexDirection: 'column',
     },
     cardBox: {
       flexDirection: 'column',
       padding: 0,
     },
     flexDirectionRow: {
       flexDirection: 'row',
     },
     containerActionBtn: {
       flexDirection: 'row',
       justifyContent: 'space-around',
     },
     libelleS: {
       fontSize: 14,
       color: '#006acd',
       flex: 1
     },
     libelleM: {
       fontSize: 14,
       color: '#006acd',
       flex: 2
     },
     libelleL: {
       fontSize: 14,
       color: '#006acd',
       flex: 3
     },
     decisionContainerRB: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       backgroundColor: '#009ab2',
       padding: 8,
       width: 300,
     },
     checkboxCol: {
       flexDirection: 'row',
       alignItems: 'center',
       alignContent: 'center',
     },
     textRadio: {
       color: '#FFF',
     },
     containerCheckbox: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
     },
     actionBtn: {
       width: 200,
     },
     rowListNumScelle: {
       height: 170,
     },
     boxContainer: {
       backgroundColor: '#ebecf3',
       borderRadius: 4,
     },
     boxSafeArea: {
       margin: '5%',
       height: 200,
       borderRadius: 4,
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
     dualListContainer: {
       borderRadius: 10,
       width: '50%',
       paddingBottom: 30,
     },
};


export default StyleSheet.create(styles);
