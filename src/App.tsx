import { store } from './app/store';
import { Provider } from 'react-redux';

/* Pages */
import Container from './pages/Container';

/* Styles */
import './assets/styles/app.scss';

const App = () => {
	return (
		<Provider store={store}>
			<Container />
		</Provider>
	);
};

export default App;
