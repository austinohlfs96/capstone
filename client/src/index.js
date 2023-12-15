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
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

