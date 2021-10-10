
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
    valueTextStyle: {
        color: '#000000'
    },
    ComContainerCompBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    containerActionBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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
    row: {
        flexDirection: 'row',
        padding: 10,
        margin: 10
    },
    textInputsStyle: {
        padding: 10,
    },
    ComContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    MontantLabel: { fontSize: 16, fontWeight: 'bold', color: '#009ab2' },
    buttonIcon: { margin: 10, marginTop: 10 },

};

export default StyleSheet.create(styles);
