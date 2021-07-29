import React, { useState } from 'react';
import { storage } from '../src/firebase';

const Storage = () => {
  /* ブラウザにアップロードした際の入れ物 */
  const [files, setFiles] = useState([]);

  /* 取得した画像のURLを保存する場所 */
  const [imageUrl, setImageUrl] = useState();

  /* 画像の保存 */
  const upload = async () => {
    const storageRef = storage.ref().child(`test_folder_name/${files[0].name}`);
    await storageRef.put(files[0]);
  };

  /* 画像URLの取得 */
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

  /* # 複数ファイルを処理する場合 */

  /* ブラウザにアップロードした際の入れ物 */
  const [multiFiles, setMultiFiles] = useState([]);

  /* 取得した画像のURLを保存する場所 */
  const [imageUrls, setImageUrls] = useState([]);

  /* 複数ファイルをStateに保存する */
  const handleChange = (e) => {
    e.preventDefault();
    setMultiFiles(e.target.files);
  };

  /* 複数画像の一括保存 */
  const multiUpload = async () => {
    for (let i = 0; i < multiFiles.length; i++) {
      const storageRef = storage
        .ref()
        .child(`test_multi_folder_name/${multiFiles[i].name}`);
      await storageRef.put(multiFiles[i]);
    }
  };

  /* 特定のフォルダの画像URLをまとめて取得 */
  const multiGet = async () => {
    const storageRef = storage.ref().child(`test_multi_folder_name`);
    const list = await storageRef.listAll();
    const urls = await Promise.all(
      list.items.map(async (item) => {
        const url = await item.getDownloadURL();
        return url;
      })
    );
    setImageUrls(urls);
  };

  /* ローカルの画像ファイルのURLを配列で取得する関数
  （プレビュー表示に使用） */
  const createFileURL = (files) => {
    if (!process.browser || !files.length) return;
    let imageURLs = [];
    for (let i = 0; i < files.length; i++) {
      imageURLs.push(window.URL.createObjectURL(files[i]));
    }
    /* ※forEach も map も 使えないのでfor文*/
    return imageURLs;
  };

  return (
    <div>
      <h1>Firebase Storage</h1>
      <h2>1つのファイルに関する処理</h2>
      {files[0] && (
        <div>
          <p>《アップロード画像のプレビュー》</p>
          {createFileURL(files).map((url, index) => (
            <img key={index} src={url} alt='preview' width={200} />
          ))}
        </div>
      )}
      <input
        type='file'
        accept='image/*'
        onChange={(e) => setFiles(e.target.files)}
      />
      <button onClick={upload}>upload</button>
      <button onClick={get}>get</button>
      <button onClick={statementUpload}>statementUpload</button>
      <br />

      <p>《取得した画像》</p>
      <img src={imageUrl} width={200} />

      <hr />

      <h2>複数のファイルを処理する場合</h2>
      {multiFiles[0] && (
        <div>
          <p>《アップロード画像のプレビュー》</p>
          {createFileURL(multiFiles).map((url, index) => (
            <img key={index} src={url} alt='preview' width={200} />
          ))}
        </div>
      )}
      <input type='file' accept='image/*' multiple onChange={handleChange} />
      <button onClick={multiUpload}>multi upload</button>
      <button onClick={multiGet}>multi get</button>
      <br />
      <p>《取得した画像一覧》</p>
      {imageUrls.map((url, index) => (
        <img key={index} src={url} width={200} />
      ))}
    </div>
  );
};

export default Storage;
