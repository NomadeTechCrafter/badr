import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {IconButton, Modal, Portal, Text} from 'react-native-paper';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../commons/styles/ComThemeStyle';
import {applyMiddleware, compose, createStore} from 'redux';
import allReducers from '../../redux/reducers';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {translate} from '../../common/translations/i18n';
import {BadrPicker, CardBox} from '../index';
import {Col, Row} from 'react-native-easy-grid';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk)),
);
export default class BadrModal extends React.Component {
  render() {
    return (
      <Portal>
        <Modal
          dismissable={true}
          visible={this.props.visible}
          onDismiss={this.props.onDismiss}>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: primaryColor,
              width: '80%',
              height: '90%',
            }}>
            <TouchableOpacity
              style={{margin: 5, alignSelf: 'flex-end'}}
              onPress={() => this.props.onDismiss()}>
              {this.props.icon ? (
                <IconButton
                  icon={this.props.icon}
                  size={15}
                  color={primaryColor}
                  style={{backgroundColor: 'white'}}
                  onPress={this.props.onPress}
                />
              ) : (
                <Text style={{color: primaryColor}}>Fermer</Text>
              )}
            </TouchableOpacity>

            <ScrollView>
              {this.props.children}
              {this.props.command &&
              this.props.typeService &&
              this.props.picker ? (
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={8}>
                    <CardBox>
                      <BadrPicker
                        onRef={(ref) => (this.code = ref)}
                        key="code"
                        titleStyle={CustomStyleSheet.badrPickerTitle}
                        style={{flex: 1}}
                        title={translate('actifs.saisie.choisirNature')}
                        cle="code"
                        libelle="libelle"
                        module={this.props.module}
                        command={this.props.command}
                        onValueChange={this.props.onValueChange}
                        param={'this.state.value'}
                        typeService={this.props.typeService}
                        storeWithKey="code"
                        storeLibelleWithKey="code"
                      />
                    </CardBox>
                  </Col>
                </Row>
              ) : null}
            </ScrollView>
          </View>
        </Modal>
      </Portal>
    );
  }
}
