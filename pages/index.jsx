import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href='/authentication'>
            <a>Authentication</a>
          </Link>
        </li>
        <li>
          <Link href='/firestore'>
            <a>Firestore</a>
          </Link>
        </li>
        <li>
          <Link href='/storage'>
            <a>Storage</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
