import { StyleSheet } from 'react-native';

const value = {
    fontSize: 14,
    // fontWeight: 'bold',
};

const style = {
    container: { width: '100%', height: '100%' },
    buttonIcon: { margin: 10, marginTop: 40 },
    marginTop20: { marginTop: 10 },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: {
        textAlign: 'center'
    },
    datatableWidth: { width: '100%' },
    datatableHeaderWidth: { textAlign: 'center', backgroundColor: '#00ffff' },
    datatableCellWidth: { width: 220, margin: 5 },
    datatableCell: {
        width: 500,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    datatableCellMinWidth: { width: 100, margin: 5 },
    datatableCellAveWidth: { width: 150, margin: 5 },
    width100: { width: '100%' },
    textInputsStyle: {
        padding: 10,
    },
    flexDirectionRow: {
        flexDirection: 'row',
    },
    margtb: {
        marginBottom: 10,
    },
    valueM: {
        ...value,
        flex: 2,
    },
    column: { width: 90 },
    gridContainer: { paddingRight: 25, paddingLeft: 25, width: '100%' },
};

export default StyleSheet.create(style);