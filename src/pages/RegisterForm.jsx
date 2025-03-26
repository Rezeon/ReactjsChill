import "../assets/styles/RegisterForm.css";
import Foto from "../assets/images/logo.png";
import Google from "../assets/images/google.png";
import { useDataContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Register() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleRegister,
    conpassword,
    setconpassword,
    handleGoogleSignIn,
  } = useDataContext();
  return (
    <body>
      <div className="loginr">
        <div className="inputlogin">
          <div className="logoF">
            <img src={Foto} className="logo1" alt="" />
            <p>CHILL</p>
          </div>
          <div className="masuk">
            <p className="masuk1">DAFTAR</p>
            <p className="selamat">Selamat Datang!</p>
          </div>
          <form onSubmit={handleRegister}></form>
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
          <div className="password">
            <label htmlFor="Password">Kata Sandi</label>
            <input
              type="password"
              name="Password"
              required
              placeholder="Masukan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="Password">Konfirmasi Kata Sandi</label>
            <input
              type="password"
              name="Password"
              required
              placeholder="Masukan Password"
              value={conpassword}
              onChange={(e) => setconpassword(e.target.value)}
            />
            <div className="daftar">
              <div className="daftar1">
                <p>Sudah punya akun?</p>
                <Link to="/login">Masuk?</Link>
              </div>
              <div className="lupa">Lupa kata sandi?</div>
            </div>
          </div>

          <div className="atau">
            <button className="injj" onClick={handleRegister}>
              Daftar
            </button>
            <p>Atau</p>
            <button className="google" onClick={handleGoogleSignIn}>
              <img className="google1" src={Google} alt="" />
              <p>daftar dengan Google</p>
            </button>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Register;
