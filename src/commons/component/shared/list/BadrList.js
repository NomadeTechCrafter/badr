import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {primaryColor} from '../../../styles';

export default class BadrList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexSelectedItem: '',
    };
  }
  onPressItem = (index) => {
    this.props.onPressListItem(index);
    this.setState({indexSelectedItem: index});
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={this.props.style}
          nestedScrollEnabled={true}
          data={this.props.data}
          ListHeaderComponent={this.props.ListHeaderComponent}
          renderItem={({item, index, separators}) => (
            <TouchableHighlight
              key={item}
              underlayColor={primaryColor}
              onPress={() => this.onPressItem(index)}>
              <View
                style={[
                  styles.item,
                  this.state.indexSelectedItem === index
                    ? styles.selectedItem
                    : '',
                ]}>
                <Text style={styles.title}>{item}</Text>
              </View>
            </TouchableHighlight>
          )}
          ListFooterComponent={this.props.ListFooterComponent}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    height: 50,
    borderStyle: 'solid',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedItem: {
    backgroundColor: primaryColor,
  },
  title: {
    fontSize: 16,
    color: '#444',
  },
});
