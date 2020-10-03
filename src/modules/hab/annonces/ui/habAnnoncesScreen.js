import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import HTML from 'react-native-render-html';
/** REDUX **/
import {connect} from 'react-redux';
/**ACTIONS */
import * as Constants from '../../../../commons/constants/generic/ComGenericConstants';
import * as AnnoncesAction from '../../../../commons/state/actions/ComGenericAction';

import styles from '../style/habAnnoncesStyle';
/**Custom Components */
import {
  ComBadrToolbarComp,
  ComBadrInfoMessageComp,
} from '../../../../commons/component';

/** Inmemory session */
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';
import {translate} from '../../../../commons/i18n/ComI18nHelper';

import * as Zxing from '../../../../commons/native/ComZxingNative';

import * as qrCodeAction from '../../../../commons/state/actions/ComQrCodeAction';
import * as qrCodeConstants from '../../../../commons/constants/components/ComQrCodeConstants';

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
          listProfilsCoche: ComSessionService.getInstance().getProfiles(),
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
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('annonce.title')}
          subtitle={translate('annonce.subTitle')}
        />
        <View style={styles.container}>
          {!this.props.showProgress && (
            <ComBadrInfoMessageComp
              message={
                this.props.data && this.props.data.length > 0
                  ? translate('annonce.annonces')
                  : translate('annonce.aucune_annonce')
              }
            />
          )}
          {this.props.data &&
            this.props.data.length > 0 &&
            this.props.data.map((item) => {
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
