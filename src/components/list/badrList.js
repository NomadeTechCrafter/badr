import {CustomStyleSheet} from '../../styles/index';
import React from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];
export default class BadrList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <FlatList style = {this.props.style}
                data={DATA}
                renderItem={({item, index, separators}) => (
                    <TouchableHighlight
                        key={item.id}
                        onPress={() => this._onPress(item)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                      <View  style={styles.item} >
                        <Text style={styles.title} >{item.title}</Text>
                      </View>
                    </TouchableHighlight>
                )}
            />
        );
    }
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 10,
        paddingVertical:6,
        marginVertical: 5,
        height: 50,
        borderStyle: 'solid',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent:'center'
    },
    title: {
        fontSize: 16,
        color: '#444'
    },
});
