import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NotFoundError from "./components/NotFoundError";
import NavBar from "./components/NavBar";
import './styles/App.css'
import { MovieProvider } from "./contexts/MovieContext";

function App() {

  return (
    <MovieProvider>
      <NavBar/>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/favorites" element={<Favorites/>}/>

          <Route path="*" element={<NotFoundError/>} />
        </Routes>
      </main>
    </MovieProvider>

  )
}

export default App
