import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import escudo from '../assets/escudo.png';

const Password: React.FC = () => {
  const [passwords, setPasswords] = useState<{ id: number; nombre: string; contraseña: string; fecha_creacion: string }[]>([]);
  const [passwordChart, setPasswordChart] = useState<{ month: string; count: number }[]>([]);

  const handleSave = () => {
    console.log('Guardar contraseña en la base de datos');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`${text} copiado al portapapeles.`);
  };

  const handleClear = (id: number) => {
    console.log(`Borrar contraseña con ID ${id} de la base de datos`);
  };

  const fetchPasswords = async () => {
    // Simulación de obtener las contraseñas de la base de datos
    const mockPasswords = [
      { id: 1, nombre: 'Facebook', contraseña: 'fbpass', fecha_creacion: '2024-05-01' },
      { id: 2, nombre: 'Gmail', contraseña: 'gmailpass', fecha_creacion: '2024-05-15' },
      { id: 3, nombre: 'Twitter', contraseña: 'twitterpass', fecha_creacion: '2024-05-25' },
      { id: 4, nombre: 'LinkedIn', contraseña: 'linkedinpass', fecha_creacion: '2024-05-10' },
      { id: 5, nombre: 'Instagram', contraseña: 'instagrampass', fecha_creacion: '2024-05-20' },
      { id: 6, nombre: 'Amazon', contraseña: 'amazonpass', fecha_creacion: '2024-05-05' },
      // Agrega más contraseñas si es necesario
    ];
    setPasswords(mockPasswords);

    // Simulación de calcular la distribución de contraseñas por mes
    const mockPasswordChart = [
      { month: 'Enero', count: 10 },
      { month: 'Febrero', count: 15 },
      { month: 'Marzo', count: 8 },
      // ...
    ];
    setPasswordChart(mockPasswordChart);
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
              <span>{password.nombre}: {password.contraseña}</span>
              <ButtonContainer>
                <Button onClick={() => handleCopy(password.contraseña)}>Copiar</Button>
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
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

const PasswordList = styled.div`
  margin-bottom: 20px;

  h2 {
    margin-bottom: 10px;
  }
`;

const PasswordGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

export default Password;
