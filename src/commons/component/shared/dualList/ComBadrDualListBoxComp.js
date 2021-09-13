import React from 'react';

import {Col, Row} from 'react-native-easy-grid';
import {FlatList, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-elements';

const initialState = {};

export default class ComBadrDualListBoxComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    moveItem = (direction) => {
        if (this.state.selectedCode == null) {
            ToastAndroid.show('Aucun élément n\'a été sélectionné', ToastAndroid.SHORT);
        } else if (this.state.selectedBox === 'left' && direction === 'right') {
            const selectedIndex = this.props.available.findIndex((item) => item.code === this.state.selectedCode);

            this.props.selected.push(this.props.available[selectedIndex]);
            this.props.available.splice(selectedIndex, 1);

            this.setState({selectedCode: null, selectedBox: null});
        } else if (this.state.selectedBox === 'right' && direction === 'left') {
            const selectedIndex = this.props.selected.findIndex((item) => item.code === this.state.selectedCode);

            this.props.available.push(this.props.selected[selectedIndex]);
            this.props.selected.splice(selectedIndex, 1);

            this.setState({selectedCode: null, selectedBox: null});
        } else {
            ToastAndroid.show('Sens non autorisé', ToastAndroid.SHORT);
        }
    };

    renderOption = ({item}, box) => {
        const itemStyle = item.code === this.state.selectedCode ? styles.selectedItem : styles.item;
        const itemTextStyle = item.code === this.state.selectedCode ? styles.selectedItemText : styles.itemText;

        return (
            <View style={itemStyle}>
                <TouchableOpacity onPress={() => this.setState({selectedCode: item.code, selectedBox: box})}
                                  disabled={item.disabled}>
                    <Text style={itemTextStyle}>{item.libelle}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <Row style={styles.outerContainer}>
                <Col size={40} style={styles.container}>
                    <SafeAreaView style={styles.safeArea}>
                        {(this.props.available == null || this.props.available.length === 0) && (
                            <Text style={styles.itemText}>Aucun élément</Text>
                        )}

                        {(this.props.available == null || this.props.available.length !== 0) && (
                            <FlatList
                                data={this.props.available}
                                renderItem={(item) => this.renderOption(item, 'left')}
                                keyExtractor={item => item.code}
                                nestedScrollEnabled={true}
                            />
                        )}
                    </SafeAreaView>
                </Col>

                <Col size={16} style={styles.arrows}>
                    <TouchableOpacity style={styles.touchableArrow}
                                      disabled={this.props.readonly}>
                        <Button
                            type={'outline'}
                            icon={{
                                name: 'chevron-right',
                                size: 12,
                                color: 'black',
                            }}
                            onPress={() => this.moveItem('right')}
                            disabled={this.props.readonly}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchableArrow}
                                      disabled={this.props.readonly}>
                        <Button
                            type={'outline'}
                            icon={{
                                name: 'chevron-left',
                                size: 12,
                                color: 'black',
                            }}
                            onPress={() => this.moveItem('left')}
                            disabled={this.props.readonly}
                        />
                    </TouchableOpacity>
                </Col>

                <Col size={40} style={styles.container}>
                    <SafeAreaView style={styles.safeArea}>
                        {(this.props.selected == null || this.props.selected.length === 0) && (
                            <Text style={styles.itemText}>Aucun élément</Text>
                        )}

                        {(this.props.selected == null || this.props.selected.length !== 0) && (
                            <FlatList
                                data={this.props.selected}
                                renderItem={(item) => this.renderOption(item, 'right')}
                                keyExtractor={item => item.code}
                                nestedScrollEnabled={true}
                            />
                        )}
                    </SafeAreaView>
                </Col>
            </Row>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        marginTop: '2%',
        marginBottom: '2%',
    },
    container: {
        backgroundColor: '#ebecf3',
        borderRadius: 4,
    },
    safeArea: {
        margin: '5%',
        height: 200,
        borderRadius: 4,
    },
    item: {
        backgroundColor: '#ffffff',
        marginVertical: 2,
        borderRadius: 4,
        justifyContent: 'center',
    },
    itemText: {
        paddingLeft: '4%',
        color: '#000000',
    },
    selectedItem: {
        backgroundColor: '#009ab2',
        marginVertical: 2,
        borderRadius: 4,
        justifyContent: 'center',
    },
    selectedItemText: {
        paddingLeft: '4%',
        color: '#ffffff',
    },
    arrows: {
        marginTop: '9%',
    },
    touchableArrow: {
        width: '50%',
        marginTop: '10%',
        marginLeft: '25%',
    },
});
