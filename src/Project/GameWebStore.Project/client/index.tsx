import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Root/store';
import { ApolloProvider } from '@apollo/client';
import { GraphQLFactory } from 'Foundation/Integration/client/GraphQL';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const graphQL = GraphQLFactory(true);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={graphQL}>
      <BrowserRouter basename={baseUrl}>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(null);
