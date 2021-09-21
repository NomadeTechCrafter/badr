import React from 'react';
import { ScrollView, View } from 'react-native';
/**Custom Components */
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBasicDataTableComp,
} from '../../../../commons/component';
import EcorExpInformationEcorComp from './../component/ecorExpInformationEcorComp';
/** REDUX **/
import { connect } from 'react-redux';
import translate from '../../../../commons/i18n/ComI18nHelper';
import styles from '../style/ecorExpConfirmationArriveeStyle';
import _ from 'lodash';

class ConfirmationArriveeResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
    this.cols = [
      {
        code: 'referenceEnregistrement',
        libelle: translate('confirmationArrivee.ref'),
        width: 250,
      },
      {
        code: 'typeDeD',
        libelle: translate('confirmationArrivee.typeDed'),
        width: 100,
      },
      {
        code: 'dateEnregistrement',
        libelle: translate('confirmationArrivee.dateEnreg'),
        width: 150,
      },
      {
        code: 'operateurDeclarant',
        libelle: translate('confirmationArrivee.operateurDeclarant'),
        width: 150,
      },
      {
        code: 'valeurDeclaree',
        libelle: translate('confirmationArrivee.valeurDeclarant'),
        width: 150,
      },
      {
        code: 'poidsBruts',
        libelle: translate('confirmationArrivee.poidsBruts'),
        width: 150,
      },
      {
        code: 'poidsNet',
        libelle: translate('confirmationArrivee.poidsNet'),
        width: 150,
      },
      {
        code: 'nombreContenants',
        libelle: translate('confirmationArrivee.nombreContenants'),
        width: 150,
      },
    ];
  }

  onItemSelected = (row) => { };
  convertListeScelles = (listeScelles) => {
    return listeScelles
      ? Object.values(this.props.data.initConfirmerArriveeVO.scelles)
      : [];
  };

  componentDidMount() { }

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
                ref="_badrTable"
                id="listConfirmationArrivee"
                rows={this.props.data.listDeclaration}
                cols={this.cols}
                onItemSelected={this.onItemSelected}
                totalElements={this.props.data.listDeclaration.length}
                maxResultsPerPage={10}
                paginate={true}
                showProgress={this.props.showProgress}
              />
            )}

          {!_.isEmpty(this.props.data.initConfirmerArriveeVO) && (
            <EcorExpInformationEcorComp
              initConfirmerArriveeVO={this.props.data.initConfirmerArriveeVO}
              setError={this.setError}
              listeNombreDeScelles={this.convertListeScelles(
                this.props.data.initConfirmerArriveeVO.scelles,
              )}
              ecorIsSaved={this.props.data.ecorIsSaved}
              listEC={this.props?.data?.listDeclaration?.length > 1 ? true : false}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.ecorExpConfirmationArriveeReducer };
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
)(ConfirmationArriveeResultScreen);
