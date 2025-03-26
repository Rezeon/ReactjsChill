import "../assets/styles/LoginForm.css";
import Foto from "../assets/images/logo.png";
import Google from "../assets/images/google.png";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/UserContext";

function Login() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    handleGoogleLogin,
  } = useDataContext();

  return (
    <body>
      <div className="login">
        <div className="inputlogin">
          <div className="logoF">
            <img src={Foto} className="logo1" alt="" />
            <p>CHILL</p>
          </div>
          <div className="masuk">
            <p className="masuk1">MASUK</p>
            <p className="selamat">Selamat Datang Kembali!</p>
          </div>
          <div className="username">
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              id="Username"
              name="Username"
              required
              placeholder="Masukan username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password1">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="Password"
              name="Password"
              required
              placeholder="Masukan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="daftar">
              <div className="daftar1">
                <p>Belum punya akun?</p>
                <Link to="/register">Daftar</Link>
              </div>
              <div className="lupa">Lupa kata sandi?</div>
            </div>
          </div>

          <div className="atau">
            <button className="injj" onClick={handleLogin}>
              Masuk
            </button>
            <p>Atau</p>
            <button className="google" onClick={handleGoogleLogin}>
              <img className="google1" src={Google} alt="" />
              <p>Masuk dengan Google</p>
            </button>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
