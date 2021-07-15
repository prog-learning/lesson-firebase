import React, { useState } from 'react';
import { storage } from '../src/firebase';

const Storage = () => {
  /* ブラウザにアップロードした際の入れ物 */
  const [files, setFiles] = useState();
  /* 取得した画像のURLを保存する場所 */
  const [imageUrl, setImageUrl] = useState();

  /* 画像の保存 */
  const upload = async () => {
    const storageRef = storage.ref().child(`test_folder_name/${files[0].name}`);
    await storageRef.put(files[0]);
  };

  /* 画像の取得 */
  const get = async () => {
    const storageRef = storage.ref(`sunoko`);
    const url = await storageRef.getDownloadURL();
    setImageUrl(url);
  };

  /* 進行状況を確認しながら画像の保存 */
  const statementUpload = async () => {
    const storageRef = storage.ref().child(`test_folder_name/${files[0].name}`);
    const upload = storageRef.put(files[0]); // await で書けない
    upload.on(
      'state_changed',
      (snapshot) => {
        /* 進行中のcallback */
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('snapshot.state: ' + snapshot.state);
        console.log(progress + '%...');
      },
      (error) => {
        /* 失敗時のcallback */
        console.log('アップロードに失敗しました', error);
      },
      () => {
        /* 完了時のcallback */
        console.log('アップロードが完了しました!!');
      }
    );
  };

  console.log(files);
  console.log(imageUrl);
  return (
    <div>
      <h1>Firebase Storage</h1>
      <input type='file' onChange={(e) => setFiles(e.target.files)} />
      <button onClick={upload}>upload</button>
      <button onClick={get}>get</button>
      <button onClick={statementUpload}>statementUpload</button>
      <br />
      <img src={imageUrl} width={200} />
    </div>
  );
};

export default Storage;
