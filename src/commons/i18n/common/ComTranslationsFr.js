export default {
  menu: {
    arrondissement: 'Arrondissement : ',
    bureau: 'Bureau : ',
    logout_in_progress: 'Chargement...',
    logout: 'Se déconnecter',
    change_profile: 'Changer les profils',
  },
  geo: {
    notgranted:
      'Vous ne possédez pas une permission relative à la géolocalisation.',
    error: "Le processus de géolocalisation n'a pas pu être terminé.",
  },
  errors: {
    technicalIssue: "Erreur technique, contactez l''administratteur",
    donneeObligatoire: 'la saisie du champ "{{champ}}" est obligatoire !',
    cleNotValid: 'Vérifiez la référence de votre déclaration ({{cle}})',
    maxNombreScelle: 'Le maximum des scellés generés est 100',
    numScelleInferieur:
      'Le premier numéro de scellé du générateur doit être inférieur au dernier. ',
    numScelleLongueur:
      'Le nombre de scellé doit être numérique et de longueur 8! ',
    numScelleExisteDeja: 'Le nombre de scellé existe déjà',
    autoCompleteErr: 'Erreur lors du chargement du composant autocomplete',
    noConnxTitle: 'Pas de connexion internet',
    noConnxContent:
      'veuillez vérifier votre connexion Internet et essayer à nouveau',
    alertErrorTitle: 'Unexpected error occurred',
    alertErrorContent:
      'We have captured this issue and it will be fixed in next release. Sorry for this inconvenient.',
  },
  info: {
    pleasewait: 'Veuillez pateinter...',
    welcome:
      'Nam ac tincidunt augue. Curabitur ultricies imperdiet nunc sed finibus. Praesent non semper tellus. Phasellus sagittis felis a dignissim pulvinar. Donec varius ornare malesuada. Vivamus euismod, ex nec mollis finibus, mauris metus porttitor turpis, vel fringilla dui turpis vel eros. Mauris vehicula et ante non elementum. Aliquam eget posuere enim. Sed eget lobortis eros, efficitur finibus augue.',
    smsVerify: {
      confirmConnexionPending:
        'Confirmation de la connexion avec le profil : [ALLPROFIL]',
    },
  },
  components: {
    crud: {
      addNewItem: 'Ajouter',
    },
    pickerchecker: {
      default_value: 'Choisissez une valeur',
      selected: 'Sélectionnés',
      delete_all: 'Supprimer tous',
      search: 'Rechercher...',
      submit: 'Valider',
    },
    progressbar: {
      loading: 'Chargement en cours...',
    },
    detailPlaque: {
      typeProprietaire: 'Type propriétaire',
      typeIdentifiant: 'Type identifiant',
      identifiant: 'Identifiant',
      nomRS: 'Nom ou raison sociale',
      prenom: 'Prénom',
      adresse: 'Adresse',
      ville: 'Ville',
      nChassis: 'N° chassis',
      nImmNormale: 'N° Immatriculation normale',
      nImmDiplomatique: 'N° Immatriculation diplomatique',
      vehiculeCodeTypeImmatDiplo: 'Type Immatriculation diplomatique',
      nImmremorque: 'N° Immatriculation remorque',
      nImmAntetieur: 'N° Immatriculation antétieur',
      typeUsage: 'Type usage',
      genre: 'Genre',
      marque: 'Marque',
      TypeVehicule: ' Type véhicule',
      puissanceFiscale: 'Puissance fiscale',
      TypeCarburant: 'Type carburant',
      poidsVide: 'Poids vide',
      poidsCharge: 'Poids chargé',
      dateMiseCirculation: 'Date de la 1ère mise en circulation',
      dateMiseCirculatioM: 'Date de mise en circulation au Maroc',
      dateMutation: 'Date de mutation',
      dataDepot: 'Date de dépot',
    },
  },
  transverse: {
    anonymoususer: 'Anonymous',
    inprogress: 'Veuillez patienter...',
    returnToLiauidqtion: 'Retourner à la liquidation...',
    consulterArticlesFromLiquidation: 'consulterles articles à partir de la iquidation...',
    bureau: 'Bureau',
    regime: 'Régime',
    annee: 'Année',
    serie: 'Série',
    numero: 'Numéro',
    cle: 'Clé',
    nVoyage: 'n°Voy',
    version: 'Version',
    dateCreation: 'Date de création',
    dateEnregistrement: "Date d'enregistrement",
    decision: 'Décision de Séléctivité',
    amp: 'Immatriculation AMP',
    ec: 'Immatriculation EC',
    tryptique: 'Immatriculation Tryptique',
    type: 'Type',
    Ok: 'Ok',
    autre: 'Autre',
    ajouter: 'Ajouter',
    confirmer: 'Confirmer',
    valider: 'Valider',
    retablir: 'Rétablir',
    sauvegarder: 'Sauvegarder',
    enregistrer: 'Enregistrer',
    annuler: 'Annuler',
    quitter: 'Quitter',
    fermer: 'Fermer',
    back: 'Back',
    abandonner: 'Abandonner',
    supprimer: 'Supprimer',
    rechercher: 'Rechercher',
    nouveau: 'Nouveau',
    du: 'Du',
    au: 'Au',
    noRowFound: 'Aucun enregistrement trouvé.',
    listDeclaration: 'Liste Declaclartion',
    declarations: 'Déclarations',
    declaration: 'Déclaration',
    poidsBrut: 'Poids brut',
    poidsNet: 'Poids net',
    refDS: 'Référence DS',
    typeDS: 'Type DS',
    nbreContenant: 'Nbre contenant',
    bad: 'BAD',
    total: 'Total',
    lieuChargement: 'Lieu de chargement',
    referenceLot: 'Référence Lot',
    nature: 'Nature',
    totalEnregistrements: "Nombre d'enregistrements : ",
    qte: 'Quantité',
    reference: 'Réference',
    libRegime: 'Libellé du régime',
    suppressionTitre: 'Suppression',
    supprimerLigne: 'Voulez-vous supprimer cet élément?',
    choix: 'Choix',
  },
  qr: {
    at_invalide:
      "QR Code invalide merci de vérifier l'AT en saisissant sa référence",
  },
  tabs: {
    entete: 'Entete',
    composant: 'Composants AT',
    apurement: 'Apurement',
    docAnnexe: 'Documents Annexes',
    historique: 'Historique',
    connaissements: 'Connaissements',
    declarationDetail: 'Déclaration en Détail',
    etatChargement: 'Etat de chargement',
    apurement: 'Apurement',
    resultScanner: 'Résultat scanner',
    info: 'Info',
    vumEmb: {
      rechByRef: 'Reference declaration',
      rechDecByRef: 'Recherche d\'une déclaration en détail par référence',
      rechByVH: 'Matricule vehicule',
    },
  },
};
