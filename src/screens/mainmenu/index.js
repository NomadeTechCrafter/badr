import React from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Toolbar from '../../components/toolbar';
import {
  Appbar,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';
import {FlatGrid} from 'react-native-super-grid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchBar, Icon} from 'react-native-elements';
import {BackHandler} from 'react-native';

import {FadeInView} from '../../components/animated/index';

import _ from 'lodash';

/** REDUX **/
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../common/constants/menu';
import * as menuAction from '../../redux/actions/menu';

/** STYLING **/
import {CustomStyleSheet} from '../../styles/index';

class MainMenu extends React.Component {
  parentStack = [];

  constructor(props) {
    super(props);
    const {search} = this.state;
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  handleBackButtonClick() {
    if (this.props.level >= 2) {
      this.dispatchWith({
        niveau: this.props.level - 1,
        parent: this.parentStack.pop(),
      });
      return true;
    } else {
      return true;
    }
  }

  handleItemPressed = item => {
    if (item.isFeuille) {
      console.log("C'est une feuille ...");

      switch (item.raccourci) {
        case 'cf3072':
          console.log('--> initRegime interne');
          return this.props.navigation.navigate('RechercheDum', {typeControle: "RI"});
        case 'cf3064':
          console.log('--> ACVP');
          return this.props.navigation.navigate('RechercheDum', {typeControle: "AC"});        
        default:
          return ;
      }
      
      console.log(item);
    } else {
      this.parentStack.push(item.parent);
      console.log(this.parentStack);
      this.dispatchWith({parent: item.id});
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.dispatchWith({niveau: 1});
  }

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({search});
    this.dispatchWith(search ? {libelleFonctionnalite: search} : {niveau: 1});
  };

  dispatchWith = predicate => {
    var action = menuAction.request({
      type: Constants.MENU_REQUEST,
      value: {
        predicate: predicate,
      },
    });
    this.props.dispatch(action);
  };

  render() {
    const {search} = this.state;
    return (
      <View style={CustomStyleSheet.menuContainer}>
        {/* <Toolbar
          title="Menu principal"
          icon="menu"
          navigation={this.props.navigation}
        /> */}
        <SearchBar
          lightTheme={true}
          placeholder="Rechercher des fonctionnalités..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <FlatGrid
          itemDimension={130}
          spacing={30}
          items={this.props.menuList}
          renderItem={({item}) => (
              <TouchableOpacity onPress={() => this.handleItemPressed(item)}>
                <View style={CustomStyleSheet.badrCard}>
                  <Text style={CustomStyleSheet.badrCardText}>
                    {item.libelleFonctionnalite.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({...state.menuReducer});

// function mapDispatchToProps(dispatch) {
//   return {dispatch};
// }

export default connect(
  mapStateToProps,
  null,
)(MainMenu);
