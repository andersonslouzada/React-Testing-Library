import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Testa o componente FavoritePokemon.js', () => {
  it('Testa se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [] } />);
    const favoritePage = screen.getByText(/no favorite pokémon found/i);
    expect(favoritePage).toBeInTheDocument();
  });
  it('Se ao favoritar pokémons a partir da página de detalhes, testa se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<FavoritePokemon
      pokemonList={ [{ name: 'Ekans',
        type: 'Poison',
        averageWeight: {
          value: '6.9',
          measurementUnit: 'kg',
        },
        image: 'https://archives.bulbagarden.net/media/upload/1/18/Spr_5b_023.png' }] }
    />);
    const favoritePokemonName = screen.getByText(/ekans/i);
    const favoritePokemonType = screen.getByText(/poison/i);
    const favoritePokemonWeight = screen.getByText(/average weight: 6\.9 kg/i);
    const favoritePokemonImg = screen.getByRole('img', {
      name: /ekans sprite/i,
    });

    expect(favoritePokemonImg.src).toBe('https://archives.bulbagarden.net/media/upload/1/18/Spr_5b_023.png');
    expect(favoritePokemonName).toBeInTheDocument();
    expect(favoritePokemonType).toBeInTheDocument();
    expect(favoritePokemonWeight).toBeInTheDocument();
  });
});
