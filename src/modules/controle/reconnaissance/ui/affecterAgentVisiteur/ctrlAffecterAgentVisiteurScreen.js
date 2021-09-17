import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ComBadrToolbarComp } from '../../../../../commons/component';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import CtrlReconnaissanceSearchComponent from '../../component/ctrlReconnaissanceSearchComponent';
import * as CtrlReconnaissanceSearchAction from '../../state/actions/ctrlReconnaissanceSearchAction';
import * as Constants from '../../state/ctrlReconnaissanceConstants';
import style from '../../style/ctrlReconnaissanceStyle';
import AffecterAgentVisiteurMain from './ctrlAffecterAgentVisiteurMainScreen';






class AffecterAgentVisiteur extends React.Component {

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
                    title={translate('reconnaissance.agentVisiteur.title')}
                />

                {(this.props.searchMode || this.props.resultsMode) && (
                    <CtrlReconnaissanceSearchComponent navigation={this.props.navigation} mode={'aav'} onReset={this.reset} />
                )}

                


            </View>
        );
    };
}

function mapStateToProps(state) {
    return { ...state.ctrlReconnaissanceReducer };
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
)(AffecterAgentVisiteur);
