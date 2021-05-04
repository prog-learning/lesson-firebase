import React from 'react';
import firebase from '../firebase';

const FirestorePage = () => {
  const [state, setState] = React.useState();
  const [onChange, setOnChange] = React.useState();
  const [stateArray, setStateArray] = React.useState([]);

  /* then で書く場合 */
  const getByThen = () => {
    firebase.firestore().collection('collection_name').get().then((snapshot) => {
      const docs = snapshot.docs.map((doc) => doc.data());
      setStateArray(docs);
    });
  };

  /* async / await で書く場合 */
  const getByAwait = async () => {
    const snapshot = await firebase.firestore().collection('collection_name').get();
    const docs = snapshot.docs.map((doc) => doc.data());
    setStateArray(docs);
  };

  const saveByAwait = async () => {
    const result = await firebase.firestore().collection('collection_name').add({
      title: '新しく追加されたデータ',
      content: {
        value: onChange,
        string: '文字列',
        nunber: 123,
        boolean: false,
        inArray: ['value1', 'value2', 'value3', 'value4']
      },
      array: ['value1', 'value2', 'value3', 'value4'],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log(result.id);
  };
  const saveByThen = () => {
    firebase.firestore().collection('collection_name').add({
      title: '新しく追加されたデータ',
      content: {
        value: onChange,
        string: '文字列',
        nunber: 123,
        boolean: false,
        inArray: ['value1', 'value2', 'value3', 'value4']
      },
      array: ['value1', 'value2', 'value3', 'value4'],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then((result) => {
      console.log(result.id);
    });
  };
  console.log(stateArray);
  const fts = stateArray[0]?.createdAt;
  console.log(Date(fts.seconds));
  return (
    <div>
      <div>ここに入力した値を保存</div>
      <input type="text" onChange={e => setOnChange(e.target.value)} />
      <br />
      <button onClick={saveByAwait}>保存</button>
      <button onClick={getByThen}>取得</button>
    </div>
  );
};

export default FirestorePage;
