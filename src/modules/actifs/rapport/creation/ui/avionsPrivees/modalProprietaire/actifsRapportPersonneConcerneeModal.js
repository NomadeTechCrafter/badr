import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { RadioButton, Text, TextInput } from 'react-native-paper';
import {
  ComBadrAutoCompleteChipsComp, ComBadrButtonComp,
  ComBadrCardBoxComp,
  ComBadrDatePickerComp,
  ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrItemsPickerComp, ComBadrLibelleComp,
  ComBadrModalComp
} from '../../../../../../../commons/component';
import { TYPE_SERVICE_SP } from '../../../../../../../commons/constants/ComGlobalConstants';
import { translate } from '../../../../../../../commons/i18n/ComI18nHelper';
import ComHttpHelperApi from '../../../../../../../commons/services/api/common/ComHttpHelperApi';
import { ComSessionService } from '../../../../../../../commons/services/session/ComSessionService';
import { CustomStyleSheet, primaryColor } from '../../../../../../../commons/styles/ComThemeStyle';
import { INTERVENANT_INITIAL, LIST_TYPES_IDENTIFIANT } from '../../../../utils/actifsConstants';
import * as ActifsUtils from '../../../../utils/actifsUtils';


export default class ActifsRapportPersonneConcerneeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      intervenant: this.props.intervenant ? this.props.intervenant : INTERVENANT_INITIAL,
      index: null,
      acNationalite: '',
      cocherPassager: true,
      isPassager: 'true'
    };
  }

  onChangeTypeIdentifiant(value) {
    this.setState({
      intervenant: {
        ...this.state.intervenant, intervenant: {
          ...this.state.intervenant.intervenant,
          refTypeDocumentIdentite: { code: value.code, libelle: value.libelle }
        }
      }
    });
  }

  handlePaysChanged = (pays) => {
    this.setState({
      acNationalite: pays,
      intervenant: {
        ...this.state.intervenant, intervenant: {
          ...this.state.intervenant?.intervenant,
          nationaliteFr: pays.code
        }
      }
    });
    this.state.intervenant.intervenant.nationaliteFr = pays.code;

  };

  retablirIntervenant = () => {
    this.setState({ intervenant: INTERVENANT_INITIAL, acNationalite: { code: '', libelle: '' }, errorMessage: null, index: -1 });
  }

  confirmerIntervenant = () => {
    if (!this.checkRequiredFields()) {
      this.props.confirmer(this.state.intervenant);
      this.setState({
        cocherPassager: true,
        index: -1,
        isPassager: 'true', intervenant: INTERVENANT_INITIAL, acNationalite: { code: '', libelle: '' }
      });
    }
  }

  checkRequiredFields = () => {
    let msg = [];
    let required = false;

    if (_.isEmpty(this.state.intervenant?.intervenant.refTypeDocumentIdentite.code)) {
      required = true;
      msg.push(translate('actifsCreation.embarcations.intervenants.msgerrors.typeIdentifiant'));
    }

    if (_.isEmpty(this.state.intervenant?.intervenant.numeroDocumentIndentite)) {
      required = true;
      msg.push(translate('actifsCreation.embarcations.intervenants.msgerrors.identifiant'));
    }
    if (_.isEmpty(this.state.intervenant?.intervenant.nomIntervenant)) {
      required = true;
      msg.push(translate('actifsCreation.embarcations.intervenants.msgerrors.nomIntervenant'));
    }
    if (_.isEmpty(this.state.intervenant?.intervenant.prenomIntervenant)) {
      required = true;
      msg.push(translate('actifsCreation.embarcations.intervenants.msgerrors.prenomIntervenant'));
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
    if (!_.isEmpty(this.state.intervenant?.intervenant.numeroDocumentIndentite)
      && !_.isEmpty(this.state.intervenant?.intervenant.refTypeDocumentIdentite.code)) {
      if ("01" == this.state.intervenant?.intervenant.refTypeDocumentIdentite.code) {
        result = ActifsUtils.validCIN(this.state.intervenant?.intervenant.numeroDocumentIndentite);
        if (result[1] != null) {
          required = true;
          msg.push(result[1]);
        } else {
          this.setState({
            intervenant: {
              ...this.state.intervenant, intervenant: {
                ...this.state.intervenant?.intervenant, numeroDocumentIndentite: result[0]
              }
            }
          })
        }
      }
      if ("02" == this.state.intervenant?.intervenant.refTypeDocumentIdentite.code) {
        result = ActifsUtils.validCarteSejour(this.state.intervenant?.intervenant.numeroDocumentIndentite);
        if (result[1] != null) {
          required = true;
          msg.push(result[1]);
        } else {
          this.setState({
            intervenant: {
              ...this.state.intervenant, intervenant: {
                ...this.state.intervenant?.intervenant, numeroDocumentIndentite: result[0]
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
    const typeIdentifiant = this.state.intervenant?.intervenant.refTypeDocumentIdentite.code;
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
        intervenantExist: true,
        intervenant: {
          ...this.state.intervenant, intervenant: {
            ...this.state.intervenant?.intervenant, nomIntervenant: intervenant.nomIntervenant,
            prenomIntervenant: intervenant.prenomIntervenant,
            adresse: intervenant.adresse,
            nationaliteFr: intervenant.nationaliteFr
          }
        }
      })
    } else {

      this.setState({
        infoMessage: 'Intervenant inexistant',
        intervenantExist: false,
        intervenant: {
          ...this.state.intervenant, intervenant: {
            ...this.state.intervenant?.intervenant, nomIntervenant: '',
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


  getPersonneForm() {

    return (<ComBadrCardBoxComp noPadding={true}>
      <Grid>
        { /*first Row*/}
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={7}>
            <ComBadrLibelleComp withColor={true}>
              {translate('actifsCreation.embarcations.intervenants.typeIdentifiant')}
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
              label={translate('actifsCreation.embarcations.intervenants.typeIdentifiant')}
              selectedValue={this.state.intervenant?.intervenant.refTypeDocumentIdentite.code}
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
                {translate('actifsCreation.embarcations.intervenants.identifiant')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={6}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.intervenant?.intervenant.numeroDocumentIndentite}
              onChangeText={(text) => this.setState({
                intervenant: {
                  ...this.state.intervenant, intervenant: {
                    ...this.state.intervenant?.intervenant, numeroDocumentIndentite: text
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
          <Col size={5}>
            <Row style={{ paddingTop: 15 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.intervenants.dateDelivrancePI')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={10}>
            <ComBadrDatePickerComp
              dateFormat="DD/MM/YYYY"
              // heureFormat="HH:mm"
              value={this.state.intervenant.dateDelivrancePI ? moment(this.state.intervenant.dateDelivrancePI, 'DD/MM/YYYY', true) : ''}
              // timeValue={this.state.currentRondeApparition.heureDebut ? moment(this.state.currentRondeApparition.heureDebut, 'HH:mm', true) : ''}
              onDateChanged={(date) => this.setState({
                intervenant: {
                  ...this.state.intervenant, dateDelivrancePI: date
                }
              })}
            // inputStyle={style.dateInputStyle}
            />
          </Col>
          <Col size={1} />
          <Col size={3}>
            <Row style={{ paddingTop: 15 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.intervenants.lieuDelivrancePI')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={6}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.intervenant?.lieuDelivrancePI}
              onChangeText={(text) => this.setState({
                intervenant: {
                  ...this.state.intervenant, lieuDelivrancePI: text
                }
              })}
            />
          </Col>
        </Row>

        {/*third Row*/}
        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={7}>
            <Row style={{ paddingTop: 15 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.intervenants.nomIntervenant')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={10}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.intervenant?.intervenant.nomIntervenant}
              onChangeText={(text) => this.setState({
                intervenant: {
                  ...this.state.intervenant, intervenant: {
                    ...this.state.intervenant?.intervenant, nomIntervenant: text
                  }
                }
              })}
            />
          </Col>
          <Col size={1} />
          <Col size={6}>
            <Row>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.intervenants.prenomIntervenant')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={6}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.intervenant?.intervenant.prenomIntervenant}
              onChangeText={(text) => this.setState({
                intervenant: {
                  ...this.state.intervenant, intervenant: {
                    ...this.state.intervenant?.intervenant, prenomIntervenant: text
                  }
                }
              })}
            />
          </Col>
        </Row>

        <Row style={CustomStyleSheet.whiteRow}>
          <Col size={5}>
            <Row style={{ paddingTop: 15 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.intervenants.dateNaissance')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={10}>
            <ComBadrDatePickerComp
              dateFormat="DD/MM/YYYY"
              value={this.state.intervenant?.intervenant.dateNaissance ? moment(this.state.intervenant?.intervenant.dateNaissance, 'DD/MM/YYYY', true) : ''}
              onDateChanged={(date) => this.setState({
                intervenant: {
                  ...this.state.intervenant, intervenant: {
                    ...this.state.intervenant?.intervenant, dateNaissance: date
                  }
                }
              })}
            // inputStyle={style.dateInputStyle}
            />
          </Col>
          <Col size={1} />
          <Col size={3}>
            <Row style={{ paddingTop: 15 }}>
              <ComBadrLibelleComp withColor={true}>
                {translate('actifsCreation.embarcations.intervenants.lieuNaissance')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={6}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.intervenant?.intervenant.lieuNaissance}
              onChangeText={(text) => this.setState({
                intervenant: {
                  ...this.state.intervenant, intervenant: {
                    ...this.state.intervenant?.intervenant, lieuNaissance: text
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
                {translate('actifsCreation.embarcations.intervenants.nationalite')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={10}>
            <ComBadrAutoCompleteChipsComp
              disabled={this.props.readOnly}
              code="code"
              placeholder={translate(
                'actifsCreation.embarcations.intervenants.nationalite'
              )}
              selected={this.state.intervenant?.intervenant.nationaliteFr}
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
                {translate('actifsCreation.embarcations.intervenants.profession')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={6}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              style={{ height: 20, fontSize: 12 }}
              value={this.state.intervenant?.professionIntervenant}
              onChangeText={(text) => this.setState({
                intervenant: {
                  ...this.state.intervenant,
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
                {translate('actifsCreation.embarcations.intervenants.adresse')}
              </ComBadrLibelleComp>
            </Row>
          </Col>
          <Col size={20}>
            <TextInput
              mode={'outlined'}
              disabled={this.props.readOnly}
              multiline={true}
              numberOfLines={4}
              style={{ fontSize: 12 }}
              value={this.state.intervenant?.intervenant.adresse}
              onChangeText={(text) => this.setState({
                intervenant: {
                  ...this.state.intervenant, intervenant: {
                    ...this.state.intervenant?.intervenant, adresse: text
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
      props.intervenant && props.index != state.index
    ) {
      return {
        intervenant: props.intervenant,// update the value of specific key
        index: props.index,
        isPassager: (props.intervenant.passager) ? 'true' : 'false'

      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  choisirPersonneConcernee = function (isPassager) {
    if (isPassager === "true") {
      this.setState({
        cocherPassager: true,
        intervenant: {
          ...this.state.intervenant, passager: true, equipage: false

        }
      })
    } else {
      this.setState({
        cocherPassager: false,
        intervenant: {
          ...this.state.intervenant, passager: false, equipage: true

        }
      })
    }
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
          <Text>{translate('actifsCreation.embarcations.intervenants.title')}</Text>
          <Row style={CustomStyleSheet.whiteRow}>
            <Col>
              <RadioButton.Group onValueChange={newValue => { this.setState({ isPassager: newValue }); this.choisirPersonneConcernee(newValue); }} value={this.state.isPassager}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{translate('actifsCreation.embarcations.intervenants.passager')}</Text>
                    <RadioButton value="true" color={primaryColor} />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{translate('actifsCreation.embarcations.intervenants.equipage')}</Text>
                    <RadioButton value="false" color={primaryColor} />
                  </View>
                </View>
              </RadioButton.Group>
            </Col>
          </Row>

          {this.getPersonneForm()}

          <Row style={CustomStyleSheet.whiteRow}>
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => (this.confirmerIntervenant())}
              text={translate('transverse.confirmer')}
            />
            <View style={{ width: 10 }} />
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.retablirIntervenant()
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
