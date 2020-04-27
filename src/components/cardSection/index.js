import React from 'react';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';

const CardSection = (props) => {
    return (
        <View style={[styles.container,props.style]}>
            {props.children}
        </View>
    );
};

const styles = {
    container: {
        padding: scale(5),
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
    }
};

export default CardSection;