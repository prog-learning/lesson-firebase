import React from 'react';
import firebase from '.';

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  // ログインチェック
  React.useEffect(() => {
    authObserve();
    console.log(user);
  }, []);

  /* ログイン状態の監視 */
  const authObserve = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        // ログインしている場合は user にユーザーデータが入る
        setUser(user);
      } else {
        // ログインしていない場合は user は null
        console.log('ログインしていません');
      }
    });
  };

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};
