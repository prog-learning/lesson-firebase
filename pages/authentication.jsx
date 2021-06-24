import React from 'react';
import firebase from '../src/firebase';
import { AuthProvider, AuthContext } from '../src/firebase/Auth';
import Link from 'next/link';

const AuthenticationPage = () => {
  const [user, setUser] = React.useContext(AuthContext);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  /* ログイン状態の確認 */
  const userCheck = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      // ログインしている場合は user にユーザーデータが入る
      console.log(user);
    });
  };

  /* Email でアカウントの作成 */
  const signupEmail = async () => {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    // 作成後,自動でログインされる
    console.log(userCredential);
    setUser(userCredential.user);
  };
  /* Email でログイン */
  const signinEmail = async () => {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log(userCredential);
    setUser(userCredential.user);
  };

  /* Google でログイン */
  const signinGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const userCredential = await firebase.auth().signInWithPopup(provider);
    console.log(userCredential);
    setUser(userCredential.user);
  };

  /* GitHub でログイン */
  const signinGitHub = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    const userCredential = await firebase.auth().signInWithPopup(provider);
    console.log(userCredential);
    setUser(userCredential.user);
    /* EmailでのアカウントとGitHubのアカウントに重複があると負荷 */
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
      alert('ログアウトしました');
    } catch (error) {
      alert(`ログアウトに失敗しました\nERROR: ${error}`);
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      <hr />
      <div>アカウントを作成</div>
      <button onClick={userCheck}>ログイン状態の確認</button>
      <br />
      <label htmlFor='email'>Email: </label>
      <input id='email' type='email' onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label htmlFor='password'>Password: </label>
      <input id='password' type='password' onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={signupEmail}>入力したEmailとPasswordでアカウント作成</button>
      <br />
      <button onClick={signinEmail}>入力したEmailとPasswordでログイン</button>
      <br />
      <div>その他のアカウントでログイン</div>
      <button onClick={signinGoogle}>Googleアカウントでログイン</button>
      <br />
      <button onClick={signinGitHub}>GitHubアカウントでログイン</button>
      <br />
      <Link href='/mypage'>
        <a>ログインしている場合だけ見れるページへ</a>
      </Link>
      <br />
      <button onClick={logout}>ログアウト</button>
    </div>
  );
};

export default AuthenticationPage;
