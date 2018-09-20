import React from 'react';
import Navigation from '../components/navigations/SiteNavigation';
import Footer from '../components/footer/Footer'

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