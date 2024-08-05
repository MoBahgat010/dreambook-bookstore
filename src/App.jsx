import logo from './logo.svg';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./../node_modules/bootstrap/dist/js/bootstrap.bundle"
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SelectCountry from './pages/SelectCountry/SelectCountry';
import ShopPage from './pages/ShopPage/ShopPage';
import WishList from './pages/WishList/WishList';
import PopUpCart from './components/PopUpCart/PopUpCart';
import CartPage from './pages/CartPage/CartPage';
import Login from './pages/Login/Login';
import SinglePage from './pages/ٍSinglePage/SinglePage';
import Home from './pages/Home/home';
import Checkout from './pages/Checkout/Checkout';
import About from './pages/About/about';
import ContactUs from './pages/Contact Us/ContactUs';
import Loader from './components/Loader/Loader';

function App() {

  return (
    <>
      <Loader />    
      <Header />
      <PopUpCart />
      <Routes>
        <Route path='/' element={<SelectCountry />} />
        <Route path='home' element={<Home />} />
        <Route path='shop-page' element={<ShopPage />} />
        <Route path='wishlist' element={<WishList />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='login' element={<Login />} />
        <Route path='single-page/:productId' element={<SinglePage />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='about-us' element={<About />} />
        <Route path='contact-us' element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
