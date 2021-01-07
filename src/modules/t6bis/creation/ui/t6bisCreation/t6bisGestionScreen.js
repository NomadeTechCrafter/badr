import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ComBadrToolbarComp } from '../../../../../commons/component';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../commons/styles/ComThemeStyle';
import styles from '../../style/t6bisCreationStyle';







class T6bisGestion extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            context: props.route.params.context,
            mode: props.route.params.mode
        };
    }



    componentDidMount = async () => {


    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };



    render() {

        console.log('this.state', this.state);

        return (

            <View style={styles.container}>
                <ComBadrToolbarComp
                    navigation={this.props.navigation}
                    icon="menu"
                    title={translate('t6bisCreation.t6bisCreation.title')}
                />
                <Text style={CustomStyleSheet.centeredText}>
                    {translate('t6bisCreation.t6bisCreation.choixtype.title')}testddddddddd
                </Text>

                {/* Décision */}


            </View>


        );
    }
}

function mapStateToProps(state) {
    return { ...state.t6bisCreationReducer };
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
)(T6bisGestion);
