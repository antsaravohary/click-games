

export const status_exchange: any = {
    pending: {
        label: "En attente",
        text: "En attente de validation ",
        value: 1,
    },
    confirmed: {
        label: "Echange validée",
        text: "En attente d'éxpedition ",
        value: 2,
    },
    send_dispached: {
        label: "Expedié",
        text: "Colis en cours d'envoie ...",
        value: 3,
    },
    checking: {
        label: "colis réçu",
        text: "En atttente de verification",
        value: 4,
    },
    checked: {
        label: "produit validée",
        text: "En attente de paiement",
        value: 5
    },

    paid: {
        label: "Produit payée",
        text: "Colis en preparation d'envoie",
        value: 6,
    },
    return_dispatched: {
        label: "expedié",
        text: "Colis en cours d'envoie ...",
        value: 7,
    },
    cancelled: {
        label: "Annuler",
        text: "Echanger annuler par l'utilisateur",
        value: 8,
    }
    , total: 8
}
