/**
 * Created by Marlowe on 2/27/2017.
 */


//firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//    // Handle Errors here.
//    var errorCode = error.code;
//    var errorMessage = error.message;
//    // ...
//});
import * as firebase from 'firebase';

const FireStore = {
    init() {

    },
    signOut: function (callback) {

        firebase.auth().signOut().then(function (response) {
           //console.log('Signed Out', response);

            if (callback != null) {
                //console.log("sign in from in the function", response);
                callback(response);
            }
        }, function (error) {
            //console.error('Sign Out Error', error);
        });
    },
    login: function (credentials, callback) {

        firebase.auth().signInWithEmailAndPassword(credentials.username, credentials.password).then(function(response) {
           
            if (callback != null) {
                //console.log("sign in from in the function", response);
                callback(response);
            }
        }).catch(function (error) {
            // Handle Errors here
            console.log("error", error);
            if (callback != null) {
                //console.log("sign in from in the function", response);
                callback(error);
            }
            // ...
            });
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                window.user = user;
      
                FireStore.subscribe("Tenants/1/users/" + user.uid, value => {
                    window.user.profile = value;
                });
                // User is signed in.
            } else {
                window.user = null;
                console.log("no user logged in");
            }
        });
    },
    subscribe: function(location,callback){
        console.log("starting Request", location)
        const rootRef = firebase.database().ref(location)
        rootRef.on('value', snapShot => {
            //console.log("value from user", snapShot.val())
            if (snapShot.val() && callback != null) {
                if(typeof snapShot.val() === 'string'){
                    callback(snapShot.val())
                }else{
                    var array = createArray(snapShot.val());
                callback(array)
                }
                
            }
        });
    },
    update(location, object, callback) {
        const databaseRefPut = firebase.database().ref(location);
        databaseRefPut.update(object).then(value => {
            callback("key");
            console.log("should save object", location);
        });
    },
    put(location, object, callback) {
        const databaseRefPut = firebase.database().ref(location);
        databaseRefPut.push(object).then(value => {
            callback(true);
            console.log("should save object", location);
        }).catch(value => {
            console.log("foutje");
            callback(false);
        });


    }
}

function createArray(snapshotValue) {
    var arr = [];
    Object.keys(snapshotValue).forEach(function (key,value) {
        let item = snapshotValue[key]
        item.key = key;
        if (!item.deleted) {
            arr.push(item);
        }
    
    })

    return arr;
}

export default FireStore;