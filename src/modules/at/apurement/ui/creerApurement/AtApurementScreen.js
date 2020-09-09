import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/I18nHelper';
import {
  BadrErrorMessage,
  BadrInfoMessage,
  RechercheRefAt,
  Toolbar,
  BadrDialog,
} from '../../../../../commons/component';
import * as CreateApurementAction from '../../state/actions/atApurementCreateAction';
import * as InitApurementAction from '../../state/actions/atApurementInitAction';
import * as ConstantsAt from '../../state/atApurementConstants';

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

  initApurement = () => {
    let action = InitApurementAction.init({
      type: ConstantsAt.INIT_APUR_INIT,
      value: {},
    });
    this.props.actions.dispatch(action);
  };

  onScreenReloaded = () => {
    this.initApurement();
  };

  apurManuelle = (reference) => {
    let action = InitApurementAction.request(
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
    let action = InitApurementAction.requestAuto(
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
    let action = CreateApurementAction.requestAutomatique(
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
        <Toolbar
          navigation={this.props.navigation}
          icon="menu"
          title={translate('at.title')}
          subtitle={translate('at.apurement.subTitleAction')}
        />
        {this.props.errorMessage != null && (
          <View style={styles.messages}>
            <BadrErrorMessage
              style={styles.centerErrorMsg}
              message={this.props.errorMessage}
            />
          </View>
        )}
        {this.props.messageInfo != null && (
          <View style={styles.messages}>
            <BadrInfoMessage
              style={styles.centerInfoMsg}
              message={this.props.messageInfo}
            />
          </View>
        )}
        <RechercheRefAt
          onApurManuelle={(reference) => this.apurManuelle(reference)}
          onApurAutomatique={(reference) => this.apurAutomatique(reference)}
        />
        <BadrDialog
          title={translate('at.apurementauto.confirmDialog.info')}
          confirmMessage={translate('at.apurementauto.confirmDialog.oui')}
          cancelMessage={translate('at.apurementauto.confirmDialog.non')}
          dialogMessage={this.state.dialogMessage}
          onCancel={this.hideDialog}
          onOk={this.confirmApurAutomatique}
          dialogVisibility={this.state.dialogVisibility}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
});

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
