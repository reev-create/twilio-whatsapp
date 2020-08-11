/*
 * This template contains a HTTP function that responds with a greeting when called
 *
 * Always use the FUNCTIONS HANDLER NAMESPACE
 * when writing Cloud Functions for extensions.
 * Learn more about the handler namespace in the docs
 *
 * Reference PARAMETERS in your functions code with:
 * `process.env.<parameter-name>`
 * Learn more about parameters in the docs
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.twilioWhatsApp = functions.firestore
    .document(`${process.env.WA_COLLECTION}/{messageID}`)
    .onCreate((snap, context) => {
        const new_document = snap.data();
        const TWILIO_FROM_PHONENUMBER = process.env.TWILIO_FROM_PHONENUMBER;
        const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
        const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

        console.log({
            from: TWILIO_FROM_PHONENUMBER,
            to: new_document.To,
            body: new_document.body
        });

        // perform desired operations ...
    });