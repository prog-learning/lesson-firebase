import { AuthProvider } from '../src/firebase/Auth';
import Link from 'next/link';
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <h1>Lesson Firebase</h1>
      <hr />
      <Component {...pageProps} />
      <hr />
      <Link href='/'>
        <a>Topへ戻る</a>
      </Link>
    </AuthProvider>
  );
}

export default MyApp;
