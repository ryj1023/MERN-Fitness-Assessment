import React from 'react';
import Navigation from '../components/navigations/navigation';
import Footer from '../components/footer/footer'

const Layout = ({ children }) => {
   return (
      <div>
         <Navigation />
         { children }
         <Footer/>
      </div>
   );
};

export default Layout;