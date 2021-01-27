
import { StyleSheet } from 'react-native';


const styles = {
    container: { width: '100%', height: '100%' },
    cardBox: {
        flexDirection: 'column',
        padding: 0,
    },
    flexColumn: { flexDirection: 'column' },
    typeContainerRB: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#009ab2',
        padding: 8,
    },
    textRadio: {
        color: '#fff',
    },
    textStyle: {
        color: '#fff',
        backgroundColor: '#009ab2'
    },
    labelContainer: {
        justifyContent: 'center',
    },
    labelTextStyle: {
        color: '#009ab2',
    },
    ComContainerCompBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    actionBtn: {
        width: 100
    },
    messages: {},
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
    row: { flexDirection: 'row', padding: 10, margin: 10 },

};

export default StyleSheet.create(styles);
