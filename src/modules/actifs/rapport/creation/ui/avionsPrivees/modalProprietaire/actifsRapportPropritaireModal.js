import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { RadioButton, Text, TextInput } from 'react-native-paper';
import * as ActifsUtils from '../../../../utils/actifsUtils';
import {
  ComBadrAutoCompleteChipsComp, ComBadrButtonComp, ComBadrCardBoxComp,
  ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrItemsPickerComp, ComBadrLibelleComp,
  ComBadrModalComp
} from '../../../../../../../commons/component';
import { translate } from '../../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet, primaryColor } from '../../../../../../../commons/styles/ComThemeStyle';
import { LIST_TYPES_IDENTIFIANT, PROPRIETAIRE_INITIAL } from '../../../../utils/actifsConstants';
import { ComSessionService } from '../../../../../../../commons/services/session/ComSessionService';
import { TYPE_SERVICE_SP } from '../../../../../../../commons/constants/ComGlobalConstants';
import ComHttpHelperApi from '../../../../../../../commons/services/api/common/ComHttpHelperApi';



export default class ActifsRapportPropritaireModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      infoMessage: null,
      typeProprietaire: '01',
      proprietaireExist: false,
      proprietaire: this.props.proprietaire ? this.props.proprietaire : PROPRIETAIRE_INITIAL,
      acNationalite: '',
      index: null
    };
  }

  onChangeTypeIdentifiant(value) {
    this.setState({
      proprietaire: {
        ...this.state.proprietaire, intervenant: {
          ...this.state.proprietaire.intervenant,
          refTypeDocumentIdentite: { code: value.code, libelle: value.libelle }
        }
      }
    });
  }

  handlePaysChanged = (pays) => {
    this.setState({
      acNationalite: pays,
      proprietaire: {
        ...this.state.proprietaire, intervenant: {
          ...this.state.proprietaire?.intervenant,
          nationaliteFr: pays.code
        }
      }
    });
    this.state.proprietaire.intervenant.nationaliteFr = pays.code;

  };

  retablirProprietaire = () => {
    this.setState({ proprietaire: PROPRIETAIRE_INITIAL, acNationalite: { code: '', libelle: '' }, errorMessage: null, index: -1 }); 
  }

  confirmerProprietaire = () => {
    if (!this.checkRequiredFields()) {
      this.props.confirmer(this.state.proprietaire);
      this.setState({ typeProprietaire: '01', index: -1, proprietaire: PROPRIETAIRE_INITIAL, acNationalite: { code: '', libelle: '' } });
    }
  }

  checkRequiredFields = () => {
    let msg = [];
    let required = false;
    if (this.state.typeProprietaire == '01') {
      if (_.isEmpty(this.state.proprietaire?.intervenant.refTypeDocumentIdentite.code)) {
        required = true;
        msg.push(translate('actifsCreation.embarcations.proprietaires.msgerrors.typeIdentifiant'));
      }

      if (_.isEmpty(this.state.proprietaire?.intervenant.numeroDocumentIndentite)) {
        required = true;
        msg.push(translate('actifsCreation.embarcations.proprietaires.msgerrors.identifiant'));
      }
      if (_.isEmpty(this.state.proprietaire?.intervenant.nomIntervenant)) {
        required = true;
        msg.push(translate('actifsCreation.embarcations.proprietaires.msgerrors.nomIntervenant'));
      }
      if (_.isEmpty(this.state.proprietaire?.intervenant.prenomIntervenant)) {
        required = true;
        msg.push(translate('actifsCreation.embarcations.proprietaires.msgerrors.prenomIntervenant'));
      }
    }
    if (this.state.typeProprietaire == '02') {
      if (_.isEmpty(this.state.proprietaire?.intervenant.numeroRC)) {
        required = true;
        msg.push(translate('actifsCreation.embarcations.proprietaires.msgerrors.numeroRC'));
      }

      if (_.isEmpty(this.state.proprietaire?.intervenant.refCentreRC.codeCentreRC)) {
        required = true;
        msg.push(translate('actifsCreation.embarcations.proprietaires.msgerrors.centreRC'));
      }
      if (_.isEmpty(this.state.proprietaire?.intervenant.nomIntervenant)) {
        required = true;
        msg.push(translate('actifsCreation.embarcations.proprietaires.msgerrors.raisonSociale'));
      }
      if (_.isEmpty(this.state.proprietaire?.intervenant.adresse)) {
        required = true;
        msg.push(translate('actifsCreation.embarcations.proprietaires.msgerrors.adresse'));
      }
    }


    if (required) {

      this.setState({
        errorMessage: msg
      });
    } else {
      this.setState({
        errorMessage: null
      });

    }
    return required;
  }


  chercherPersonneConcernee = () => {
    let required = false;
    let msg = [];
    let result = [];
    if (!_.isEmpty(this.state.proprietaire?.intervenant.numeroDocumentIndentite)
      && !_.isEmpty(this.state.proprietaire?.intervenant.refTypeDocumentIdentite.code)) {
      if ("01" == this.state.proprietaire?.intervenant.refTypeDocumentIdentite.code) {
        result = ActifsUtils.validCIN(this.state.proprietaire?.intervenant.numeroDocumentIndentite);
        if (result[1] != null) {
          required = true;
          msg.push(result[1]);
        } else {
          this.setState({
            proprietaire: {
              ...this.state.proprietaire, intervenant: {
                ...this.state.proprietaire?.intervenant, numeroDocumentIndentite: result[0]
              }
            }
          })
        }
      }
      if ("02" == this.state.proprietaire?.intervenant.refTypeDocumentIdentite.code) {
        result = ActifsUtils.validCarteSejour(this.state.proprietaire?.intervenant.numeroDocumentIndentite);
        if (result[1] != null) {
          required = true;
          msg.push(result[1]);
        } else {
          this.setState({
            proprietaire: {
              ...this.state.proprietaire, intervenant: {
                ...this.state.proprietaire?.intervenant, numeroDocumentIndentite: result[0]
              }
            }
          })
        }
      }
    } if (required) {
      this.setState({
        errorMessage: msg
      });
    } else {
      this.chercherPersonneConcerneeRemote(result[0]);
      this.setState({
        errorMessage: null
      });
    }
  };

  chercherPersonneConcerneeRemote = async (numeroDocumentIndentite) => {
    const typeIdentifiant = this.state.proprietaire?.intervenant.refTypeDocumentIdentite.code;
    const data = {
      dtoHeader: {
        userLogin: ComSessionService.getInstance().getLogin(),
        fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : '9932',
        module: 'REF_LIB',
        commande: 'getIntervenant',
        typeService: TYPE_SERVICE_SP,
        motif: null,
        messagesInfo: null,
        messagesErreur: null,
      },
      jsonVO: {
        "numeroDocumentIdentite": numeroDocumentIndentite,
        "typeIdentifiant": typeIdentifiant
      },
    };
    const response = await ComHttpHelperApi.process(data);
    console.log('+-+-+-+-+-+-+-+-+-+-+-+-response+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
    console.log('+-+-+-+-+-+-+-+-+-+-+-+-response+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
    console.log('+-+-+-+-+-+-+-+-+-+-+-+-response+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
    console.log(JSON.stringify(response));
    console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-response+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
    console.log('+-+-+-+-+-+-+-+-+-+-+-+-response+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
    console.log('+-+-+-+-+-+-+-+-+-+-+-+-response+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
    console.log('+-+-+-+-+-+-+-+-+-+-+-+-response+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');

    let intervenant = {};
    if (response && response.data && response.data.jsonVO) {
      intervenant = response.data.jsonVO;
      delete intervenant.defaultConverter;
      this.setState({
        infoMessage: null,
        proprietaireExist: true,
        proprietaire: {
          ...this.state.proprietaire, intervenant: {
            ...this.state.proprietaire?.intervenant, nomIntervenant: intervenant.nomIntervenant,
            prenomIntervenant: intervenant.prenomIntervenant,
            adresse: intervenant.adresse,
            nationaliteFr: intervenant.nationaliteFr
          }
        }
      })
    } else {

      this.setState({
        infoMessage: 'Intervenant inexistant',
        proprietaireExist: false,
        proprietaire: {
          ...this.state.proprietaire, intervenant: {
            ...this.state.proprietaire?.intervenant, nomIntervenant: '',
            prenomIntervenant: '',
            adresse: '',
            nationaliteFr: ''
          }
        }
      });
    }
    console.log('+-+-+-+-+-+-+-+-+-+-+-+-state+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
    console.log(JSON.stringify(this.state));
    console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-state+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
  };

  chercherPersonneMoraleConcernee = async () => {
    console.log('chercherPersonneMoraleConcernee');
    if (!_.isEmpty(this.state.proprietaire?.intervenant.numeroRC)
      && !_.isEmpty(this.state.proprietaire?.intervenant.refCentreRC.codeCentreRC)) {
      const numeroDocumentIdentite = this.state.proprietaire?.intervenant.numeroRC;
      const nationalite = this.state.proprietaire?.intervenant.refCentreRC.codeCentreRC;
      const data = {
        dtoHeader: {
          userLogin: ComSessionService.getInstance().getLogin(),
          fonctionnalite: ComSessionService.getInstance().getFonctionalite() ? ComSessionService.getInstance().getFonctionalite() : '9932',
          module: 'REF_LIB',
          commande: 'findIntervenantMorale',
          typeService: TYPE_SERVICE_SP,
          motif: null,
          messagesInfo: null,
          messagesErreur: null,
        },
        jsonVO: {
          "numeroDocumentIdentite": numeroDocumentIdentite,
          "nationalite": nationalite
        },
      };
      const response = await ComHttpHelperApi.process(data);

      console.log('+-+-+-+-+-+-+-+-+-+-+-+-response+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
      console.log(JSON.stringify(response));
      console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-response+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
      let intervenant = {};
      if (response && response.data && response.data.jsonVO) {
        intervenant = response.data.jsonVO;
        delete intervenant.defaultConverter;
        this.setState({
          infoMessage: null,
          proprietaireExist: true,
          proprietaire: {
            ...this.state.proprietaire, intervenant: {
              ...this.state.proprietaire?.intervenant, nomIntervenant: intervenant.nomIntervenant,
              adresse: intervenant.adresse
            }
          }
        })
      } else {

        this.setState({
          infoMessage: 'Centre RC inexistant !',
          proprietaireExist: false,
          proprietaire: {
            ...this.state.proprietaire, intervenant: {
              ...this.state.proprietaire?.intervenant, nomIntervenant: '',
               adresse: ''
            }
          }
        });
      }
      console.log('+-+-+-+-+-+-+-+-+-+-+-+-state+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
      console.log(JSON.stringify(this.state));
      console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-state+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-');
    }
  };
  getPersonnePhysiqueForm() {

    return (<ComBadrCardBoxComp noPadding={true}>
      <Grid>
        { /*first Row*/}
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={7}>
            <ComBadrLibelleComp withColor={true}>
              {translate('actifsCreation.embarcations.proprietaires.typeIdentifiant')}
            </ComBadrLibelleComp>
          </Col>
          <Col size={10}>
            <ComBadrItemsPickerComp
              disabled={this.props.readOnly}
              style={{
                borderWidth: 1,
                borderColor: '#696969',
                borderRadius: 4,
                height: 40, fontSize: 12, paddingBottom: 45
              }}
              label={translate('actifsCreation.embarcations.proprietaires.typeIdentifiant')}
              selectedValue={this.state.proprietaire?.intervenant.refTypeDocumentIdentite.code}
              items={LIST_TYPES_IDENTIFIANT}
              onValueChanged={(value, index) =>
                (value?.code) ? this.onChangeTypeIdentifiant(value) : {}
              }
            />

          </Col>

          <Col size={1} />


          <Col size={6}>
            <Row style={{ paddingTop: 15 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.proprietaires.identifiant')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={6}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.proprietaire?.intervenant.numeroDocumentIndentite}
              onChangeText={(text) => this.setState({
                proprietaire: {
                  ...this.state.proprietaire, intervenant: {
                    ...this.state.proprietaire?.intervenant, numeroDocumentIndentite: text
                  }
                }
              })}
              onEndEditing={(event) => {
                this.chercherPersonneConcernee();
              }}
            />
          </Col>

        </Row>

        {/*third Row*/}
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={7}>
            <Row style={{ paddingTop: 15 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.proprietaires.nomIntervenant')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={10}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly || this.state.proprietaireExist}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.proprietaire?.intervenant.nomIntervenant}
              onChangeText={(text) => this.setState({
                proprietaire: {
                  ...this.state.proprietaire, intervenant: {
                    ...this.state.proprietaire?.intervenant, nomIntervenant: text
                  }
                }
              })}
            />
          </Col>
          <Col size={1} />
          <Col size={6}>
            <Row>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.proprietaires.prenomIntervenant')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={6}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly || this.state.proprietaireExist}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.proprietaire?.intervenant.prenomIntervenant}
              onChangeText={(text) => this.setState({
                proprietaire: {
                  ...this.state.proprietaire, intervenant: {
                    ...this.state.proprietaire?.intervenant, prenomIntervenant: text
                  }
                }
              })}
            />
          </Col>
        </Row>
        {/*fourth Row*/}
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={7}>
            <Row style={{ paddingTop: 35 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.proprietaires.nationalite')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={10}>
            <ComBadrAutoCompleteChipsComp
              disabled={this.props.readOnly}
              code="code"
              placeholder={translate(
                'actifsCreation.embarcations.proprietaires.nationalite'
              )}
              selected={this.state.proprietaire?.intervenant.nationaliteFr}
              maxItems={3}
              libelle="libelle"
              command="getCmbPays"
              paramName="libellePays"
              onDemand={true}
              searchZoneFirst={false}
              onValueChange={this.handlePaysChanged}
            />
          </Col>
          <Col size={1} />
          <Col size={6}>
            <Row style={{ paddingTop: 35 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.proprietaires.profession')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={6}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.proprietaire?.professionIntervenant}
              onChangeText={(text) => this.setState({
                proprietaire: {
                  ...this.state.proprietaire,
                  professionIntervenant: text
                }
              })}
            />
          </Col>
        </Row>

        {/*fifth Row*/}
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={6}>
            <Row>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.proprietaires.adresse')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={20}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly || this.state.proprietaireExist}
              multiline={true}
              numberOfLines={4}
              style={{ fontSize: 12 }}
              value={this.state.proprietaire?.intervenant.adresse}
              onChangeText={(text) => this.setState({
                proprietaire: {
                  ...this.state.proprietaire, intervenant: {
                    ...this.state.proprietaire?.intervenant, adresse: text
                  }
                }
              })}
            />
          </Col>

        </Row>

      </Grid>
    </ComBadrCardBoxComp>);
  }
  getPersonneMoraleForm() {

    return (<ComBadrCardBoxComp noPadding={true}>
      <Grid>
        { /*first Row*/}
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={7}>
            <ComBadrLibelleComp withColor={true}>
              {translate('actifsCreation.embarcations.proprietaires.numeroRC')}
            </ComBadrLibelleComp>
          </Col>
          <Col size={10}>
            <TextInput
              mode={'outlined'}
              keyboardType={'number-pad'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.proprietaire?.intervenant.numeroRC}
              onChangeText={(text) => this.setState({
                proprietaire: {
                  ...this.state.proprietaire, intervenant: {
                    ...this.state.proprietaire?.intervenant, numeroRC: text
                  }
                }
              })}
              onEndEditing={(event) => {
                this.chercherPersonneMoraleConcernee();
              }}
            />

          </Col>

          <Col size={1} />


          <Col size={6}>
            <Row style={{ paddingTop: 15 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.proprietaires.centreRC')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={6}>
            <TextInput
              mode={'outlined'}
              keyboardType={'number-pad'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.proprietaire?.intervenant.refCentreRC.codeCentreRC}
              onChangeText={(text) => this.setState({
                proprietaire: {
                  ...this.state.proprietaire, intervenant: {
                    ...this.state.proprietaire?.intervenant, refCentreRC: { codeCentreRC: text }
                  }
                }
              })}
              onEndEditing={(event) => {
                this.chercherPersonneMoraleConcernee();
              }}
            />
          </Col>

        </Row>

        {/*second Row*/}

        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={6}>
            <Row>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.proprietaires.raisonSociale')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={20}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly || this.state.proprietaireExist}
              multiline={true}
              numberOfLines={4}
              style={{ fontSize: 12 }}
              value={this.state.proprietaire?.intervenant.nomIntervenant}
              onChangeText={(text) => this.setState({
                proprietaire: {
                  ...this.state.proprietaire, intervenant: {
                    ...this.state.proprietaire?.intervenant, nomIntervenant: text
                  }
                }
              })}
            />
          </Col>

        </Row>
        {/*third Row*/}
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={6}>
            <Row>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.proprietaires.adresse')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={20}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly || this.state.proprietaireExist}
              multiline={true}
              numberOfLines={4}
              style={{ fontSize: 12 }}
              value={this.state.proprietaire?.intervenant.adresse}
              onChangeText={(text) => this.setState({
                proprietaire: {
                  ...this.state.proprietaire, intervenant: {
                    ...this.state.proprietaire?.intervenant, adresse: text
                  }
                }
              })}
            />
          </Col>

        </Row>


      </Grid>
    </ComBadrCardBoxComp>);
  }


  static getDerivedStateFromProps(props, state) {
    // console.log('getDerivedStateFromProps--------------------props ', props);
    // console.log('getDerivedStateFromProps--------------------state ', state);

    if (
      props.proprietaire && props.index != state.index
    ) {
      return {
        proprietaire: props.proprietaire,// update the value of specific key
        index: props.index,
        typeProprietaire: props.typeProprietaire,
        acNationalite: {
          code: props.proprietaire?.intervenant.nationaliteFr, libelle: props.proprietaire?.intervenant.nationaliteFr
        }

      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  render() {
    return (
      <ComBadrModalComp
        visible={this.props.visible}
        onDismiss={this.props.onDismiss}
        icon={'window-close'}
        picker={true}
        onPress={this.props.onDismiss}
        onValueChange={(selectedValue, selectedIndex, item) => {
          // console.log("item", item)
        }}
      >
        {this.state.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.state.errorMessage} />
        )}
        {(this.state.infoMessage != null && this.state.infoMessage !== '') && (
          <ComBadrInfoMessageComp message={this.state.infoMessage} />
        )}
        <View style={CustomStyleSheet.whiteRow}>
          <Text>{translate('actifsCreation.embarcations.proprietaires.title')}</Text>
          <Row style={CustomStyleSheet.whiteRow}>
            <Col>
              <RadioButton.Group onValueChange={newValue => this.setState({ typeProprietaire: newValue })} value={this.state.typeProprietaire}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{translate('actifsCreation.embarcations.proprietaires.personnePhysique')}</Text>
                    <RadioButton value="01" color={primaryColor} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{translate('actifsCreation.embarcations.proprietaires.personneMorale')}</Text>
                    <RadioButton value="02" color={primaryColor} />
                  </View>
                </View>
              </RadioButton.Group>
            </Col>
          </Row>
          {(this.state.typeProprietaire == '01') && (
            this.getPersonnePhysiqueForm()
          )}
          {(this.state.typeProprietaire == '02') && (this.getPersonneMoraleForm())}
          <Row style={CustomStyleSheet.whiteRow}>
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => (this.confirmerProprietaire())}
              text={translate('transverse.confirmer')}
            />
            <View style={{ width: 10 }} />
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.retablirProprietaire()
              }}
              text={translate('transverse.retablir')}
            />
            <View style={{ width: 10 }} />
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.props.onDismiss()
              }}
              text={translate('transverse.quitter')}
            />
          </Row>

        </View>

      </ComBadrModalComp>
    );
  }
}
