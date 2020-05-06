import React from 'react';

/** React Components */
import {View, ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/** Custom Components */
import {BadrTree, BadrTreeItem} from '../../components';

/** REDUX **/
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../common/constants/menu';
import * as menuAction from '../../redux/actions/menu';

/** STYLING **/
import {CustomStyleSheet} from '../../styles/index';

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
            data={this.props.menuList}
            renderNode={({node, level, isExpanded, hasChildrenNodes}) => {
              return (
                <BadrTreeItem
                  node={node}
                  level={level}
                  isExpanded={isExpanded}
                  hasChildrenNodes={hasChildrenNodes}
                />
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
