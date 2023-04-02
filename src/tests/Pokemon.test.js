import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';

describe('Testa o componente Pokemon.js', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: { measurementUnit: 'kg', value: '6.0' },
    foundAt: [
      { location: 'Kanto Viridian Forest', map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png' },
      { location: 'Kanto Power Plant', map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png' }],
    image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',

  };
  it('Testa se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);
    const { averageWeight } = pokemon;
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu.innerHTML).toBe(pokemon.name);

    const pikachuType = screen.getByTestId('pokemon-type');
    expect(pikachuType.innerHTML).toBe(pokemon.type);

    const pikachuWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pikachuWeight.innerHTML)
      .toBe(
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
      );

    const pikachuImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pikachuImg.src).toBe(pokemon.image);
    expect(pikachuImg.alt).toBe(`${pokemon.name} sprite`);
  });

  it('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido;', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemon } />);
    const pikachuLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pikachuLink);
    act(() => {
      history.push(`/pokemon/${pokemon.id}`);
    });
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonDetails);

    const checkbox = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(checkbox);

    const favorited = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favorited.src).toBe('http://localhost/star-icon.svg');
    expect(favorited.alt).toBe(`${pokemon.name} is marked as favorite`);
  });
});
