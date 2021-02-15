
import { StyleSheet } from 'react-native';


const styles = {
    ComContainerComp: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0,
    },
    ComContainerCompInputs: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:50
        
    },
    cleHelperMsg: { width: 150 },
    ComContainerCompBtn: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btnValider: {
        color: '#FFF',
        padding: 5,
        marginRight: 15,
    },
    btnAbandonner: {
        color: '#FFF',
        padding: 5,
        marginRight: 15,
    },
    
    labelContainer: {
        justifyContent: 'center',
    },
    labelTextStyle: {
        color: '#009ab2',
        padding: 15
    },
    enregistreeStyle: { padding: 20, justifyContent: 'center',width:200 }
};


export default StyleSheet.create(styles);
