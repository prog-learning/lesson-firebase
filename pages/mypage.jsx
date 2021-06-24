import React from 'react';
import { AuthContext } from '../src/firebase/Auth';
import { useRouter } from 'next/router';

const MyPage = () => {
  const [user] = React.useContext(AuthContext);
  const { displayName, email, photoURL, uid } = user || {};
  console.log(user);

  const router = useRouter();
  React.useEffect(() => {
    !user && router.push('/authentication');
  }, []);
  return (
    <div>
      <h1>my page</h1>
      <div>ID: {uid || 'no_id'}</div>
      <div>Name: {displayName || 'no_name'}</div>
      <div>Email: {email || 'no_email'}</div>
      {photoURL ? <img src={photoURL} alt='user_image' /> : <div>no_image</div>}
    </div>
  );
};

export default MyPage;
