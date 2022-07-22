import * as React from 'react';
import { Layout } from './components/Layout';

import './custom.css'
import { AuthorizeRoute } from 'Foundation/Security/client/Components/AuthorizeRoute';
import { AppRoutes } from './AppRoutes';
import { Route, Routes } from 'react-router-dom';

export default class App extends React.Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { component, requireAuth, ...rest } = route;
            return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest}  component={component} /> : component} />;
          })}
          </Routes>
      </Layout>
    );
  }
}
