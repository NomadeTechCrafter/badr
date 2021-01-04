
import { StyleSheet } from 'react-native';
import { accentColor } from '../../../../commons/styles/ComThemeStyle';


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
    ComContainerCompBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    actionBtn: {
        width: 100
    }
};

export default StyleSheet.create(styles);
