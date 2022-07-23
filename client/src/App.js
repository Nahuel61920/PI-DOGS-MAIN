import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CardDogDetail from './components/CardDogDetail/CardDogDetail';
import Error404 from './components/Error404/Error404';

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path='/home/:id' element={<CardDogDetail />} />
        <Route path= "/*" element={<Error404 />} />
      </Routes>
  );
}

export default App;
