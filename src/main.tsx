import ReactDOM from 'react-dom/client';

import App from './App';
import './styles/main.scss';
import { Provider } from 'react-redux';
import { store } from './store';
const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement,
);
root.render(
   <Provider store={store}>
      {/* <PersistGate loading={<Loader />} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
   </Provider>,
);
