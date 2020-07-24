/**
  InMemory session obtained as a singleton way
 */
export class Session {
  static myInstance = null;

  _login = '';
  _codeBureau = '';
  _nomBureauDouane = '';
  _libelleArrondissement = '';
  _codeArrondissement = '';
  _profiles = [];

  /**
    Device information
   */
  _deviceId = '';
  _deviceName = '';
  _model = '';
  _manufacturer = '';
  _systemVersion = '';

  /**
    session
   */

  _sessionId = '';

  /**
    @returns { login | nomAgent │ prenomAgent | codeUOR }
   */
  _userObject = {};

  /**
   * @returns {Session}
   */
  static getInstance() {
    if (Session.myInstance === null) {
      Session.myInstance = new Session();
    }
    console.log(`this.myInstance ===== ${this.myInstance}`);
    return this.myInstance;
  }

  getLogin() {
    return this._login;
  }

  setLogin(login) {
    this._login = login;
  }

  getSessionId(withKey) {
    return withKey ? 'JSESSIONID=' + this._sessionId : this._sessionId;
  }

  setSessionId(sessionId) {
    this._sessionId = sessionId;
  }

  getCodeBureau() {
    return this._codeBureau;
  }

  setCodeBureau(codeBureau) {
    this._codeBureau = codeBureau;
  }

  getNomBureauDouane() {
    return this._nomBureauDouane;
  }

  setNomBureauDouane(nomBureauDouane) {
    this._nomBureauDouane = nomBureauDouane;
  }

  getCodeArrondissement() {
    return this._codeArrondissement;
  }

  setCodeArrondissement(codeArrondissement) {
    this._codeArrondissement = codeArrondissement;
  }

  getLibelleArrondissement() {
    return this._libelleArrondissement;
  }
  setLibelleArrondissement(libelleArrondissement) {
    this._libelleArrondissement = libelleArrondissement;
  }

  getProfiles() {
    return this._profiles;
  }

  setProfiles(profiles) {
    this._profiles = profiles;
  }

  getUserObject() {
    return this._userObject;
  }

  setUserObject(userObject) {
    this._userObject = userObject;
  }

  getDeviceId() {
    return this._deviceId;
  }

  setDeviceId(deviceId) {
    this._deviceId = deviceId;
  }

  getManufacturer() {
    return this._manufacturer;
  }

  setManufacturer(manufacturer) {
    this._manufacturer = manufacturer;
  }

  getModel() {
    return this._model;
  }

  setModel(model) {
    this._model = model;
  }

  getSystemVersion() {
    return this._systemVersion;
  }

  setSystemVersion(systemVersion) {
    this._systemVersion = systemVersion;
  }

  getDeviceName() {
    return this._deviceName;
  }

  setDeviceName(deviceName) {
    this._deviceName = deviceName;
  }
}
