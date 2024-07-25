import logo from './logo.svg';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SelectCountry from './pages/SelectCountry/SelectCountry';
import ShopPage from './pages/ShopPage/ShopPage';
import WishList from './pages/WishList/WishList';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<SelectCountry />} />
        <Route path='shop-page' element={<ShopPage />}></Route>
        <Route path='wishlist' element={<WishList />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
