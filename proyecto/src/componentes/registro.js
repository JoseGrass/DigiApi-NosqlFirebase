import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig.js'; // Ajusta el path si es diferente
import mostrarLogin from './login.js';

export default function mostrarRegistro() {
  const app = document.getElementById("app");

  // Inyectar estilos solo una vez
  if (!document.getElementById('registro-styles')) {
    const style = document.createElement('style');
    style.id = 'registro-styles';
    style.textContent = `
      #app h2 {
        color: #2c3e50;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        text-align: center;
        margin-bottom: 20px;
      }
      .registro-form {
        max-width: 400px;
        margin: 0 auto;
        background-color: #f9fafb;
        padding: 25px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        gap: 15px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      .registro-form input {
        padding: 12px 15px;
        font-size: 16px;
        border: 1.8px solid #ced4da;
        border-radius: 6px;
        transition: border-color 0.3s ease;
      }
      .registro-form input:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 6px #007bff66;
      }
      .registro-form button {
        padding: 12px 15px;
        font-size: 16px;
        font-weight: 600;
        border: none;
        border-radius: 6px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .registro-form button:hover {
        background-color: #0056b3;
      }
      .registro-form p {
        text-align: center;
        margin-top: 10px;
        font-size: 14px;
        color: #555;
      }
      .registro-form a {
        color: #007bff;
        text-decoration: none;
        cursor: pointer;
      }
      .registro-form a:hover {
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);
  }

  app.innerHTML = `
    
    <div class="registro-form">
    <h2>Registro</h2>
      <input type="text" id="nombre" placeholder="Nombre" required />
      <input type="email" id="correo" placeholder="Correo electrónico" required />
      <input type="password" id="contrasena" placeholder="Contraseña" required />
      <input type="text" id="fecha" placeholder="Fecha de nacimiento" />
      <input type="tel" id="telefono" placeholder="Teléfono" />
      <button id="btnRegistro">Registrarse</button>
      <p><a href="#" id="irLogin">¿Ya tienes cuenta? Inicia sesión</a></p>
    </div>
  `;

  document.getElementById("btnRegistro").addEventListener("click", async () => {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const fecha = document.getElementById("fecha").value;
    const telefono = document.getElementById("telefono").value;

    let ganados = 0;
    let perdidos = 0;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        nombre,
        correo,
        fecha,
        telefono,
        ganados,
        perdidos
      });

      alert('Usuario registrado correctamente');
      mostrarLogin();
    } catch (error) {
      alert('Error al registrarse: ' + error.message);
    }
  });

  document.getElementById("irLogin").addEventListener("click", (e) => {
    e.preventDefault();
    mostrarLogin();
  });
}
