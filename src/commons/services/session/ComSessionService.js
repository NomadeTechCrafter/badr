/**
  InMemory session obtained as a singleton way
 */
export class ComSessionService {
  static myInstance = null;

  login = '';
  password = '';
  codeSmsVerify = '';
  typeUser='';
  codeBureau = '';
  nomBureauDouane = '';
  libelleArrondissement = '';
  codeArrondissement = '';
  profiles = [];
  geoCoords;
  fonctionalite = '';
  modeConsultation = '';
  operateur='';
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
  sessionIdBO = '';
  /**
    @returns { login | nomAgent │ prenomAgent | codeUOR }
   */
  userObject = {};

  /**
   * @returns {ComSessionService}
   */
  static getInstance() {
    if (ComSessionService.myInstance === null) {
      ComSessionService.myInstance = new ComSessionService();
    }
    return this.myInstance;
  }

  getLogin() {
    return this.login;
  }
  getOperateur() {
    return this.operateur;
  }
  getTypeUser() {
      return this.typeUser;
    }
  setLogin(login) {
    this.login = login;
  }
  setOperateur(operateur) {
    this.operateur = operateur;
  }
    setTypeUser(typeUser) {
      this.typeUser = typeUser;
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

  getSessionIdBO() {
    return this.sessionIdBO;
  }
  setSessionIdBO(sessionIdBO) {
    this.sessionIdBO = sessionIdBO;
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

  getFonctionalite() {
    return this.fonctionalite;
  }

  setFonctionalite(fonctionalite) {
    this.fonctionalite = fonctionalite;
  }

  getModeConsultation() {
    return this.modeConsultation;
  }

  setModeConsultation(modeConsultation) {
    this.modeConsultation = modeConsultation;
  }
}
