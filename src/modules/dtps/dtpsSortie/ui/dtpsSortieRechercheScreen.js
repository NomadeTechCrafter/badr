import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

class EciConsultationBLSRechercheScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Recherche</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.dtpsSortieReducer };
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
)(EciConsultationBLSRechercheScreen);
