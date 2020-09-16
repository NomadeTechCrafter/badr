import React from 'react';
import {View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../../../commons/i18n/I18nHelper';
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComAtRechercheRefComp,
  ComBadrToolbarComp,
  ComBadrDialogComp,
} from '../../../components';
import * as CreateApurementAction from '../../../redux/actions/at/createApurement';
import * as InitApurementAction from '../../../redux/actions/at/apurement';
import * as ConstantsAt from '../../../common/constants/at/at';

const initialState = {
  reference: '',
  dialogVisibility: false,
  dialogMessage: '',
  apurAutoData: null,
};
class CreerApurement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};
  }

  showDialog = (message, data) => {
    this.setState({
      dialogVisibility: true,
      dialogMessage: message,
      apurAutoData: data,
    });
  };

  hideDialog = () => this.setState({dialogVisibility: false});

  componentDidMount() {
    this.state = {...initialState};
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.onScreenReloaded();
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onScreenReloaded = () => {
    var action = InitApurementAction.init({
      type: ConstantsAt.INIT_APUR_INIT,
      value: {},
    });
    this.props.actions.dispatch(action);
  };

  apurManuelle = (reference) => {
    var action = InitApurementAction.request(
      {
        type: ConstantsAt.INIT_APUR_REQUEST,
        value: {
          reference: reference,
        },
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
  };

  apurAutomatique = (reference) => {
    var action = InitApurementAction.requestAuto(
      {
        type: ConstantsAt.INIT_APURAUTO_REQUEST,
        value: {
          reference: reference,
        },
      },
      this,
    );
    this.props.actions.dispatch(action);
  };

  confirmApurAutomatique = () => {
    var action = CreateApurementAction.requestAutomatique(
      {
        type: ConstantsAt.CREATE_APURAUTO_REQUEST,
        value: {
          atVO: this.state.apurAutoData,
        },
      },
      this,
    );
    this.props.actions.dispatch(action);
    this.hideDialog();
  };

  render() {
    return (
      <ScrollView>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('at.title')}
          subtitle={translate('at.apurement.subTitleAction')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}
        {this.props.errorMessage != null && (
          <View style={styles.messages}>
            <ComBadrErrorMessageComp
              style={styles.centerErrorMsg}
              message={this.props.errorMessage}
            />
          </View>
        )}
        {this.props.messageInfo != null && (
          <View style={styles.messages}>
            <ComBadrInfoMessageComp
              style={styles.centerInfoMsg}
              message={this.props.messageInfo}
            />
          </View>
        )}
        <ComAtRechercheRefComp
          onApurManuelle={(reference) => this.apurManuelle(reference)}
          onApurAutomatique={(reference) => this.apurAutomatique(reference)}
        />
        <ComBadrDialogComp
          title={translate('at.apurementauto.confirmDialog.info')}
          confirmMessage={translate('at.apurementauto.confirmDialog.oui')}
          cancelMessage={translate('at.apurementauto.confirmDialog.non')}
          dialogMessage={this.state.dialogMessage}
          onCancel={this._hideDialog}
          onOk={this.confirmApurAutomatique}
          dialogVisibility={this.state.dialogVisibility}
        />
      </ScrollView>
    );
  }
}
const styles = {
  messages: {},
  centerErrorMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerInfoMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function mapStateToProps(state) {
  return {...state.initApurementReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreerApurement);
