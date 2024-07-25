import logo from './logo.svg';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SelectCountry from './pages/SelectCountry/SelectCountry';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<SelectCountry />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
