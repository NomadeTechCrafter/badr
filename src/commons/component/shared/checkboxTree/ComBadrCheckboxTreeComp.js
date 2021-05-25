import React from 'react';
import {Col, Row} from 'react-native-easy-grid';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';

const initialState = {};

export default class ComBadrCheckboxTreeComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;

        this.initDisplay(props.tree);
    }

    initDisplay = (tree) => {
        for (let i = 0; i < tree.length; i++) {
            tree[i].data.display = true;
            this.initActive(tree[i]);
        }
    };

    initActive = (node) => {
        let active = true;
        for (let i = 0; i < node.children.length; i++) {
            if (node.children[i].data.actif === false) {
                active = false;
                break;
            }
        }
        node.data.actif = active;
    };

    onCheck = (node, check) => {
        node.data.actif = check;

        for (let i = 0; i < node.children.length; i++) {
            this.onCheck(node.children[i], check);
        }

        this.setState({});
    };

    onPress = (node) => {
        for (let i = 0; i < node.children.length; i++) {
            node.children[i].data.display = node.children[i].data.display == null ? true : !node.children[i].data.display;
        }

        this.setState({});
    };

    renderTree = (collection, level) => {
        let node = collection.item ? collection.item : collection;

        let children = [];
        for (let i = 0; i < node.children.length; i++) {
            children.push(this.renderTree(node.children[i], level + 1));
        }

        return (
            <View>
                {node.data.display === true && (
                    <View>
                        <Row size={100} style={{marginLeft: 46 * level}}>
                            <Col size={7} style={styles.buttonContainer}>
                                {(node.children != null && node.children.length !== 0) && (
                                    <Button type={''}
                                            icon={{
                                                name: 'add',
                                                size: 24,
                                                color: 'black',
                                            }}
                                            onPress={() => this.onPress(node)}
                                    />
                                )}
                            </Col>


                            {!this.props.readonly && (
                                <Col size={5} style={styles.checkboxContainer}>
                                    <CheckBox
                                        disabled={false}
                                        value={node.data.actif}
                                        onValueChange={(check) => this.onCheck(node, check)}
                                    />
                                </Col>
                            )}

                            <Col size={90} style={styles.dataContainer}>
                                <Text style={styles.dataText}>{node.data.libelle}</Text>
                            </Col>
                        </Row>

                        {children}
                    </View>
                )}
            </View>
        );
    };

    render() {
        return (
            <Row style={styles.outerContainer}>
                <Col size={40} style={styles.container}>
                    <SafeAreaView style={styles.safeArea}>
                        <FlatList
                            data={this.props.tree}
                            renderItem={(collection) => this.renderTree(collection, 0)}
                            keyExtractor={item => item.id}
                        />
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
        margin: '2%',
        borderRadius: 4,
    },
    buttonContainer: {
        justifyContent: 'center',
    },
    checkboxContainer: {
        justifyContent: 'center',
    },
    dataContainer: {
        justifyContent: 'center',
    },
    dataText: {
        fontSize: 16,
    },
});
