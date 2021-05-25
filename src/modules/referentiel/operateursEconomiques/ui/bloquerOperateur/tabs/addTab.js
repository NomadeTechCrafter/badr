import React from 'react';

import {View} from 'react-native';
import RefOperateursEconomiquesCoreComponent from '../../../component/refOperateursEconomiquesCoreComponent';

import {connect} from 'react-redux';

import * as Constants from '../../../state/refOperateursEconomiquesConstants';

import * as RefOperateursEconomiquesInitAction from '../../../state/actions/refOperateursEconomiquesInitAction';

const initialState = {};

class AddTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.reset();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    reset = () => {
        let action = RefOperateursEconomiquesInitAction.request(
            {
                type: Constants.INIT_OPERATEURS_ECONOMIQUES_REQUEST,
                value: {},
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };

    render() {
        return (
            <View>
                <RefOperateursEconomiquesCoreComponent navigation={this.props.navigation} mode={'add'} blocageVo={this.props.data.init} onReset={this.reset}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {...state.refOperateursEconomiquesReducer};
}

function mapDispatchToProps(dispatch) {
    let actions = {dispatch};
    return {
        actions,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTab);
