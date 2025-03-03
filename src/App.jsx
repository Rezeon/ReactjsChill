import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";
import { useDataContext } from "./context/UserContext";
import Layout from "./components/organism/LayOut";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginForm";
import Register from "./pages/RegisterForm";
import DaftarFilm from "./components/DaftarFilm";
import ProfilSaya from "./components/ProfilSaya";
import LanggananChill from "./components/LanggananChill";
import RegisPremium from "./pages/RegisPremium";
import VideoPlayer from "./components/VideoPlayer";
import Trailer from "./assets/film/film.mp4"
import NotFound from "./components/notfound/NotFound";
import ProtectedRoute from "./context/ProteksiPage";

function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}

function MainApp() {
  const { selectedFilm } = useDataContext();

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
        <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/daftarsaya" element={<DaftarFilm filter="Daftar Saya" />} />
              <Route path="/film" element={<DaftarFilm filter="Film" />} />
              <Route path="/series" element={<DaftarFilm filter="Series" />} />
              <Route path="/profilsaya" element={<ProfilSaya />} />
              <Route path="/langgan" element={<LanggananChill />} />
              <Route path="/regispremium/:id" element={<RegisPremium />} />
            </Route>
          </Route>
          <Route path="/videoplay" element={<VideoPlayer Film={selectedFilm} Trailer={Trailer} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
