import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Mail from './components/Mail';
import Password from './components/Password';

describe('App', () => {
  it('renders App component', () => {
    render(<App title="React" />);
    screen.debug();
  });
});

describe('Mail', () => {
  it('renders Mail component', () => {
    render(
      <BrowserRouter>
        <Mail />
      </BrowserRouter>
    );

    const emailLabel = screen.getByLabelText(/Correo:/i);
    expect(emailLabel).toBeInTheDocument();

    const passwordLabel = screen.getByLabelText(/Clave:/i);
    expect(passwordLabel).toBeInTheDocument();

    const saveButton = screen.getByText(/Guardar/i);
    expect(saveButton).toBeInTheDocument();

    const linkButton = screen.getByText(/Ir a Password/i);
    expect(linkButton).toBeInTheDocument();
  });
});

describe('Password', () => {
  it('renders Password component', () => {
    render(
      <BrowserRouter>
        <Password />
      </BrowserRouter>
    );

    const heading = screen.getByText(/Listado de Contraseñas/i);
    expect(heading).toBeInTheDocument();

    const distributionHeading = screen.getByText(/Distribución de Contraseñas por Mes/i);
    expect(distributionHeading).toBeInTheDocument();

    const linkButton = screen.getByText(/Ir a Mail/i);
    expect(linkButton).toBeInTheDocument();
  });
});
