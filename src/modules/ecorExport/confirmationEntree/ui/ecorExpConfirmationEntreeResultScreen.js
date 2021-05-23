import React from 'react';
import {View, ScrollView} from 'react-native';
import {TextInput} from 'react-native-paper';
/**Custom Components */
import {
  ComBasicDataTableComp,
  ComBadrDatePickerComp,
  ComBadrLibelleComp,
  ComBadrErrorMessageComp,
} from '../../../../commons/component';
import EcorExpInformationEcorComp from './../component/ecorExpInformationEcorComp';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {CustomStyleSheet} from '../../../../commons/styles/ComThemeStyle';
import moment from 'moment';
/** REDUX **/
import {connect} from 'react-redux';
import translate from '../../../../commons/i18n/ComI18nHelper';
import style from '../style/ecorExpConfirmationEntreeStyle';
import _ from 'lodash';
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
        width: 200,
      },
      {
        code: 'dateEnregistrement',
        libelle: translate('confirmationEntree.dateEnreg'),
        width: 200,
      },
      {
        code: 'operateurDeclarant',
        libelle: translate('confirmationEntree.operateurDeclarant'),
        width: 200,
      },
      {
        code: 'valeurDeclaree',
        libelle: translate('confirmationEntree.valeurDeclarant'),
        width: 200,
      },
    ];
  }

  onItemSelected = (row) => {};
  convertListeScelles = (listeScelles) => {
    return listeScelles
      ? Object.values(this.props.data.initConfirmerEntreeVO.scelles)
      : [];
  };

  componentDidMount() {}

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
    console.log(
      'in render result',
      JSON.stringify(this.props.data.initConfirmerEntreeVO),
    );
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
            <ComBadrErrorMessageComp message={this.state.errorMessage} />
          )}
          {!_.isEmpty(this.props.data) &&
            !_.isEmpty(this.props.data.listDeclaration) && (
              <ComBasicDataTableComp
                ref="_badrTable"
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
