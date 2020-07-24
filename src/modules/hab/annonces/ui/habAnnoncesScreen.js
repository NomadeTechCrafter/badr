import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import HTML from 'react-native-render-html';

/** REDUX **/
import {connect} from 'react-redux';

import styles from '../style/habAnnoncesStyle';

/**ACTIONS */
import * as Constants from '../../../../commons/constants/generic';
import * as AnnoncesAction from '../../../../commons/state/actions/genericAction';

/**Custom Components */
import {Toolbar, BadrInfoMessage, BadrProgressBar} from '../../../../commons/component';

/** Inmemory session */
import {Session} from '../../../../commons/services/session/Session';
import {translate} from '../../../../commons/i18n';

class habAnnoncesScreen extends React.Component {
  componentDidMount() {
    this.fetchAnnonces();
    this.props.navigation.openDrawer();
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

  render() {
    return (
      <ScrollView>
        <Toolbar
          navigation={this.props.navigation}
          icon="menu"
          title={translate('annonce.title')}
          subtitle={translate('annonce.subTitle')}
        />
        {this.props.showProgress && <BadrProgressBar />}
        <View style={styles.container}>
          {!this.props.showProgress && (
            <BadrInfoMessage
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


const mapStateToProps = (state) => ({...state.genericReducer});
export default connect(mapStateToProps, null)(habAnnoncesScreen);
