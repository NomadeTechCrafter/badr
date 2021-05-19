import {StyleSheet} from 'react-native';
import {CustomStyleSheet} from '../../../../commons/styles/ComThemeStyle';

const styles = {
  container: {
    ...CustomStyleSheet.centerContainer,
    backgroundColor: 'transparent',
  },
  mainContainer: { width: '100%', height: '100%' },
  dataTableItemStyle: {
    flex: 1,
    paddingTop: 12,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  cardBox: {
    padding: 0,
    margin: 10,
  },
};

export default StyleSheet.create(styles);
