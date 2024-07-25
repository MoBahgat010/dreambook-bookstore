import logo from './logo.svg';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
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

function App() {
  return (
    <>
      <Header />
      <PopUpCart />
      <Routes>
        <Route path='/' element={<SelectCountry />} />
        <Route path='shop-page' element={<ShopPage />} />
        <Route path='wishlist' element={<WishList />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='login' element={<Login />} />
        <Route path='single-page' element={<SinglePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
