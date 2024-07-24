import logo from './logo.svg';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <>
    
      <Routes>
        <Route path='/' element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
