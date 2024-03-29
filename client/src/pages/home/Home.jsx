import React from "react";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import PropertyList from "../../components/propertylist/PropertyList";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

import "./Home.modules.css";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
      <Footer />
      </div>
    </div>
  );
};

export default Home;
