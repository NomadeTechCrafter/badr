import React from 'react';
import {View, ScrollView, Text, Dimensions} from 'react-native';
import HTML from 'react-native-render-html';
import utf8 from 'utf8';
/** STYLING **/
import {CustomStyleSheet} from '../../../styles/index';

/**ACTIONS */
import * as Constants from '../../../common/constants/generic';
import * as AnnoncesAction from '../../../redux/actions/generic';

/** REDUX **/
import {connect} from 'react-redux';

/** i18n **/
import {translate} from '../../../common/translations/i18n';

/**Custom Components */
import {Toolbar, BadrInfoMessage, BadrProgressBar} from '../../../components';

/** Inmemory session */
import {Session} from '../../../common/session';
/** CONSTANTS **/
const screenWidth = Dimensions.get('window').width;
class WelcomeScreen extends React.Component {
  componentDidMount() {
    this.fetchAnnonces();
    this.props.navigation.openDrawer();
    console.log(this.props.navigation);
  }

  fetchAnnonces = () => {
    let action = AnnoncesAction.request({
      type: Constants.GENERIC_REQUEST,
      value: {
        module: 'HAB_LIB',
        command: 'getListeAnnonces',
        typeService: 'SP',
        jsonVO: {
          listProfilsCoche: Session.getInstance().getProfiles(),
        },
      },
    });
    this.props.dispatch(action);
  };

  onItemSelected = (item) => {};

  render() {
    console.log('<<<<<<<<<<<<<');
    console.log(this.props.data);
    console.log('<<<<<<<<<<<<<<<<');
    return (
      <ScrollView>
        <Toolbar
          navigation={this.props.navigation}
          icon="menu"
          title={translate('welcome.title')}
          subtitle={translate('welcome.subTitle')}
        />
        {this.props.showProgress && <BadrProgressBar width={screenWidth} />}
        <View style={styles.container}>
          <BadrInfoMessage
            message={
              this.props.data && this.props.data.length
                ? translate('annonce.annonces')
                : !this.props.showProgress && !this.props.data
                ? translate('annonce.aucune_annonce')
                : translate('info.pleasewait')
            }
          />
          {this.props.data &&
            this.props.data.map((item) => {
              console.log(item.libelleInformation);
              return (
                <HTML
                  html={item.libelleInformation}
                  imagesMaxWidth={Dimensions.get('window').width}
                />
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    ...CustomStyleSheet.centerContainer,
    backgroundColor: 'transparent',
  },
};

const mapStateToProps = (state) => ({...state.genericReducer});

export default connect(mapStateToProps, null)(WelcomeScreen);
