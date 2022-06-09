import { store } from './app/store';
import { Provider } from 'react-redux';

/* Pages */
import Questions from './pages/Questions';

const App = () => {
	return (
		<Provider store={store}>
			<Questions />
		</Provider>
	);
};

export default App;
