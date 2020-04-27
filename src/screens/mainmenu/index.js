import React from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Appbar,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import BadrTree from '../../components/tree/BadrTree';
import {Divider} from 'react-native-elements';
import _ from 'lodash';

/** REDUX **/
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../common/constants/menu';
import * as menuAction from '../../redux/actions/menu';

/** STYLING **/
import {CustomStyleSheet} from '../../styles/index';

function getIndicator(isExpanded, hasChildrenNodes) {
  if (!hasChildrenNodes) {
    return <Icon name="circle" size={10} />;
  } else if (isExpanded) {
    return <Icon name="angle-down" size={20} />;
  } else {
    return <Icon name="angle-right" size={20} />;
  }
}

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchMenu();
  }

  fetchMenu = predicate => {
    var action = menuAction.request({
      type: Constants.MENU_REQUEST,
      value: {
        predicate: predicate,
      },
    });
    this.props.dispatch(action);
  };

  render() {
    return (
      <View style={CustomStyleSheet.menuContainer}>
        <ScrollView>
          <BadrTree
            getCollapsedNodeHeight={() => 60}
            style={{padding: 10}}
            data={this.props.menuList} // defined above
            renderNode={({node, level, isExpanded, hasChildrenNodes}) => {
              return (
                <View style={{height: 60}}>
                  <Divider style={{ backgroundColor: '#009ab2' }}/>
                  <Text
                    style={{
                      paddingTop: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingLeft: 10,
                      fontSize: hasChildrenNodes ? 15 : 13,
                      marginLeft: 25 * level,
                    }}>
                    {getIndicator(isExpanded, hasChildrenNodes)}
                    {'  '}
                    {node.libelleFonctionnalite}
                  </Text>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({...state.menuReducer});

export default connect(
  mapStateToProps,
  null,
)(MainMenu);