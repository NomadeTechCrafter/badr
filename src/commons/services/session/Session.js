/**
  InMemory session obtained as a singleton way
 */
export class Session {
  static myInstance = null;

  login = '';
  password = '';
  codeSmsVerify = '';
  codeBureau = '';
  nomBureauDouane = '';
  libelleArrondissement = '';
  codeArrondissement = '';
  profiles = [];
  geoCoords;

  /**
    Device information
   */
  deviceId = '';
  deviceName = '';
  model = '';
  manufacturer = '';
  systemVersion = '';
  platform = '';

  /**
    session
   */

  sessionId = '';

  /**
    @returns { login | nomAgent │ prenomAgent | codeUOR }
   */
  userObject = {};

  /**
   * @returns {Session}
   */
  static getInstance() {
    if (Session.myInstance === null) {
      Session.myInstance = new Session();
    }
    return this.myInstance;
  }

  getLogin() {
    return this.login;
  }

  setLogin(login) {
    this.login = login;
  }

  getGeoCoords() {
    return this.geoCoords;
  }

  setGeoCoords(geoCoords) {
    this.geoCoords = geoCoords;
  }


  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }

  getCodeSmsVerify() {
    return this.codeSmsVerify;
  }

  setCodeSmsVerify(codeSmsVerify) {
    this.codeSmsVerify = codeSmsVerify;
  }

  getSessionId(withKey) {
    return withKey ? 'JSESSIONID=' + this.sessionId : this.sessionId;
  }

  setSessionId(sessionId) {
    this.sessionId = sessionId;
  }

  getCodeBureau() {
    return this.codeBureau;
  }

  setCodeBureau(codeBureau) {
    this.codeBureau = codeBureau;
  }

  getNomBureauDouane() {
    return this.nomBureauDouane;
  }

  setNomBureauDouane(nomBureauDouane) {
    this.nomBureauDouane = nomBureauDouane;
  }

  getCodeArrondissement() {
    return this.codeArrondissement;
  }

  setCodeArrondissement(codeArrondissement) {
    this.codeArrondissement = codeArrondissement;
  }

  getLibelleArrondissement() {
    return this.libelleArrondissement;
  }
  setLibelleArrondissement(libelleArrondissement) {
    this.libelleArrondissement = libelleArrondissement;
  }

  getProfiles() {
    return this.profiles;
  }

  setProfiles(profiles) {
    this.profiles = profiles;
  }

  getUserObject() {
    return this.userObject;
  }

  setUserObject(userObject) {
    this.userObject = userObject;
  }

  getDeviceId() {
    return this.deviceId;
  }

  setDeviceId(deviceId) {
    this.deviceId = deviceId;
  }

  getManufacturer() {
    return this.manufacturer;
  }

  setManufacturer(manufacturer) {
    this.manufacturer = manufacturer;
  }

  getModel() {
    return this.model;
  }

  setModel(model) {
    this.model = model;
  }

  getSystemVersion() {
    return this.systemVersion;
  }

  setSystemVersion(systemVersion) {
    this.systemVersion = systemVersion;
  }

  getDeviceName() {
    return this.deviceName;
  }

  setDeviceName(deviceName) {
    this.deviceName = deviceName;
  }


  getPlatform() {
    return this.platform;
  }

  setPlatform(platform) {
    this.platform = platform;
  }


}
