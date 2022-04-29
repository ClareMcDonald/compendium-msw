import { screen, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Home from './Home.jsx';

const movie = [ {
    image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/qG3RYlIVpTYclR9TYIsy8p7m7AT.jpg',
    title: 'Grave of the Fireflies',
    original_title: '火垂るの墓',
    director: 'Isao Takahata',
    release_date: '1988',
    description: 'In the latter part of World War II, a boy and his sister, orphaned when their mother is killed in the firebombing of Tokyo, are left to survive on their own in what remains of civilian life in Japan. The plot follows this boy and his sister as they do their best to survive in the Japanese countryside, battling hunger, prejudice, and pride in their own quiet, personal battle.'
}]

const server = setupServer(
    rest.get('https://ghibliapi.herokuapp.com/films', (req, res, ctx) => res(ctx.json(movie)))
);

describe('Home', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());

    test('Should render a movie', async () => {
        render(<Home />)
        return waitFor(() => {
            const name = screen.getByText('Grave of the Fireflies', { exact: false })
            const releaseDate = screen.getByText('1988', { exact: false })
    
            expect(name).toBeInTheDocument()
            expect(releaseDate).toBeInTheDocument();
        });
    });
});