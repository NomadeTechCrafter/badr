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
    @returns { login | nomAgent │ prenomAgent | codeUOR }
   */
  _userObject = {};

  /**
   * @returns {Session}
   */
  static getInstance() {
    if (Session.myInstance == null) {
      Session.myInstance = new Session();
    }

    return this.myInstance;
  }

  getLogin() {
    return this._login;
  }

  setLogin(login) {
    this._login = login;
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
}
