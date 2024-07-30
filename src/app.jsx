/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import { Toaster } from 'react-hot-toast';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './store'; // Adjust the path as needed

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
          <Router />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
