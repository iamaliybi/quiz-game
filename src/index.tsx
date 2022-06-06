import { createRoot } from 'react-dom/client';
import App from './App';

/* Redux */
import { store } from './app/store';
import { Provider } from 'react-redux';

const root = createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<App />
	</Provider>,
);