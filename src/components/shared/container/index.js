import React from 'react';
import {View, ScrollView} from 'react-native';
const Container = props => {
  return (
    <ScrollView ref={props.ContainerRef}>
      <View style={[styles.defaultStyle, props.style]}>{props.children}</View>
    </ScrollView>
  );
};

const styles = {
  defaultStyle: {
    flex: 1,
    padding: '3%',
  },
};

export default Container;
