export default {
    referentiel: {
        operateursEconomiques: {
            core: {
                operateur: 'Opérateur (Raison Sociale)',
                motifBlocage: 'Motif de blocage',
                typeBlocage: 'Type de blocage',
                dateDebut: 'Date de début',
                dateFin: 'Date de fin',
                heureDebut: 'Heure de début',
                heureFin: 'Heure de fin',
                commentaire: 'Commentaire',
                regimesABloquer: 'Régimes par rôles à bloquer',
            },
            search: {
                operateur: 'Opérateur (Raison Sociale)',
                afficherBlocagesInvalides: 'Afficher les blocages invalidés aussi ?',
                table: {
                    idBlocage: 'Identifiant du blocage',
                    operateur: 'Raison sociale de l\'opérateur',
                    acteurBloquant: 'Agent initiateur du blocage',
                    acteurDebloquant: 'Agent initiateur du déblocage',
                    dateDebut: 'Date d\'effet du blocage',
                    dateFin: 'Date de fin d\'effet du blocage',
                    debloquer: 'Débloquer',
                },
            },
            bloquerOperateur: {
                title: 'Blocage des opérateurs',
                tabs: {
                    ajouter: 'Ajouter',
                    modifier: 'Modifier',
                    services: 'Services',
                },
            },
            debloquerOperateur: {
                title: 'Déblocage des opérateurs',
            },
        },
    },
};
