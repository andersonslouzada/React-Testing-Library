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
    const titleHome = screen.getByRole('heading', {
      name: 'Encountered Pokémon',
    });
    expect(pathname).toBe('/');
    expect(titleHome).toBeInTheDocument();
  });

  it('Verifica se o segundo link possui o texto "About"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    const aboutTitle = screen.getByRole('heading', {
      name: 'About Pokédex',
    });
    const aboutImg = screen.getByRole('img', {
      name: 'Pokédex',
    });
    expect(pathname).toBe('/about');
    expect(aboutTitle).toBeInTheDocument();
    expect(aboutImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  it('Verifica se o terceiro link possui o texto "Favorite Pokémon"', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémon',
    });

    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    const favoriteTitle = screen.getByRole('heading', {
      name: 'Favorite Pokémon',
    });
    expect(pathname).toBe('/favorites');
    expect(favoriteTitle).toBeInTheDocument();
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
