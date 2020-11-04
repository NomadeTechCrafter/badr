import React from 'react';

import {View} from 'react-native';

import {ComBadrToolbarComp} from '../../../../../commons/component';
import CtrlReconnaissanceSearchComponent from '../../component/ctrlReconnaissanceSearchComponent';
import CtrlReconnaissanceCoreComponent from '../../component/ctrlReconnaissanceCoreComponent';

import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/ctrlReconnaissanceStyle';

import * as Constants from '../../state/ctrlReconnaissanceConstants';

import * as CtrlReconnaissanceSearchAction from '../../state/actions/ctrlReconnaissanceSearchAction';

class AnnulerReconnaissance extends React.Component {

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
        let action = CtrlReconnaissanceSearchAction.init(
            {
                type: Constants.SEARCH_RECONNAISSANCE_INIT,
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
                    title={translate('reconnaissance.annulerReconnaissance.title')}
                />

                {(this.props.searchMode || this.props.resultsMode) && (
                    <CtrlReconnaissanceSearchComponent navigation={this.props.navigation} mode={'cancel'}/>
                )}

                {this.props.detailMode && (
                    <CtrlReconnaissanceCoreComponent navigation={this.props.navigation} mode={'cancel'} reconnaissanceVo={this.props.data.detail}/>
                )}
            </View>
        );
    };
}

function mapStateToProps(state) {
    return {...state.ctrlReconnaissanceReducer};
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
)(AnnulerReconnaissance);
