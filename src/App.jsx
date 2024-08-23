import logo from './logo.svg';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./../node_modules/bootstrap/dist/js/bootstrap.bundle"
import './App.css';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RedirectExecutionAction } from './RTK/Slices/AuthorizationSlice';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import TargetEmail from './pages/ForgotPassword/TargetEmail';
import toast from 'react-hot-toast';
import PopUpProduct from './components/PopUpProduct/PopUpProduct';
import UpArrow from './components/UpArrow/UpArrow';

function App() {

  const { StartNavigation, NavigateTo } = useSelector(state => state.Authorization);
  const { InsuffecientProductQuantity } = useSelector(state => state.Cart);
  // const { RedirectToLogin, RedirectExecution, aidRedirection } = useSelector(state => state.Authorization);
  // const dispatch = useDispatch();
  // const location = useLocation();
  const navigate = useNavigate();
  const firstUpdate = useRef(false);

  useEffect(() => {
    StartNavigation != "" && navigate(NavigateTo);
  }, [StartNavigation])

  useEffect(() => {
    if (firstUpdate.current) {
      toast.error("Insufficient product quantity.");
    }
    firstUpdate.current = true;
  }, [InsuffecientProductQuantity])
  
  // useEffect(() => {
  //   if(RedirectToLogin) {
  //     if(RedirectExecution) {
  //       navigate("login");
  //     }
  //     else {
  //       navigate("/");
  //     }
  //   }
  //   else if(location.pathname == "/login")
  //     navigate("/");
  //   else
  //     <Outlet />
  // }, [RedirectToLogin, aidRedirection])

  // useEffect(() => {
  //   console.log("RedirectExecution ", RedirectExecution);
  //   console.log("RedirectToLogin ", RedirectToLogin);
  //   console.log("////////////////////////////////////////////////")
  // }, [RedirectExecution, RedirectToLogin])

  return (
    <>
      <Loader />    
      <Header />
      <PopUpCart />
      <PopUpProduct />
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
        <Route path='login/forgot-password/:tempToken' element={<ForgotPassword />} />
        <Route path='login/target-email' element={<TargetEmail />} />
      </Routes>
      <UpArrow />
      <Footer />
    </>
  );
}

export default App;
