import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Testa o componente About.js', () => {
  it('Testa se a página contém as informações sobre a Pokédex', () => {

  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {

  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    const aboutTitle = screen.getByRole('heading', {
      name: 'About Pokédex',
    });
    expect(pathname).toBe('/about');
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex:', () => {
    const aboutImg = screen.getByRole('img', {
      name: 'Pokédex',
    });
    expect(aboutImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
