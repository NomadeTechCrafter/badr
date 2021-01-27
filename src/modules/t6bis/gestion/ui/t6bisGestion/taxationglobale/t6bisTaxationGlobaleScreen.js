import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import translate from '../../../../../../commons/i18n/ComI18nHelper';
import styles from '../../../style/t6bisGestionStyle';







class T6bisTaxationGlobaleTab extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
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
                <Text
                    value={translate('t6bisCreation.t6bisGestion.tabs.taxation.globale')}
                />
                 
                


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
)(T6bisTaxationGlobaleTab);
