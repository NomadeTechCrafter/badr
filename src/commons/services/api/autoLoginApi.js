import {Session} from '../session/Session';
import {
  getAndroidId,
  getDeviceName,
  getManufacturer,
  getModel,
  getSystemVersion,
} from 'react-native-device-info';
import {saveStringified} from '../async-storage/storage-service';
import HabLoginApi from '../../../modules/hab/login/service/api/habLoginApi';
import HabSmsVerifyApi from '../../../modules/hab/smsVerify/service/api/habSmsVerifyApi';
import HabProfileApi from '../../../modules/hab/mainMenu/service/api/habProfileApi';

export default class AutoLoginApi {
  constructor(
    usr,
    password,
    smsCode,
    bureauCode,
    bureau,
    arrondissementCode,
    arrondissement,
    profiles,
  ) {
    this.usr = usr;
    this.password = password;
    this.smsCode = smsCode;
    this.bureauCode = bureauCode;
    this.bureau = bureau;
    this.arrondissementCode = arrondissementCode;
    this.arrondissement = arrondissement;
    this.profiles = profiles;
  }

  shortAuth = async () => {
    console.log(this.usr, this.password, this.bureau);
    return await this.shortConnect(this.password, this.usr);
  };

  setDeviceInformation = () => {
    Session.getInstance().setSystemVersion(getSystemVersion());
    Session.getInstance().setModel(getModel());
    getAndroidId().then((value) => {
      Session.getInstance().setDeviceId(value);
    });
    getManufacturer().then((value) => {
      Session.getInstance().setManufacturer(value);
    });
    getDeviceName().then((value) => {
      Session.getInstance().setDeviceName(value);
    });
    Session.getInstance().setPlatform('Android');
  };

  shortConnect = async () => {
    console.log('1) LOGIN START');
    return await HabLoginApi.login(this.usr, this.password)
      .then((data) => {
        if (data) {
          if (data.statutConnexion === '1') {
            /** Saving the user login into the local storage */
            saveStringified('user', data).then(() => data.login);
            /** Saving the user login into the global in-memory session */
            console.log('1) LOGIN END');
            return this.shortVerifySms(this.smsCode);
          } else {
            // Do nothing
            return null;
          }
        } else {
          // Do nothing
          return null;
        }
      })
      .catch((e) => {
        console.log(e);
        return null;
      });
  };

  shortVerifySms = async () => {
    console.log('2) SMS START');
    this.setDeviceInformation();
    return await HabSmsVerifyApi.verify(this.smsCode)
      .then((response) => {
        const jsonVO = response.data.jsonVO;
        if (jsonVO.connexion && jsonVO.connexion === 'true') {
          console.log('2) SMS END');
          this.shortCheckBureau(this.bureau, this.bureauCode);
          this.shortCheckArrondissement(
            this.arrondissement,
            this.arrondissementCode,
          );
          return this.shortCheckProfiles(
            this.bureauCode,
            this.arrondissementCode,
            this.profiles,
          );
        } else if (jsonVO.connexion && jsonVO.connexion === 'false') {
          // Do nothing
          return null;
        } else {
          // Do nothing
          return null;
        }
      })
      .catch((e) => {
        // Do nothing
        console.log(e);
        return null;
      });
  };

  shortCheckBureau = () => {
    Session.getInstance().setCodeBureau(this.bureauCode);
    Session.getInstance().setNomBureauDouane(this.bureau);
  };

  shortCheckArrondissement = () => {
    Session.getInstance().setCodeArrondissement(this.arrondissementCode);
    Session.getInstance().setLibelleArrondissement(this.arrondissement);
  };

  shortCheckProfiles = async () => {
    console.log('3) PROFILE START');
    return await HabProfileApi.confirmConnexion(
      this.bureauCode,
      this.profiles,
      this.arrondissementCode,
    )
      .then((response) => {
        const data = response.data.jsonVO;
        if (data) {
          console.log('3) PROFILE END');
          Session.getInstance().setProfiles(this.profiles);
          this.doAsyncStorageOperations(data);
        } else {
          return null;
        }
      })
      .catch((e) => {
        console.log(e);
        return null;
      });
  };

  doAsyncStorageOperations = (data) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>> saving features...');
    console.log(data);
    /** Saving the listFonctionnaliteVOs for menu usage */
    saveStringified('listFonctionnaliteVOs', data.listFonctionnaliteVOs).then(
      () => data.listFonctionnaliteVOs,
    );

    const user = {
      login: data.codeAgent,
      nomAgent: data.nomAgent,
      prenomAgent: data.prenomAgent,
      codeUOR: data.codeUOR,
    };

    Session.getInstance().setUserObject(user);
    /** Saving user information in the local storage */
    saveStringified('user', user).then(() => user);
  };
}
