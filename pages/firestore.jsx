import React from 'react';
import firebase from '../firebase';

const FirestorePage = () => {
  const [state, setState] = React.useState();
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
  const save = () => {
    firestore.firestore().collection('collection_name').add(state);
  };
  console.log(stateArray);
  return (
    <div>
      <button onClick={getByThen}>取得</button>
      <button onClick={save}>保存</button>
    </div>
  );
};

export default FirestorePage;
