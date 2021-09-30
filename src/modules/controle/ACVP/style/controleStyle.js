import { StyleSheet } from "react-native";
import { lightGris } from "../../../../commons/styles/ComThemeStyle";

const libelle = {
    fontSize: 14,
    color: '#006acd',
};

const value = {
    fontSize: 14,
    fontWeight: 'bold',
};

const styles = {
    libelle: {
        fontSize: 14,
        color: '#006acd',
    },
    width100: { width: '100%' },
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

    actionBtn: {
        width: 250,
        height: 50,
    },
    container: {
        flex: 1,
        margin: 5,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: lightGris,
        alignItems: 'center',
    },
    nombreResult: {
        margin: 20, marginVertical: 10, ...value},
};

export default StyleSheet.create(styles);