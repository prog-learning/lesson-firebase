import firebase from '../../firebase';

export default async (res, req) => {
  console.log('取得します！');
  const snapshot = await firebase.firestore().collection('collection_name').get();
  const docs = snapshot.docs.map((doc) => doc.data());
  res.status(200).json(docs);
};
