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
import i18next from 'i18next';
import { FetchProducts, SetFilterStatus } from './RTK/Slices/FetchProductsSlice';
import { GetAllWishedProducts } from './RTK/Slices/ProductsWishListSlice';
import { GetAllCartProducts } from './RTK/Slices/ProductCartSlice';
import PayementSuccess from './pages/PayementSuccess/PayementSuccess';
import PayementFailed from './pages/PayementFailed/PayementFailed';
import Error from './pages/Error/Error';

function App() {

  const { startToFilter } = useSelector(state => state.ShopPage); 
  const { StartNavigation, NavigateTo, RegenerateData } = useSelector(state => state.Authorization);
  const { InsuffecientProductQuantity } = useSelector(state => state.Cart);
  const { RedirectToLogin } = useSelector(state => state.Authorization);
  const dispatch = useDispatch();
  // const location = useLocation();
  const navigate = useNavigate();
  const firstUpdate = useRef(false);
  const lastPage = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if(!RedirectToLogin && lastPage != null)
        navigate(lastPage.current);
  }, [RedirectToLogin])

  useEffect(() => {
    if(location.pathname != "/login")
      {
        lastPage.current = location.pathname;
        // console.log(location.pathname)
      }
    window.scrollTo(0,0);
  }, [location.pathname])

  if(i18next.language === 'en')
    document.documentElement.classList.remove("arabic-format");
  else
    document.documentElement.classList.add("arabic-format");

  useEffect(() => {
    StartNavigation != "" && navigate(NavigateTo);
  }, [StartNavigation])

  useEffect(() => {
    if (firstUpdate.current) {
      toast.error("Insufficient product quantity.");
    }
    firstUpdate.current = true;
  }, [InsuffecientProductQuantity])
  
  useEffect(() => {
    dispatch(FetchProducts(1));
  }, [])

  useEffect(() => {
    if(location.pathname !== "/shop-page" && startToFilter)
      dispatch(SetFilterStatus(false));
  }, [location.pathname])

  useEffect(() => {
    dispatch(GetAllWishedProducts());
    dispatch(GetAllCartProducts());
  }, [RegenerateData])

  return (
    <>
      <Loader />    
      <Header />
      <PopUpCart />
      <PopUpProduct />
      <Routes>
        <Route path='*' element={<Error />}></Route>
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
        <Route path='/success' element={<PayementSuccess />} />
        <Route path='/error' element={<PayementFailed />} />
      </Routes>
      <UpArrow />
      <Footer />
    </>
  );
}

export default App;
