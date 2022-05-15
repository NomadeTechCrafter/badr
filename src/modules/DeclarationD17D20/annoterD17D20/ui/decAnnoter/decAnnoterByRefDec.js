import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component';
//import * as InitSortiPorttAction from '../../state/actions/decSortiPortInitAction';
import DecAnnoterRechercheTryptique from './decAnnoterRechercheTryptique';

import {translate} from '../../../../../commons/i18n/ComI18nHelper';
const initialState = {
  reference: '',
  dialogVisibility: false,
  dialogMessage: '',
  apurAutoData: null,
};

class AnnoterByRecDec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};
  }

  componentDidMount() {
    this.state = {...initialState};
    // this.initRechercheDum();
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.onScreenReloaded();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  initRechercheDum = () => {
    //  let action = InitSortiPorttAction.init();
    //  this.props.actions.dispatch(action);
  };

  onScreenReloaded = () => {
    this.initRechercheDum();
  };

  render() {
    return (
      <ScrollView>
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
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('rechParRef.title')}
          subtitle={translate('rechParRef.subTitleAction')}
        />
        <DecAnnoterRechercheTryptique
          successRedirection="DecAnnoterListeDeclaration"
          module="DED_LIB"
          commande="ded.findTrypByRef"
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
  return {...state.initApurementReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnoterByRecDec);
