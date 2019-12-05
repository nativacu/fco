import React, { Component } from "react";
import storage from "../Firebase/index";
import * as firebase from 'firebase/app';
import Firebase, { FirebaseContext } from '../Firebase';

class Test extends Component{
    
constructor(props) {
    super(props);
    this.state = {
      book: null,
      url: "",
      progress: 0
    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const book = e.target.files[0];
      this.setState(() => ({ book }));
    }
  };

  handleUpload = () => {
    const { book } = this.state;
    const uploadTask = firebase.storage().ref(`books/${book.name}`).put(book);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        firebase.storage()
          .ref("books")
          .child(book.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
  };
  render() {

    return (
        <FirebaseContext.Consumer>
       {firebase => {
         return <div className="center">
         <br/>
         <h2 className="green-text">React Firebase book Uploader</h2>
         <br/>
         <br/>
       <div className="row">
         <progress value={this.state.progress} max="100" className="progress" />
       </div>
       <br />
       <br />
       <br />
       <div className="file-field input-field">
         <div className="btn">
           <span>File</span>
           <input type="file"  onChange={this.handleChange} />
         </div>
         <div className="file-path-wrapper">
           <input className="file-path validate" type="text" />
         </div>
       </div>
       <button
         onClick={this.handleUpload}
         className="waves-effect waves-light btn"
       >
         Upload
       </button>
       <br />


       <br />
       <img
         src={this.state.url || "https://via.placeholder.com/400x300"}
         alt="Uploaded books"
         height="300"
         width="400"
       />
     </div>
       }}
     </FirebaseContext.Consumer>
     );
  }
}

export default Test;
