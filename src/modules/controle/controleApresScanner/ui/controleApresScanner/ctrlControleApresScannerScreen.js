import React from 'react';

import {View} from 'react-native';

import {ComBadrToolbarComp} from '../../../../../commons/component';
import CtrlControleApresScannerSearchComponent from '../../component/ctrlControleApresScannerSearchComponent';
import CtrlControleApresScannerCoreComponent from '../../component/ctrlControleApresScannerCoreComponent';

import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/ctrlControleApresScannerStyle';

import * as Constants from '../../state/ctrlControleApresScannerConstants';

import * as CtrlControleApresScannerSearchAction from '../../state/actions/ctrlControleApresScannerSearchAction';

class ControleApresScanner extends React.Component {

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
        let action = CtrlControleApresScannerSearchAction.init(
            {
                type: Constants.SEARCH_CONTROLE_APRES_SCANNER_INIT,
                value: {},
            },
            this.props.navigation,
        );
        this.props.actions.dispatch(action);
    };

    render() {
        return (
            <View>
                {(this.props.searchMode) && (
                    <CtrlControleApresScannerSearchComponent navigation={this.props.navigation}/>
                )}

                {this.props.detailMode && (
                    <View style={style.container}>
                        <ComBadrToolbarComp
                            navigation={this.props.navigation}
                            icon="menu"
                            title={translate('controleApresScanner.controleApresScanner.title')}
                        />

                        <CtrlControleApresScannerCoreComponent navigation={this.props.navigation}
                                                               controleApresScannerVo={this.props.data.search.detail}/>
                    </View>
                )}
            </View>
        );
    };
}

function mapStateToProps(state) {
    return {...state.ctrlControleApresScannerReducer};
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
)(ControleApresScanner);
