import React from 'react';
import firebase from '../src/firebase';

const FirestorePage = () => {
  /* 入力フォームの値 */
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');

  /* 取得したfirestoreの値を入れる場所 */
  const [messages, setMessages] = React.useState([]);

  /**
   * データの書き込み
   */

  /* 追加（ランダムなdocIdで） */
  const add = () => {
    firebase.firestore().collection('collection_name').add({
      name,
      content: message,
      sendAt: firebase.firestore.FieldValue.serverTimestamp(), // Firestoreで時間を保存してくれる
    });
  };

  /* 書き換え */
  const replace = () => {
    firebase
      .firestore()
      .collection('collection_name')
      .doc('書き換えたいdocのid')
      .set({
        name: '書き換え大好き魔神',
        content: '書き換えられたメッセージ',
        sendAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };
  // docIdが存在する場合は書き換わり,存在しない場合は新たに追加される
  // set()の中身に書き換わるので注意

  /* 指定箇所のみ更新 */
  const update = () => {
    firebase
      .firestore()
      .collection('collection_name')
      .doc('書き換えたいdocのid')
      .update({
        // その場所だけ書き換える
        content: 'メッセージだけ書き換えました',
      });
  };

  /* 追加（ランダムなdocIdでかつ,そのdocIdを使いたい） */
  const addsaveId = () => {
    const ref = firebase.firestore().collection('collection_name').doc(); // ランダムIDをもつRefを作成
    ref.set({
      id: ref.id,
      name,
      content: message,
      sendAt: firebase.firestore.FieldValue.serverTimestamp(), // Firestoreで時間を保存してくれる
    });
  };

  /* 削除 */
  const remove = () => {
    firebase
      .firestore()
      .collection('collection_name')
      .doc('消したいdocのid')
      .delete();
  };

  /**
   * データの取得
   */

  /* then で書く場合 */
  const getByThen = () => {
    firebase
      .firestore()
      .collection('collection_name')
      .get()
      .then((snapshot) => {
        const docs = snapshot.docs.map((doc) => doc.data());
        setMessages(docs);
      });
  };

  /* async / await で書く場合 */
  const getByAwait = async () => {
    const snapshot = await firebase
      .firestore()
      .collection('collection_name')
      .get();
    const data = snapshot.docs.map((doc) => doc.data());
    setMessages(data);
  };

  /* データを取得して監視 */
  const observe = async () => {
    firebase
      .firestore()
      .collection('collectionA')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setMessages(data);
      });
  };

  return (
    <div>
      <h1>Firebase Firestore</h1>
      <div>ここに入力した値を保存</div>
      <div>名前</div>
      <input type='text' onChange={(e) => setName(e.target.value)} />
      <br />
      <div>メッセージ</div>
      <textarea
        type='text'
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <br />
      <button onClick={add}>追加</button>
      <button onClick={addsaveId}>追加(IDも保存)</button>
      <button onClick={replace}>置き換え</button>
      <button onClick={update}>更新</button>
      <button onClick={remove}>削除</button>

      <button onClick={getByAwait}>取得</button>
      {/* <button onClick={fetchData}>APIで取得</button> */}
      <button onClick={observe}>監視</button>
      {messages.map((messages, index) => (
        <div key={index}>
          <hr />
          <p>名前：{messages.name}</p>
          <p>内容：{messages.content}</p>
          <p>時間：{Date(messages.sendAt)}</p>
        </div>
      ))}
      <hr />
    </div>
  );
};

export default FirestorePage;

/* Firestoreのデータ構造 */

// collection
// これらは配列だが,docIdというものが割り振られていて必要なデータだけ呼び出すことも可能
[
  {
    dataA: 'string',
    dataB: 123,
    dataC: ['el1', 'el2'],
    dataD: true,
  },
  {
    dataA: 'string',
    dataB: 123,
    dataC: ['el1', 'el2'],
    dataD: true,
  },
  {
    dataA: 'string',
    dataB: 123,
    dataC: ['el1', 'el2'],
    dataD: true,
  },
];
