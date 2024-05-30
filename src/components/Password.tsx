import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import escudo from '../assets/escudo.png';

const Password: React.FC = () => {
  const [passwords, setPasswords] = useState<{ id: number; nombre: string; password: string; fecha: string }[]>([]);
  const [passwordChart, setPasswordChart] = useState<{ month: string; count: number }[]>([]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`${text} copiado al portapapeles.`);
  };

  const handleClear = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/contrasena/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Actualizar el estado local para reflejar los cambios
      setPasswords(prevPasswords => prevPasswords.filter(password => password.id !== id));
      alert('Contraseña eliminada correctamente.');
    } catch (error) {
      console.error('There was an error deleting the password:', error);
      alert('Hubo un error al eliminar la contraseña. Por favor, intenta de nuevo.');
    }
  };

  const fetchPasswords = async () => {
    try {
      const response = await fetch('http://localhost:3000/contrasena');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPasswords(data);

      // Simulación de calcular la distribución de contraseñas por mes
      const passwordCounts = data.reduce((acc: { [key: string]: number }, password: { fecha: string }) => {
        const month = new Date(password.fecha).toLocaleString('es-ES', { month: 'long' });
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month]++;
        return acc;
      }, {});

      const mockPasswordChart = Object.keys(passwordCounts).map(month => ({
        month,
        count: passwordCounts[month]
      }));
      setPasswordChart(mockPasswordChart);
    } catch (error) {
      console.error('There was an error fetching the passwords:', error);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  return (
    <Container>
      <Image src={escudo} alt="Escudo" />
      <PasswordList>
        <h2>Listado de Contraseñas</h2>
        <PasswordGrid>
          {passwords.map(password => (
            <PasswordItem key={password.id}>
              <span>{password.nombre}: {password.password}</span>
              <ButtonContainer>
                <Button onClick={() => handleCopy(password.password)}>Copiar</Button>
                <Button onClick={() => handleClear(password.id)}>Borrar</Button>
              </ButtonContainer>
            </PasswordItem>
          ))}
        </PasswordGrid>
      </PasswordList>
      <PasswordChart>
        <h2>Distribución de Contraseñas por Mes</h2>
        <BarChart>
          {passwordChart.map(({ month, count }) => (
            <Bar key={month}>
              <BarFill style={{ height: `${count * 10}px` }}>{count}</BarFill>
              <span>{month}</span>
            </Bar>
          ))}
        </BarChart>
      </PasswordChart>
      <LinkButton to="/">Ir a Mail</LinkButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(134, 152, 185);
  padding: 20px;
  width: 100%;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const PasswordList = styled.div`
  width: 50%;
  margin-bottom: 20px;

  h2 {
    margin-bottom: 10px;
    text-align: center;
  }
`;

const PasswordGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
`;

const PasswordItem = styled.div`
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
`;

const PasswordChart = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;

const BarChart = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Bar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BarFill = styled.div`
  width: 30px;
  background-color: rgb(46, 79, 145);
  border-radius: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-end;
  padding-right: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: rgb(46, 79, 145);
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
`;

const LinkButton = styled(Link)`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: rgb(46, 79, 145);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;

  &:hover {
    background-color: rgb(34, 59, 105);
  }
`;

export default Password;
