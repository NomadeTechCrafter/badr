import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import HTML from 'react-native-render-html';

/** REDUX **/
import {connect} from 'react-redux';
/**ACTIONS */
import * as Constants from '../../../../commons/constants/generic/GenericConstants';
import * as AnnoncesAction from '../../../../commons/state/actions/GenericAction';

import styles from '../style/habAnnoncesStyle';

/**Custom Components */
import {Toolbar, BadrInfoMessage} from '../../../../commons/component';

/** Inmemory session */
import {Session} from '../../../../commons/services/session/Session';
import {translate} from '../../../../commons/i18n/I18nHelper';

import * as Zxing from '../../../../commons/native/zxing';

import * as qrCodeAction from '../../../../commons/state/actions/QrCodeAction';
import * as qrCodeConstants from '../../../../commons/constants/components/QrCodeConstants';

class habAnnoncesScreen extends React.Component {

  /*
    Constructor
   */
  constructor(props) {
    super(props);
  }

  /*
   componentDidMount Initialization
   */
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.refresh) {
      let action = AnnoncesAction.refresh({
        type: Constants.GENERIC_INIT_REFRESH,
        value: {},
      });

      /**
       * n'afficher que la partie AT coté RN
       */
      this.props.dispatch(action);
      Zxing.default.showQrReader(this.onBarcodeRead);
      this.props.navigation.navigate('CreerApurement', {qr: true});
    }
  }

  onBarcodeRead = (data) => {
    if (data) {
      let action = qrCodeAction.request({
        type: qrCodeConstants.QRCODE_REQUEST,
        value: {
          module: 'DED_LIB',
          command: 'ded.lireCodeQr',
          typeService: 'SP',
          param: data,
        },
      });
      this.props.dispatch(action);
    }
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
        <View style={styles.container}>
          {!this.props.showProgress && (
            <BadrInfoMessage
              message={
                this.props.data && this.props.data.length > 0
                  ? translate('annonce.annonces')
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
