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
var twilio = require('twilio');

const TWILIO_FROM_PHONENUMBER = process.env.TWILIO_FROM_PHONENUMBER;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
var client = new twilio(TWILIO_ACCOUNT_SID.toString(), TWILIO_AUTH_TOKEN.toString());

exports.twilioWhatsApp = functions.firestore
    .document(`${process.env.WA_COLLECTION}/{messageID}`)
    .onCreate((snap, context) => {
        const new_document = snap.data();

        console.log({
            from: TWILIO_FROM_PHONENUMBER,
            to: new_document.to,
            body: new_document.message
        });
        return client.messages.create({
                body: new_document.message,
                to: `whatsapp:${new_document.to}`, // Text this number
                from: `whatsapp:${TWILIO_FROM_PHONENUMBER}` // From a valid Twilio number
            })
            .then((message) => {
                return admin.firestore().runTransaction((transaction) => {
                    transaction.update(snap.ref, {
                        delivery: "SENT",
                        status: message
                    });
                    return Promise.resolve();
                });
            }).catch((E) => {
                return admin.firestore().runTransaction((transaction) => {
                    transaction.update(snap.ref, {
                        delivery: "ERROR"
                    });
                    return Promise.resolve();
                });
            });


        // perform desired operations ...
    });