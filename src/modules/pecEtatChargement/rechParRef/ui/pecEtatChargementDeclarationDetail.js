import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import style from '../style/pecEtatChargementStyle';

class EtatChargementDeclarationDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={style.container}>
            <Text>{this.props.data.numVoyage}</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.pecEtatChargementReducer };
}

function mapDispatchToProps(dispatch) {
    let actions = { dispatch };
    return {
        actions,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EtatChargementDeclarationDetail);
