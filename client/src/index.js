import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from  "./app/store"
import { ToastProvider, useToasts } from 'react-toast-notifications';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <style>
          {`
            .ui.form .field.field input:-webkit-autofill {
              box-shadow: rgb(137, 137, 137) 0px 0px 0px 100px inset !important;
              border-color: rgb(0, 0, 0) !important;
            }
          `}
        </style>
    <ToastProvider>
      <style>
        {`
          .react-toast-notifications__container {
            z-index: 100000 !important;
          }
        `}
      </style>
      <Router>
      
        <App />
      </Router>
    </ToastProvider>
  </Provider>
);


