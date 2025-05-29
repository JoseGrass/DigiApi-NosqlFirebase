import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';
import mostrarRegistro from './registro.js';

export default function mostrarLogin() {
  const app = document.getElementById("app");

  // Inyectar estilos CSS solo una vez
  if (!document.getElementById('login-styles')) {
    const style = document.createElement('style');
    style.id = 'login-styles';
    style.textContent = `
      .login-container {
        max-width: 400px;
        margin: 50px auto;
        padding: 30px 25px;
        background-color: #f9fafb;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        border-radius: 8px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #333;
      }
      .login-container h2 {
        text-align: center;
        color: #2c3e50;
        margin-bottom: 25px;
        font-weight: 700;
      }
      .login-container input[type="email"],
      .login-container input[type="password"] {
        width: 100%;
        padding: 12px 15px;
        margin-bottom: 15px;
        border: 1.8px solid #ced4da;
        border-radius: 6px;
        font-size: 16px;
        transition: border-color 0.3s ease;
      }
      .login-container input[type="email"]:focus,
      .login-container input[type="password"]:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 6px #007bff66;
      }
      .login-container button {
        width: 100%;
        padding: 12px 15px;
        background-color: #007bff;
        color: white;
        font-weight: 600;
        font-size: 16px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .login-container button:hover {
        background-color: #0056b3;
      }
      .login-container p {
        margin-top: 15px;
        text-align: center;
        font-size: 14px;
        color: #555;
      }
      .login-container p a {
        color: #007bff;
        text-decoration: none;
        font-weight: 600;
      }
      .login-container p a:hover {
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);
  }

  // Construir el HTML del login
  app.innerHTML = `
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form id="formLogin">
        <input type="email" id="correo" placeholder="Correo electrónico" required />
        <input type="password" id="contrasena" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tienes cuenta?
        <a href="#" id="irRegistro">Regístrate</a>
      </p>
    </div>
  `;

  // Manejar login
  document.getElementById("formLogin").addEventListener("submit", async (e) => {
    e.preventDefault();
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      // Aquí podrías redirigir o actualizar UI luego de login
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  });

  // Enlace para ir a registro
  document.getElementById("irRegistro").addEventListener("click", (e) => {
    e.preventDefault();
    mostrarRegistro();
  });
}
