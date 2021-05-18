import React, { useState } from "react";
import '../App.css';
import firebase from '../firebase'
import { Button, Modal, Header, Icon } from 'semantic-ui-react'

export default function Upload(props) {

  const [ selectedFile, setSelectedFile ] = useState(null);
  const [visible, setVisible] = useState(props.visible);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  //const [url, setUrl] = useState(null);

  const fileEventHandler = (event) => {
     setSelectedFile(event.target.files[0])
     console.log(event.target.files[0])
     };

  const fileUploadHandler = () => {
    if( !selectedFile ){
      window.alert("Please select a file!");
    }else{
      let bucketName = 'files'
      const collectionRef = firebase.firestore().collection('images');
      let storageRef = firebase.storage().ref(`${bucketName}/${selectedFile.name}`)
      let uploadFile = storageRef.put(selectedFile)
      uploadFile.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          let percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes )* 100);
          setProgress(percentage);
          console.log(progress);
        },
        (err) => {
            setError(err);
            console.log(error);
        },
        () => {
          // let downloadUrl = uploadFile.snapshot.downloadUrl;
          // setUrl(downloadUrl);
          // console.log(url);
          let storageRef = firebase.storage().ref()
          let spaceRef = storageRef.child('files/'+selectedFile.name)
          let collectionRef = firebase.firestore().collection('files')
          spaceRef.getDownloadURL().then((url) => {
            let createdAt=Date.now();
            collectionRef.add({url,createdAt})
           // setUrl(url)
          console.log(url)
        })
    });
  }}

  return (
    <div >
      <Modal
        basic
        onClose={() => setVisible(false)}
        onOpen={() => setVisible(true)}
        open={visible}
        size='small'
        >
      <Header icon>
        <Icon name='upload' />
        Upload File
      </Header>
      <Modal.Content>
        <input type="file" onChange={fileEventHandler} />
          <Button 
          style={{marginRight: "10px"}}
          color='green' 
          inverted 
          compact
          onClick={fileUploadHandler}>
          Upload
          </Button>
          <div className="progress-bar" style={{width: (progress/4) + '%'}}></div>
      </Modal.Content>
      <Modal.Actions>
        <Button 
        basic 
        color='red' 
        inverted 
        onClick={props.changeVisible}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button 
        color='green' 
        inverted 
        onClick={props.changeVisible}>
          <Icon name='checkmark' /> Done
        </Button>
      </Modal.Actions>
    </Modal>
    </div>
  );
}
