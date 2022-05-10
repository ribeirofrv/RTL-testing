import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('3 - Testa o componente <FavoritePokemons.js />', () => {
  it('Caso não tenha favoritos exibe a mensagem: No Favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const text = /No Favorite pokemon found/i;
    const paragraph = screen.getByText(text);
    expect(paragraph).toBeInTheDocument();
  });

  it('Caso tenha favoritos exibe cards de pokemon favorito', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/65');
    const favoriteOne = screen.getByText(/favoritado/i);
    userEvent.click(favoriteOne);

    history.push('/pokemons/23');
    const favoriteTwo = screen.getByText(/favoritado/i);
    userEvent.click(favoriteTwo);

    renderWithRouter(<FavoritePokemons />);

    const favorites = screen.getByAltText(/is marked as favorite/);
    expect(favorites).toBeInTheDocument();
  });
});
