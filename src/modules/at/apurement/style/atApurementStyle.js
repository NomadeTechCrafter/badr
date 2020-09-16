import {StyleSheet} from 'react-native';
import {CustomStyleSheet} from '../../../../commons/styles/theme';

const styles = {
  container: {
    ...CustomStyleSheet.centerContainer,
    backgroundColor: 'transparent',
  },
  dataTableItemStyle: {
    flex: 1,
    paddingTop: 12,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
};

export default StyleSheet.create(styles);
