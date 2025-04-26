import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctos from "../components/TopDoctos";
import Banner from "../components/Banner";
const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctos />
      <Banner/>
    </div>
  );
};
export default Home;
