import app from 'firebase/app';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAn5LJ27074SKH6U8zGZWAobnBumu2e57A",
    authDomain: "cool-book-fco-project.firebaseapp.com",
    databaseURL: "https://cool-book-fco-project.firebaseio.com",
    projectId: "cool-book-fco-project",
    storageBucket: "cool-book-fco-project.appspot.com",
    messagingSenderId: "967487294319",
    appId: "1:967487294319:web:1a63f3efaca5d6a1df769a",
    measurementId: "G-E6BM8T3PX3"
};

class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig);

      this.storage = app.storage();
    }
  }
  export default Firebase;

