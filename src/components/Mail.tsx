import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/Candado.png';

const Mail: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSave = async () => {
    if (!validateEmail(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      const saveResponse = await fetch('http://localhost:3000/correos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email, password }),
      });

      if (!saveResponse.ok) {
        throw new Error('Network response was not ok');
      }

      alert('¡Correo electrónico guardado con éxito!');
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      console.error('There was an error saving the email and password:', error);
      alert('Hubo un error al guardar los datos. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div style={styles.container}>
      <img src={image} alt="Imagen" style={styles.image} />
      <div style={styles.fieldContainer}>
        <label htmlFor="email" style={styles.label}>Correo:</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={styles.input}
        />
      </div>
      <div style={styles.fieldContainer}>
        <label htmlFor="password" style={styles.label}>Clave:</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={styles.input}
        />
      </div>
      <button onClick={handleSave} style={styles.button}>Guardar</button>
      <Link to="/password" style={styles.linkButton}>Ir a Password</Link>
    </div>
  );
}

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

export default Mail;
