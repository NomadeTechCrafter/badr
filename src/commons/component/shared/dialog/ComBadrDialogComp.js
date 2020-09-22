import React from 'react';
import {primaryColor, accentColor} from '../../../styles/ComThemeStyle';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';
export default class ComBadrDialogComp extends React.Component {
  render() {
    return (
      <Portal>
        <Dialog
          style={styles.dialogStyle}
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

const styles = {
  dialogstyle: {
    marginLeft: '20%',
    marginRight: '20%',
  },
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
