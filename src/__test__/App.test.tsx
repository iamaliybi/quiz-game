import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
	test('renders learn react link', () => {
		render(<App />);
		const linkElement = screen.getByText(/Snapp!/i);
		expect(linkElement).toBeInTheDocument();
	});
});
