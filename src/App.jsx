import { Routes, Route } from "react-router-dom";
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
import Trailer from "./assets/film/film.mp4";
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
  const basePath = "/ReactjsChill";
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path={`${basePath}/`} element={<HomePage />} />
            <Route path={`${basePath}/daftarsaya`} element={<DaftarFilm filter="Daftar Saya" />} />
            <Route path={`${basePath}/film` }element={<DaftarFilm filter="Film" />} />
            <Route path={`${basePath}/series` }element={<DaftarFilm filter="Series" />} />
            <Route path={`${basePath}/profilsaya`}element={<ProfilSaya />} />
            <Route path={`${basePath}/langgan`} element={<LanggananChill />} />
            <Route path={`${basePath}/regispremium/:id` }element={<RegisPremium />} />
          </Route>
        </Route>
        <Route path={`${basePath}/videoplay` }element={<VideoPlayer Film={selectedFilm} Trailer={Trailer} />} />
        <Route path={`${basePath}/login` }element={<Login />} />
        <Route path={`${basePath}/register`} element={<Register />} />
        <Route path={`${basePath}*`} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
