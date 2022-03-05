import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  ComAccordionComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrLibelleComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../commons/component';
import { connect } from 'react-redux';

// import style from '../style/dtPreConfirmationArriveeStyle';
import translate from '../../../../commons/i18n/ComI18nHelper';
import DTRechercheParRefComp from '../component/dtRechercheParRefComp'
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';


class PreConfirmationArriveeMainScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('preConfirmationArrivee.title')}
          subtitle={translate('preConfirmationArrivee.subTitle')}
          icon="menu"
        />
        {this.props.showProgress && <ComBadrProgressBarComp circle={false} />}
        {this.props.data?.dtoHeader?.messagesInfo && (
          <ComBadrInfoMessageComp message={this.props.data?.dtoHeader?.messagesInfo} />
        )}
        {this.props.data?.dtoHeader?.messagesErreur && (
          <ComBadrErrorMessageComp message={this.props.data?.dtoHeader?.messagesErreur} />
        )}
        <NavigationContainer independent={true}>
          <DTRechercheParRefComp
            commande="initPreConfirmationArrivee"
            typeService="UC"
            navigation={this.props.navigation}
            routeParams={this.props.route.params}
          />
          {!this.props.data?.dtoHeader?.messagesErreur && (
            <ComBadrLibelleComp withColor={true}>
              {JSON.stringify(this.props.data)}
            </ComBadrLibelleComp>
          )}
        </NavigationContainer>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.preConfirmationArriveeReducer };
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
)(PreConfirmationArriveeMainScreen);
