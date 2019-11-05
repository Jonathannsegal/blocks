import React from 'react';
import Head from 'next/head';
import Link from 'next/link'
import { Button } from 'rsuite';
import Nav from '../components/nav'
import 'rsuite/lib/styles/index.less';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    {/* <Nav /> */}

    <div className="hero">
      <h1 className="title">Blocks</h1>
      <p className="description">
        Here is our exciting Game it is using <br />NextJS, React, and Mapbox, it is a PWA.
         <br />
        <br />
        <span>
          <Link href='https://leerob.io/blog/using-mapbox-with-next-js'>
            link to blog about how to work with mapbox
           </Link>
          <br />
          <Link href='https://git.linux.iastate.edu/fall2019-cs319-gitprojects/g40'>
            Gitlab
           </Link>
          <br />
          <Link href='https://trello.com/b/ChA7nedI/g40'>
            Trello
           </Link>
          <br />
        </span>
      </p>
      <Button appearance="primary" href="/game">
        Play Game
      </Button>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
        padding: 50px;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
    `}</style>
  </div>
);

export default Home;