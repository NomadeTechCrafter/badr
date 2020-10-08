import React from 'react';

import {View} from 'react-native';
import RefOperateursEconomiquesSearchComponent from '../../../component/refOperateursEconomiquesSearchComponent';
import RefOperateursEconomiquesCoreComponent from '../../../component/refOperateursEconomiquesCoreComponent';

import {connect} from 'react-redux';

import * as Constants from '../../../state/refOperateursEconomiquesConstants';

import * as RefOperateursEconomiquesSearchAction from '../../../state/actions/refOperateursEconomiquesSearchAction';

const initialState = {};

class EditTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('blur', () => {
            this.reset();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    reset = () => {
        let action = RefOperateursEconomiquesSearchAction.init(
            {
                type: Constants.SEARCH_OPERATEURS_ECONOMIQUES_INIT,
                value: {},
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };

    render() {
        return (
            <View>
                {this.props.searchMode && (
                    <RefOperateursEconomiquesSearchComponent navigation={this.props.navigation} includeInvalid={false}/>
                )}

                {this.props.detailMode && (
                    <RefOperateursEconomiquesCoreComponent navigation={this.props.navigation} mode={'edit'} blocageVo={this.props.data.detail} onReset={this.reset}/>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditTab);
