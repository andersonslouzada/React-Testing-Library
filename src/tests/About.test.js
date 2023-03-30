import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente About.js', () => {
  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const textOne = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );

    const textTwo = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );

    expect(textOne).toBeInTheDocument();
    expect(textTwo).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', {
      name: 'About Pokédex',
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const aboutImg = screen.getByRole('img', {
      name: 'Pokédex',
    });
    expect(aboutImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
