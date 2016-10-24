'use strict';

const $ = require('jquery');
const firebase = require('firebase');

require('./config.js');
const Form = require('./form.js');

const auth = firebase.auth();

class Session {

    check () {

        auth.onAuthStateChanged(function(user) {
            if (user) {

                const queuepage = '/queue.html';

                if (document.location.pathname !== queuepage) {

                    document.location.href = '/queue.html';
                }
            } else {

                const authpage = '/';

                if (document.location.pathname !== authpage) {

                    document.location.href = '/';
                }
            }
        });
    }

    signIn (email, password) {

        auth.signInWithEmailAndPassword(email, password).catch( (error) => {

            this.signInError(error);
        });
    }

    signInError (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {

            Form.showError('.js-auth-form-password-wrapper', '.js-mdl-textfield-error', errorMessage);
        } else {

            Form.showError('.js-auth-form-email-wrapper', '.js-mdl-textfield-error', errorMessage);
        }
    }

    logout () {

        auth.signOut().then( () => {

            this.check();
        });
    }
}

module.exports = new Session();
