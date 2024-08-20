import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Footer from "../components/Footer";
import "../styles/HomePage.scss";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="homePage-image">
        <Navbar />
        <Slide />
      </div>
      <Categories />
      <Listings />
      <Footer />
    </div>
  );
};

export default HomePage;
