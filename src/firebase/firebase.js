import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const db = firebase.database();
export { firebase, db as default };

/*
  "accounts": {
    "ref": {
      "name": String
    }
  },
  "accountTickets": {
    "ref[account]": {
      "ref[ticket]": true
    }
  },
  "assignments": {
    "ref[ticket]": {
      "name": Boolean, ...
      "ref[user]": true
    }
  },
  "comments": {
    "ref[ticket]": {
      "1": {
        "name": String,
        "body": String,
        "timestamp": Number
      } 
    }
  },
  "contacts": {
    "ref": {
      "ref[account]": true,
      "name": String,
      "email": String,
      "number": String
    }
  },
  "contactTickets": {
    "ref[contact]": {
      "ref[ticket]": true
    }
  },
  "tickets": {
    "ref": {
      "ref[account]": true,
      "ref[comments]": true,
      "ref[contact]": true,
      "ref[ticketsByStatus]": true,
      "ref[ticketsByUrgency]": true,
      "ref[urgency]": true,
      "accountName": String,
      "contactName": String,
      "contactEmail": String,
      "contactNumber": String,
      "participatingUsers": {
        "ref[user]": true
      },
      "statusName": String,
      "urgencyName": String
      "date": Number,
      "title": String,
    }
  },
  "ticketsByStatus": {
    "open": {
      "ref[ticket]": true
    },
    "inProgress": {
      "ref[ticket]": true
    }
    "pending": {
      "ref[ticket]": true
    },
    "resolved": {
      "ref[ticket]": true
    }
  },
  "ticketsByUrgency": {
    "low": {
      "ref[ticket]": "true"
    },
    "medium": {
      "ref[ticket]": "true"
    },
    "high": {
      "ref[ticket]": "true"
    }
  },
  "unresolvedTicketsByUser": {
    "ref[user]": {
      "ref[ticket]": true
    } 
  },
  "users": {
    "ref": {
      "email": String
      "name": String,
    }
  }
*/
