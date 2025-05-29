import { auth, db } from '../firebaseConfig.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default async function mostrarPerfil() {
  const app = document.getElementById('app');

  // Inyectar estilos CSS solo una vez
  if (!document.getElementById('perfil-styles')) {
    const style = document.createElement('style');
    style.id = 'perfil-styles';
    style.textContent = `
      #app h2 {
        color: #2c3e50;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        text-align: center;
        margin-bottom: 20px;
      }
      #app p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #555;
        text-align: center;
      }
      .perfil-form {
        max-width: 400px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 15px;
        background-color: #f9fafb;
        padding: 25px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      .perfil-form input {
        padding: 12px 15px;
        font-size: 16px;
        border: 1.8px solid #ced4da;
        border-radius: 6px;
        transition: border-color 0.3s ease;
      }
      .perfil-form input:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 6px #007bff66;
      }
      .perfil-form button {
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
      .perfil-form button:hover {
        background-color: #0056b3;
      }
    `;
    document.head.appendChild(style);
  }

  app.innerHTML = `<h2>Perfil del Usuario</h2><p id="cargando">Cargando...</p>`;

  const uid = auth.currentUser?.uid;
  if (!uid) {
    app.innerHTML = '<p>Error: Usuario no autenticado</p>';
    return;
  }

  const docRef = doc(db, 'usuarios', uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    app.innerHTML = '<p>Usuario no encontrado</p>';
    return;
  }

  const { nombre = '', fecha = '', telefono = '' } = docSnap.data();

  // Renderizar formulario con clases para estilos
  app.innerHTML = `
    
    <div class="perfil-form">
      <h2>Perfil del Usuario</h2>
      <input id="nombre" placeholder="Nombre" value="${nombre}" />
      <input id="fecha" placeholder="Fecha de nacimiento (YYYY-MM-DD)" value="${fecha}" />
      <input id="telefono" placeholder="Teléfono" value="${telefono}" />
      <button id="guardar">Guardar cambios</button>
    </div>
  `;

  document.getElementById('guardar').addEventListener('click', async () => {
    const nuevoNombre = document.getElementById('nombre').value;
    const nuevaFecha = document.getElementById('fecha').value;
    const nuevoTelefono = document.getElementById('telefono').value;

    try {
      await updateDoc(docRef, {
        nombre: nuevoNombre,
        fecha: nuevaFecha,
        telefono: nuevoTelefono,
      });
      alert('Datos actualizados correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar los datos');
    }
  });
}
