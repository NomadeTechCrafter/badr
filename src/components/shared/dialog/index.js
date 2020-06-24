import React from 'react';
import {View} from 'react-native';
import {primaryColor, accentColor} from '../../../styles/index';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';
class BadrDialog extends React.Component {
  render() {
    return (
      <Portal>
        <Dialog
          style={{
            marginLeft: '20%',
            marginRight: '20%',
          }}
          visible={this.props.dialogVisibility}
          onDismiss={this.props.onCancel}>
          <Dialog.Title style={styles.titleStyle}>
            {this.props.title}
          </Dialog.Title>
          <Dialog.Content style={styles.contentStyle}>
            <Paragraph style={styles.messageParagraph}>
              {this.props.dialogMessage}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={styles.actionsContainer}>
            <Button
              color={accentColor}
              style={styles.buttonStyle}
              onPress={this.props.onOk}>
              {this.props.confirmMessage}
            </Button>
            <Button
              color={accentColor}
              style={styles.buttonStyle}
              onPress={this.props.onCancel}>
              {this.props.cancelMessage}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}
export default BadrDialog;

const styles = {
  buttonStyle: {
    backgroundColor: primaryColor,
    width: '15%',
    marginRight: 10,
  },
  messageParagraph: {
    textAlign: 'center',
  },
  contentStyle: {alignItems: 'center', justifyContent: 'center'},
  titleStyle: {
    textAlign: 'center',
    color: primaryColor,
  },
};
