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
    if (this.props.route.params.first) {
      this.refs._badrTable.reset();
    }
  }
  setError = (msg) => {
    console.log('setError msg', msg);
    this.setState({
      errorMessage: msg,
    });
  };

  render() {
    console.log('in render result compoent', JSON.stringify(this.props));
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
          <Grid>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <TextInput
                  mode={'outlined'}
                  maxLength={8}
                  value={
                    this.props.data.initConfirmerEntreeVO.documentEntreeEnceinte
                  }
                  label={translate('confirmationEntree.refDocument')}
                  style={CustomStyleSheet.badrInputHeight}
                  onChangeText={(text) =>
                    this.setState({
                      ecorInfo: {
                        ...this.state.ecorInfo,
                        numeroPince: text,
                      },
                    })
                  }
                  disabled={this.props.data.ecorIsSaved}
                />
              </Col>
              <Col size={1} />
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('confirmationEntree.dateHeure')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrDatePickerComp
                  dateFormat="DD/MM/yyyy"
                  heureFormat="HH:mm"
                  value={
                    this.props.data.initConfirmerEntreeVO.dateHeureEntree
                      ? moment(
                          this.props.data.initConfirmerEntreeVO.dateHeureEntree,
                          'DD/MM/yyyy HH:mm',
                          true,
                        )
                      : ''
                  }
                  timeValue={
                    this.props.data.initConfirmerEntreeVO.dateHeureEntree
                      ? moment(
                          this.props.data.initConfirmerEntreeVO.dateHeureEntree,
                          'DD/MM/yyyy HH:mm',
                          true,
                        )
                      : ''
                  }
                  onDateChanged={(date) =>
                    this.setState({
                      ...this.state,
                      dateDebut: date,
                    })
                  }
                  onTimeChanged={(time) =>
                    this.setState({
                      ...this.state,
                      heureDebut: time,
                    })
                  }
                  inputStyle={style.dateInputStyle}
                  readonly={this.props.data.ecorIsSaved}
                />
              </Col>
            </Row>
          </Grid>
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
