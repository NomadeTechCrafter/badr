import _ from 'lodash';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { Button } from 'react-native-elements';
import { HelperText, TextInput } from 'react-native-paper';
import {
  ComAccordionComp, ComBadrAutoCompleteChipsComp, ComBadrCardBoxComp
} from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/eciAppositionScellesStyle';


export default class EciScellesApposeesBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appositionScellesVO: this.props.appositionScellesVO,
      operateur: {
        libelle: '',
        code:''
      }, reference: '',
      showMsgScelle:false,
      msgScelle:'',

    }
  }

  

  addScelle = () => {
    console.log(this.props.listeScellesApposees);
    console.log(this.props.listeScellesApposees.includes(this.state.reference));
    if (
      this.state.reference.length != 8 
    ) {
      this.props.setError('La scellé doit être sur 8 caractères');
      this.setState({
        showMsgScelle: true,
        msgScelle: 'La scellé doit être sur 8 caractères'
      });
      return;
    }
    if (this.props.listeScellesApposees.includes(this.state.reference)) {
      this.props.setError('La scellé est déjà apposée!');
      this.setState({
        showMsgScelle: true,
        msgScelle: 'La scellé est déjà apposée!'
      });
      return;
    }
    if (this.state.reference && this.state.reference.length === 8 && !this.containsScelle(this.state.reference)) {
      this.props.scellesList.push(this.state.reference);
      console.log(this.props.scellesList);
      this.resetScelle();
    }
    this.props.setError(null);
    this.setState({
      showMsgScelle: false,
      msgScelle: ''
    });
  };

  removeScelle = () => {
    console.log('removeScelle',this.state.selectedScelle);
    if (this.state.selectedScelle) {
      for (var i = 0; i < this.props.scellesList.length; i++) {
        if (this.props.scellesList[i] === this.state.selectedScelle) {
          this.props.scellesList.splice(i, 1);
          i--;
        }
      }

      this.setState({
        ...this.state,
        selectedScelle: {},
      });
    }
    this.setState({
      showMsgScelle: false,
      msgScelle: ''
    });
  };

  resetScelle = () => {
    this.scelleInput.clear();

    this.setState({
      ...this.state,
      scelleVo: {},
    });
  };

  containsScelle = (reference) => {
    for (var i = 0; i < this.props.scellesList.length; i++) {
      if (this.props.scellesList[i] === reference) {
        return true;
      }
    }
    return false;
  };
  renderBoxItem = ({ item }) => {
    const itemStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItem
        : style.boxItem;
    const itemTextStyle =
      item === this.state.selectedScelle
        ? style.selectedBoxItemText
        : style.boxItemText;

    return (
      <View style={itemStyle}>
        <TouchableOpacity
          disabled={this.state.readonly}
          onPress={() =>
            this.setState({
              ...this.state,
              selectedScelle: item,
            })
          }>
          <Text style={itemTextStyle}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  generateScelles = () => {
    if (
      this.state.generateurDu.length != 8 ||
      this.state.generateurAu.length != 8 
    ) {
      this.props.setError('La scellé doit être sur 8 caractères');
      this.setState({
        showMsgScelle: true,
        msgScelle: 'La scellé doit être sur 8 caractères'
      });
      return;
    }
    if (
      
      this.state.generateurDu > this.state.generateurAu 
    ) {
      this.props.setError('La veleur de départ est supérieure à la valeur d\'arrivée');
      this.setState({
        showMsgScelle: true,
        msgScelle: 'La veleur de départ est supérieure à la valeur d\'arrivée'
      });
      return;

    }
    if (
      this.state.generateurDu.length === 8 &&
      this.state.generateurAu.length === 8 &&
      this.state.generateurDu <= this.state.generateurAu
    ) {
      for (
        let scelle = this.state.generateurDu;
        scelle <= this.state.generateurAu;
        scelle++
      ) {
        if (this.props.listeScellesApposees.includes(scelle.toString())) {
          this.props.setError('La scellé est déjà apposée!');
          this.setState({
            showMsgScelle: true,
            msgScelle: 'La scellé est déjà apposée!'
          });
          return;
        }
        if (!this.containsScelle(scelle.toString())) {
          this.props.scellesList.push(scelle.toString());
          console.log(this.props.scellesList);
          this.resetScelle();
        }
        
      }


      this.props.setError(null);
      this.setState({
        ...this.state, generateurDu: '', generateurAu: '', showMsgScelle: false,
        msgScelle: ''
      });
    }
  };

  handleOperateurChanged = (operateur) => {
    console.log('operateur', operateur)
    this.setState({
      operateur: operateur,
      appositionScellesVO: { ...this.state.appositionScellesVO, transporteurExploitantMEAD: operateur.code },
      showMsgScelle: false,
      msgScelle: ''
    });
    this.props.appositionScellesVO.transporteurExploitantMEAD = operateur.code;

  };

  static getDerivedStateFromProps(props, state) {
    console.log('props', props);
    console.log('state', state);

    if (
      _.isEmpty(props.appositionScellesVO.nombreScelle) && !_.isEmpty(state.appositionScellesVO.nombreScelle) &&
      _.isEmpty(props.appositionScellesVO.numeroPince) && !_.isEmpty(state.appositionScellesVO.numeroPince)
    ) {
      return {
        appositionScellesVO: {
          ...props.appositionScellesVO,
          numeroPince: ""
        },
        operateur: {
          libelle: '',
          code: ''
        }, reference: '',
        showMsgScelle: false,
        msgScelle: '',
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  render() {
    console.log('EciScellesApposeesBlock ', this.props);
    console.log('EciScellesApposeesBlock,state : ', this.state); 
    return (
      <ComBadrCardBoxComp noPadding={true}>
        {/* Accordion Déclaration en Détail*/}
        <ComAccordionComp
          title={translate('appositionScelles.scelles.title')}
          expanded={true}>
          <View>
            <Row size={100}>
              <Col size={30} style={style.labelContainer}>
                <Text style={style.labelTextStyle}>
                  {translate(
                    'appositionScelles.scelles.numeroPince',
                  )}
                </Text>
              </Col>

              <Col size={70}>
                <TextInput
                  mode="outlined"
                  label={translate(
                    'appositionScelles.scelles.numeroPince',
                  )}
                  value={
                    this.state.appositionScellesVO
                      .numeroPince
                  }
                  keyboardType={'number-pad'}
                  maxLength={8}
                  onChangeText={(text) => {
                    text = text.replace(/[^0-9.]/g, '');
                    this.setState({
                      
                      appositionScellesVO: {
                  ...this.state.appositionScellesVO,
                        numeroPince: text,
                      },
                      
                    });
                    this.props.appositionScellesVO.numeroPince= text;
                  }}
                  disabled={this.props.readOnly}
                />
              </Col>
            </Row>

            <Row size={100}>
              <Col size={30} style={style.labelContainer}>
                <Text style={style.labelTextStyle}>
                  {translate(
                    'appositionScelles.scelles.nombreScelles',
                  )}
                </Text>
              </Col>

              <Col size={70}>
                <TextInput
                  mode="outlined"
                  label={translate(
                    'appositionScelles.scelles.nombreScelles',
                  )}
                  value={
                    this.state.appositionScellesVO
                      .nombreScelle
                  }
                  keyboardType={'number-pad'}
                  maxLength={8}
                  onChangeText={(text) => {
                    text = text.replace(/[^0-9.]/g, '');
                    this.setState({
                      appositionScellesVO: {
                        ...this.state.appositionScellesVO,
                        nombreScelle: text,
                      },
                    });
                    this.props.appositionScellesVO.nombreScelle = text;
                  }}
                  disabled={this.props.readOnly}
                />
              </Col>
            </Row>
            <Row size={100}>
              <Col size={30} style={style.labelContainer}>
                <Text style={style.labelTextStyle}>
                  {translate(
                    'appositionScelles.scelles.scellesDeclarees',
                  )}
                </Text>
              </Col>

              <Col size={70}>
                <Text
                  
                >
                  {this.props.listeScellesdeclarees}
                 
                  
                </Text>
              </Col>
            </Row>
            <Row size={100} style={style.topMarginStyle}>
              <Col size={100} style={style.labelContainer}>
                
                <HelperText
                  type="error"
                  padding="none"
                  visible={this.state.showMsgScelle}>
                  {this.state.msgScelle}
                </HelperText>
              </Col>
</Row>

            <Row size={100}>
              <Col size={30} style={style.labelContainer}>
                <Text style={style.labelTextStyle}>
                  {translate(
                    'appositionScelles.scelles.generateurNumerosScelles',
                  )}
                </Text>
              </Col>

              <Col size={5} style={style.labelContainer}>
                <Text style={style.labelTextStyle}>
                  {translate(
                    'appositionScelles.scelles.du',
                  )}
                </Text>
              </Col>

              <Col size={20}>
                <TextInput
                  mode="outlined"
                  label={translate(
                    'appositionScelles.scelles.du',
                  )}
                  value={this.state.generateurDu}
                  keyboardType={'number-pad'}
                  maxLength={8}
                  onChangeText={(text) => {
                    text = text.replace(/[^0-9.]/g, '');
                    this.setState({
                      ...this.state,
                      generateurDu: text,
                    });
                  }}
                  disabled={this.props.readOnly}
                />
              </Col>

              <Col size={5} />

              <Col size={5} style={style.labelContainer}>
                <Text style={style.labelTextStyle}>
                  {translate(
                    'appositionScelles.scelles.au',
                  )}
                </Text>
              </Col>

              <Col size={20}>
                <TextInput
                  mode="outlined"
                  label={translate(
                    'appositionScelles.scelles.au',
                  )}
                  value={this.state.generateurAu}
                  keyboardType={'number-pad'}
                  maxLength={8}
                  onChangeText={(text) => {
                    text = text.replace(/[^0-9.]/g, '');
                    this.setState({
                      ...this.state,
                      generateurAu: text,
                    });
                  }}
                  disabled={this.props.readOnly}
                />
              </Col>

              <Col size={5} />

              <Col size={10}>
                <Button
                  title={translate('transverse.Ok')}
                  type={'solid'}
                  disabled={this.props.readOnly}
                  buttonStyle={style.buttonAction}
                  onPress={() => this.generateScelles()}
                />
              </Col>
            </Row>

            <Row size={100} style={style.topMarginStyle}>
              <Col size={30} style={style.labelContainer}>
                <Text style={style.labelTextStyle}>
                  {translate(
                    'appositionScelles.scelles.numeroScelle',
                  )}
                </Text>
                
              </Col>

              <Col size={20} style={style.labelContainer}>
                <TextInput
                  ref={(ref) => (this.scelleInput = ref)}
                  key="scelleInput"
                  mode="outlined"
                  value={this.state.reference}
                  keyboardType={'number-pad'}
                  maxLength={8}
                  onChangeText={(text) => {
                    text = text.replace(/[^0-9.]/g, '');
                    this.setState({
                    
                        reference: text,
                    });
                  }}
                  disabled={this.props.readOnly}
                />
              </Col>

              <Col size={5} />

              <Col size={10} style={style.labelContainer}>
                <TouchableOpacity
                  style={style.touchableArrow}
                  disabled={this.props.readonly}>
                  <Button
                    type={'outline'}
                    icon={{
                      name: 'chevron-right',
                      size: 12,
                      color: 'black',
                    }}
                    onPress={() => this.addScelle()}
                    disabled={this.props.readOnly}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={style.touchableArrow}
                  disabled={this.props.readonly}>
                  <Button
                    type={'outline'}
                    icon={{
                      name: 'chevron-left',
                      size: 12,
                      color: 'black',
                    }}
                    onPress={() => this.removeScelle()}
                    disabled={this.props.readOnly}
                  />
                </TouchableOpacity>
              </Col>

              <Col size={5} />

              <Col size={40} style={style.boxContainer}>
                {console.log(this.props.scellesList)}
                <SafeAreaView style={style.boxSafeArea}>
                  {(this.props.scellesList == null ||

                    _.isEmpty(this.props.scellesList)) && (
                      <Text style={style.boxItemText}>
                        Aucun élément
                      </Text>
                    )}

                  {this.state.appositionScellesVO
                    .scelles != null &&
                    this.props.scellesList
                      .size !== 0 && (
                      <FlatList
                        data={Object.values(
                          this.props.scellesList,
                        )}
                        renderItem={(item) =>
                          this.renderBoxItem(item)
                        }
                        keyExtractor={(item) => item}
                      nestedScrollEnabled={true}
                      disabled={this.props.readOnly}
                      />
                    )}
                </SafeAreaView>
              </Col>
            </Row>
            <Row size={100}>
              <Col size={30} style={style.labelContainer}>
                <Text style={style.labelTextStyle}>
                  {translate(
                    'appositionScelles.scelles.nombreScellesSaisies',
                  )}
                </Text>
              </Col>

              <Col size={70}>
                <Text

                >
                  {this.props.scellesList.length}


                </Text>
              </Col>
            </Row>
            <Row size={100}>
              <Col size={30} style={style.labelContainer}>
                <Text style={style.labelTextStyle}>
                  {translate(
                    'appositionScelles.scelles.transporteurExploitantMEAD',
                  )}
                </Text>
              </Col>

              <Col size={70}>
                <ComBadrAutoCompleteChipsComp
                  placeholder={translate(
                    'appositionScelles.scelles.choisirValeur'
                  )}
                  code="code"
                  disabled={this.props.readOnly}
                  selected={this.state.operateur?.libelle}
                  maxItems={3}
                  libelle="libelle"
                  command="getCmbOperateur"
                  onDemand={true}
                  searchZoneFirst={false}
                  onValueChange={this.handleOperateurChanged}
                />
              </Col>
            </Row>
          </View>
        </ComAccordionComp>
      </ComBadrCardBoxComp>
    );
  }
}
