import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails.js', () => {
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

  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);
    act(() => {
      history.push(`/pokemon/${pokemon.id}`);
    });

    const headerDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(headerDetails).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();

    const summaryHeader = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(summaryHeader).toBeInTheDocument();

    const summaryText = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(summaryText).toBeInTheDocument();
    expect(summaryText.innerHTML).toBe(pokemon.summary);
  });

  test('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);
    act(() => {
      history.push(`/pokemon/${pokemon.id}`);
    });

    const locationsHeader = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(locationsHeader).toBeInTheDocument();
    expect(locationsHeader.innerHTML).toBe(`Game Locations of ${pokemon.name}`);

    const locationOne = screen.getByText(/kanto viridian forest/i);
    expect(locationOne).toBeInTheDocument();
    expect(locationOne.innerHTML).toBe(pokemon.foundAt[0].location);

    const locationImg = screen.getAllByRole('img', {
      name: /pikachu location/i,
    });

    locationImg.forEach((element) => expect(element).toBeInTheDocument());

    locationImg
      .forEach((element) => expect(element.alt).toBe(`${pokemon.name} location`));

    expect(locationImg[0].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImg[1].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Testa se o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(detailsLink);
    act(() => {
      history.push(`/pokemon/${pokemon.id}`);
    });

    const checkbox = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(checkbox);

    const favorited = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favorited.src).toBe('http://localhost/star-icon.svg');
    expect(favorited.alt).toBe(`${pokemon.name} is marked as favorite`);

    userEvent.click(checkbox);
    expect(favorited).not.toBeInTheDocument();
  });
});
