import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Teste o componente Pokedex.js', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });
    expect(pokedexTitle).toBeInTheDocument();
  });
  it('Testa se é exibido o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado', () => {
    renderWithRouter(<App />);
    const proxBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(proxBtn).toBeInTheDocument();
    pokemonList.forEach((pokemon) => {
      const newPokemon = screen.getByText(pokemon.name);
      expect(newPokemon).toBeInTheDocument();
      userEvent.click(proxBtn);
    });
  });

  it('Testa se a Pokédex tem os botões de filtro por tipo de pokemon', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(7);

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allBtn).toBeInTheDocument();

    const arrayTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    buttons.forEach((button, index) => {
      expect(button.innerHTML).toBe(arrayTypes[index]);
      expect(allBtn).toBeInTheDocument();
    });
  });
});
