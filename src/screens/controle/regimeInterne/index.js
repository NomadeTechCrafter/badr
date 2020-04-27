import React, {Component} from 'react';
import {View} from 'react-native';

import {
  Container,
  CardBox,
  Accordion,
  Card,
  CardSection,
  BadrTextInput,
  BadrButton,
  BadrErrorMessage,
} from '../../../components';
import {Checkbox, TextInput, Text, RadioButton} from 'react-native-paper';
/**i18n */
import {translate} from '../../../common/translations/i18n';
import {CustomStyleSheet} from '../../../styles';
import _ from 'lodash';

import {load} from '../../../services/storage-service';
import {connect} from 'react-redux';
import * as Constants from '../../../common/constants/controle/regimeInterne';
import * as RegimeInterneAction from '../../../redux/actions/controle/regimeInterne';

class RegimeInterne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      refDeclaration: props.route.params.refDeclaration,
      cle: props.route.params.cle,
      numeroVoyage: props.route.params.numeroVoyage,
      declaration: props.route.params.declarationRI,
      typeRegime: translate('controle.regimeInterne'),
      decisionValue:null,
    };
  }

  componentDidMount() {
    var action = RegimeInterneAction.init({
      type: Constants.REGIMEINTERNE_INIT,
      value: {},
    });
    this.props.dispatch(action);
    /*load('user').then(user => {
      this.setState({login: JSON.parse(user).login});
    });*/
  }

  render() {
    /* const { goBack } = this.props.navigation;
    const { formContainer } = styles; */

    return (
      <Container>
        <CardBox style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.libelle, {flex: 2}]}>
              {translate('transverse.bureau')}
            </Text>
            <Text style={[styles.libelle, {flex: 2}]}>
              {translate('transverse.regime')}
            </Text>
            <Text style={[styles.libelle, {flex: 2}]}>
              {translate('transverse.annee')}
            </Text>
            <Text style={[styles.libelle, {flex: 3}]}>
              {translate('transverse.serie')}
            </Text>
            <Text style={[styles.libelle, {flex: 1}]}>
              {translate('transverse.cle')}
            </Text>
            <Text style={[styles.libelle, {flex: 2}]}>
              {translate('transverse.nVoyage')}
            </Text>
            <Text style={[styles.libelle, {flex: 2}]}>
              {translate('transverse.type')}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.libelle, {flex: 2}]}>
              {this.state.refDeclaration.slice(0, 3)}
            </Text>
            <Text style={[styles.libelle, {flex: 2}]}>
              {this.state.refDeclaration.slice(3, 6)}
            </Text>
            <Text style={[styles.libelle, {flex: 2}]}>
              {this.state.refDeclaration.slice(6, 10)}
            </Text>
            <Text style={[styles.libelle, {flex: 3}]}>
              {this.state.refDeclaration.slice(10, 17)}
            </Text>
            <Text style={[styles.libelle, {flex: 1}]}>{this.state.cle}</Text>
            <Text style={[styles.libelle, {flex: 2}]}>
              {this.state.numeroVoyage}
            </Text>
            <Text style={[styles.libelle, {flex: 2}]}>
              {this.state.typeRegime}
            </Text>
          </View>
        </CardBox>

        <CardBox style={{flexDirection: 'column', padding: 0}}>
          <Accordion title={translate('controle.annotations')}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.libelle, {flex: 2}]}>
                {this.state.declaration.annotation}
              </Text>
            </View>
          </Accordion>
        </CardBox>

        <CardBox style={{flexDirection: 'column', padding: 0}}>
          <Accordion title={translate('controle.intervention')}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.libelle, {flex: 2}]}>
                {translate('controle.version')}
              </Text>
              <Text style={[styles.libelle, {flex: 3}]}>
                {translate('controle.typeIntervention')}
              </Text>
              <Text style={[styles.libelle, {flex: 2}]}>
                {translate('controle.date')}
              </Text>
              <Text style={[styles.libelle, {flex: 2}]}>
                {translate('controle.acteur')}
              </Text>
              <Text style={[styles.libelle, {flex: 3}]}>
                {translate('controle.commentaire')}
              </Text>
            </View>

            {this.state.declaration.autreAnnotationVOs.map(item => (
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.libelle, {flex: 2}]}>
                  {item.numeroVersion}
                </Text>
                <Text style={[styles.libelle, {flex: 3}]}>
                  {item.intervention}
                </Text>
                <Text style={[styles.libelle, {flex: 2}]}>
                  {item.dateIntervention}
                </Text>
                <Text style={[styles.libelle, {flex: 2}]}>{item.acteur}</Text>
                <Text style={[styles.libelle, {flex: 3}]}>
                  {item.commentaire}
                </Text>
              </View>
            ))}
          </Accordion>
        </CardBox>

        <CardBox style={{flexDirection: 'column', padding: 0}}>
          <Accordion title={translate('controle.listDocExigible')}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.libelle, {flex: 2}]}>
                {translate('controle.doc')}
              </Text>
              <Text style={[styles.libelle, {flex: 2}]}>
                {translate('controle.portee')}
              </Text>
              <Text style={[styles.libelle, {flex: 2}]}>
                {translate('controle.nArticle')}
              </Text>
              <Text style={[styles.libelle, {flex: 2}]}>
                {translate('controle.reconnu')}
              </Text>
              <Text style={[styles.libelle, {flex: 2}]}>
                {translate('controle.consignation')}
              </Text>
              <Text style={[styles.libelle, {flex: 3}]}>
                {translate('controle.decision')}
              </Text>
            </View>
            {this.state.declaration.documentAnnexeResultVOs.map(item => (
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.libelle, {flex: 2}]}>
                  {item.documentAnnexe.libelle}
                </Text>
                <Text style={[styles.libelle, {flex: 2}]}>
                  {item.documentAnnexe.portee}
                </Text>
                <Text style={[styles.libelle, {flex: 2}]}>
                  {item.documentAnnexe.numeroOrdreArticle}
                </Text>
                <Checkbox
                  color={'#009ab2'}
                  status={item.documentAnnexe.reconnu ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({checked: !this.state.checked});
                  }}
                />
                <Checkbox
                  status={
                    item.documentAnnexe.demandeConsignation
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    this.setState({checked: !this.state.checked});
                  }}
                />
                <Text style={[styles.libelle, {flex: 3}]}>
                  {item.decisionMCI}
                </Text>
              </View>
            ))}
          </Accordion>
        </CardBox>
        <CardBox style={{flexDirection: 'column', padding: 0}}>
          <Accordion title={translate('controle.redressementOperes')}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <BadrButton
                onPress={this.confirmer}
                text={translate('controle.genererCompte')}
              />
            </View>
          </Accordion>
        </CardBox>
        <CardBox style={{flexDirection: 'column', padding: 0}}>
          <Accordion title={translate('controle.observation')}>
            <View>
              <TextInput
                placeholder={translate('controle.votreObservation')}
                value={this.state.text}
                multiline={true}
                numberOfLines={6}
                onChangeText={text => this.setState({text})}
              />
            </View>
          </Accordion>
        </CardBox>
        <CardBox style={{flexDirection: 'column', padding: 0}}>
          <Accordion title={translate('controle.historiqueCompteRendu')}>
            <View>
              <Text>{this.state.declaration.historiqueCompte}</Text>
            </View>
          </Accordion>
        </CardBox>
        <CardBox style={{flexDirection: 'column', padding: 0}}>
          <Accordion title={translate('controle.decision')}>
            <View
              style={{flexDirection: 'column'}}>
              <RadioButton.Group
                onValueChange={value => this.setState({value})}
                value={this.state.declaration.decisionControle}>
                <View>
                  <Text>{translate('controle.controleConforme')}</Text>
                  <RadioButton value="controleConforme" />
                </View>
                <View>
                  <Text>{translate('controle.redressementContentieux')}</Text>
                  <RadioButton value="contencieux" />
                </View>
                <View>
                  <Text>
                    {translate('controle.redressementSansContentieux')}
                  </Text>
                  <RadioButton value="sansContencieux" />
                </View>
              </RadioButton.Group>
            </View>
          </Accordion>
        </CardBox>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <BadrButton
            style={{width: 100}}
            onPress={this.confirmer}
            text={translate('controle.sauvegarder')}
          />
          <BadrButton
            style={{width: 100}}
            onPress={this.confirmer}
            text={translate('controle.validerControle')}
          />
          <BadrButton
            style={{width: 100}}
            onPress={this.confirmer}
            text={translate('controle.redresserDeclaration')}
          />
        </View>
      </Container>
    );
  }
}

const styles = {
  libelle: {fontSize: 14, color: '#006acd'},
};

const mapStateToProps = state => ({...state.regimeInterneReducer});

export default connect(mapStateToProps, null)(RegimeInterne);
