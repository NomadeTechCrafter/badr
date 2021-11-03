import React from 'react';
import {ScrollView, View} from 'react-native';
/**Custom Components */
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBasicDataTableComp,
} from '../../../../commons/component';
import EcorExpInformationEcorComp from './../component/ecorExpInformationEcorComp';
/** REDUX **/
import {connect} from 'react-redux';
import translate from '../../../../commons/i18n/ComI18nHelper';
import styles from '../style/ecorExpConfirmationEntreeStyle';
import _ from 'lodash';
import * as Constants from '../state/ecorExpConfirmationEntreeConstants';
import * as ConfirmationEntreeCRUDAction from '../state/actions/ecorExpConfirmationEntreeCRUDAction';

class ConfirmationEntreeResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
    this.cols = [
      {
        code: 'referenceEnregistrement',
        libelle: translate('confirmationEntree.ref'),
        width: 250,
      },
      {
        code: 'typeDeD',
        libelle: translate('confirmationEntree.typeDed'),
        width: 100,
      },
      {
        code: 'dateEnregistrement',
        libelle: translate('confirmationEntree.dateEnreg'),
        width: 150,
      },
      {
        code: 'operateurDeclarant',
        libelle: translate('confirmationEntree.operateurDeclarant'),
        width: 150,
      },
      {
        code: 'valeurDeclaree',
        libelle: translate('confirmationEntree.valeurDeclarant'),
        width: 150,
      },
      {
        code: 'poidsBruts',
        libelle: translate('confirmationEntree.poidsBruts'),
        width: 150,
      },
      {
        code: 'poidsNet',
        libelle: translate('confirmationEntree.poidsNet'),
        width: 150,
      },
      {
        code: 'nombreContenants',
        libelle: translate('confirmationEntree.nombreContenants'),
        width: 150,
      },
    ];
  }

  onItemSelected = (row) => {};
  convertListeScelles = (listeScelles) => {
    return listeScelles
      ? Object.values(this.props.data.initConfirmerEntreeVO.scelles)
      : [];
  };

  componentDidMount() {
    // var action = ConfirmationEntreeCRUDAction.init({
    //   type: Constants.CONFIRMERNTREE_INIT,
    //   value: {},
    // });
    // this.props.actions.dispatch(action);
  }

  componentDidUpdate() {
    /*if (this.props.route.params.first) {
      this.refs._badrTable.reset();
    }*/
  }
  setError = (msg) => {
    console.log('setError msg', msg);
    this.setState({
      errorMessage: msg,
    });
  };

  render() {
    return (
      <View>
        <ScrollView
          horizontal={false}
          ref={(ref) => {
            this.scrollViewRef = ref;
          }}
          onLayout={(event) => {
            this.layout = event.nativeEvent.layout;
          }}>
          {this.state.errorMessage !== null && (
            <ComBadrErrorMessageComp
              style={styles.centerErrorMsg}
              message={this.state.errorMessage}
            />
          )}
          {!_.isEmpty(this.props.errorMessage) && (
            <ComBadrErrorMessageComp
              style={styles.centerErrorMsg}
              message={this.props.errorMessage}
            />
          )}
          {!_.isEmpty(this.props.infoMessage) && (
            <ComBadrInfoMessageComp
              style={styles.centerErrorMsg}
              message={this.props.infoMessage}
            />
          )}
          {!_.isEmpty(this.props.data) &&
            !_.isEmpty(this.props.data.listDeclaration) && (
              <ComBasicDataTableComp
                // ref="_badrTable"
                id="listConfirmationEntree"
                rows={this.props.data.listDeclaration}
                cols={this.cols}
                onItemSelected={this.onItemSelected}
                totalElements={this.props.data.listDeclaration.length}
                maxResultsPerPage={10}
                paginate={true}
                showProgress={this.props.showProgress}
              />
            )}

          {!_.isEmpty(this.props.data.initConfirmerEntreeVO) && (
            <EcorExpInformationEcorComp
              initConfirmerEntreeVO={this.props.data.initConfirmerEntreeVO}
              setError={this.setError}
              listeNombreDeScelles={this.convertListeScelles(
                this.props.data.initConfirmerEntreeVO.scelles,
              )}
              ecorIsSaved={this.props.data.ecorIsSaved}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.ecorExpConfirmationEntreeReducer};
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
)(ConfirmationEntreeResultScreen);
