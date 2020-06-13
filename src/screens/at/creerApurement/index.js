import React from 'react';
import _ from 'lodash';
import {Dimensions, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../../common/translations/i18n';
import {
  BadrErrorMessage,
  BadrProgressBar,
  RechercheRefAt,
  Toolbar,
} from '../../../components';
import * as InitApurementAction from '../../../redux/actions/at/initApurement';
import * as ConstantsAt from '../../../common/constants/at/at';

const screenWidth = Dimensions.get('window').width;

const initialState = {reference: ''};
class CreerApurement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};
  }

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
    console.log(this.state);
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
          <BadrErrorMessage
            style={styles.centerErrorMsg}
            message={this.props.errorMessage}
          />
        )}
        <RechercheRefAt
          onApurManuelle={(reference) => this.apurManuelle(reference)}
          onApurAutomatique={(reference) => this.onApurAutomatique(reference)}
        />
      </ScrollView>
    );
  }
}

const styles = {
  centerErrorMsg: {
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
