import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component';
import * as InitVuEmbtAction from '../../state/actions/vuEmbInitAction';
import VuEmbRechercheTryptique from './VuEmbRechercheTryptique';

const initialState = {
  reference: '',
  dialogVisibility: false,
  dialogMessage: '',
  apurAutoData: null,
};

class VuEmbarquer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};
  }

  componentDidMount() {
    this.state = {...initialState};
    this.initRechercheDum();
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.onScreenReloaded();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  initRechercheDum = () => {
    let action = InitVuEmbtAction.init();
    this.props.actions.dispatch(action);
  };

  onScreenReloaded = () => {
    this.initRechercheDum();
  };

  render() {
    return (
      <ScrollView>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('vuEmbarquee.title')}
          subtitle={translate('vuEmbarquee.subTitleAction')}
        />
        {this.props.errorMessage != null && this.props.errorMessage !== '' && (
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
        <VuEmbRechercheTryptique
          successRedirection="VuEmbListeDeclaration"
          module="DED_LIB"
          commande="ded.vuEmbRechercheDeclarationTrypByRef"
          typeService="UC"
          navigation={this.props.navigation}
          routeParams={this.props.route.params}
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
  return {...state.initApurementReducer}; //d17RechrcheDum
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VuEmbarquer);
