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
import {translate} from '../../../../commons/i18n/ComI18nHelper';

/**Custom Components */
import {
  ComBadrToolbarComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
} from '../../../components';

/** Inmemory session */
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';
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
          listProfilsCoche: ComSessionService.getInstance().getProfiles(),
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
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('apurement.title')}
          subtitle={translate('apurement.subTitle')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}
        <View style={styles.container}>
          {!this.props.showProgress && (
            <ComBadrInfoMessageComp
              message={
                this.props.data && this.props.data.length > 0
                  ? translate('annonce.apurement')
                  : translate('annonce.aucune_annonce')
              }
            />
          )}
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
