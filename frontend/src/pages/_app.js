import { Provider } from 'react-redux';
import { store } from '../store/store';  // Updated path to point to the store file
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
