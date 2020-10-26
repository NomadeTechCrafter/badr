import React from 'react';

import {View} from 'react-native';

import {ComBadrToolbarComp} from '../../../../../commons/component';
import EnqCompteRenduSearchComponent from '../../component/enqCompteRenduSearchComponent';
import EnqCompteRenduCoreComponent from '../../component/enqCompteRenduCoreComponent';

import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/enqCompteRenduStyle';

import * as Constants from '../../state/enqCompteRenduConstants';

import * as EnqCompteRenduSearchAction from '../../state/actions/enqCompteRenduSearchAction';

class ValiderCompteRenduMission extends React.Component {

    constructor(props) {
        super(props);
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
        let action = EnqCompteRenduSearchAction.init(
            {
                type: Constants.SEARCH_COMPTE_RENDU_INIT,
                value: {},
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };

    render() {
        return (
            <View style={style.container}>
                <ComBadrToolbarComp
                    navigation={this.props.navigation}
                    icon="menu"
                    title={translate('enquetes.compteRenduMission.validerCompteRenduMission.title')}
                />

                {(this.props.searchMode) && (
                    <EnqCompteRenduSearchComponent navigation={this.props.navigation} mode={'validate'}/>
                )}

                {this.props.detailMode && (
                    <EnqCompteRenduCoreComponent navigation={this.props.navigation} mode={'validate'}
                                                 enqueteVo={this.props.data.search.detail}/>
                )}
            </View>
        );
    };
}

function mapStateToProps(state) {
    return {...state.enqCompteRenduReducer};
}

function mapDispatchToProps(dispatch) {
    let actions = {dispatch};
    return {
        actions,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ValiderCompteRenduMission);
