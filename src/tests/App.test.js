import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App.js', () => {
  it('Verifica se o primeiro link possui o texto "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });

    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se o segundo link possui o texto "About"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se o terceiro link possui o texto "Favorite Pokémon"', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémon',
    });

    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Verifica se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina/que-nao-existe/');
    });

    const notFoundTitle = screen.getByRole('heading', {
      name: 'Page requested not found',
    });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
