import Carousel from "../../components/Carousel";
import CategList from "../../components/CategList";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";

function Home() {
  return (
    <>
      <Header type="home" />
      <Carousel />
      <CategList />
      <ProductList type="home" />
      <Footer />
    </>
  );
}

export default Home;
