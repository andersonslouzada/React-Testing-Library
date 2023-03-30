import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componente NotFound.js', () => {
  it('Testa se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen.getByRole('heading', {
      name: 'Page requested not found',

    });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(notFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
