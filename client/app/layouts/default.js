import React from 'react';
import Head from 'next/head'
import Navigation from '../components/navigations/Navbar';
import Footer from '../components/footer/Footer'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
   return (
      <div>
         <Head>
            <title>Fitness Assessment</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         </Head>
         <Navigation />
         { children }
         <Footer/>
      </div>
   );
};

export default Layout;