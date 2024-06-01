import React, { useState } from 'react'; // Importa React y el hook useState
import { Link } from 'react-router-dom'; // Importa Link para la navegación entre rutas
import image from '../assets/Candado.png'; // Importa una imagen desde la carpeta de activos

const Mail: React.FC = () => {
  // Define los estados para email, password y error
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Función para validar el formato del correo electrónico
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el correo
    return re.test(String(email).toLowerCase()); // Devuelve true si el correo es válido
  };

  // Función para manejar el evento de guardar
  const handleSave = async () => {
    if (!validateEmail(email)) { // Verifica si el correo es válido
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      // Hace una solicitud POST al servidor para guardar el correo y la contraseña
      const saveResponse = await fetch('http://localhost:3000/correos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email, password }), // Envía los datos como JSON
      });

      if (!saveResponse.ok) { // Si la respuesta no es OK, lanza un error
        throw new Error('Network response was not ok');
      }

      // Muestra una alerta de éxito y reinicia los campos y el estado de error
      alert('¡Correo electrónico guardado con éxito!');
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      // Muestra una alerta de error y lo registra en la consola
      console.error('There was an error saving the email and password:', error);
      alert('Hubo un error al guardar los datos. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div style={styles.container}>
      <img src={image} alt="Imagen" style={styles.image} /> {/* Muestra la imagen */}
      <div style={styles.fieldContainer}>
        <label htmlFor="email" style={styles.label}>Correo:</label> {/* Etiqueta para el campo de correo */}
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del correo al cambiar el valor
          style={styles.input}
        />
      </div>
      <div style={styles.fieldContainer}>
        <label htmlFor="password" style={styles.label}>Clave:</label> {/* Etiqueta para el campo de contraseña */}
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña al cambiar el valor
          style={styles.input}
        />
      </div>
      <button onClick={handleSave} style={styles.button}>Guardar</button> {/* Botón para guardar los datos */}
      <Link to="/password" style={styles.linkButton}>Ir a Password</Link> {/* Enlace a otra ruta */}
    </div>
  );
}

// Estilos en línea para los diferentes elementos del componente
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    color: 'white',
    backgroundColor: 'rgb(134, 152, 185)',
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    margin: '0 auto',
    height: '100vh', 
  },
  image: {
    width: '150px',
    height: '150px',
    marginBottom: '20px',
  },
  fieldContainer: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  label: {
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    width: '100%',
    borderRadius: '5px',
    border: 'none',
  },
  button: {
    padding: '15px 30px',
    fontSize: '18px',
    color: 'white',
    backgroundColor: 'rgb(46, 79, 145)',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  linkButton: {
    fontSize: '18px',
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

export default Mail; // Exporta el componente para su uso en otras partes de la aplicación
