import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  ComBadrAutoCompleteChipsComp, ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBasicDataTableComp
} from '../../../../commons/component';
import { translate } from '../../../../commons/i18n/ComI18nHelper';
import { ComSessionService } from '../../../../commons/services/session/ComSessionService';
import * as RefOperateursEconomiquesDetailAction from '../state/actions/refOperateursEconomiquesDetailAction';
import * as RefOperateursEconomiquesSearchAction from '../state/actions/refOperateursEconomiquesSearchAction';
import * as Constants from '../state/refOperateursEconomiquesConstants';
import style from '../style/refOperateursEconomiquesStyle';





const initialState = {
  blocageVo: {},
};

class RefOperateursEconomiquesSearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.blocageTableColumns = this.buildTableColumns();
  }

  buildTableColumns = () => {
    let tableColumns = [
      {
        code: 'idBlocage',
        libelle: translate('operateursEconomiques.search.table.idBlocage'),
        width: 150,
      },
      {
        code: 'operateur.libelle',
        libelle: translate('operateursEconomiques.search.table.operateur'),
        width: 200,
      },
      {
        code: 'acteurBloquant.libelle',
        libelle: translate('operateursEconomiques.search.table.acteurBloquant'),
        width: 200,
      },
      {
        code: 'acteurDebloquant.libelle',
        libelle: translate(
          'operateursEconomiques.search.table.acteurDebloquant',
        ),
        width: 200,
      },
      {
        code: 'dateDebut',
        libelle: translate('operateursEconomiques.search.table.dateDebut'),
        width: 200,
      },
      {
        code: 'dateFin',
        libelle: translate('operateursEconomiques.search.table.dateFin'),
        width: 200,
      },
    ];

    if (this.props.onAction) {
      tableColumns.push({
        code: '',
        libelle: '',
        width: 50,
        component: 'button',
        icon: 'delete-outline',
        action: (row, index) => {
          this.props.onAction(row);
        },
      });
    }

    return tableColumns;
  };

  confirm = () => {
    let codeBureau = ComSessionService.getInstance().getCodeBureau();
    this.state.blocageVo = { ...this.state.blocageVo, administrateurCentral: codeBureau == '000', typeRecherche:this.props.typeRecherche}
    let action = RefOperateursEconomiquesSearchAction.request(
      {
        type: Constants.SEARCH_OPERATEURS_ECONOMIQUES_REQUEST,
        value: this.state.blocageVo,
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
  };

  reset = () => {
    this.cmbOperateur.clearInput();
    this.setState(initialState);

    let action = RefOperateursEconomiquesSearchAction.init(
      {
        type: Constants.SEARCH_OPERATEURS_ECONOMIQUES_INIT,
        value: {},
      },
      this.props.navigation,
    );
    this.props.actions.dispatch(action);
  };

  onBlocageSelected = (row) => {
    if (this.props.onAction) {
      // Do nothing
    } else {
      let action = RefOperateursEconomiquesDetailAction.request(
        {
          type: Constants.DETAIL_OPERATEURS_ECONOMIQUES_REQUEST,
          value: row.idBlocage,
        },
        this.props.navigation,
      );
      this.props.actions.dispatch(action);
    }
  };

  render() {
    return (
      <ScrollView
        style={style.innerContainer}
        keyboardShouldPersistTaps={
          this.state.autocompleteDropdownOpen || Platform.OS === 'android'
            ? 'always'
            : 'never'
        }>
        {this.props.showProgress && <ComBadrProgressBarComp />}

        {this.props.infoMessage != null && (
          <ComBadrInfoMessageComp message={this.props.infoMessage} />
        )}

        {this.props.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.props.errorMessage} />
        )}

        {!this.props.showProgress && (
          <Grid>
            <Row size={100}>
              <Col size={30}>
                <Row>
                  <Col style={style.labelContainer}>
                    <Text style={style.labelTextStyle}>
                      {translate('operateursEconomiques.search.operateur')}
                    </Text>
                  </Col>

                  <Col style={style.labelContainer}>
                    <Text style={style.labelRequiredStyle}>*</Text>
                  </Col>
                </Row>
              </Col>

              <Col size={70}>
                
                <ComBadrAutoCompleteChipsComp
                  onRef={(ref) => (this.cmbOperateur = ref)}
                  placeholder={translate(
                    'operateursEconomiques.search.operateur'
                  )}
                  code="code"
                  selected={this.state.blocageVo?.operateur?.libelle}
                  maxItems={3}
                  libelle="libelle"
                  command="getCmbOperateur"
                  onDemand={true}
                  searchZoneFirst={false}
                  onValueChange={(item) =>
                    this.setState({
                      ...this.state,
                      blocageVo: {
                        ...this.state.blocageVo,
                        operateur: {
                          code: item.code,
                          libelle: item.libelle,
                        },
                      },
                    })}
                />
              </Col>
            </Row>

            {this.props.includeInvalid && (
              <Row size={100}>
                <Col size={30}>
                  <Row>
                    <Col style={style.labelContainer}>
                      <Text style={style.labelTextStyle}>
                        {translate(
                          'operateursEconomiques.search.afficherBlocagesInvalides',
                        )}
                      </Text>
                    </Col>

                    <Col style={style.labelContainer}>
                      <Text style={style.labelRequiredStyle}>*</Text>
                    </Col>
                  </Row>
                </Col>

                <Col size={70}>
                  <CheckBox
                    disabled={false}
                    value={this.state.blocageVo.isAnnule}
                    onValueChange={(check) =>
                      this.setState({
                        ...this.state,
                        blocageVo: {
                          ...this.state.blocageVo,
                          isAnnule: check,
                        },
                      })
                    }
                  />
                </Col>
              </Row>
            )}

            <Row size={100}>
              <Col size={25} />

              <Col size={20}>
                <Button
                  title={translate('transverse.rechercher')}
                  type={'solid'}
                  buttonStyle={style.buttonAction}
                  onPress={() => this.confirm()}
                />
              </Col>

              <Col size={2} />

              <Col size={20}>
                <Button
                  title={translate('transverse.retablir')}
                  type={'solid'}
                  buttonStyle={style.buttonAction}
                  onPress={() => this.reset()}
                />
              </Col>

              <Col size={25} />
            </Row>

            {this.props.showResults && (
              <Row size={100}>
                <Col size={100}>
                  <ComBasicDataTableComp
                    onRef={(ref) => (this.blocageTable = ref)}
                    id="blocageTable"
                    hasId={false}
                    rows={this.props.data.search}
                    cols={this.blocageTableColumns}
                    onItemSelected={(row) => this.onBlocageSelected(row)}
                    totalElements={
                      this.props.data.search ? this.props.data.search.length : 0
                    }
                    maxResultsPerPage={5}
                    paginate={true}
                  />
                </Col>
              </Row>
            )}
          </Grid>
        )}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {...state.refOperateursEconomiquesReducer};
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
)(RefOperateursEconomiquesSearchComponent);
