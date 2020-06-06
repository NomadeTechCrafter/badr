import React from 'react';
import _ from 'lodash';
import {View, Dimensions} from 'react-native';
import {Text, HelperText, TextInput} from 'react-native-paper';
import {translate} from '../../../../common/translations/i18n';
import {CustomStyleSheet} from '../../../../styles';
import {InfoCommon} from '../common/';
import {connect} from 'react-redux';
import * as InitApurementAction from '../../../../redux/actions/at/initApurement';
import * as ConstantsAt from '../../../../common/constants/at/at';

import {
  Toolbar,
  Container,
  CardBox,
  Accordion,
  BadrProgressBar,
  BadrErrorMessage,
  BadrInfoMessage,
  BadrButton,
  CardsWithTitle,
} from '../../../../components';

const screenHeight = Dimensions.get('window').height;

class Apurement extends React.Component {
  defaultState = {
    showNouveauApur: false,
    showErrorMsg: false,
  };
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  nouveauApurement = () => {
    this.setState({showNouveauApur: true});
  };

  abandonner = () => {
    this.setState({showNouveauApur: false});
  };

  _hasErrors = field => {
    return this.state.showErrorMsg && _.isEmpty(this.state[field]);
  };

  render() {
    const atVo = this.props.data;
    console.log('ATVOOOOOOO');
    console.log(atVo);
    return (
      <View>
        <Toolbar
          navigation={this.props.navigation}
          title={translate('at.title')}
          subtitle={translate('at.apurement.title')}
          icon="menu"
        />
        {atVo !== null && (
          <Container>
            {this.props.showProgress && (
              <BadrProgressBar width={screenHeight} />
            )}
            {this.props.errorMessage != null && (
              <BadrErrorMessage message={this.props.errorMessage} />
            )}
            {this.props.successMessage != null && (
              <BadrInfoMessage message={this.props.successMessage} />
            )}
            {/* Information commun */}
            <InfoCommon
              bureau={atVo.atEnteteVO.bureau}
              annee={atVo.atEnteteVO.annee}
              numeroOrdre={atVo.atEnteteVO.numeroOrdre}
              serie={atVo.atEnteteVO.serie}
              dateEnregistrement={atVo.atEnteteVO.dateEnregistrement}
              dateCreation={atVo.atEnteteVO.dateCreation}
              numVersion={atVo.atEnteteVO.numVersion}
              etat={atVo.atEnteteVO.etatAt.libelle}
            />

            {/* Apurements */}
            <CardBox style={styles.cardBox}>
              <Accordion title={translate('at.apurement.titleTableau')}>
                {/* {this.state.declaration.annotation && ( */}
                <View style={styles.flexDirectionRow}>
                  <Text>{translate('transverse.noRowFound')}</Text>
                  <Text>{translate('transverse.noRowFound')}</Text>
                </View>
              </Accordion>
            </CardBox>
            {!this.state.showNouveauApur && (
              <View style={{width: '100%'}}>
                <BadrButton
                  onPress={() => {
                    this.nouveauApurement();
                  }}
                  disabled={this.state.nouveauApurement}
                  text={translate('transverse.nouveau')}
                />
              </View>
            )}
            {this.state.showNouveauApur && (
              <CardBox style={styles.cardBox}>
                <CardsWithTitle title={translate('at.apurement.title')}>
                  <View>
                    <TextInput
                      mode="outlined"
                      value="Casa Port (309)"
                      disabled="true"
                      label={translate('at.apurement.bureauApurement')}
                    />
                    <TextInput
                      mode="outlined"
                      value="Arrondissment I (309301)"
                      disabled="true"
                      label={translate('at.apurement.arrondApurement')}
                    />
                    <TextInput
                      mode="outlined"
                      label={translate('at.apurement.dateApurement')}
                    />
                    <TextInput
                      mode="outlined"
                      value="Réexportation"
                      disabled="true"
                      label={translate('at.apurement.mode')}
                    />
                    <TextInput
                      mode="outlined"
                      label={translate('at.apurement.exportateur')}
                    />
                  </View>
                </CardsWithTitle>
                <CardsWithTitle
                  title={translate('at.apurement.titleTableauCompo')}>
                  <View style={styles.flexDirectionRow}>
                    <Text>{translate('transverse.noRowFound')}</Text>
                  </View>
                </CardsWithTitle>
                <View>
                  <BadrButton
                    onPress={() => {
                      this.abandonner();
                    }}
                    text={translate('transverse.abandonner')}
                  />
                </View>
              </CardBox>
            )}
          </Container>
        )}
      </View>
    );
  }
}

const styles = {
  cardBox: {
    flexDirection: 'column',
    padding: 0,
    marginTop: 15,
    marginBottom: 15,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  inputApur: {
    ...CustomStyleSheet.largeInput,
    marginBottom: 10,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Apurement);
