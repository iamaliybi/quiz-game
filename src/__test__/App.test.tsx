import { getByTestId, render, screen } from '@testing-library/react';
import App from '../App';

it('renders learn react link', async () => {
	const app = render(<App />);

	const input = await app.findAllByTestId('input');
	// input[0].simulate('change', { target: { value: 'Hello' } })
	// expect(linkElement).toBeInTheDocument();
});
