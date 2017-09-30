
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

        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
     
        firebase.auth().signInWithPopup(provider).then(function(result) {
         // This gives you a Google Access Token. You can use it to access the Google API.
         //var token = result.credential.accessToken;
         // The signed-in user info.
         //var user = result.user;
         // ...
       }).catch(function(error) {
         // Handle Errors here.
         //var errorCode = error.code;
         //var errorMessage = error.message;
         // The email of the user's account used.
         //var email = error.email;
         // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
         // ...
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
    update(location, item, callback) {
        console.log("object to update",item)
        const databaseRefPut = firebase.database().ref(location);
        databaseRefPut.set(item).then(value => {
            callback(value);
            console.log("should update,"+location);
        });
    },
    put(location, object, callback) {
        const databaseRefPut = firebase.database().ref(location);
        databaseRefPut.push(object).then(value => {
            callback(value.key);
            console.log("should save object", value.key);
        }).catch(value => {
            console.log("foutje");
            callback(null);
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