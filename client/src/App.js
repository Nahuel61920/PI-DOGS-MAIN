import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CardDogDetail from './components/CardDogDetail/CardDogDetail';
import NotFound404 from './components/Error404/NotFound404';
import CreateDog from './components/CreateDog/CreateDog';
import Wallpaper from './components/Wallpaper/Wallpaper';
import Favorites from './components/Favorites/Favorites';

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path='/home/:id' element={<CardDogDetail />} />
        <Route exact path='/create-dog' element={<CreateDog />} />
        <Route exact path='/wallpaper' element={<Wallpaper />} />
        <Route exact path='/favorites' element={<Favorites />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
  );
}

export default App;
