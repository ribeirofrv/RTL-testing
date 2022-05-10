import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import NotFound from '../components/NotFound';
import App from '../App';

describe('4 - Testa o componente <NotFound.js />', () => {
  it('Contém um heading "h2" com o texto "Page requested not found 😭"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina-que-nao-existe/');

    const notFound = screen.getByRole('heading', { level: 2, name: /not found/i });
    expect(notFound).toBeInTheDocument();
  });

  it('Contém a gif do Pikachu chorando', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByAltText(/not found/i);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(image.src).toContain(url);
  });
});
