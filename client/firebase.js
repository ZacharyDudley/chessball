import * as firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyBReCWwAgNu4T6uNtd4auL9hc8cFE-lXPc',
  authDomain: 'chessball-a79ba.firebaseapp.com',
  databaseURL: 'https://chessball-a79ba.firebaseio.com',
  projectId: 'chessball-a79ba',
  storageBucket: '',
  messagingSenderId: '621667083617'
}

firebase.initializeApp(config)

const database = firebase.database()
// line below enables logging for debugging
// firebase.database.enableLogging(true)
export default database
