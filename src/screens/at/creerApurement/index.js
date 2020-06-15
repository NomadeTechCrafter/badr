import React from 'react';
import _ from 'lodash';
import {View, Dimensions, ScrollView} from 'react-native';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';

import {connect} from 'react-redux';
import {translate} from '../../../common/translations/i18n';
import {
  BadrErrorMessage,
  BadrInfoMessage,
  BadrProgressBar,
  RechercheRefAt,
  Toolbar,
} from '../../../components';
import * as CreateApurementAction from '../../../redux/actions/at/createApurement';
import * as InitApurementAction from '../../../redux/actions/at/apurement';
import * as ConstantsAt from '../../../common/constants/at/at';

const screenWidth = Dimensions.get('window').width;

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

  _showDialog = (message, data) => {
    console.log('|_' + message);
    this.setState({
      dialogVisibility: true,
      dialogMessage: message,
      apurAutoData: data,
    });
  };

  _hideDialog = () => this.setState({dialogVisibility: false});

  componentDidMount() {
    console.log('componentDidMount Parent');
    this.state = {...initialState};
  }

  apurManuelle = (reference) => {
    console.log('apu Man');
    console.log(this.state.reference);
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
    this._hideDialog();
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
        {this.props.showProgress && <BadrProgressBar width={screenWidth} />}
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
              style={styles.centerErrorMsg}
              message={this.props.messageInfo}
            />
          </View>
        )}

        <RechercheRefAt
          onApurManuelle={(reference) => this.apurManuelle(reference)}
          onApurAutomatique={(reference) => this.apurAutomatique(reference)}
        />

        <Portal>
          <Dialog
            visible={this.state.dialogVisibility}
            onDismiss={this._hideDialog}>
            <Dialog.Title>
              {translate('at.apurementauto.confirmDialog.info')}
            </Dialog.Title>
            <Dialog.Content>
              <Paragraph>{this.state.dialogMessage}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.confirmApurAutomatique}>
                {translate('at.apurementauto.confirmDialog.oui')}
              </Button>
              <Button onPress={this._hideDialog}>
                {translate('at.apurementauto.confirmDialog.non')}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    );
  }
}

const styles = {
  messages: {justifyContent: 'center', alignItems: 'center'},
  centerErrorMsg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function mapStateToProps(state) {
  console.log(state.initApurementReducer);
  return {...state.initApurementReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreerApurement);
