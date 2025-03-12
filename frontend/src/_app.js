import { Provider } from 'react-redux';
import { store } from '../store'; // Ensure the path to your store is correct
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
