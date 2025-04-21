import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; 
import { MouseFollower } from 'react-mouse-follower';
import { AppContextProvider } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <AppContextProvider>
  <MouseFollower/>
  <ToastContainer/>
  <Provider store={store}>
  <App />
  </Provider>
  </AppContextProvider>
  </BrowserRouter>
);


