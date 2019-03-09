import React from 'react';
import Head from 'next/head'
import NavBar from '../components/navigations/NavBar';
// import Footer from '../components/footer/Footer'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
   return (
      <div className="h-100">
         {/* <Head>
            <title>Fitness Assessment</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head> */}
         <NavBar />
         { children }
         {/* <Footer/> */}
      </div>
   );
};

export default Layout;