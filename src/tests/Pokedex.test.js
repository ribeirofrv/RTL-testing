import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('5 - Testa o componente <Pokedex.js />', () => {
  it('Contém um heading "h2" com o texto "Encountered pokémons"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const titlePokedex = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(titlePokedex).toBeInTheDocument();
  });

  it('Quando o botão "Próximo pokémon" é clicado exibe o próximo pokemon', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /próximo/i });

    pokemons.forEach(({ name }) => {
      const nextPokemon = screen.getByText(name);
      expect(nextPokemon).toBeInTheDocument();
      userEvent.click(buttonNext);
    });

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Mostra apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });

    pokemons.forEach(() => {
      const pokemonSprite = screen.getAllByRole('img');
      expect(pokemonSprite).toHaveLength(1);
      userEvent.click(buttonNext);
    });
  });

  it('Existe botôes de filtro para cada tipo de pokémon', () => {
    renderWithRouter(<App />);

    const numberOfPokemonTypes = 7;
    const buttonPokemonTypeFilters = screen.getAllByTestId('pokemon-type-button');
    expect(buttonPokemonTypeFilters).toHaveLength(numberOfPokemonTypes);

    pokemons.forEach(({ type }) => {
      const buttonAll = screen.getByTestId('', { name: /all/i });
      expect(buttonAll).toBeEnabled();

      const filterButton = screen.getByRole('button', { name: type });
      userEvent.click(filterButton);

      if (type === 'Fire' || type === 'Psychic') {
        const buttonNext = screen.getByRole('button', {
          name: 'Próximo pokémon',
        });
        expect(buttonNext).toBeEnabled();
      }

      const pokemonType = screen.getByTestId('pokemon-type', { name: type });
      expect(pokemonType).toBeInTheDocument();
    });
  });

  it('Contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByTestId('', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll).toBeEnabled();
  });
});
