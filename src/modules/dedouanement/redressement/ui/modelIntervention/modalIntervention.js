import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { TextInput } from 'react-native-paper';
import {
  ComBadrButtonComp,
  ComBadrCardBoxComp,
  ComBadrCardWithTileComp,
  ComBadrErrorMessageComp,
  ComBadrLibelleComp,
  ComBadrModalComp
} from '../../../../../commons/component';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet, primaryColor } from '../../../../../commons/styles/ComThemeStyle';

export default class ModalIntervention extends React.Component {
  constructor(props) {
    super(props);
  }

  

  confirmer = () => {
    
    if (_.isEmpty(this.props.dedDumMotifIInputVO.motif)) {
      this.setState({ errorMessage: translate('dedouanement.intervention.motifRequired') });
      return;
    }
   
    this.props.confirmer(this.props.dedDumMotifIInputVO);

  }

  retablir = () => {

    if (_.isEmpty(this.props.dedDumMotifIInputVO.motif)) {
      this.setState({ errorMessage: '' });
    }

    this.props.retablir();

  }

  onChangeMotif = (text) => { 
    console.log('this.props.dedDumMotifIInputVO : ', this.props.dedDumMotifIInputVO);
    if (this.props.dedDumMotifIInputVO) {
      this.props.dedDumMotifIInputVO.motif = text;
    }
    this.setState({etat:true});
  }
  


  onDismiss = () => {

    if (_.isEmpty(this.props.dedDumMotifIInputVO.motif)) {
      this.setState({ errorMessage: '' });
    }

    this.props.onDismiss();

  }

  render() {
    console.log('this.props.dedReferenceVO : ', this.props.dedReferenceVO)
    return (
      <ComBadrModalComp
        visible={this.props.visible}
        onDismiss={this.onDismiss}
        icon={'window-close'}
        onPress={this.onDismiss}>
        <View style={CustomStyleSheet.whiteRow}>
          {this.state?.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.state.errorMessage} />
          )}
          <Row>
            <ComBadrCardBoxComp style={styles.cardBox}>
              <ComBadrCardWithTileComp
                title={translate('dedouanement.intervention.title')}>
                <View>
                  <Row>
                    <Col>
                      <ComBadrCardWithTileComp
                        title={translate('dedouanement.intervention.version.titreBloc')}>
                        <View>

                          <Row style={CustomStyleSheet.lightBlueRow}>

                            <Col size={1}>
                              <ComBadrLibelleComp withColor={true}>
                                {translate('dedouanement.intervention.version.type')}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                              <ComBadrLibelleComp>
                                {this.props.dedReferenceVO?.type}
                              </ComBadrLibelleComp>

                            </Col>



                            <Col size={1}>
                              <ComBadrLibelleComp withColor={true}>
                                {translate('dedouanement.intervention.version.numero')}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                              <ComBadrLibelleComp>
                                {this.props.dedReferenceVO?.numeroVersion}
                              </ComBadrLibelleComp>

                            </Col>

                            <Col size={1}>
                              <ComBadrLibelleComp withColor={true}>
                                {translate('dedouanement.intervention.version.statut')}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                              <ComBadrLibelleComp>
                                {this.props.dedReferenceVO?.status}
                              </ComBadrLibelleComp>

                            </Col>

                          </Row>
                        </View>
                      </ComBadrCardWithTileComp>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ComBadrCardWithTileComp
                        title={translate('dedouanement.intervention.bloc.titre')}>
                        <View>

                          <Row style={CustomStyleSheet.lightBlueRow}>

                            <Col size={1}>
                              <ComBadrLibelleComp withColor={true}>
                                {translate('dedouanement.intervention.bloc.type')}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                              <ComBadrLibelleComp>
                                {this.props?.typeIntervention}
                              </ComBadrLibelleComp>

                            </Col>
                          </Row>
                          <Row style={CustomStyleSheet.lightBlueRow}>

                            <Col size={1}>
                              <ComBadrLibelleComp withColor={true}>
                                {translate('dedouanement.intervention.bloc.motif')}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={3}>
                              <TextInput
                                multiline={true}
                                numberOfLines={4}
                                underlineColor={primaryColor}
                                mode="outlined"
                                value={this.props.dedDumMotifIInputVO?.motif}
                                label={translate('dedouanement.intervention.bloc.motif')}
                                onChangeText={(text) => this.onChangeMotif(text)}
                                onEndEditing={(event) => {
                                  this.onChangeMotif(event.nativeEvent.text);
                                  this.props.update(this.props.dedDumMotifIInputVO);
                                }}
                              />

                            </Col>

                          </Row>
                        </View>
                      </ComBadrCardWithTileComp>
                    </Col>
                  </Row>

                </View>
              </ComBadrCardWithTileComp>
            </ComBadrCardBoxComp>
          </Row>

          <Row
            style={[
              CustomStyleSheet.whiteRow,
              { justifyContent: 'space-between' },
            ]}>
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => this.confirmer()}
              text={translate('transverse.confirmer')}
            />
            <View style={{ width: 10 }} />
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.retablir()
              }}
              text={translate('transverse.retablir')}
            />
          </Row>

        </View>
      </ComBadrModalComp>
    );
  }
}
const styles = StyleSheet.create({
  cardBox: {
    flexDirection: 'column',
    width: '100%',
    padding: 0,
    marginTop: 15,
    marginBottom: 15,
  },
});
