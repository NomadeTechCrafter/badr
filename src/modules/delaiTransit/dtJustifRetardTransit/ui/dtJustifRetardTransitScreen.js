import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  ComAccordionComp,
  ComBadrButtonIconComp,
  ComBadrDatePickerComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrLibelleComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../commons/component';
import { connect } from 'react-redux';
import * as Constants from '../state/dtJustifRetardTransitConstants';
import DocumentPicker from 'react-native-document-picker';
import translate from '../../../../commons/i18n/ComI18nHelper';
import DtJustifRetardTransit from '../component/dtJustifRetardTransit'
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as JustifRetardTransitAction from '../state/actions/dtJustifRetardTransitAction';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { CustomStyleSheet } from '../../../../commons/styles/ComThemeStyle';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import { MODULE_ECI, TYPE_SERVICE_UC,MODULE_ECOREXP } from '../../../../commons/Config';


class JustifRetardTransitMainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentaire: '',
      filename:'',
      content:null,
      mimeType:null,
      messageErreur: null
    };
  }

addDocumentAnnexe = async () => {
    try {
        const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],
            readContent: true,
        });
        this.setState({
        content:await RNFS.readFile(result.uri, 'base64'),
        filename:result.uri,
        mimeType:'pdf'
        }
)
      //      urlDoc: result.name,
      //      size: null,
      //      content: await RNFS.readFile(result.uri, 'base64')


   //     this.setState({
   //         ...this.state,
   // });
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // Do nothing
        } else {
            throw err;
        }
    }
};

confirmerJustifierRetardTransit = () => {
 //   if (this.state.datePreConfirmation) {
 //     this.setState = {
 //       messageErreur: null
 //     }

      let action = JustifRetardTransitAction.request(
        {
          type: Constants.JUSTIF_RETARD_TRANSIT_REQUEST,
          value: {
            commande: 'confirmerJustifierRetardTransit',
            module: MODULE_ECOREXP,
            typeService: TYPE_SERVICE_UC,
            data: {
                nomFichier:this.state.filename,
                mimeType:'pdf',
                content:this.state.content,
                transactionId:'',
                commentaire:this.state.commentaire
            }

          },
        },
        this.props.navigation,
      );
      this.props.dispatch(action);
   // } else {
   //   this.setState({
   //     messageErreur: 'Date pré confirmation d\'arrivée obligatoire'
   //   });
  //  }
  }

  render() {
    return (
      <View>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('justifRetardTransit.title')}
          subtitle={translate('justifRetardTransit.subTitle')}
          icon="menu"
        />
        {this.props.showProgress && <ComBadrProgressBarComp circle={false} />}
        {this.props.data?.dtoHeader?.messagesInfo && (
          <ComBadrInfoMessageComp message={this.props.data?.dtoHeader?.messagesInfo} />
        )}
        {this.props.data?.dtoHeader?.messagesErreur && (
          <ComBadrErrorMessageComp message={this.props.data?.dtoHeader?.messagesErreur} />
        )}  
        {this.state.messageErreur && (
          <ComBadrErrorMessageComp message={this.state.messageErreur} />
        )}
        <NavigationContainer independent={true}>
          <DtJustifRetardTransit
            commande="initJustifRetardTransit"
            typeService="UC"
            navigation={this.props.navigation}
            routeParams={this.props.route.params}
          />
          {(!this.props.data?.dtoHeader?.messagesErreur && this.props.initSucces) && (
            <ScrollView>
              <View style={CustomStyleSheet.verticalContainer20}>
                <View style={CustomStyleSheet.row}>
          <Grid>
          <Row>

          <Col size={60}>
              <TextInput
              mode="flat"
              label= {translate('justifRetardTransit.commentaire')}
              onChangeText={(text) =>
                  this.setState({
                      ...this.state,
                      commentaire: text

                  })
              }

              />
              </Col>

          </Row>
          </Grid>
                </View>
              </View>
              <Grid>

          <Row>
          <Col size={3} />

          <Col size={60}>

              <Button
              title={translate('justifRetardTransit.ajouter')}
              type={'solid'}
              buttonStyle={styles.btnConfirmer}
              onPress={() => this.addDocumentAnnexe()} >
              {translate('justifRetardTransit.ajouter')}
          </Button>
          </Col>
          <Col size={3} />
          </Row>
                <Row>
                  <Col size={20} />
                  <Col size={30}>
                    <Button
                      onPress={this.confirmerJustifierRetardTransit}
                    //  disabled={this.props.confirmerSucces}
                      icon="check"
                      compact="true"
                      mode="contained"
                      style={styles.btnConfirmer,{fontSize:11}}
                      loading={this.props.showProgress}>
                      {translate('justifRetardTransit.confirmer')}
                    </Button>
                  </Col>
                  <Col size={20} />
                </Row>
              </Grid>
            </ScrollView>
          )}
        </NavigationContainer>
      </View>
    );
  }
}


const styles = {
  ComContainerCompBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnConfirmer: {
    color: '#FFF',
    padding: 5,
    marginRight: 15,
  },
  textInputsStyle: {
    padding: 10,
  }

};

function mapStateToProps(state) {
  return { ...state.justifRetardTransitReducer };
}


export default connect(
  mapStateToProps,
  null,
)(JustifRetardTransitMainScreen);
