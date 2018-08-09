import * as firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyB7zJNPCboFOG0kM1HddasSrAYTMF17K-A',
  authDomain: 'cwtest-4381a.firebaseapp.com',
  databaseURL: 'https://cwtest-4381a.firebaseio.com',
  projectId: 'cwtest-4381a',
  storageBucket: 'cwtest-4381a.appspot.com',
  messagingSenderId: '376196344294'
}
var fire = firebase.initializeApp(config)
export default fire
