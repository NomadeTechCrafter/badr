import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {accentColor, primaryColor} from '../../../styles/ComThemeStyle';
import {Button, Dialog, Divider, Portal} from 'react-native-paper';

export default class ComBadrListDialogComp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Portal>
        <Dialog visible={this.props.visible} onDismiss={this.props.onCancel}>
          <Dialog.ScrollArea style={styles.contentStyle}>
            <ScrollView style={{flex: 1}}>
              {this.props.items ? (
                this.props.items.map((item) => {
                  return (
                    <View>
                      <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={() => this.props.onSelect(item)}>
                        <Text style={styles.textStyle}>
                          {item[this.props.libelle]}
                        </Text>
                      </TouchableOpacity>
                      <Divider />
                    </View>
                  );
                })
              ) : (
                <></>
              )}
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions style={styles.actionsContainer}>
            <Button
              color={accentColor}
              style={styles.buttonStyle}
              onPress={() => {
                this.props.onClose();
              }}>
              Fermer
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

const styles = {
  buttonStyle: {
    backgroundColor: primaryColor,
    width: '100%',
  },
  messageParagraph: {
    textAlign: 'center',
  },
  contentStyle: {
    height: '70%',
    width: '100%',
    paddingBottom: 20,
  },
  titleStyle: {
    textAlign: 'center',
    color: primaryColor,
  },
  actionsContainer: {
    marginTop: 40,
  },
  touchableOpacity: {margin: 10, padding: 10},
  textStyle: {fontSize: 16, textAlign: 'center'},
};
