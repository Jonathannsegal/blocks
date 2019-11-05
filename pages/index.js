// import React from 'react'
// import Head from 'next/head'
// import Nav from '../components/nav'
// import Link from 'next/link'

// const Home = () => (
//   <div>
//     <Head>
//       <title>Home</title>
//       <link rel='icon' href='/favicon.ico' />
//     </Head>

//     <Nav />

//     <div className='hero'>
//       <h1 className='title'>Blocks - Group 40</h1>
//       <p className='description'>
//         Here is our exciting Game it is using <br />NextJS, React, and Mapbox, it is a PWA.
//         <br />
//         <br />
//         <span>
//           <a href='https://leerob.io/blog/using-mapbox-with-next-js'>
//             link to blog about how to work with mapbox
//           </a>
//           <br />
//           <a href='https://git.linux.iastate.edu/fall2019-cs319-gitprojects/g40'>
//             Gitlab
//           </a>
//           <br />
//           <a href='https://trello.com/b/ChA7nedI/g40'>
//             Trello
//           </a>
//         </span>
//       </p>

//     </div>

//     <style jsx>{`
//       .hero {
//         width: 100%;
//         color: #333;
//       }
//       .title {
//         margin: 0;
//         width: 100%;
//         padding-top: 80px;
//         line-height: 1.15;
//         font-size: 48px;
//       }
//       .title,
//       .description {
//         text-align: center;
//       }
//       .row {
//         max-width: 880px;
//         margin: 80px auto 40px;
//         display: flex;
//         flex-direction: row;
//         justify-content: space-around;
//       }
//       .card {
//         padding: 18px 18px 24px;
//         width: 220px;
//         text-align: left;
//         text-decoration: none;
//         color: #434343;
//         border: 1px solid #9b9b9b;
//       }
//       .card:hover {
//         border-color: #067df7;
//       }
//       .card h3 {
//         margin: 0;
//         color: #067df7;
//         font-size: 18px;
//       }
//       .card p {
//         margin: 0;
//         padding: 12px 0 0;
//         font-size: 13px;
//         color: #333;
//       }
//     `}</style>
//   </div>
// )

// export default Home


import React from 'react';
import Head from 'next/head';
import Link from 'next/link'
import { Button } from 'rsuite';
import location from '../components/location';
import 'rsuite/lib/styles/index.less';

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <div className="hero">
      <h1 className="title">Blocks</h1>
      <p className="description">
        Here is our exciting Game it is using <br />NextJS, React, and Mapbox, it is a PWA.
         <br />
        <br />
        <span>
          <a href='https://leerob.io/blog/using-mapbox-with-next-js'>
            link to blog about how to work with mapbox
           </a>
          <br />
          <a href='https://git.linux.iastate.edu/fall2019-cs319-gitprojects/g40'>
            Gitlab
           </a>
          <br />
          <a href='https://trello.com/b/ChA7nedI/g40'>
            Trello
           </a>
          <br />
        </span>
      </p>
      <Button appearance="primary" href="/game">
        Play Game
      </Button>


      {/* <div className='row'>
        <Link href='/game'>
          <a className='card'>
            <h3>Play Game &rarr;</h3>
            <p>Click to go to the map</p>
          </a>
        </Link>
      </div> */}
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